const TELEGRAM_API_BASE = "https://api.telegram.org";

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function trimField(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

export function buildTelegramMessage(payload) {
  const name = trimField(payload.name, 120);
  const email = trimField(payload.email, 160);
  const brand = trimField(payload.brand || "Không cung cấp", 160);
  const phone = trimField(payload.phone || "Không cung cấp", 80);
  const subject = trimField(payload.subject || "Không có tiêu đề", 180);
  const message = trimField(payload.message, 2200);
  const source = trimField(payload.source || "Portfolio contact form", 120);

  return [
    "📩 <b>Liên hệ mới từ Portfolio</b>",
    "",
    `<b>Họ tên:</b> ${escapeHtml(name)}`,
    `<b>Email:</b> ${escapeHtml(email)}`,
    `<b>Thương hiệu:</b> ${escapeHtml(brand)}`,
    `<b>Số điện thoại:</b> ${escapeHtml(phone)}`,
    `<b>Tiêu đề:</b> ${escapeHtml(subject)}`,
    `<b>Nguồn:</b> ${escapeHtml(source)}`,
    "",
    "<b>Nội dung:</b>",
    escapeHtml(message)
  ].join("\n");
}

export async function sendContactToTelegram(payload, env = process.env) {
  const token = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID.");
  }

  const name = trimField(payload.name, 120);
  const email = trimField(payload.email, 160);
  const message = trimField(payload.message, 2200);

  if (!name || !email || !message) {
    const error = new Error("Missing required contact fields.");
    error.statusCode = 400;
    throw error;
  }

  const response = await fetch(`${TELEGRAM_API_BASE}/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: buildTelegramMessage({ ...payload, name, email, message }),
      parse_mode: "HTML",
      disable_web_page_preview: true
    })
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Telegram API error ${response.status}: ${body}`);
  }

  return response.json();
}
