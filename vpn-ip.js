// Loon VPN Connection Monitor
// Detect real VPN connection by comparing DIRECT IP and Loon IP.

var STATE_KEY = "Loon_VPN_CONNECTION_STATE";
var LAST_IP_KEY = "Loon_VPN_LAST_IP";

function getIP(node, callback) {
    var options = {
        url: "https://api64.ipify.org",
        timeout: 8000
    };

    if (node) {
        options.node = node;
    }

    $httpClient.get(options, function(error, response, data) {
        if (error || !data) {
            callback("");
            return;
        }

        callback(String(data).trim());
    });
}

var config = {};

try {
    config = JSON.parse($config.getConfig() || "{}");
} catch (e) {
    config = {};
}


// --------------------------------------------------
// GET DIRECT IP
// --------------------------------------------------

getIP("DIRECT", function(directIP) {

    if (!directIP) {
        $done();
        return;
    }


    // --------------------------------------------------
    // GET IP THROUGH LOON
    // --------------------------------------------------

    getIP(null, function(loonIP) {

        if (!loonIP) {
            $done();
            return;
        }


        // --------------------------------------------------
        // DETECT REAL VPN STATE
        // --------------------------------------------------

        var vpnConnected = (directIP !== loonIP);

        var oldState =
            $persistentStore.read(STATE_KEY) || "OFF";


        // --------------------------------------------------
        // VPN OFF
        // --------------------------------------------------

        if (!vpnConnected) {

            // IMPORTANT:
            // Reset state every time DIRECT IP == LOON IP

            if (oldState !== "OFF") {
                $persistentStore.write("OFF", STATE_KEY);
            }

            $persistentStore.write(loonIP, LAST_IP_KEY);

            $done();
            return;
        }


        // --------------------------------------------------
        // VPN ON
        // --------------------------------------------------

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


            // Get currently selected FINAL VPN policy

            var policy = "FINAL VPN";

            try {
                var selected =
                    $config.getSelectedPolicy("FINAL VPN");

                if (selected) {
                    policy = String(selected);
                }
            } catch (e) {}


            // --------------------------------------------------
            // NOTIFICATION
            // --------------------------------------------------

            $notification.post(
                "🟢 Loon VPN Connected",
                policy,
                "Network: " + network +
                "\nIP: " + loonIP
            );
        }


        // --------------------------------------------------
        // SAVE STATE
        // --------------------------------------------------

        $persistentStore.write("ON", STATE_KEY);
        $persistentStore.write(loonIP, LAST_IP_KEY);

        $done();
    });
});
