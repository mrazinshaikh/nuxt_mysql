#!/bin/bash

echo "Set .env"
set -o allexport
source .env
set +o allexport

echo "push db"

npx prisma db push 

echo "nuxi start"
node .output/server/index.mjs
