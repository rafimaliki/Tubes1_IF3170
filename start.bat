@echo off

start cmd /k "cd /d %~dp0 && cd src/fe && npm run dev"

start cmd /k "cd /d %~dp0 && cd src/be && go run main.go"