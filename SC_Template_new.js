#🆅🆄 🅳🅸🅽🅷 🆃🆁🅸
#Date: 2024.01.01
#Author: Loon

[General]
disable-stun = true
fast-switch = false
ipv6 = false
skip-proxy = 192.168.0.0/16,10.0.0.0/8,172.16.0.0/12,localhost,*.local,e.crashlynatics.com
bypass-tun = 10.0.0.0/8,100.64.0.0/10,127.0.0.0/8,169.254.0.0/16,172.16.0.0/12,192.0.0.0/24,192.0.2.0/24,192.88.99.0/24,192.168.0.0/16,198.51.100.0/24,203.0.113.0/24,224.0.0.0/4,255.255.255.255/32
dns-server = system,
allow-wifi-access = true
wifi-access-http-port = 1050
wifi-access-socks5-port = 6153
proxy-test-url = http://www.gstatic.com/generate_204
test-timeout = 3
interface-mode = auto
[Proxy]

[Remote Proxy]
🆅🅸🅴 🆉🅸🅽🅶 🅵🅰🆂🆃 = xxxx,udp=false,fast-open=false,vmess-aead=true,enabled=true

[Proxy Chain]

[Proxy Group]
🅸🅽🆃🅴🆁🅽🅴🆃 = ssid,default=DIRECT,cellular=🆅🅸🅴 🅵🅰🆂🆃,img-url = https://cdn1.iconfinder.com/data/icons/ionicons-fill-vol-2/512/power-1024.png
🆅🅸🅴 🅵🅰🆂🆃 = select,🄻🄾🄰🄳  🅱🅰🅻🅰🅽🅲🅴,🄰🅄🅃🄾 🅰🅻🅻,🄰🅄🅃🄾 🆂🅸🅽🅶,🄰🅄🅃🄾 🅹🅰🅿🅰🅽,🆅🅸🅴 🆉🅸🅽🅶 🅵🅰🆂🆃,img-url = https://cdn4.iconfinder.com/data/icons/top-search-7/128/_web_Internet_network_www_communication_global_worldwide-1024.png
🄻🄾🄰🄳  🅱🅰🅻🅰🅽🅲🅴 = load-balance,🆅🅸🅴 🆉🅸🅽🅶 🅵🅰🆂🆃,url = http://www.gstatic.com/generate_204,interval = 600,max-timeout = 3000,algorithm = random,img-url = https://cdn3.iconfinder.com/data/icons/basic-ui-82/64/10-1024.png
🄰🅄🅃🄾 🅰🅻🅻 = url-test,🆅🅸🅴 🆉🅸🅽🅶 🅵🅰🆂🆃,url = http://www.gstatic.com/generate_204,interval = 600,img-url = https://cdn4.iconfinder.com/data/icons/travel-and-hotel/512/all_incluseve_hotel-1024.png
🄰🅄🅃🄾 🆂🅸🅽🅶 = url-test,🆂🅸🅽🅶 🅰🅻🅻,url = http://www.gstatic.com/generate_204,interval = 600,img-url = https://cdn3.iconfinder.com/data/icons/international-circle-flags-outline/480/singapore-singaporean-asian-country-flag-1024.png
🄰🅄🅃🄾 🅹🅰🅿🅰🅽 = url-test,🅹🅰🅿🅰🅽,url = http://www.gstatic.com/generate_204,interval = 600,img-url = https://cdn3.iconfinder.com/data/icons/international-circle-flags-outline/480/japan-japanese-asian-country-flag-1024.png


[Remote Filter]

🆅🅵 🆅🅸🅴🆃 🅽🅰🅼 = NameRegex,🆅🅸🅴 🆉🅸🅽🅶 🅵🅰🆂🆃, FilterKey = "viefast"
🅹🅰🅿🅰🅽 = NameRegex,🆅🅸🅴 🆉🅸🅽🅶 🅵🅰🆂🆃, FilterKey = "🇯🇵"
🅷🅾🅽🅶🅺🅾🅽🅶 = NameRegex,🆅🅸🅴 🆉🅸🅽🅶 🅵🅰🆂🆃, FilterKey = "🇭🇰"
🆂🅸🅽🅶 🅰🅻🅻 = NameRegex,🆅🅸🅴 🆉🅸🅽🅶 🅵🅰🆂🆃, FilterKey = "🇸🇬"
🆅🅸🅴🆃 🅽🅰🅼 = NameRegex,🆅🅸🅴 🆉🅸🅽🅶 🅵🅰🆂🆃, FilterKey = "🇻🇳"


[Rule]
#Type:DOMAIN-SUFFIX,DOMAIN,DOMAIN-KEYWORD,USER-AGENT,URL-REGEX,IP-CIDR
#Strategy:DIRECT,PROXY,REJECT
#Options:no-resolve(only for IP-CIDR,IP-CIDR2,GEOIP,IP-ASN)

FINAL,🅸🅽🆃🅴🆁🅽🅴🆃

[Remote Rule]
https://raw.githubusercontent.com/DrStrangeVN/Stash/main/Rule_Allserver.js, policy=REJECT-IMG, tag=ADB, enabled=true


[Rewrite]

[Script]

[Plugin]
https://raw.githubusercontent.com/app2smile/rules/master/plugin/youtube.plugin, enabled=true
http://script.hub/file/_start_/https://github.com/lonely0811/olsd/raw/main/nice.sgmodule/_end_/nice.plugin?type=surge-module&target=loon-plugin&del=true, enabled=true
http://script.hub/file/_start_/https://gist.githubusercontent.com/Drstrangevn01/3ea3e8119e5025f7ea64e8ba5d22e73c/raw/4c3bf5bec23384511d674e2a1c0ffeba5cfce5ec/UnlockTruecaller.js/_end_/UnlockTruecaller.plugin?type=qx-rewrite&target=loon-plugin&del=true, enabled=true
https://raw.githubusercontent.com/Script-Hub-Org/Script-Hub/main/modules/script-hub.beta.loon.plugin, enabled=true
https://raw.githubusercontent.com/lonely0811/olsd/main/SpeedTM.plugin, enabled=true
https://gist.githubusercontent.com/Drstrangevn01/52efa4be871f3184ae0067e0d1d1d867/raw/9def0755d808408d2e28534b29b544c2380b2d41/Loon_ips_check.js, enabled=true
https://raw.githubusercontent.com/Keywos/rule/main/loon/Netisp.plugin, tag=Net IPS, enabled=true
https://raw.githubusercontent.com/sub-store-org/Sub-Store/master/config/Loon.plugin, tag=Substore, enabled=true
https://whatshub.top/plugin/aptv.plugin, enabled=true
https://whatshub.top/plugin/meituxx.plugin, enabled=false
https://whatshub.top/plugin/youtube.plugin, enabled=true
https://raw.githubusercontent.com/deezertidal/private/master/plugallery/documents.plugin, enabled=false
https://raw.githubusercontent.com/deezertidal/private/master/plugallery/hyperweb.plugin, enabled=false
https://raw.githubusercontent.com/deezertidal/private/master/plugallery/grow.plugin, enabled=false
https://raw.githubusercontent.com/Peng-YM/Loon-Gallery/master/loon-gallery.plugin, enabled=true
https://raw.githubusercontent.com/deezertidal/private/master/plugallery/boom.plugin, tag=BOOM, enabled=false
https://raw.githubusercontent.com/deezertidal/private/master/plugallery/adguard.plugin, tag=ADGUARD, enabled=false
[Mitm]
