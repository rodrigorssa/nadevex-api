FROM postgres:latest

ENV POSTGRES_PASSWORD=senha5

COPY ./config.sql /docker-entrypoint-initdb.d/

ENTRYPOINT [ "/usr/local/bin/docker-entrypoint.sh","postgres" ]

EXPOSE 5432