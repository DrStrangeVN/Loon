// Loon Network IP Monitor
// Wi-Fi / 4G / 5G + VPN IP notification

var STORE_KEY = "LoonNetworkIPState";


// ==============================
// Lấy loại mạng
// ==============================

function getNetworkInfo() {

    var config = {};

    try {
        config = JSON.parse($config.getConfig() || "{}");
    } catch (e) {
        config = {};
    }

    var ssid = config.ssid || "";

    if (ssid && ssid.toLowerCase() !== "cellular") {
        return {
            type: "Wi-Fi",
            name: ssid
        };
    }

    return {
        type: "4G / 5G",
        name: "Cellular"
    };
}


// ==============================
// Lấy IP
// ==============================

function getIP(node, callback) {

    $httpClient.get({
        url: "https://api64.ipify.org",
        timeout: 5000,
        node: node
    }, function (error, response, data) {

        if (error) {
            callback(null);
            return;
        }

        if (!data) {
            callback(null);
            return;
        }

        var ip = String(data).trim();

        if (
            !ip ||
            ip.indexOf("<") !== -1 ||
            ip.indexOf("{") !== -1
        ) {
            callback(null);
            return;
        }

        callback(ip);
    });
}


// ==============================
// Gửi notification
// ==============================

function sendNotification(network, networkIP, loonIP) {

    var content = "";

    if (networkIP) {
        content += "🌐 Network: " + networkIP;
    } else {
        content += "🌐 Network: —";
    }

    if (loonIP) {
        content += "\n🛡️ Loon: " + loonIP;
    } else {
        content += "\n🛡️ Loon: —";
    }

    $notification.post(
        "Loon",
        network.type,
        content
    );
}


// ==============================
// Kiểm tra trạng thái
// ==============================

function checkNetwork(forceNotify) {

    var network = getNetworkInfo();

    var networkIP = null;
    var loonIP = null;

    var finished = 0;

    function finish() {

        finished++;

        if (finished < 2) {
            return;
        }

        var state = {
            type: network.type,
            name: network.name,
            networkIP: networkIP || "",
            loonIP: loonIP || ""
        };

        var stateString = JSON.stringify(state);

        var oldState = $persistentStore.read(STORE_KEY) || "";

        // Chỉ thông báo khi trạng thái thực sự thay đổi
        if (forceNotify || stateString !== oldState) {

            $persistentStore.write(
                stateString,
                STORE_KEY
            );

            sendNotification(
                network,
                networkIP,
                loonIP
            );
        }

        $done();
    }


    // IP mạng gốc
    getIP("DIRECT", function (ip) {

        networkIP = ip;

        finish();

    });


    // IP sau Loon
    getIP(null, function (ip) {

        loonIP = ip;

        finish();

    });
}


// ==============================
// Chạy
// ==============================

checkNetwork(true);
