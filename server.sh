#!/bin/bash

echo "Set .env"
set -o allexport
source .env
set +o allexport

echo "nuxi start"
node .output/server/index.mjs
