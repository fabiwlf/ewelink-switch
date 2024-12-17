#!/usr/bin/with-contenv bashio
set -e

echo "Hello world!, config: $(bashio::config 'apikey')"
#export PATH="~/.bun/bin:$PATH"
#cd /app
#bun install
#bun ./index.ts $(bashio::config 'deviceid') $(bashio::config 'devicekey') $(bashio::config 'apikey') '{ "switch": "off" }' < /dev/null &
ewelink_switch $(bashio::config 'deviceid') $(bashio::config 'devicekey') $(bashio::config 'apikey') '{ "switch": "off" }' < /dev/null &
#https://github.com/home-assistant/addons/blob/5dc039373ac85eced80fd33282300e561e853186/tellstick/data/run.sh
while read -r input; do
    bashio::log.info "Read <${input}>"
    temp="${input%\"}"
    temp="${temp#\"}"
    bash -c "${temp}" || true
done

#curl "localhost:8035/action?host=192.168.178.68%3A8081&payload=%7B%22switch%22%3A%22off%22%7D"
#curl "localhost:8035/action?host=192.168.178.68%3A8081&payload=%7B%22switch%22%3A%22on%22%7D"