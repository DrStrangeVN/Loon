// Loon Network Status
// Wi-Fi / Cellular
// Chỉ chạy khi network thay đổi

var STATE_KEY = "Loon_Network_State";

function getNetwork() {

    var config = {};

    try {
        config = JSON.parse($config.getConfig() || "{}");
    } catch (e) {
        config = {};
    }

    var ssid = String(config.ssid || "");

    if (ssid && ssid.toLowerCase() !== "cellular") {
        return {
            type: "Wi-Fi"
        };
    }

    return {
        type: "4G / 5G"
    };
}


function getIP(callback) {

    $httpClient.get({
        url: "https://api64.ipify.org",
        timeout: 5000,
        node: "DIRECT"
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


function getTime() {

    var d = new Date();

    return d.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });
}


var network = getNetwork();


getIP(function (ip) {

    if (!ip) {
        $done();
        return;
    }

    // 保存最近一次网络变化时间
    $persistentStore.write(
        String(Date.now()),
        "Loon_Last_Network_Change"
    );

    // 保存 Network IP
    $persistentStore.write(
        ip,
        "Loon_Network_IP"
    );

    // Notification
    $notification.post(
        "Network Status Changed",
        network.type + ", " + ip,
        "Join network at " + getTime()
    );

    $done();
});
