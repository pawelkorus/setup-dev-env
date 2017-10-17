FROM php:7.1-alpine

RUN apk add --no-cache curl su-exec

RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
RUN chmod +x wp-cli.phar
RUN mv wp-cli.phar /usr/local/bin/wp
RUN wp --info

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

VOLUME ["/wordpress"]

ENTRYPOINT [ "entrypoint.sh" ]
CMD ["--info"]