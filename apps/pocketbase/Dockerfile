# syntax=docker/dockerfile:1

FROM alpine:3.21

ARG PB_VERSION=0.29.0

RUN apk add --no-cache ca-certificates unzip curl \
  && curl -fsSL -o /tmp/pb.zip \
    "https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip" \
  && unzip /tmp/pb.zip -d /pb \
  && chmod +x /pb/pocketbase \
  && rm /tmp/pb.zip \
  && apk del unzip curl

WORKDIR /pb

EXPOSE 8090

# Persist /pb/pb_data via Fly volume (or Docker volume) in production.
CMD ["./pocketbase", "serve", "--http=0.0.0.0:8090"]
