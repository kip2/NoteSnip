#!/bin/bash

git pull origin main
if [ $? -ne 0 ]; then
    echo "Error: Git pull failed"
    git checkout -- .
    exit 1
fi

rm -rf frontend
rm -rf testing_env
rm README.md

bash ./backend/build.sh