# configura as suas credenciais na AWS
- aws configure

# criar um bucket
- aws s3api create-bucket --bucket is-hello-bucket

# cria um arquivo txt e grava 'hello world' nele
- echo "hello world" >hello.txt

# faz o upload desse arquivo para o bucket na s3
- aws s3 cp hello.txt s3://is-hello-bucket

# faz o processo inverso e copia o arquivo lá do bucket para o h.txt nesse diretório
- aws s3 cp s3://is-hello-bucket/hello.txt h.txt

# limpar todo o conteúdo do bucket
- aws s3 rm s3://is-hello-bucket --recursive

# deleta o bucket
- aws s3api delete-bucket --bucket is-hello-bucket
