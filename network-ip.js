// Loon - Network IP Notification
// Thông báo IP public khi Wi-Fi / 4G thay đổi

var config = {};

try {
    config = JSON.parse($config.getConfig());
} catch (e) {
    config = {};
}

// Xác định loại mạng
var ssid = config.ssid || "";

var networkType;

if (!ssid || ssid.toLowerCase() === "cellular") {
    networkType = "4G / 5G";
} else {
    networkType = "Wi-Fi";
}

// Chờ mạng ổn định một chút trước khi kiểm tra IP
setTimeout(function () {

    $httpClient.get({
        url: "https://api.ipify.org?format=json",
        timeout: 8000
    }, function (error, response, data) {

        if (error) {
            $notification.post(
                "Loon",
                networkType,
                "Không lấy được Public IP\n" + error
            );

            $done();
            return;
        }

        try {
            var result = JSON.parse(data);
            var ip = result.ip || "Unknown";

            $notification.post(
                "Loon",
                networkType,
                "Public IP: " + ip
            );

        } catch (e) {

            $notification.post(
                "Loon",
                networkType,
                "Không đọc được dữ liệu IP"
            );
        }

        $done();
    });

}, 2500);
