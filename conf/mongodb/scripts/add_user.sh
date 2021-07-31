#!/usr/bin/sh
echo "Creating MongoDB User for ${MONGO_INITDB_DATABASE} database.."
mongo admin --host localhost -u ${MONGO_INITDB_ROOT_USERNAME} -p ${MONGO_INITDB_ROOT_PASSWORD} -eval "db.createUser({user: '${LEDN_MONGO_USER}', pwd: '${LEDN_MONGO_PASSWORD}', roles: [{role: 'readWrite', db: '${MONGO_INITDB_DATABASE}'}]});"
echo "MongoDB User created"