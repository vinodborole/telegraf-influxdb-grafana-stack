# telegraf-influxdb-grafana-stack
Telegraf, Influxdb and Grafana stack with pre-provisioned datasource and dashboard

# Setup

This project depends on the image from this repo https://github.com/vinodborole/telegraf_datagen follow the steps from this repo's readme, generate the image and then follow below steps

Clone the repo and run following command

docker-compose up -d

Open http://localhost:3000 in your browser with credentials [admin/admin]


# Clean up
docker-compose down

docker volume rm telegraf-influxdb-grafana-stack_grafana_data

docker volume rm telegraf-influxdb-grafana-stack_influxdb_data



# Notes

1. Datasource UID in dasboard and influxdb Datasource yml file have been hardcoded with random ID, this is to avoid the following error

failed to upgrade legacy queries datasource ${ds_influxdb_telegraf} was not found

2. Wait for few minutes on the dashboard to see the data, refresh the page manually after couple of minute to reflect system data


# Telegraf System Dashboard

![All system stats pulled from telegraf agent](/telegraf-system-dashboard.png "Telegraf System Dashboard")
