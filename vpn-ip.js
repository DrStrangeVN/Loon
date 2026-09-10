// Loon VPN Connection Monitor
// Detect VPN state by comparing DIRECT IP and current Loon IP.
// Network change notification remains handled by network-ip.js.

var STATE_KEY = "Loon_VPN_STATE";
var LAST_IP_KEY = "Loon_VPN_LAST_IP";

var TEST_URL =
    "https://api64.ipify.org/?loon_check=" +
    Date.now();


function getIP(node, callback) {

    var options = {
        url: TEST_URL,
        timeout: 8000
    };

    if (node !== null) {
        options.node = node;
    }

    $httpClient.get(options, function(error, response, data) {

        if (error || !data) {
            callback(null);
            return;
        }

        var ip = String(data).trim();

        if (!ip) {
            callback(null);
            return;
        }

        callback(ip);
    });
}


function getNetwork() {

    try {

        var conf =
            JSON.parse($config.getConfig() || "{}");

        var ssid =
            String(conf.ssid || "").toLowerCase();

        if (
            ssid.indexOf("cellular") >= 0 ||
            ssid.indexOf("4g") >= 0 ||
            ssid.indexOf("5g") >= 0
        ) {
            return "4G/5G";
        }

    } catch (e) {}

    return "Wi-Fi";
}


function getPolicy() {

    try {

        var conf =
            JSON.parse($config.getConfig() || "{}");

        /*
         * Your FINAL rule is:
         *
         * FINAL,INTERNET
         *
         * Therefore use the actual final policy
         * instead of hard-coding FINAL VPN.
         */

        if (conf.final) {
            return String(conf.final);
        }

    } catch (e) {}

    return "INTERNET";
}


function notify(ip) {

    $notification.post(
        "🟢 Loon VPN Connected",
        getPolicy(),
        "Network: " +
        getNetwork() +
        "\nIP: " +
        ip
    );
}


/*
 * First request:
 * absolutely DIRECT.
 */
getIP("DIRECT", function(directIP) {

    if (!directIP) {
        $done();
        return;
    }


    /*
     * Second request:
     * current Loon connection.
     *
     * null is intentional:
     * it follows the current Loon routing state.
     */
    getIP(null, function(currentIP) {

        if (!currentIP) {
            $done();
            return;
        }


        /*
         * VPN state.
         */
        var vpnConnected =
            directIP !== currentIP;


        var oldState =
            $persistentStore.read(STATE_KEY) || "OFF";


        /*
         * ============================
         * VPN OFF
         * ============================
         */

        if (!vpnConnected) {

            /*
             * This is the important part:
             * every cron execution while VPN is OFF
             * forces the persistent state back to OFF.
             */
            $persistentStore.write(
                "OFF",
                STATE_KEY
            );

            $persistentStore.write(
                currentIP,
                LAST_IP_KEY
            );

            $done();
            return;
        }


        /*
         * ============================
         * VPN ON
         * ============================
         */

        if (oldState !== "ON") {

            notify(currentIP);
        }


        /*
         * Remember that this VPN session
         * is now active.
         */
        $persistentStore.write(
            "ON",
            STATE_KEY
        );

        $persistentStore.write(
            currentIP,
            LAST_IP_KEY
        );


        $done();
    });
});
