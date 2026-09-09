// Loon - Network IP Notification
// Thông báo Public IP khi Wi-Fi / 4G / 5G thay đổi

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

// Chờ mạng ổn định sau khi chuyển mạng
setTimeout(function () {

    $httpClient.get({
        url: "https://api64.ipify.org",
        timeout: 10000
    }, function (error, response, data) {

        // Request lỗi
        if (error) {
            $notification.post(
                "Loon",
                networkType,
                "Lỗi kết nối IP: " + error
            );

            $done();
            return;
        }

        // Kiểm tra response
        if (!data) {
            $notification.post(
                "Loon",
                networkType,
                "API không trả về dữ liệu"
            );

            $done();
            return;
        }

        // Lấy IP dạng text
        var ip = String(data).trim();

        // Kiểm tra IP có hợp lệ tương đối
        if (
            ip.length < 7 ||
            ip.indexOf("<") !== -1 ||
            ip.indexOf("{") !== -1
        ) {
            $notification.post(
                "Loon",
                networkType,
                "Dữ liệu IP không hợp lệ: " + ip.substring(0, 100)
            );

            $done();
            return;
        }

        // Thành công
        $notification.post(
            "Loon",
            networkType,
            "Public IP: " + ip
        );

        $done();
    });

}, 3000);
