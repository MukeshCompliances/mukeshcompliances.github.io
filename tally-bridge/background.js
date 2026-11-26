// Tally Bridge: only the Mukesh Compliances website may send Tally XML to Tally's own server on this computer.
const SITE = "https://mukeshcompliances.github.io";
chrome.runtime.onMessageExternal.addListener((msg, sender, reply) => {
  if (!sender || sender.origin !== SITE) { reply({ err: "origin" }); return; }
  if (msg && msg.ping) { reply({ ok: true, v: 1 }); return; }
  if (msg && typeof msg.xml === "string") {
    fetch("http://localhost:" + (msg.port === 9000 ? 9000 : 9000) + "/", { method: "POST", headers: { "Content-Type": "text/xml;charset=utf-8" }, body: msg.xml })
      .then(r => r.text().then(t => reply({ ok: r.ok, status: r.status, text: t })))
      .catch(e => reply({ err: "tally", msg: String(e) }));
    return true;
  }
  reply({ err: "bad" });
});
