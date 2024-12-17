ARG BUILD_FROM
FROM $BUILD_FROM
#RUN \
#  apk add --no-cache \
#  libstdc++6 gcc

#RUN curl -fsSL https://bun.sh/install | bash

#RUN echo 'export BUN_INSTALL="$HOME/.bun"' >> ~/.bashrc
#RUN echo 'export PATH="$BUN_INSTALL/bin:$PATH"' >> ~/.bashrc
#RUN ~/.bun/bin/bun install

WORKDIR /data
ARG BUILD_ARCH
# Copy data for add-on
COPY src/$BUILD_ARCH-ewelink_switch /
RUN mv /$BUILD_ARCH-ewelink_switch /usr/bin/ewelink_switch && chmod a+x /usr/bin/ewelink_switch
#RUN export BUN_INSTALL="$HOME/.bun" && \
#    export PATH="$BUN_INSTALL/bin:$PATH" && \
#    bash -c "cd /app && bun install && bun build --compile --minify --bytecode ./index.ts --outfile /ewelink_switch" && \
#    rm -r /app && \
#    chmod a+x /ewelink_switch
COPY run.sh /
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]
