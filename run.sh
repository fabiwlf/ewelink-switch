#!/usr/bin/with-contenv bashio

echo "Hello world!, config: $(bashio::config 'apikey')"
