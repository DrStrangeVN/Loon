// Loon Network IP Test
// Test lấy Public IP qua DIRECT

var config = {};

try {
    config = JSON.parse($config.getConfig());
} catch (e) {
    config = {};
}

var ssid = config.ssid || "";

var networkType;

if (!ssid || ssid.toLowerCase() === "cellular") {
    networkType = "4G / 5G";
} else {
    networkType = "Wi-Fi";
}

setTimeout(function () {

    $httpClient.get({
        url: "https://api.ipify.org",
        timeout: 10000,
        node: "DIRECT"
    }, function (error, response, data) {

        if (error) {

            $notification.post(
                "Loon",
                networkType,
                "HTTP ERROR\n" + String(error)
            );

            $done();
            return;
        }

        var status = response ? response.status : "UNKNOWN";
        var body = data ? String(data).trim() : "";

        if (!body) {

            $notification.post(
                "Loon",
                networkType,
                "HTTP " + status + "\nResponse rỗng"
            );

            $done();
            return;
        }

        $notification.post(
            "Loon",
            networkType,
            "HTTP " + status + "\nIP: " + body
        );

        $done();
    });

}, 3000);
