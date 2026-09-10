/**
 * Script: vpn-monitor.js
 * Trigger: cron "*/5 * * * * *"
 * Cơ chế: Chỉ báo 1 lần duy nhất khi VPN vừa bật, tự reset khi ngắt VPN.
 */

const STATE_KEY = "vpn_online_status";
const wasConnected = $persistentStore.read(STATE_KEY) === "true";

// Request test kết nối qua mạng
$httpClient.get({
    url: "https://speed.cloudflare.com/meta",
    headers: {
        "User-Agent": "Mozilla/5.0 Loon",
        "Cache-Control": "no-cache"
    },
    timeout: 3
}, function (error, response, data) {
    if (error || !data || response.status !== 200) {
        // Mất kết nối hoặc VPN đã tắt -> Reset trạng thái để sẵn sàng cho lần bật tới
        if (wasConnected) {
            $persistentStore.write("false", STATE_KEY);
        }
        $done({});
        return;
    }

    try {
        const info = JSON.parse(data);
        const ip = info.clientIp;
        const country = info.country || "";
        const isp = info.asOrganization || "";

        // Nếu trước đó chưa kết nối (vừa mới bật VPN lên)
        if (!wasConnected) {
            // Đánh dấu đã kết nối để các lần quét sau (mỗi 5s) không báo lại nữa
            $persistentStore.write("true", STATE_KEY);

            $notification.post(
                "🟢 VPN Connected",
                `IP: ${ip} (${country})`,
                `ISP: ${isp}`
            );
        }
    } catch (e) {
        // Parse JSON lỗi thì bỏ qua
    }

    $done({});
});
