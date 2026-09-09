// Loon Network Status
// Wi-Fi / 4G / 5G
// Chỉ chạy khi network-changed

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

function getIP(retry) {

    $httpClient.get({
        url: "https://api64.ipify.org",
        timeout: 5000,
        node: "DIRECT"
    }, function(error, response, data) {

        if (!error && data) {

            var ip = String(data).trim();

            if (ip) {

                var network = getNetworkType();

                // Đánh dấu thời điểm network thay đổi
                $persistentStore.write(
                    String(Date.now()),
                    NETWORK_CHANGE_KEY
                );

                // Reset VPN monitor
                $persistentStore.write(
                    "RESET",
                    "Loon_VPN_State"
                );

                $notification.post(
                    "Network Status Changed",
                    network + ", " + ip,
                    "Join network at " +
                    new Date().toLocaleTimeString(
                        "en-US",
                        {
                            hour12: false
                        }
                    )
                );

                $done();
                return;
            }
        }

        // Mạng vừa chuyển, chờ thêm rồi thử lại
        if (retry > 0) {

            setTimeout(function() {
                getIP(retry - 1);
            }, 1500);

            return;
        }

        $done();
    });
}

getIP(3);
