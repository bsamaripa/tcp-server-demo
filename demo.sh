#!/bin/sh

echo "========================="
echo "verify 404 on empty uri"
curl -i '127.0.0.1:8080/state/1'
echo "========================="

echo "verify 200 on post"
curl -i -X POST '127.0.0.1:8080/state/1' \
--header 'X-Example-Header: Hello' \
--header 'Content-Type: application/json' \
--data-raw '{"State":"CO", "Country": "US"}'
echo "========================="

echo "verify 200 on get"
curl -i '127.0.0.1:8080/state/1'
echo
echo "========================="

echo "verify updating works"
curl -i -X POST '127.0.0.1:8080/state/1' \
--header 'X-Example-Header: Hello' \
--header 'Content-Type: application/json' \
--data-raw '{"State":"CA", "Country": "US"}'
echo "========================="

echo "verify updating data"
curl -i '127.0.0.1:8080/state/1'
echo
echo "========================="

echo "verify 200 on delete"
curl -i -X DELETE '127.0.0.1:8080/state/1'
echo "========================="

echo "verify 404 on delete"
curl -i -X DELETE '127.0.0.1:8080/state/1'
echo "========================="

echo "verify delete works"
curl -i '127.0.0.1:8080/state/1'
echo "========================="