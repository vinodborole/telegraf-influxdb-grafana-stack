# telegraf-influxdb-grafana-stack
Telegraf, Influxdb and Grafana stack with pre-provisioned datasource and dashboard

# Setup

Clone the repo and run following command

docker-compose up -d


# Clean up
docker-compose down

docker volume rm tig_influxdb_data

docker volume rm tig_grafana_data



# Notes

1. Datasource UID in dasboard and influxdb Datasource yml file have been hardcoded with random ID, this is to avoid the following error

failed to upgrade legacy queries datasource ${ds_influxdb_telegraf} was not found

2. Wait for few minutes on the dashboard to see the data, refresh the page manually after couple of minute to reflect system data