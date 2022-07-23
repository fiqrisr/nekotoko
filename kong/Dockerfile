FROM kong:latest as base

FROM base as development
CMD ["kong start"]

FROM base as production
COPY ./kong/kong.yml /usr/local/kong/declarative/kong.yml
CMD ["kong start"]
