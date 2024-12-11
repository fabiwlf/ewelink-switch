ARG BUILD_FROM
FROM $BUILD_FROM

RUN curl -fsSL https://bun.sh/install | bash

# Copy data for add-on
COPY run.sh /
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]
