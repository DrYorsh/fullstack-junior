#!/bin/sh

le :; do
    # Optional: Instead of sleep, detect config changes and only reload if necessary.
    sleep 12h
    nginx -t && nginx -s reload
done &