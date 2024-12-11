ARG BUILD_FROM
FROM $BUILD_FROM
#RUN \
#  apk add --no-cache \
#  libstdc++6 gcc

RUN curl -fsSL https://bun.sh/install | bash

#RUN echo 'export BUN_INSTALL="$HOME/.bun"' >> ~/.bashrc
#RUN echo 'export PATH="$BUN_INSTALL/bin:$PATH"' >> ~/.bashrc
#RUN ~/.bun/bin/bun install

WORKDIR /data

# Copy data for add-on
COPY run.sh /
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]
