// Loon Network Status - FAST
// Wi-Fi / 4G / 5G

var NETWORK_CHANGE_KEY = "Loon_Last_Network_Change";

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

function getIP(callback) {
    $httpClient.get({
        url: "https://api64.ipify.org",
        timeout: 3000,
        node: "DIRECT"
    }, function(error, response, data) {

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

function notify(ip) {

    var network = getNetworkType();

    $persistentStore.write(
        String(Date.now()),
        NETWORK_CHANGE_KEY
    );

    $persistentStore.write(
        ip,
        "Loon_Network_IP"
    );

    var now = new Date();

    var time =
        now.getHours().toString().padStart(2, "0") + ":" +
        now.getMinutes().toString().padStart(2, "0") + ":" +
        now.getSeconds().toString().padStart(2, "0");

    $notification.post(
        "Network Status Changed",
        network + ", " + ip,
        "Join network at " + time
    );

    $done();
}


// Gọi ngay lập tức
getIP(function(ip) {

    if (ip) {
        notify(ip);
        return;
    }

    // Nếu mạng vừa chuyển chưa ổn định,
    // thử thêm đúng 1 lần sau 500ms
    setTimeout(function() {

        getIP(function(ip2) {

            if (ip2) {
                notify(ip2);
            } else {
                $done();
            }

        });

    }, 500);
});
