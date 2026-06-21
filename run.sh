#!/bin/bash
set -e

echo "starting local database and cache(Docker)"

docker run -d --name local-mongodb -p 27017:27017 mongo:latest 2>/dev/null || docker start local-mongodb
docker run -d --name local-redis -p 6379:6379 redis:latest 2>/dev/null || docker start local-redis

echo "install local dependencies"
npm install

echo "launch server"
npm run dev

