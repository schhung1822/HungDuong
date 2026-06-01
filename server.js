import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sendContactToTelegram } from "./server/telegram.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = Number(process.env.PORT || 3000);

app.use(express.json({ limit: "32kb" }));

app.post("/api/contact", async (req, res) => {
  try {
    await sendContactToTelegram(req.body);
    res.status(200).json({ ok: true });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    console.error("[contact] Telegram notification failed:", error);
    res.status(statusCode).json({
      ok: false,
      message: statusCode === 400 ? error.message : "Unable to send contact notification."
    });
  }
});

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Portfolio server running on http://localhost:${port}`);
});
