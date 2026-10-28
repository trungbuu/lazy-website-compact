/**
 * Route cần thêm vào doPost của Apps Script gateway:
 * if (action === 'lazy_website_lead') return json_(lazyWebsiteLead_(b));
 *
 * Luồng này ghi cùng workbook Lead Magnet OS và chỉ gửi đường dẫn tài liệu.
 * Không tạo Google Docs, không ghi link báo cáo và không gửi email marketing.
 */
const LAZY_WEBSITE_LEAD_CONFIG = {
  spreadsheetId: '1lUkwAAbZNUtAfmXJhw9376wsgqi5AitdRHid18FXZEg',
  campaignId: 'lazy_website_claude_prompt_v1',
  caseSheet: 'CASE_LazyWeb_Claude',
  resourceUrl: 'https://lazyai.vn/sharing/claude-prompt/',
  emailSubject: 'Bửu Trung | Bộ quy trình làm việc tối ưu cùng Claude'
};

function lazyWebsiteLead_(payload) {
  if (payload.website) return { ok: true };
  if (Number(payload.elapsed_ms || 0) < 1200) return { ok: false, error: 'too_fast' };

  const config = LAZY_WEBSITE_LEAD_CONFIG;
  const submissionId = String(payload.submission_id || '').trim();
  const name = String(payload.name || '').trim().slice(0, 120);
  const email = String(payload.email || '').trim().toLowerCase().slice(0, 254);
  const industry = String(payload.industry || '').trim().slice(0, 200);
  if (!submissionId || payload.campaign_id !== config.campaignId) return { ok: false, error: 'campaign' };
  if (!name || !industry || payload.consent_report !== true) return { ok: false, error: 'required' };
  if (!/^\S+@\S+\.\S+$/.test(email)) return { ok: false, error: 'email' };

  const spreadsheet = SpreadsheetApp.openById(config.spreadsheetId);
  const caseSheet = spreadsheet.getSheetByName(config.caseSheet);
  const submissions = spreadsheet.getSheetByName('ALL_SUBMISSIONS');
  const leads = spreadsheet.getSheetByName('LEADS');
  if (!caseSheet || !submissions || !leads) throw new Error('Thiếu tab dữ liệu Lead Magnet OS');

  const lock = LockService.getScriptLock();
  const now = new Date(payload.submitted_at || Date.now());
  const source = String(payload.source || 'lazy_website_compact_landing').slice(0, 120);
  let caseRow = 0;
  let submissionRow = 0;
  lock.waitLock(45000);
  try {
    caseRow = lazyWebsiteFindRow_(caseSheet, 1, submissionId, 4);
    if (caseRow && caseSheet.getRange(caseRow, 53).getDisplayValue() === 'SENT') {
      return { ok: true, duplicate: true, email_sent: true, resource_url: config.resourceUrl };
    }
    const caseValues = lazyWebsiteCaseRow_(payload, now, name, email, industry, source, 'SENDING');
    caseRow = caseRow || Math.max(caseSheet.getLastRow() + 1, 4);
    caseSheet.getRange(caseRow, 1, 1, caseValues.length).setValues([caseValues]);

    submissionRow = lazyWebsiteFindRow_(submissions, 1, submissionId, 2) || submissions.getLastRow() + 1;
    submissions.getRange(submissionRow, 1, 1, 27).setValues([[
      submissionId, now, config.campaignId, config.caseSheet, name, email, '', '', '1.1.0',
      'Tài liệu Claude đã gửi', '', 'resource_ready', true, false, source,
      String(payload.page_url || '').slice(0, 1000), String(payload.referrer || '').slice(0, 1000),
      String(payload.utm_source || '').slice(0, 120), String(payload.utm_medium || '').slice(0, 120),
      String(payload.utm_campaign || '').slice(0, 160), String(payload.utm_content || '').slice(0, 160),
      String(payload.utm_term || '').slice(0, 160), '', '', 'SENDING', '', industry
    ]]);
    lazyWebsiteUpsertLead_(leads, payload, now, name, email, industry, source);
  } finally {
    lock.releaseLock();
  }

  try {
    if (MailApp.getRemainingDailyQuota() < 1) throw new Error('Hết hạn mức gửi email trong ngày');
    const message = lazyWebsiteResourceEmail_(name, config.resourceUrl);
    MailApp.sendEmail({
      to: email,
      subject: config.emailSubject,
      body: message.text,
      htmlBody: message.html,
      name: 'Bửu Trung · Tối Ưu'
    });
  } catch (error) {
    lock.waitLock(45000);
    try {
      caseSheet.getRange(caseRow, 53).setValue('FAILED: ' + String(error.message || error).slice(0, 180));
      submissions.getRange(submissionRow, 25).setValue('FAILED');
    } finally {
      lock.releaseLock();
    }
    return { ok: false, error: 'email_failed' };
  }

  lock.waitLock(45000);
  try {
    const sentAt = new Date();
    caseSheet.getRange(caseRow, 52, 1, 2).setValues([[sentAt, 'SENT']]);
    submissions.getRange(submissionRow, 24, 1, 2).setValues([[sentAt, 'SENT']]);
  } finally {
    lock.releaseLock();
  }
  return { ok: true, email_sent: true, resource_url: config.resourceUrl };
}

