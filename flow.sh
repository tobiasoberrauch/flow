#!/usr/bin/env bash

docker build -t flow/config:0.1 .
docker run -i -t --rm -p 3000:3000 -v `pwd`:/src \ flow/config:0.1