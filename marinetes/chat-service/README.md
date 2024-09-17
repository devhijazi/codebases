# Marinetes - Serviço de Chat

Microserviço de chat em realtime utlizando gRPC construindo para ser de forma genérica e atender qualquer aplicação que necessitará de um serviço de mensagens em tempo real.

## Tecnologias Utilizadas

- TypeScript
- [gRPC](https://grpc.io/)
- [Envoy](https://www.envoyproxy.io/)

### gRPC

gRPC (Google Remote Procedure Calls) é uma estrutura de Chamada de Procedimento Remoto (Remote Procedure Call | RPC) de alto desempenho e código aberto de plataforma cruzada.

Ele usa HTTP/2 para transporte, Buffers de protocolo como a linguagem de descrição da interface e fornece recursos como autenticação, streaming bidirecional e controle de fluxo, vinculações de bloqueio ou não bloqueio e cancelamento e tempos limite.

O uso complexo de HTTP/2 pelo gRPC impossibilita a implementação de um cliente gRPC no navegador, exigindo um proxy.

### Envoy

O Envoy é um proxy L7 e um barramento de comunicação projetado para grandes arquiteturas modernas orientadas a serviços.

## Inciando o Projeto

### Criando container do Mongo

Primeiramente você deve criar o container do Mongo. Para fazer isso, execute o seguinte comando:

```sh
$ docker-compose up mongo -d
```

### Configurando variáveis de ambiente

Copie as variáveis de exemplo do arquivo `.env.example` para `.env`

**Variáveis de ambiente OBRIGATÓRIAS**

```diff
# CONFIG
+ PORT=

# MONGO DATABASE
+ MONGO_URL=
```

### Instalando as dependências

Para isso rode o comando abaixo, lembrando que é necessário ter o yarn instalado globalmente em sua máquina.

```sh
$ yarn install
```

### Sincronizando Banco de Dados

Sincronize a schema do Prisma rodando o comando:

```sh
$ yarn prisma generate
```

### Gerando Protocol Buffers

É necessário gerar os arquivos protos do gRPC, pra fazer isso rode o comando:

> Se estiver no Linux

```sh
$ chmod +x ./scripts/build_protos.sh
$ ./scripts/build_protos.sh
```

> Se estiver no Windows

```sh
$ bash ./scripts/build_protos.sh
```

### Iniciando o serviço

Tendo feito os passos acima, inicie o serviço, pra isso rode o comando:

```sh
$ yarn dev
```

### Criando uma imagem local do serviço

Caso deseje iniciar a aplicação usando docker, rode a build e crie a imagem.

```sh
$ yarn build
$ docker-compose build chat
```

Depois é so iniciar.

```sh
$ docker-compose up chat -d
```

### Configurando Envoy Proxy

Se precisar de usar o serviço de chat tanto no mobile quanto na web é necessário a utilização do Envoy Proxy. Tenha em mente que ao utilizar o envoy com Docker estamos lidando com containers na nossa máquina.

**Caso não for rodar o serviço de chat com Docker**, é necessário você ir no arquivo do docker-compose e editar o argumento `MARINETES_CHAT_SERVICE_HOST` de *chat* para o ip da sua maquina. Isso é necessário pois o docker não consegue enxergar hosts que não estão na mesma network.

Exemplo como deve ficar:

```diff
...
  envoy:
    ...
    build:
      ...
      args:
        ENVOY_ADMIN_PORT: 9901
        ENVOY_LISTENER_PORT: 3380
+       MARINETES_CHAT_SERVICE_HOST: 10.0.0.103
        MARINETES_CHAT_SERVICE_PORT: 4447
...
```

**Se estiver rodando o serviço de chat com Docker**, não precisa editar o argumento.

Vocẽ vai precisar criar o container do envoy utilizando Docker na sua maquina, para isso rode o seguinte comando:

```sh
$ docker-compose up envoy -d
```