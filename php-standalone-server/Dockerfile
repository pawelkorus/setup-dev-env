FROM php:7.1-alpine
EXPOSE 8000

RUN apk add --no-cache su-exec

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

VOLUME [ "/wordpress" ]

ENTRYPOINT ["entrypoint.sh"]
CMD ["-S", "0.0.0.0:8000"]