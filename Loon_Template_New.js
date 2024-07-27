#🆅🆄 🅳🅸🅽🅷 🆃🆁🅸


#Date: 2022.06.01


#Author: Loon





[General]


resource-parser = https: //github.com/sub-store-org/Sub-Store/releases/download/2.14.266/sub-store-parser.loon.min.js

disconnect-on-policy-change = true

disable-stun = true

fast-switch = true


ipv6 = true

skip-proxy = 192.168.0.0/16, 10.0.0.0/8, 172.16.0.0/12, localhost, *.local, e.crashlynatics.com

bypass-tun = 10.0.0.0/8, 100.64.0.0/10, 127.0.0.0/8, 169.254.0.0/16, 172.16.0.0/12, 192.0.0.0/24, 192.0.2.0/24, 192.88.99.0/24, 192.168.0.0/16, 198.51.100.0/24, 203.0.113.0/24, 224.0.0.0/4, 255.255.255.255/32

dns-server = system, 8.8.8.8, 8.8.4.4

allow-wifi-access = true

wifi-access-http-port = 1050

wifi-access-socks5-port = 6153

proxy-test-url = http: //www.gstatic.com/generate_204

internet-test-url = http: //wifi.vivo.com.cn/generate_204

test-timeout = 3

interface-mode = auto

[Proxy]



[Remote Proxy]


