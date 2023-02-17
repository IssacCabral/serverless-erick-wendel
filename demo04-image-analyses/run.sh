# Construir uma API usando o serverless framework para analisar imagens.
# Você vai receber uma URL de uma imagem, salvar em disco, obter o seu buffer
# e enviar para algum serviço da AWS.

# nós vamos usar o AWS Rekognition, usada para identificar coisas em imagens
# e retornar textos para nós

# Ou seja, você vai mandar uma imagem, e o serviço Rekognition vai nos dizer
# o que contém naquela imagem. Nós vamos também traduzir a resposta do Rekognition,
# para o português, usando um outro serviço da AWS: o AWS Tradutor
