#🆅🆄 🅳🅸🅽🅷 🆃🆁🅸
#Date: 01.01.2024
#Author: Tri + AE Viefast

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
DOMAIN,pixel.facebook.com,REJECT
#Type:DOMAIN-SUFFIX,DOMAIN,DOMAIN-KEYWORD,USER-AGENT,URL-REGEX,IP-CIDR
#Strategy:DIRECT,PROXY,REJECT
#Options:no-resolve(only for IP-CIDR,IP-CIDR2,GEOIP,IP-ASN)

FINAL,🅸🅽🆃🅴🆁🅽🅴🆃

[Remote Rule]
https://github.com/lonely0811/olsd/raw/main/surge/keyword.conf, policy=🆅🅸🅴 🅵🅰🆂🆃, tag=ADR, enabled=true
https://raw.githubusercontent.com/lonely0811/olsd/main/surge/AllSERVERADS.conf, policy=🆅🅸🅴 🅵🅰🆂🆃, tag=ADB, enabled=true


[Rewrite]

[Script]

[Plugin]

[Mitm]
skip-server-cert-verify = false
