// Loon VPN Monitor
// Chỉ báo khi VPN chuyển OFF -> ON

var STATE_KEY = "Loon_VPN_State";
var NETWORK_CHANGE_KEY = "Loon_Network_Changed";

function getNetworkType() {

    var config = {};

    try {
        config = JSON.parse($config.getConfig() || "{}");
    } catch (e) {}

    var ssid = String(config.ssid || "");

    if (ssid && ssid.toLowerCase() !== "cellular") {
        return "Wi-Fi";
    }

    return "4G / 5G";
}


// ========================================
// Get IP
// ========================================

function getIP(direct, callback) {

    var options = {
        url: "https://api64.ipify.org",
        timeout: 5000
    };

    if (direct) {
        options.node = "DIRECT";
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


// ========================================
// Main
// ========================================

var network = getNetworkType();


// IP thật
getIP(true, function(networkIP) {

    if (!networkIP) {
        $done();
        return;
    }


    // IP qua route hiện tại của Loon
    getIP(false, function(loonIP) {

        if (!loonIP) {
            $done();
            return;
        }


        // ------------------------------------
        // Kiểm tra network vừa thay đổi
        // ------------------------------------

        var lastNetworkChange = Number(
            $persistentStore.read(
                NETWORK_CHANGE_KEY
            ) || "0"
        );

        var networkRecentlyChanged =
            (Date.now() - lastNetworkChange) < 8000;


        // ------------------------------------
        // Nếu network vừa đổi
        // reset VPN state
        // ------------------------------------

        var state =
            $persistentStore.read(STATE_KEY) || "";

        if (networkRecentlyChanged || state === "RESET") {

            // Sau network change:
            // xác định trạng thái hiện tại nhưng
            // KHÔNG gửi notification VPN.

            if (loonIP === networkIP) {
                $persistentStore.write(
                    "OFF",
                    STATE_KEY
                );
            } else {
                $persistentStore.write(
                    "ON",
                    STATE_KEY
                );
            }

            $done();
            return;
        }


        // ------------------------------------
        // Xác định trạng thái
        // ------------------------------------

        var vpnNow =
            loonIP !== networkIP;

        var vpnState =
            vpnNow ? "ON" : "OFF";


        // ------------------------------------
        // State cũ
        // ------------------------------------

        if (!state || state === "RESET") {

            $persistentStore.write(
                vpnState,
                STATE_KEY
            );

            $done();
            return;
        }


        // ------------------------------------
        // OFF -> ON
        // ------------------------------------

        if (
            state === "OFF" &&
            vpnState === "ON"
        ) {

            $notification.post(
                "Loon VPN Connected",
                network,
                "Network: " +
                networkIP +
                "\nLoon: " +
                loonIP
            );
        }


        // ------------------------------------
        // ON -> OFF
        // Không thông báo
        // ------------------------------------

        $persistentStore.write(
            vpnState,
            STATE_KEY
        );

        $done();
    });
});
