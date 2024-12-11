#!/usr/bin/with-contenv bashio

echo "Hello world!, config: $(bashio::config 'apikey')"
export PATH="~/.bun/bin:$PATH"
bun /app/index.ts $(bashio::config 'deviceid') $(bashio::config 'devicekey') $(bashio::config 'apikey') '{ "switch": "off" }'
bun /app/index.ts $(bashio::config 'deviceid') $(bashio::config 'devicekey') $(bashio::config 'apikey') '{ "switch": "on" }'