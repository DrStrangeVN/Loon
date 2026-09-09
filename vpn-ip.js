// Loon VPN Monitor
// Chỉ thông báo khi VPN chuyển OFF -> ON

var STATE_KEY = "Loon_VPN_State";

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
// Lấy IP
// ==========================================

function getIP(direct, callback) {

    var options = {
        url: "https://api64.ipify.org",
        timeout: 5000
    };

    // DIRECT = IP mạng thật
    // Không có node = route hiện tại của Loon
    if (direct) {
        options.node = "DIRECT";
    }

    $httpClient.get(options, function (error, response, data) {

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


// IP mạng thật
getIP(true, function (networkIP) {

    if (!networkIP) {
        $done();
        return;
    }


    // IP theo route hiện tại của Loon
    getIP(false, function (loonIP) {

        if (!loonIP) {
            $done();
            return;
        }


        // Nếu 2 IP giống nhau = chưa đi qua proxy
        var vpnConnected = (loonIP !== networkIP);


        var oldState =
            $persistentStore.read(STATE_KEY) || "";


        // Lần chạy đầu tiên
        if (!oldState) {

            $persistentStore.write(
                vpnConnected ? "ON" : "OFF",
                STATE_KEY
            );

            $done();
            return;
        }


        // Network vừa thay đổi?
        var lastNetworkChange =
            Number(
                $persistentStore.read(
                    "Loon_Last_Network_Change"
                ) || "0"
            );

        var recentlyChanged =
            (Date.now() - lastNetworkChange) < 10000;


        // ==========================================
        // VPN OFF -> ON
        // ==========================================

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


        // ==========================================
        // Lưu trạng thái mới
        // ==========================================

        $persistentStore.write(
            vpnConnected ? "ON" : "OFF",
            STATE_KEY
        );

        $done();
    });
});
