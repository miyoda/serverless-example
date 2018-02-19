# serverless-cqrs
Serverless example with AWS lambdas


# Install and configure serverless framework
> npm i serverless -g

# Install and configure AWS client
https://docs.aws.amazon.com/es_es/cli/latest/userguide/installing.html
https://serverless.com/framework/docs/providers/aws/guide/credentials/

# CRUD of books example

## Install dependencies:
>cd books && npm install

## Running on local
>serverless dynamodb install
>serverless offline start

## Upload to AWS
> cd books && serverless deploy

## Test de API
You have examples of curl requests on "curls.sh". Must to change de SERVICE_URL with your service URL on AWS.

## Remove from AWS
> serverless remove