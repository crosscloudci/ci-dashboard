#!/bin/bash

cd /dashboard
./bin/create_env_js

HOST=0.0.0.0 PORT=8080 npm run dev
