function builder() {
	docker run \
	  --rm \
	  -it \
	  --privileged \
	  -v ./ewelink_switch:/data \
	  -v /var/run/docker.sock:/var/run/docker.sock:ro \
      ghcr.io/home-assistant/amd64-builder:latest --target /data $@
}
# usage local.sh --amd64
builder "$@" -v test -i ewelink_switch --docker-hub local --test

docker run --rm -v /tmp/my_test_data:/data local/ewelink_switch