// Loon Network Status + VPN Monitor
// Wi-Fi / Cellular / VPN
// Notification giống phong cách Quantumult X

var STATE_KEY = "LoonNetworkStatus_v2";


// ========================================
// NETWORK INFO
// ========================================

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
            label: "Wi-Fi"
        };

    }

    return {
        type: "Cellular",
        label: "4G / 5G"
    };
}


// ========================================
// LOON RUNNING MODE
// ========================================

function getLoonMode() {

    var config = {};

    try {
        config = JSON.parse($config.getConfig() || "{}");
    } catch (e) {
        config = {};
    }

    var mode = Number(config.running_model);

    return mode;
}


// ========================================
// GET IP
// ========================================

function getIP(node, callback) {

    $httpClient.get({
        url: "https://api64.ipify.org",
        timeout: 5000,
        node: node
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


// ========================================
// TIME
// ========================================

function getTime() {

    var d = new Date();

    return d.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });
}


// ========================================
// NOTIFICATION
// ========================================

function notifyNetwork(network, networkIP) {

    var title = "Network Status Changed";

    var subtitle =
        network.type + ", " + (networkIP || "Unknown");

    var content =
        "Join network at " + getTime();

    $notification.post(
        title,
        subtitle,
        content
    );
}


function notifyVPN(network, networkIP, loonIP, connected) {

    var title;

    if (connected) {
        title = "Loon VPN Connected";
    } else {
        title = "Loon VPN Disconnected";
    }

    var content =
        "Network: " + (networkIP || "Unknown") +
        "\nLoon: " + (loonIP || "Unknown");

    $notification.post(
        title,
        network.label,
        content
    );
}


// ========================================
// MAIN CHECK
// ========================================

function check() {

    var network = getNetworkInfo();
    var mode = getLoonMode();

    var oldStateText =
        $persistentStore.read(STATE_KEY) || "";

    var oldState = {};

    try {
        oldState = oldStateText
            ? JSON.parse(oldStateText)
            : {};
    } catch (e) {
        oldState = {};
    }


    var networkChanged =
        oldState.networkType &&
        oldState.networkType !== network.type;

    var vpnChanged =
        typeof oldState.vpnOn !== "undefined" &&
        oldState.vpnOn !== (mode !== 0);


    var vpnOn = mode !== 0;


    // ====================================
    // KHÔNG CÓ THAY ĐỔI
    // ====================================

    if (
        oldStateText &&
        !networkChanged &&
        !vpnChanged
    ) {

        $done();
        return;
    }


    // ====================================
    // LẤY NETWORK IP
    // ====================================

    getIP("DIRECT", function (networkIP) {


        // ==================================
        // NETWORK CHANGE
        // ==================================

        if (networkChanged) {

            notifyNetwork(
                network,
                networkIP
            );

        }


        // ==================================
        // VPN CHANGE
        // ==================================

        if (vpnChanged) {

            getIP(null, function (loonIP) {

                notifyVPN(
                    network,
                    networkIP,
                    loonIP,
                    vpnOn
                );

                saveState(
                    network,
                    vpnOn,
                    networkIP
                );

            });

            return;
        }


        // ==================================
        // FIRST RUN
        // ==================================

        if (!oldStateText) {

            saveState(
                network,
                vpnOn,
                networkIP
            );

            $done();
            return;
        }


        // ==================================
        // NETWORK ONLY
        // ==================================

        saveState(
            network,
            vpnOn,
            networkIP
        );

        $done();

    });
}


// ========================================
// SAVE STATE
// ========================================

function saveState(network, vpnOn, networkIP) {

    var state = {

        networkType: network.type,

        vpnOn: vpnOn,

        networkIP: networkIP || "",

        updated: Date.now()

    };

    $persistentStore.write(
        JSON.stringify(state),
        STATE_KEY
    );

    $done();
}


// ========================================
// RUN
// ========================================

check();
