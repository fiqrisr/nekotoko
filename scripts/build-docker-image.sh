#!/bin/bash

docker build --target production -f apps/api-microservices/auth-srv/Dockerfile -t nekotoko/auth-srv-prod .
docker build --target production -f apps/api-microservices/product-srv/Dockerfile -t nekotoko/product-srv-prod .
docker build --target production -f apps/api-microservices/order-srv/Dockerfile -t nekotoko/order-srv-prod .
