#!/usr/bin/env bash

function getPort {
    PORT=6700
    INCREMENT=1

    isFree=$(netstat -tapln | grep $PORT)

    while [[ -n "$isFree" ]]; do
      PORT=$[PORT+INCREMENT]
      isFree=$(netstat -tapln | grep $PORT)
    done

    echo $PORT
}

getPort