#!/bin/bash

# Запуск ноды
/home/ubuntu/.nvm/versions/node/v16.18.1/bin/node ./delete_into_opt.js
/home/ubuntu/.nvm/versions/node/v16.18.1/bin/node ./sending_notifications.js
/home/ubuntu/.nvm/versions/node/v16.18.1/bin/node ./update_subscription.js