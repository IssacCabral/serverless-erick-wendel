# 1° criar arquivos de políticas de segurança (falar o que a nossa lambda pode fazer e o que ela pode acessar)
# 2° criar role de segurança na AWS

ROLE_NAME=lambda-example
NODEJS_VERSION=nodejs18.x
FUNCTION_NAME=hello-cli

aws iam create-role \
  --role-name $ROLE_NAME \
  --assume-role-policy-document file://policies.json |
  tee logs/1.role.log

POLICY_ARN=arn:aws:iam::585505964518:role/lambda-example
POLICY_ARN=$(cat logs/1.role.log | jq -r .Role.Arn)

# 3° zipar o projeto

zip function.zip index.js

# 5° criar a lambda

aws lambda create-function \
  --function-name $FUNCTION_NAME \
  --zip-file fileb://function.zip \
  --handler index.handler \
  --runtime $NODEJS_VERSION \
  --role $POLICY_ARN |
  tee logs/2.lambda-create.log

# 5° invoke lambda
aws lambda invoke \
  --function-name $FUNCTION_NAME \
  logs/3.lambda-exec.log \
  --log-type Tail \
  --query 'LogResult' \
  --output text | base64 -d

# 6° atualizar, zipar
zip function.zip index.js

# 7° atualizar lambda
aws lambda update-function-code \
  --zip-file fileb://function.zip \
  --function-name $FUNCTION_NAME \
  --publish |
  tee logs/4.lambda-update.log

# 7° invokar e ver resultado
aws lambda invoke \
  --function-name $FUNCTION_NAME logs/5.lambda-exec-update.log \
  --log-type Tail \
  --query "LogResult" \
  --cli-binary-format raw-in-base64-out \
  --payload '{"name": "issac cabral"}' \
  --output text | base64 -d

# 8° remover os recursos
aws lambda delete-function \
  --function-name $FUNCTION_NAME

aws iam delete-role \
  --role-name $ROLE_NAME
