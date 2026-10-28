/* Chèn sau vi-type.js, rồi chạy await viAudit() ở 390 px và 1440 px. */
(function (root) {
  "use strict";

  root.viAudit = async function (scenario) {
    var wait = function (ms) { return new Promise(function (resolve) { setTimeout(resolve, ms); }); };
    var click = function (element) {
      if (element) element.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    };
    var pairs = (root.viType && root.viType.pairs) || [];
    if (!pairs.length) return { soLoi: 1, loi: ["Trang chưa nạp vi-type.js"] };

    var letters = "A-Za-zÀ-ỹĐđ";
    var escaped = pairs.map(function (item) {
      return item.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/ /g, "[\\s\\u00A0]");
    });
    var pairPattern = new RegExp("(?<![" + letters + "])(" + escaped.join("|") + ")(?![" + letters + "])", "giu");
    var leafSelector = "h1,h2,h3,h4,p,li,span,b,small,td,th,button,a,strong,em,label";
    var problems = new Set();

    function visible(element) {
      var style = getComputedStyle(element);
      var rect = element.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
    }

    function lineBreaks(element) {
      var range = document.createRange();
      var positions = [];
      var text = "";
      var offset = 0;
      var previousTop = null;
      element.childNodes.forEach(function (node) {
        if (node.nodeType !== Node.TEXT_NODE) return;
        var value = node.nodeValue || "";
        for (var index = 0; index < value.length; index += 1) {
          range.setStart(node, index);
          range.setEnd(node, index + 1);
          var box = range.getBoundingClientRect();
          if (!box.height) continue;
          if (previousTop !== null && Math.abs(box.top - previousTop) > 2) positions.push(offset + index);
          previousTop = box.top;
        }
        text += value;
        offset += value.length;
      });
      return { text: text, positions: positions };
    }

    async function scan(label) {
      await document.fonts.ready;
      if (root.viType) root.viType.bind();
      await wait(150);

      document.querySelectorAll(leafSelector).forEach(function (element) {
        if (!visible(element) || element.querySelector(leafSelector)) return;
        var measured = lineBreaks(element);
        if (!measured.positions.length) return;
        Array.from(measured.text.matchAll(pairPattern)).forEach(function (match) {
          var start = match.index;
          var end = start + match[0].length;
          measured.positions.forEach(function (position) {
            if (position > start && position < end) {
              problems.add("TÁCH " + match[0].replace(/\u00A0/g, " ") + " @" + (element.className || element.tagName) + " (" + label + ")");
            }
          });
        });
        var lastLine = measured.text.slice(measured.positions[measured.positions.length - 1]).trim();
        if (!/\s/.test(lastLine) && lastLine.length < 12 && !/^[\d.,%–\-/→]+$/.test(lastLine)) {
          problems.add("WIDOW " + lastLine + " @" + (element.className || element.tagName) + " (" + label + ")");
        }
      });

      document.querySelectorAll("h1,h2,h3,h4").forEach(function (element) {
        if (!visible(element) || !/[À-ỹ]/.test(element.textContent || "")) return;
        var style = getComputedStyle(element);
        var ratio = parseFloat(style.lineHeight) / parseFloat(style.fontSize);
        if (ratio < 1.02) problems.add("LINE-HEIGHT " + (element.className || element.tagName) + " " + ratio.toFixed(2));
      });
      if (document.documentElement.scrollWidth > document.documentElement.clientWidth) {
        problems.add("TRÀN NGANG (" + label + ")");
      }
    }

    await scan("trạng thái đầu");
    if (typeof scenario === "function") await scenario(scan, click, wait);
    return { trang: location.pathname, kho: innerWidth, soLoi: problems.size, loi: Array.from(problems).slice(0, 30) };
  };
})(window);
