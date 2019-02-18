#!/bin/sh

npm run build

if [ "$NODE_ENV" == "production" ] ; then
  npm run start
else
  npm run start-dev
  npm run storybook
fi