𝗦𝗨𝗕 𝗟𝗜𝗡𝗞 = xxxx, udp = false, fast-open = false, vmess-aead = true, skip-cert-verify = default, enabled = true






    [Proxy Chain]





    [Proxy Group]


    🅸🅽🆃🅴🆁🅽🅴🆃 = ssid, default = DIRECT, cellular = 🅵🅸🅽🅰🅻 🆅🅿🅽, url = http: //cp.cloudflare.com/generate_204,img-url = https://cdn-icons-png.freepik.com/512/7733/7733444.png

    🅵🅸🅽🅰🅻 🆅🅿🅽 = select, 🅑🅐🅛🅐🅝🅒🅔, 🅐🅤🅣🅞/🅢🅜🅐🅡🅣, 🅢🅘🅝🅖🅐🅟🅞🅡🅔, 🅗🅞🅝🅖 🅚🅞🅝🅖, 𝗦𝗨𝗕 𝗟𝗜𝗡𝗞, url = http: //cp.cloudflare.com/generate_204,img-url = https://cdn-icons-png.freepik.com/512/10490/10490264.png

    🅑🅐🅛🅐🅝🅒🅔 = load-balance, 𝗩𝗜𝗘𝗧 𝗡𝗔𝗠, url = http: //www.gstatic.com/generate_204,interval = 300,max-timeout = 3000,algorithm = pcc,img-url = https://cdn-icons-png.freepik.com/512/6966/6966918.png

    🅐🅤🅣🅞/🅢🅜🅐🅡🅣 = url-test, 𝗩𝗜𝗘𝗧 𝗡𝗔𝗠, url = http: //www.gstatic.com/generate_204,interval = 300,tolerance = 50,img-url = https://cdn-icons-png.freepik.com/512/9154/9154287.png

    🅢🅘🅝🅖🅐🅟🅞🅡🅔 = url-test, 𝗦𝗜𝗡𝗚𝗔𝗣𝗢𝗣𝗥𝗘, url = http: //www.gstatic.com/generate_204,interval = 300,tolerance = 50,img-url = https://cdn-icons-png.freepik.com/512/10948/10948393.png

    🅗🅞🅝🅖 🅚🅞🅝🅖 = url-test, 𝗛𝗢𝗡𝗚 𝗞𝗢𝗡𝗚, url = http: //www.gstatic.com/generate_204,interval = 300,tolerance = 50,img-url = https://cdn-icons-png.freepik.com/512/10948/10948387.png

    [Remote Filter]

    𝗝𝗔𝗣𝗔𝗡 = NameRegex, 𝗦𝗨𝗕 𝗟𝗜𝗡𝗞, FilterKey = "🇯🇵"

    𝗛𝗢𝗡𝗚 𝗞𝗢𝗡𝗚 = NameRegex, 𝗦𝗨𝗕 𝗟𝗜𝗡𝗞, FilterKey = "🇭🇰"

    𝗦𝗜𝗡𝗚𝗔𝗣𝗢𝗣𝗥𝗘 = NameRegex, FilterKey = "🇸🇬"

    𝗩𝗜𝗘𝗧 𝗡𝗔𝗠 = NameRegex, 𝗦𝗨𝗕 𝗟𝗜𝗡𝗞, FilterKey = "🇻🇳"





    [Rule]


    #Type: DOMAIN-SUFFIX, DOMAIN, DOMAIN-KEYWORD, USER-AGENT, URL-REGEX, IP-CIDR


    #Strategy: DIRECT, PROXY, REJECT


    #Options: no-resolve(only for IP-CIDR, IP-CIDR2, GEOIP, IP-ASN)





    FINAL, 🅸🅽🆃🅴🆁🅽🅴🆃




    [Remote Rule]


    https: //raw.githubusercontent.com/DrStrangeVN/Stash/main/Rule_Allserver.js, policy=REJECT-IMG, tag=🅸🅽🆃🅴🆁🅽🅴🆃, enabled=true

    # RULE-SET, https: //raw.githubusercontent.com/bigdargon/hostsVN/master/option/hostsVN-surge-OTA.conf,REJECT-IMG,update-interval=21600


    # RULE-SET, https: //raw.githubusercontent.com/bigdargon/hostsVN/master/option/hostsVN-surge-FB.conf,REJECT-IMG,update-interval=21600


    # RULE-SET, https: //raw.githubusercontent.com/bigdargon/hostsVN/master/extensions/adult/surge-rule.conf,REJECT-IMG,update-interval=21600





    [Rewrite]





    [Script]





    [Plugin]


    https: //github.com/lonely0811/olsd/raw/main/YoutubeL.plugin, tag=YTube, enabled=true

    https: //raw.githubusercontent.com/xream/scripts/main/surge/modules/network-info/net-lsp-x.plugin, enabled=true

    https: //raw.githubusercontent.com/app2smile/rules/master/plugin/youtube.plugin, enabled=true

    http: //script.hub/file/_start_/https://gist.githubusercontent.com/Drstrangevn01/3ea3e8119e5025f7ea64e8ba5d22e73c/raw/4c3bf5bec23384511d674e2a1c0ffeba5cfce5ec/UnlockTruecaller.js/_end_/UnlockTruecaller.plugin?type=qx-rewrite&target=loon-plugin&del=true, enabled=true

    https: //raw.githubusercontent.com/Script-Hub-Org/Script-Hub/main/modules/script-hub.beta.loon.plugin, enabled=true

    https: //gist.githubusercontent.com/Drstrangevn01/52efa4be871f3184ae0067e0d1d1d867/raw/9def0755d808408d2e28534b29b544c2380b2d41/Loon_ips_check.js, enabled=true

    https: //raw.githubusercontent.com/sub-store-org/Sub-Store/master/config/Loon.plugin, tag=Substore, enabled=true

    https: //whatshub.top/plugin/aptv.plugin, enabled=false

    https: //whatshub.top/plugin/youtube.plugin, enabled=false

    https: //raw.githubusercontent.com/deezertidal/private/master/plugallery/documents.plugin, enabled=false

    https: //raw.githubusercontent.com/Peng-YM/Loon-Gallery/master/loon-gallery.plugin, enabled=true

    https: //raw.githubusercontent.com/deezertidal/private/master/plugallery/adguard.plugin, tag=ADGUARD, enabled=false

    [Mitm]

    skip-server-cert-verify = false