# instalar
npm i -g serverless@3.16.0

# inicializar um projeto
sls # escolhi o HTTP API template

# sempre que mudou o código usa o
sls deploy

# traz os endereços e informações sobre as funções
sls info

# invokar local
sls invoke local -f hello

# invokar em prod
sls invoke -f hello

# configurar o serverless dashboard, ver o serverless console
serverless --console

# remover tudo
sls remove
