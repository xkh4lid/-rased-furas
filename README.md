# راصد الفرص | Rased Furas

Cloudflare Worker starter for Telegram project opportunity alerts.

## Current status
- Health endpoint: GET /health
- Authenticated Telegram test: POST /test with Authorization: Bearer <ADMIN_KEY>
- No scraping or automated project applications enabled yet.
- No credentials are stored in this repository.

## Setup
1. Connect this repository to Cloudflare Worker or deploy with Wrangler.
2. Add Cloudflare Worker Secrets: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, ADMIN_KEY.
3. Obtain your chat ID securely from Telegram after sending /start to your bot.
4. Test GET /health and POST /test with the admin key.
5. Configure permitted opportunity sources, deduplication and scheduling before enabling monitoring.

Never commit secrets. This project is separate from Mas3a.
