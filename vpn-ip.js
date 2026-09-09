// Loon VPN Manual Test

function getIP(node, callback) {
    var opt = {
        url: "https://api64.ipify.org",
        timeout: 8000
    };

    if (node) {
        opt.node = node;
    }

    $httpClient.get(opt, function(error, response, data) {
        if (error) {
            callback("ERROR: " + error);
            return;
        }

        callback(String(data || "").trim());
    });
}

var config = {};

try {
    config = JSON.parse($config.getConfig() || "{}");
} catch (e) {}

var env = {};

try {
    env = $environment || {};
} catch (e) {}

var params = env.params || {};

getIP("DIRECT", function(directIP) {

    getIP(null, function(currentIP) {

        var message =
            "DIRECT IP: " + directIP +
            "\nCURRENT IP: " + currentIP +
            "\nModel: " + String(config.running_model) +
            "\nSSID: " + String(config.ssid || "") +
            "\nFinal: " + String(config.final || "") +
            "\nNode: " + String(params.node || "") +
            "\nPolicy: " + String(params.policyGroup || "");

        console.log(message);

        $notification.post(
            "Loon VPN Test",
            "Model: " + String(config.running_model),
            message
        );

        $done();
    });
});
