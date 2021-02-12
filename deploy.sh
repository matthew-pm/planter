#!/bin/sh

localDir=$1
remotePath=$2

cd $localDir
for file in ./*
do
    curl -k -n -T ${file} $remotePath/${file}
    if [ "$?" = "0" ]; then
        echo "✅ $file"
    else 
        echo "❌  Something went wrong :("
        echo "   Could not copy from '$localDir' to '$remotePath'"
        exit 1
    fi
done