function lazyWebsiteCaseRow_(payload, now, name, email, industry, source, status) {
  const row = new Array(55).fill('');
  row[0] = String(payload.submission_id);
  row[1] = now;
  row[3] = name;
  row[4] = email;
  row[9] = '1.1.0';
  row[10] = 5;
  row[11] = 5;
  row[12] = 5;
  row[35] = 'Tài liệu Claude đã gửi';
  row[38] = 'self_assessed';
  row[39] = 'Đăng ký đã được ghi nhận và đường dẫn tài liệu đã được gửi qua email.';
  row[40] = 'resource_ready';
  row[45] = true;
  row[46] = false;
  row[47] = source;
  row[48] = String(payload.utm_campaign || '').slice(0, 160);
  row[52] = status;
  row[54] = industry;
  return row;
}

function lazyWebsiteUpsertLead_(sheet, payload, now, name, email, industry, source) {
  const existingRow = lazyWebsiteFindRow_(sheet, 1, email, 2);
  const old = existingRow ? sheet.getRange(existingRow, 1, 1, 17).getValues()[0] : [];
  const campaigns = String(old[8] || '').split(',').map(function (item) { return item.trim(); }).filter(Boolean);
  if (campaigns.indexOf(LAZY_WEBSITE_LEAD_CONFIG.campaignId) < 0) campaigns.push(LAZY_WEBSITE_LEAD_CONFIG.campaignId);
  const row = [
    email, name || old[1] || '', old[2] || '', old[3] || '', old[4] || now, now,
    old[6] || LAZY_WEBSITE_LEAD_CONFIG.campaignId, LAZY_WEBSITE_LEAD_CONFIG.campaignId,
    campaigns.join(', '), Number(old[9] || 0) + 1, old[10] === true,
    'Tài liệu Claude đã gửi', old[12] || '', source,
    String(payload.utm_campaign || '').slice(0, 160) || old[14] || '', old[15] || '', industry || old[16] || ''
  ];
  sheet.getRange(existingRow || sheet.getLastRow() + 1, 1, 1, row.length).setValues([row]);
}

function lazyWebsiteFindRow_(sheet, column, value, startRow) {
  if (!sheet || sheet.getLastRow() < startRow) return 0;
  const match = sheet.getRange(startRow, column, sheet.getLastRow() - startRow + 1, 1)
    .createTextFinder(String(value)).matchEntireCell(true).findNext();
  return match ? match.getRow() : 0;
}

function lazyWebsiteEscapeHtml_(value) {
  return String(value).replace(/[&<>"']/g, function (character) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
  });
}

function lazyWebsiteResourceEmail_(name, resourceUrl) {
  const safeName = lazyWebsiteEscapeHtml_(name);
  const safeUrl = lazyWebsiteEscapeHtml_(resourceUrl);
  const title = 'Bộ quy trình làm việc tối ưu cùng Claude';
  const text = [
    'Chào ' + name + ',', '',
    'Cảm ơn bạn đã đăng ký nhận “' + title + '”.',
    'Mở tài liệu tại đây:', resourceUrl, '',
    'Thân mến,',
    'Bửu Trung',
    'Dân Lười, thích Tối ưu',
    'toiuu.vn | YouTube: youtube.com/@luoithichtoiuu',
    'LinkedIn: linkedin.com/in/buutrungtoiuu | Zalo: 0909 862 209'
  ].join('\n');
  const html = '<div style="margin:0;padding:28px 14px;background:#fff7f1;font-family:Arial,Helvetica,sans-serif;color:#2c211b;line-height:1.65">' +
    '<div style="max-width:640px;margin:0 auto;border:1px solid #f0d5c4;border-radius:22px;background:#ffffff;overflow:hidden">' +
      '<div style="padding:24px 28px;background:linear-gradient(135deg,#b84300,#ff6600);color:#ffffff">' +
        '<p style="margin:0 0 7px;font-size:12px;font-weight:800;letter-spacing:.1em;text-transform:uppercase">Bửu Trung · Tối Ưu</p>' +
        '<h1 style="margin:0;font-size:24px;line-height:1.25">Bộ quy trình Claude của bạn đã sẵn sàng</h1>' +
      '</div>' +
      '<div style="padding:28px">' +
        '<p style="margin:0 0 16px">Chào <strong>' + safeName + '</strong>,</p>' +
        '<p style="margin:0 0 22px">Cảm ơn bạn đã đăng ký nhận <strong>“' + title + '”</strong>.</p>' +
        '<p style="margin:0 0 12px"><a href="' + safeUrl + '" style="display:inline-block;padding:13px 21px;border-radius:999px;background:#b84300;color:#ffffff;text-decoration:none;font-weight:700">Mở bộ quy trình Claude</a></p>' +
        '<p style="margin:0;color:#84746a;font-size:12px;word-break:break-all">Nếu nút không mở được, dùng link: <a href="' + safeUrl + '" style="color:#b84300">' + safeUrl + '</a></p>' +
        '<div style="margin-top:28px;padding-top:22px;border-top:1px solid #eadbd1">' +
          '<p style="margin:0;font-size:18px;font-weight:900;text-transform:uppercase">Bửu Trung</p>' +
          '<p style="margin:2px 0 12px;color:#675950">Dân Lười, thích Tối ưu</p>' +
          '<p style="margin:0;color:#675950;font-size:13px"><a href="https://toiuu.vn/" style="color:#b84300">toiuu.vn</a> · <a href="https://www.youtube.com/@luoithichtoiuu" style="color:#b84300">YouTube</a> · <a href="https://www.linkedin.com/in/buutrungtoiuu/" style="color:#b84300">LinkedIn</a> · <a href="https://zalo.me/0909862209" style="color:#b84300">Zalo 0909 862 209</a></p>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>';
  return { text: text, html: html };
}
