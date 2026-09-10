// Loon VPN Connected Monitor
// Loon 3.5.0+
// Phát hiện OFF -> ON và báo Public IP một lần

var STATE_KEY = "Loon_VPN_Connect_State";
var IP_KEY = "Loon_VPN_Last_IP";

function getConfig() {
    try {
        return JSON.parse($config.getConfig() || "{}");
    } catch (e) {
        return {};
    }
}

function getNetwork(config) {
    var ssid = String(config.ssid || "");

    if (ssid && ssid.toLowerCase() !== "cellular") {
        return "Wi-Fi";
    }

    return "4G / 5G";
}

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
// MAIN
// ==========================================

var config = getConfig();

var runningModel = Number(config.running_model || 0);

// 0 = Direct
// 1 = Rule
// 2 = Global Proxy
var vpnOn = (runningModel === 1 || runningModel === 2);

var oldState =
    $persistentStore.read(STATE_KEY) || "OFF";


// ==========================================
// VPN OFF
// ==========================================

if (!vpnOn) {

    if (oldState !== "OFF") {
        $persistentStore.write("OFF", STATE_KEY);
    }

    $done();
    return;
}


// ==========================================
// VPN ON
// ==========================================

// Nếu đã ON từ trước thì không báo lại
if (oldState === "ON") {
    $done();
    return;
}


// ==========================================
// VPN vừa chuyển OFF -> ON
// Lấy IP thực tế qua Loon
// ==========================================

getIP(null, function (loonIP) {

    if (!loonIP) {

        // Không đổi state để lần cron kế tiếp thử lại
        $done();
        return;
    }

    var network = getNetwork(config);

    var oldIP =
        $persistentStore.read(IP_KEY) || "";

    var policy = "";

    try {
        policy =
            $config.getSelectedPolicy("🅵🅸🅽🅰🅻 🆅🅿🅽") || "";
    } catch (e) {
        policy = "";
    }


    // ======================================
    // Notification
    // ======================================

    var subtitle =
        policy ? policy : "VPN";

    var content =
        "Network: " + network +
        "\nIP: " + loonIP;

    $notification.post(
        "🟢 Loon VPN Connected",
        subtitle,
        content
    );


    // ======================================
    // Save state
    // ======================================

    $persistentStore.write(
        "ON",
        STATE_KEY
    );

    $persistentStore.write(
        loonIP,
        IP_KEY
    );

    $done();
});
