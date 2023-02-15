# 1° passo - criar arquivo de políticas de segurança
# 2° criar role de segurança na AWS
aws iam create-role \
  --role-name issac-lambda \
  --assume-role-policy-document file://politicas.json |
  tee logs/role.log

# 3° criar arquivo com conteúdo e zipa-lo
zip function.zip index.js

# 4° criar minha lambda function
aws lambda create-function \
  --function-name hello-cli \
  --zip-file fileb://function.zip \
  --handler index.handler \
  --runtime nodejs12.x \
  --role arn:aws:iam::585505964518:role/issac-lambda |
  tee logs/lambda-create.log

# 5° invoke lambda
aws lambda invoke \
  --function-name hello-cli \
  --log-type Tail \
  logs/lambda-exec.log

# 6° atualizar, zipar
zip function.zip index.js

# 7° atualizar lambda
aws lambda update-function-code \
  --zip-file fileb://function.zip \
  --function-name hello-cli \
  --publish |
  tee logs/lambda-update.log

# 7° invokar e ver resultado
aws lambda invoke \
  --function-name hello-cli \
  --log-type Tail \
  logs/lambda-exec-update.log

# 8° remover os recursos
aws lambda delete-function \
  --function-name hello-cli

aws iam delete-role \
  --role-name issac-lambda
