#!/usr/bin/env python3
"""Small, dependency-free audit for generated static HTML sites.

This does not replace browser, accessibility, network or form-submission tests.
"""

from __future__ import annotations

import argparse
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


class Page(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.lang = False
        self.title = False
        self.in_title = False
        self.viewport = False
        self.description = False
        self.ids: set[str] = set()
        self.duplicate_ids: set[str] = set()
        self.links: list[tuple[str, str]] = []
        self.images_without_alt = 0
        self.forms_without_action = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        if tag == "html":
            self.lang = bool(values.get("lang"))
        elif tag == "title":
            self.in_title = True
        elif tag == "meta":
            name = (values.get("name") or "").lower()
            if name == "viewport":
                self.viewport = True
            elif name == "description" and values.get("content"):
                self.description = True
        elif tag == "img":
            if "alt" not in values:
                self.images_without_alt += 1
        elif tag == "form" and not values.get("action"):
            self.forms_without_action += 1

        identifier = values.get("id")
        if identifier:
            if identifier in self.ids:
                self.duplicate_ids.add(identifier)
            self.ids.add(identifier)

        attribute = {"a": "href", "link": "href", "script": "src", "img": "src", "source": "src", "form": "action"}.get(tag)
        if attribute and attribute in values:
            self.links.append((tag, values[attribute] or ""))

    def handle_data(self, data: str) -> None:
        if self.in_title and data.strip():
            self.title = True

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self.in_title = False


def resolve_target(root: Path, page: Path, url: str) -> tuple[Path | None, str, bool]:
    parsed = urlsplit(url.strip())
    if parsed.scheme or parsed.netloc or url.startswith("//"):
        return None, "", False
    path = unquote(parsed.path)
    if not path:
        return page, unquote(parsed.fragment), True
    candidate = root / path.lstrip("/") if path.startswith("/") else page.parent / path
    candidate = candidate.resolve()
    if not candidate.is_relative_to(root):
        return candidate, unquote(parsed.fragment), True
    if candidate.is_dir():
        candidate /= "index.html"
    elif not candidate.exists() and not candidate.suffix:
        html_file = candidate.with_suffix(".html")
        index_file = candidate / "index.html"
        if html_file.exists():
            candidate = html_file
        elif index_file.exists():
            candidate = index_file
    return candidate, unquote(parsed.fragment), True


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("site_dir", type=Path, help="Directory containing published static HTML")
    args = parser.parse_args()
    root = args.site_dir.expanduser().resolve()
    if not root.is_dir():
        parser.error(f"not a directory: {root}")
    html_files = sorted(root.rglob("*.html"))
    if not html_files:
        parser.error(f"no HTML files found in {root}")

    pages: dict[Path, Page] = {}
    errors: list[str] = []
    warnings: list[str] = []
    for html_file in html_files:
        page = Page()
        try:
            content = html_file.read_text(encoding="utf-8")
            page.feed(content)
        except (OSError, UnicodeError) as exc:
            errors.append(f"{html_file.relative_to(root)}: cannot read HTML: {exc}")
            continue
        pages[html_file] = page
        label = str(html_file.relative_to(root))
        if re.search(r"\{\{[^{}]{1,100}\}\}|\blorem ipsum\b", content, re.IGNORECASE):
            errors.append(f"{label}: unresolved template token or lorem ipsum")
        for ok, issue in ((page.lang, "missing html lang"), (page.title, "missing title"), (page.viewport, "missing viewport meta")):
            if not ok:
                errors.append(f"{label}: {issue}")
        if not page.description:
            warnings.append(f"{label}: missing meta description")
        if page.images_without_alt:
            errors.append(f"{label}: {page.images_without_alt} image(s) missing alt attribute")
        if page.forms_without_action:
            warnings.append(f"{label}: {page.forms_without_action} form(s) without action; verify JS submission end-to-end")
        for identifier in sorted(page.duplicate_ids):
            errors.append(f"{label}: duplicate id #{identifier}")

    for html_file, page in pages.items():
        label = str(html_file.relative_to(root))
        for tag, url in page.links:
            if not url or (tag == "a" and url == "#"):
                warnings.append(f"{label}: {tag} has empty/placeholder link")
                continue
            if url.lower().startswith("javascript:"):
                errors.append(f"{label}: {tag} uses javascript: URL")
                continue
            target, fragment, local = resolve_target(root, html_file, url)
            if not local or target is None:
                continue
            if not target.is_relative_to(root):
                errors.append(f"{label}: {tag} escapes site root: {url}")
            elif not target.is_file():
                errors.append(f"{label}: {tag} target missing: {url}")
            elif fragment and target.suffix.lower() == ".html":
                target_page = pages.get(target)
                if target_page and fragment not in target_page.ids:
                    errors.append(f"{label}: anchor missing: {url}")

    for issue in errors:
        print(f"ERROR {issue}")
    for issue in warnings:
        print(f"WARN  {issue}")
    print(f"Checked {len(pages)} HTML page(s): {len(errors)} error(s), {len(warnings)} warning(s).")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
