#!/usr/bin/env bash
#TODO asserts

#SERVICE_URL=http://localhost:3000
SERVICE_URL=https://XXXXXXXX.execute-api.eu-west-3.amazonaws.com/dev
BOOK_ID=47af9c20-159d-11e8-b10f-4d39a310fc15

echo "Get Books:"
curl -H "Content-Type: application/json" ${SERVICE_URL}/books
echo

echo "Create Book:"
response=$(curl -H "Content-Type: application/json" -d '{"title":"Conversaciones con CEOs y CIOs sobre Transformación Digital y Metodologías Ágiles","author":"Roberto Canales"}' ${SERVICE_URL}/books)
echo

echo Book response=$response
id=$(expr "$response" : '.*"id":"\([^"]*\)"')
echo book id=$id

echo "Get Books:"
echo ${SERVICE_URL}/books
curl -H "Content-Type: application/json" ${SERVICE_URL}/books
echo

echo "Get Book:"
curl -H "Content-Type: application/json" ${SERVICE_URL}/books/${id}
echo

echo "Update Book:"
curl -H "Content-Type: application/json" -X PUT -d '{"title":"Nuevo titulo","author":"Nuevo autor"}' ${SERVICE_URL}/books/${id}
echo

echo "Get Book:"
curl -H "Content-Type: application/json" ${SERVICE_URL}/books/${id}
echo

echo "Delete Book:"
curl -H "Content-Type: application/json" -X DELETE ${SERVICE_URL}/books/${id}
echo

echo "Get Books:"
curl -H "Content-Type: application/json" ${SERVICE_URL}/books
echo