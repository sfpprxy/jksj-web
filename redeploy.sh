#!/usr/bin/env bash

echo '> stash'
#git stash

echo '> pull'
#git pull

npm run build:prod
#ssh -p 4422 root@sh.asdk.io << EOF
#    ls
#EOF
scp -P4422 -r dist/ root@sh.asdk.io:/root/jksj-web/
