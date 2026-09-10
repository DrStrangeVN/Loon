// Loon VPN Connection Monitor
// Notify when VPN starts a NEW connection session.
// Network changes (Wi-Fi / Cellular) are handled separately
// by network-ip.js and are not modified here.

var STATE_KEY = "Loon_VPN_LAST_SESSION";
var LAST_IP_KEY = "Loon_VPN_LAST_IP";
var LAST_CHECK_KEY = "Loon_VPN_LAST_CHECK";

// How long without seeing the VPN is considered a new session.
// Cron is expected to run every 5 seconds.
var SESSION_GAP = 12000;


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


function getNetwork() {

    var network = "Wi-Fi";

    try {

        var config =
            JSON.parse($config.getConfig() || "{}");

        var ssid =
            String(config.ssid || "").toLowerCase();

        if (
            ssid.indexOf("cellular") >= 0 ||
            ssid.indexOf("4g") >= 0 ||
            ssid.indexOf("5g") >= 0
        ) {
            network = "4G/5G";
        }

    } catch (e) {}

    return network;
}


function notifyVPN(ip) {

    var network = getNetwork();

    var policy = "FINAL VPN";

    try {

        var config =
            JSON.parse($config.getConfig() || "{}");

        if (config.final) {
            policy = String(config.final);
        }

    } catch (e) {}


    $notification.post(
        "🟢 Loon VPN Connected",
        policy,
        "Network: " + network +
        "\nIP: " + ip
    );
}


/*
 * Get current time.
 */
var now = Date.now();


/*
 * Get current VPN public IP.
 *
 * null = request goes through current Loon policy.
 */
getIP(null, function(vpnIP) {

    if (!vpnIP) {
        $done();
        return;
    }


    /*
     * Read previous information.
     */
    var lastCheck =
        Number(
            $persistentStore.read(LAST_CHECK_KEY) || "0"
        );

    var lastIP =
        $persistentStore.read(LAST_IP_KEY) || "";


    /*
     * Determine whether this is a NEW VPN session.
     *
     * Case 1:
     * First time script runs.
     *
     * Case 2:
     * There has been a gap long enough since
     * the previous VPN check.
     *
     * Case 3:
     * VPN public IP changed.
     *
     * This means reconnecting can trigger again
     * even when Loon did not execute a script
     * during the OFF period.
     */
    var newSession = false;


    if (!lastCheck) {

        newSession = true;

    } else if ((now - lastCheck) > SESSION_GAP) {

        newSession = true;

    } else if (lastIP && lastIP !== vpnIP) {

        newSession = true;
    }


    /*
     * Notify only once for this session.
     */
    if (newSession) {

        notifyVPN(vpnIP);
    }


    /*
     * Save current session information.
     */
    $persistentStore.write(
        String(now),
        LAST_CHECK_KEY
    );

    $persistentStore.write(
        vpnIP,
        LAST_IP_KEY
    );

    $persistentStore.write(
        "ON",
        STATE_KEY
    );


    $done();
});
