// Loon Network Status + VPN IP Monitor
// Wi-Fi / Cellular / VPN
// No notification spam

var STATE_KEY = "Loon_Network_IP_Monitor_v3";


// ==========================================
// NETWORK
// ==========================================

function getNetwork() {

    var config = {};

    try {
        config = JSON.parse($config.getConfig() || "{}");
    } catch (e) {
        config = {};
    }

    var ssid = String(config.ssid || "");

    if (ssid && ssid.toLowerCase() !== "cellular") {
        return {
            type: "Wi-Fi",
            name: ssid
        };
    }

    return {
        type: "Cellular",
        name: "4G / 5G"
    };
}


// ==========================================
// GET PUBLIC IP
// ==========================================

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


// ==========================================
// TIME
// ==========================================

function getTime() {

    var d = new Date();

    return d.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });
}


// ==========================================
// SAVE
// ==========================================

function saveState(network, networkIP, loonIP) {

    var state = {
        network: network.type,
        networkIP: networkIP || "",
        loonIP: loonIP || ""
    };

    $persistentStore.write(
        JSON.stringify(state),
        STATE_KEY
    );
}


// ==========================================
// LOAD
// ==========================================

function loadState() {

    var raw = $persistentStore.read(STATE_KEY);

    if (!raw) {
        return null;
    }

    try {
        return JSON.parse(raw);
    } catch (e) {
        return null;
    }
}


// ==========================================
// NETWORK NOTIFICATION
// ==========================================

function notifyNetwork(network, networkIP) {

    $notification.post(
        "Network Status Changed",
        network.type + ", " + (networkIP || "Unknown"),
        "Join network at " + getTime()
    );
}


// ==========================================
// VPN NOTIFICATION
// ==========================================

function notifyVPN(network, networkIP, loonIP) {

    $notification.post(
        "Loon VPN Connected",
        network.type,
        "Network: " + (networkIP || "Unknown") +
        "\nLoon: " + (loonIP || "Unknown")
    );
}


// ==========================================
// MAIN
// ==========================================

function main() {

    var network = getNetwork();

    var oldState = loadState();

    // --------------------------------------
    // Get DIRECT IP
    // --------------------------------------

    getIP("DIRECT", function(networkIP) {

        // ----------------------------------
        // Get Loon routed IP
        // ----------------------------------

        getIP(null, function(loonIP) {

            var oldNetwork = oldState
                ? oldState.network
                : "";

            var oldNetworkIP = oldState
                ? oldState.networkIP
                : "";

            var oldLoonIP = oldState
                ? oldState.loonIP
                : "";


            // ==================================
            // FIRST RUN
            // ==================================

            if (!oldState) {

                saveState(
                    network,
                    networkIP,
                    loonIP
                );

                $done();
                return;
            }


            // ==================================
            // NETWORK CHANGED
            // ==================================

            if (
                network.type !== oldNetwork ||
                networkIP !== oldNetworkIP
            ) {

                notifyNetwork(
                    network,
                    networkIP
                );
            }


            // ==================================
            // VPN / PROXY IP CHANGED
            // ==================================

            if (
                loonIP &&
                oldLoonIP &&
                loonIP !== oldLoonIP &&
                networkIP === oldNetworkIP
            ) {

                notifyVPN(
                    network,
                    networkIP,
                    loonIP
                );
            }


            // ==================================
            // SAVE NEW STATE
            // ==================================

            saveState(
                network,
                networkIP,
                loonIP
            );

            $done();

        });

    });
}


// ==========================================
// START
// ==========================================

main();
