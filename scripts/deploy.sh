#!/bin/bash

# Read the JSON file into a variable
json=$(cat nest-cli.json)
# Filter the projects with type equal to "application"
applications=$(echo "$json" | jq '.projects[] | select(.type == "application")')

# Loop over the applications and execute a command for each one
for app in $(echo "${applications}" | jq -r '.root'); do
    appname=$(echo "${app}" | sed 's/^apps\///')
  echo "Running command for application: ${appname}"
  serverless mono --nestApp ${appname} --command deploy --stage production
done