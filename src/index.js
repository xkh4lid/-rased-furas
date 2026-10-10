const json = (data, status = 200) => new Response(JSON.stringify(data), {status, headers: {"content-type":"application/json; charset=utf-8"}});
async function telegram(env, text) {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) throw new Error("Missing Telegram secrets");
  const response = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method:"POST", headers:{"content-type":"application/json"},
    body:JSON.stringify({chat_id:env.TELEGRAM_CHAT_ID,text,disable_web_page_preview:true})
  });
  if (!response.ok) throw new Error(`Telegram HTTP ${response.status}`);
}
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/health") return json({ok:true,service:"rased-furas"});
    if (url.pathname === "/test" && request.method === "POST") {
      if (!env.ADMIN_KEY || request.headers.get("authorization") !== `Bearer ${env.ADMIN_KEY}`) return json({error:"Unauthorized"},401);
      try { await telegram(env,"✅ راصد الفرص: اختبار الاتصال ناجح"); return json({ok:true}); }
      catch(e) { console.error(e.message); return json({error:"Delivery failed"},502); }
    }
    return json({service:"rased-furas",status:"setup",message:"No monitoring sources configured yet"});
  },
  async scheduled(event, env, ctx) {
    console.log("Rased Furas scheduled check; no sources configured");
  }
};