var c = {};

try {
    c = JSON.parse($config.getConfig() || "{}");
} catch (e) {}

console.log("===== LOON VPN DEBUG =====");
console.log("Loon: " + $loon);
console.log("running_model: " + c.running_model);
console.log("ssid: " + c.ssid);
console.log("global_proxy: " + c.global_proxy);
console.log("final: " + c.final);
console.log("policy_select: " + JSON.stringify(c.policy_select));

$notification.post(
    "Loon Debug",
    "Model: " + c.running_model,
    "SSID: " + c.ssid +
    "\nGlobal: " + c.global_proxy +
    "\nFinal: " + c.final
);

$done();
