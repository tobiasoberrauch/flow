#!/usr/bin/env bash

case $1 in

    run)
        docker run --name redis-aof -p 6390:6379 -d redis redis-server --appendonly yes
        node index.js 6390

#        docker run --name redis-rdb -p 6380:6379 -d redis redis-server --port 6380
#        node index.js 6380
    ;;

    inspect)
        docker inspect redis-aof
        ;;

    logs)
        docker logs --follow=true --tail=25 redis-aof
        ;;

    ping)
        curl --verbose localhost:6390/operations/health
    ;;

    ssh)
        ssh root@localhost -p 6390
    ;;

    ps)
        docker ps -a
    ;;

    stop)
        docker stop redis-aof
#        docker stop redis-rdb
    ;;

    rm)
        docker rm redis-aof
#        docker rm redis-rdb
    ;;

    kill)
        ./redis.sh stop
        ./redis.sh rm
    ;;

    *)
        echo 'run, ps, rm'
    ;;
   esac