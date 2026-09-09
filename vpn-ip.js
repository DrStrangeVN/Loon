// Loon VPN Monitor
// Chỉ thông báo khi VPN thực sự chuyển OFF -> ON

var LAST_IP_KEY = "Loon_VPN_Last_IP";
var LAST_STATE_KEY = "Loon_VPN_Last_State";


// ==========================================
// Network
// ==========================================

function getNetwork() {

    var config = {};

    try {
        config = JSON.parse($config.getConfig() || "{}");
    } catch (e) {
        config = {};
    }

    var ssid = String(config.ssid || "");

    if (ssid && ssid.toLowerCase() !== "cellular") {
        return "Wi-Fi";
    }

    return "4G / 5G";
}


// ==========================================
// Get IP
// ==========================================

function getIP(node, callback) {

    $httpClient.get({
        url: "https://api64.ipify.org",
        timeout: 5000,
        node: node
    }, function (error, response, data) {

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


// ==========================================
// Main
// ==========================================

var network = getNetwork();


// Network IP
getIP("DIRECT", function (networkIP) {

    if (!networkIP) {
        $done();
        return;
    }


    // Loon IP
    getIP(null, function (loonIP) {

        if (!loonIP) {
            $done();
            return;
        }


        // --------------------------------------
        // Xác định VPN
        // --------------------------------------

        var vpnConnected =
            loonIP !== networkIP;


        var oldState =
            $persistentStore.read(LAST_STATE_KEY) || "";

        var oldIP =
            $persistentStore.read(LAST_IP_KEY) || "";


        // --------------------------------------
        // Lần chạy đầu tiên
        // Chỉ lưu trạng thái, KHÔNG báo
        // --------------------------------------

        if (!oldState) {

            $persistentStore.write(
                vpnConnected ? "ON" : "OFF",
                LAST_STATE_KEY
            );

            $persistentStore.write(
                loonIP,
                LAST_IP_KEY
            );

            $done();
            return;
        }


        // --------------------------------------
        // Network vừa thay đổi?
        // Không coi đây là VPN Connected
        // --------------------------------------

        var lastNetworkChange =
            Number(
                $persistentStore.read(
                    "Loon_Last_Network_Change"
                ) || "0"
            );

        var recentlyChanged =
            (Date.now() - lastNetworkChange) < 10000;


        // --------------------------------------
        // VPN OFF -> ON
        // --------------------------------------

        if (
            oldState === "OFF" &&
            vpnConnected &&
            !recentlyChanged
        ) {

            $notification.post(
                "Loon VPN Connected",
                network,
                "Network: " + networkIP +
                "\nLoon: " + loonIP
            );
        }


        // --------------------------------------
        // Lưu trạng thái
        // --------------------------------------

        $persistentStore.write(
            vpnConnected ? "ON" : "OFF",
            LAST_STATE_KEY
        );

        $persistentStore.write(
            loonIP,
            LAST_IP_KEY
        );

        $done();
    });
});
