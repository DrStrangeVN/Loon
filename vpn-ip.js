// Loon VPN Connect Monitor
// Detect every new VPN connection session.
// Keep network-changed notification independent.

var STATE_KEY = "Loon_VPN_SESSION_STATE";
var IP_KEY = "Loon_VPN_LAST_IP";

function getIP(node, callback) {
    var opt = {
        url: "https://api64.ipify.org",
        timeout: 8000
    };

    if (node) {
        opt.node = node;
    }

    $httpClient.get(opt, function(error, response, data) {
        if (error) {
            callback("");
            return;
        }

        callback(String(data || "").trim());
    });
}

var config = {};

try {
    config = JSON.parse($config.getConfig() || "{}");
} catch (e) {
    config = {};
}

var model = Number(config.running_model || 0);

// 0 = DIRECT
// 1 = RULE
// 2 = GLOBAL PROXY
var vpnActive = model !== 0;

// VPN OFF
// Reset the session so the next ON becomes a new session.
if (!vpnActive) {
    $persistentStore.write("OFF", STATE_KEY);
    $done();
    return;
}

// VPN ON
getIP("DIRECT", function(directIP) {

    getIP(null, function(currentIP) {

        if (!currentIP || currentIP.indexOf("ERROR") === 0) {
            $done();
            return;
        }

        var oldState = $persistentStore.read(STATE_KEY) || "OFF";
        var lastIP = $persistentStore.read(IP_KEY) || "";

        /*
         * New VPN session:
         *
         * OFF -> ON
         *
         * We intentionally do NOT compare IP here.
         * Reconnecting to the same node/IP must still notify.
         */
        if (oldState !== "ON") {

            var network = "Wi-Fi";

            if (config.ssid === "cellular") {
                network = "4G/5G";
            }

            var selectedNode = "";

            try {
                selectedNode =
                    String(config["FINAL VPN"] || "") ||
                    String(config.final || "");
            } catch (e) {}

            $notification.post(
                "🟢 Loon VPN Connected",
                selectedNode || "Loon VPN",
                "Network: " + network +
                "\nIP: " + currentIP
            );
        }

        // Save current VPN session
        $persistentStore.write("ON", STATE_KEY);
        $persistentStore.write(currentIP, IP_KEY);

        $done();
    });
});
