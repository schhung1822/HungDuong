import { sendContactToTelegram } from "../server/telegram.mjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Method not allowed." });
  }

  try {
    await sendContactToTelegram(req.body);
    return res.status(200).json({ ok: true });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    console.error("[contact] Telegram notification failed:", error);

    return res.status(statusCode).json({
      ok: false,
      message: statusCode === 400 ? error.message : "Unable to send contact notification."
    });
  }
}
