#!/usr/bin/with-contenv bashio

echo "Hello world!, config: $(bashio::config 'apikey')"
export PATH="~/.bun/bin:$PATH"
bun /app/index.ts $(bashio::config 'deviceid') $(bashio::config 'devicekey') $(bashio::config 'apikey') '{ "switch": "off" }'
#curl "localhost:8035/action?host=192.168.178.68%3A8081&payload=%7B%22switch%22%3A%22off%22%7D"
#curl "localhost:8035/action?host=192.168.178.68%3A8081&payload=%7B%22switch%22%3A%22on%22%7D"