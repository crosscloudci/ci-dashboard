#!/bin/bash

cd /dashboard
./bin/create_env_js -f

HOST=$NODE_HOST PORT=$NODE_PORT npm run dev
