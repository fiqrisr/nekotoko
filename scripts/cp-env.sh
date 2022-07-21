#!/bin/bash

cp ./apps/api-monolithic/.env.example ./apps/api-monolithic/.env
cp ./apps/admin/.env.example ./apps/admin/.env
cp ./apps/pos/.env.example ./apps/pos/.env
cp ./apps/api-microservices/auth-srv/.env.example ./apps/api-microservices/auth-srv/.env
cp ./apps/api-microservices/product-srv/.env.example ./apps/api-microservices/product-srv/.env
cp ./apps/api-microservices/order-srv/.env.example ./apps/api-microservices/order-srv/.env
cp ./libs/db-monolithic/.env.example ./libs/db-monolithic/.env
cp ./libs/db-auth/.env.example ./libs/db-auth/.env
cp ./libs/db-product/.env.example ./libs/db-product/.env
cp ./libs/db-order/.env.example ./libs/db-order/.env
