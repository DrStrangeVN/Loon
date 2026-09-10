// Loon VPN Connection Monitor
// Detect VPN OFF -> ON and notify once for each new connection.

var STATE_KEY = "Loon_VPN_CONNECTION_STATE";
var LAST_IP_KEY = "Loon_VPN_CONNECTION_IP";

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

var runningModel = Number(config.running_model || 0);

// 0 = DIRECT
// 1 = RULE
// 2 = GLOBAL PROXY
var vpnOn = runningModel !== 0;

// --------------------------------------------------
// VPN OFF
// --------------------------------------------------

if (!vpnOn) {
    $persistentStore.write("OFF", STATE_KEY);
    $done();
    return;
}

// --------------------------------------------------
// VPN ON
// --------------------------------------------------

getIP("DIRECT", function(directIP) {

    getIP(null, function(vpnIP) {

        if (!vpnIP) {
            $done();
            return;
        }

        var oldState =
            $persistentStore.read(STATE_KEY) || "OFF";

        var lastIP =
            $persistentStore.read(LAST_IP_KEY) || "";

        // ------------------------------------------
        // NEW VPN SESSION
        // ------------------------------------------

        if (oldState !== "ON") {

            var network = "Wi-Fi";

            var ssid = String(config.ssid || "");

            if (
                ssid.toLowerCase().indexOf("cellular") >= 0 ||
                ssid.toLowerCase().indexOf("4g") >= 0 ||
                ssid.toLowerCase().indexOf("5g") >= 0
            ) {
                network = "4G/5G";
            }

            var nodeName = "";

            // Try to get the currently selected policy.
            try {
                var finalPolicy =
                    $config.getSelectedPolicy("FINAL VPN");

                if (finalPolicy) {
                    nodeName = String(finalPolicy);
                }
            } catch (e) {}

            if (!nodeName) {
                nodeName = "FINAL VPN";
            }

            $notification.post(
                "🟢 Loon VPN Connected",
                nodeName,
                "Network: " + network +
                "\nIP: " + vpnIP
            );
        }

        // Save current state
        $persistentStore.write("ON", STATE_KEY);
        $persistentStore.write(vpnIP, LAST_IP_KEY);

        $done();
    });
});
