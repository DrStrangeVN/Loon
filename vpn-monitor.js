/**
 * Loon Script: Thông báo khi bật/đổi IP VPN
 * Tự động reset trạng thái khi ngắt kết nối
 */

const STORAGE_KEY = "loon_last_vpn_ip";
const currentIpKey = $persistentStore.read(STORAGE_KEY);

$httpClient.get({
    url: "http://ip-api.com/json/?lang=en",
    headers: { "User-Agent": "Loon" },
    timeout: 5
}, function (error, response, data) {
    if (error || !data) {
        // Mất kết nối hoặc đang ngắt VPN/chuyển mạng: Xóa IP cũ để sẵn sàng báo lần bật kế tiếp
        if (currentIpKey) {
            $persistentStore.write("", STORAGE_KEY);
        }
        $done({});
        return;
    }

    try {
        const info = JSON.parse(data);
        const queryIp = info.query;
        const country = info.country || "Unknown";
        const isp = info.isp || "Unknown";

        // Nếu IP hiện tại khác IP đã ghi nhớ (vừa bật VPN hoặc vừa đổi node)
        if (queryIp && queryIp !== currentIpKey) {
            $persistentStore.write(queryIp, STORAGE_KEY);
            
            $notification.post(
                "🟢 VPN Connected",
                `IP: ${queryIp} (${country})`,
                `ISP: ${isp}`
            );
        }
    } catch (e) {
        // Lỗi parse dữ liệu, bỏ qua
    }

    $done({});
});
