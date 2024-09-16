#!/bin/bash

THRESHOLD=10

USED_DISK=$(df --output=used / | tail -n 1 | awk '{print $1 / 1024 / 1024}')

if (( $(echo "$USED_DISK > $THRESHOLD" | bc -l) )); then
    echo "Disk usage is above ${THRESHOLD}GB, running docker system prune -a"
    yes | docker system prune -a
fi

docker-compose build --no-cache && docker-compose up

sudo chmod +x ./target/x86_64-unknown-linux-gnu/release/notesnip-api-server

sudo systemctl daemon-reload
sudo systemctl enable notesnip-api-server
sudo systemctl start notesnip-api-server
