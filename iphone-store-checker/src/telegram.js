import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createApp } from "./server.js";
import { handleMessage, replyKeyboard, WATCH_MS, watchUnionSquare } from "./bot.js";

const POLL_SECONDS = 25;

async function telegram(token, method, body) {
  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(method === "getUpdates" ? (POLL_SECONDS + 10) * 1000 : 15000),
  });
  let payload;
  try {
    payload = await response.json();
  } catch {
    throw new Error("Telegram returned a response that was not JSON.");
  }
  if (!payload.ok) throw new Error(payload.description || "Telegram request failed.");
  return payload.result;
}

export async function pollTelegram({ token, app, send = telegram }) {
  const me = await send(token, "getMe", {});
  console.log(`Union Square checker is @${me.username}`);
  console.log(`Send your friend https://t.me/${me.username}`);
  const sessions = new Map();
  const alerts = new Set();
  let offset = 0;
  let watchRunning = false;
  const runWatch = async () => {
    if (watchRunning || alerts.size === 0) return;
    watchRunning = true;
    try {
      const text = await watchUnionSquare(app);
      if (!text) return;
      for (const chatId of alerts) {
        await send(token, "sendMessage", { chat_id: chatId, text, parse_mode: "HTML" });
      }
    } catch (error) {
      console.error(error.message || "Scheduled Union Square check failed.");
    } finally {
      watchRunning = false;
    }
  };
  const watchTimer = setInterval(runWatch, WATCH_MS);
  watchTimer.unref?.();
  for (;;) {
    let updates = [];
    try {
      updates = await send(token, "getUpdates", { offset, timeout: POLL_SECONDS });
    } catch (error) {
      console.error(error.message || "Telegram poll failed.");
      await new Promise((resolveDelay) => setTimeout(resolveDelay, 3000));
      continue;
    }
    for (const update of updates) {
      offset = update.update_id + 1;
      const message = update.message;
      if (!message?.text || !message.chat?.id) continue;
      const session = sessions.get(message.chat.id) || {};
      let reply;
      try {
        reply = await handleMessage(app, session, message.text);
        sessions.set(message.chat.id, session);
        if (reply.alerts === false) alerts.delete(message.chat.id);
        else alerts.add(message.chat.id);
      } catch (error) {
        console.error(error.message || "Pickup check failed.");
        alerts.add(message.chat.id);
        reply = { text: "Apple didn’t return pickup status. Try again in a moment.", keyboard: true };
      }
      await send(token, "sendMessage", {
        chat_id: message.chat.id,
        text: reply.text,
        parse_mode: "HTML",
        reply_markup: reply.keyboard ? replyKeyboard : undefined,
      });
    }
  }
}

const invokedDirectly = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    console.error("Set TELEGRAM_BOT_TOKEN to the token from @BotFather, then run this again.");
    process.exit(1);
  }
  pollTelegram({ token, app: createApp() }).catch((error) => {
    console.error(error.message || "The bot stopped.");
    process.exit(1);
  });
}
