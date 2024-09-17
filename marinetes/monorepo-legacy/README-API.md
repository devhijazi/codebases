# Especificação da API de usuário do Marinetes

## Rotas

Utilizamos um sistema de versão em nossa API, a base url é seguida do prefixo **v** junto com a atual versão.

Atual Versão: 1
Base Url: `/v1`

> Para utlizar as rotas abaixo, insira a versão, por exemplo `/v1/users`.

#### Session

- [`/sessions/login`](#session-login-create) [POST] - Cria a autenticação do usuário
- [`/sessions/login/verify`](#session-login-verify) [GET] - Verifica o token

#### Diarist

- [`/diarists/pre-register`](#create-diarist-pre-register) [POST] - Cria o pré registro da diarista
- [`/diarists`](#diarists-list) [GET] - Lista as diaristas

#### User

- [`/users`](#create-user) [POST] - Cria um usuário

#### Me

Todas as rotas listadas abaixo necessita de autenticação.

- [`/me`](#get-user) [GET] - Tem acesso ao atual usuário logado
  logado
- [`/me/addresses`](#create-user-address) [POST] - Cria um endereço do usuário
- [`/me/addresses/:addressId`](#create-user-address) [DELETE] - Deleta um endereço do usuário

## Autenticação

A autenticação utilizada é Bearer. O Token a ser utlizado pode ser criado usando a rota `/sessions/login` usando o método POST.

## Documentos

- UserDocument

  ```json
  {
    "id": "14ce1415-918d-43e9-b66e-10e516a3c9a5",
    "email": "user@gmail.com",
    "full_name": "Geovani Oliveira",
    "general_register": "000001",
    "individual_registration": "00011122233",
    "phone": "67900000000",
    "addresses": [...UserAddressDocument],
    "created_at": "2022-01-29T01:40:50.000Z",
    "updated_at": "2022-01-29T01:40:50.000Z"
  }
  ```

  - Especificação
    - Endereços do Cliente (addresses)
      Array contendo `UserAddressDocument`.
    - CPF (individual_registration)
    - RG (general_register)

- UserAddressDocument

  ```json
  {
    "id": "14ce1415-918d-43e9-b66e-10e516a3c9a5",
    "title": "Casa",
    "city": "Campo Grande dos Códigos",
    "street": "Rua NodeJS",
    "number": 200,
    "zip_code": "79005180",
    "neighborhood": "Vila dos Programadores",
    "state": "MS",
    "category": 0 | 1,
    "type": 0 | 1 | 2,
    "rooms": 3,
    "square_meters": 30,
    "created_at": "2022-01-29T01:40:50.000Z",
    "updated_at": "2022-01-29T01:40:50.000Z"
  }
  ```

  - Especificação

    - Metros Quadrados (square_meters)
      Número com range de 2 dígitos.
      Ex: 440.25

    - Categoria (category)
      0 = Casa
      1 = Endereço Comercial
    - Tipo (type)
      0 = Terreo
      1 = Sobrado
      2 = Apartamento

- DiaristDocument

  ```json
  {
    "id": "14ce1415-918d-43e9-b66e-10e516a3c9a5",
    "full_name": "Marina Santos",
    "individual_registration": "00011122233",
    "birthdate": "01/01/1991",
    "email": "marinetes@gmail.com",
    "created_at": "2022-01-29T01:40:50.000Z",
    "updated_at": "2022-01-29T01:40:50.000Z"
  }
  ```

## Referência

##### Session Login Create

Payload:

```json
{
  "email": "user@gmail.com",
  "password": "senha123"
}
```

Retorno:

```json
{
  "user": [UserDocument],
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDM2NDI4OTUsImV4cCI6MTY0MzcyOTI5NSwic3ViIjoiMTRjZTE0MTUtOTE4ZC00M2U5LWI2NmUtMTBlNTE2YTNjOWE1In0.hKigmbwW2dLxDC_iM3CqhlxgTfAqZo8CFkzVxKXqBp9"
}
```

##### Session Login Verify

Headers:

- Authentication: `Bearer [Token do usuário]`

Retorno:

```json
{
  "ok": true
}
```

##### Create Diarist Pre-Register

Payload:

```json
{
  "full_name": "Marina Santos",
  "individual_registration": "00011122233",
  "birthdate": "01/01/1991",
  "email": "marinetes@gmail.com"
}
```

Retorno: ID do registro criado.

##### Create User

Payload:

```json
{
  "password": "senha123",
  "email": "user@gmail.com",
  "full_name": "Geovani Santos",
  "general_register": "0000001",
  "individual_registration": "00011122233",
  "phone": "69000000000"
}
```

Retorno: ID do registro criado.

##### Get User

Retorno: `UserDocument`

##### Create User Address

Payload:

```json
{
  "number": 10,
  "title": "Casa",
  "city": "Cidade",
  "street": "Rua",
  "zip_code": "00000000",
  "neighborhood": "Bairro",
  "state": "Estado",
  "category": 0 | 1,
  "type": 0 | 1 | 2,
  "rooms": 100,
  "square_meters": 20
}
```

##### Diarists List

Retorno: Array contendo `DiaristDocument`.

```json
[...DiaristDocument]
```

<br/>

## FAQ

<details>
  <summary>Utilização do tipo <strong>Boolean</strong> nas permissões.</summary>
  
O sistema financeiro do marinetes é dividido entre funcionário (padrão) e administradores.
Todos os ADMS, tem o campo `admin` definido como verdadeiro.

</details>

<details>
  <summary>Sobre a construção do package e suas vantagens</summary>

Como o sistema é divido em várias APIS, e todas usufruem do mesmo banco de dados, não faz sentido criar em todas as APIS definições do banco de dados, ocasionando imcompatibilidade, como por exemplo a api x, não possuir um campo em que a api y possui em certa entidade.

</details>

<details>
  <summary>Funcionamento na prática</summary>

Antes de iniciar uma api, instale os pacotes usando `yarn install`, em seguida rode o comando `yarn build:packages` para buildar os pacotes necessários, em seguida rode as migrations seguindo os passos abaixo.

- Entre na pasta `packages/database`
- Crie o arquivo .env e insira as variáveis:
  ```shell
  MYSQL_PORT=porta-do-servidor
  MYSQL_HOST=host-do-servidor
  MYSQL_DATABASE=nome-da-database
  MYSQL_USERNAME=username
  MYSQL_PASSWORD=password
  ```
- Rode o comando `yarn ts-node-dev --transpile-only common/sync.ts`

Importando o banco de dados:

Antes de começar a usar o package do banco de dados, é necessário defini-lo no `package.json`, como mostrado abaixo:

```json
// package.json
{
  "dependencies": {
    "@marinetes/database": "*"
  }
}
```

Exemplo de uso:

```ts
import { UserRepository } from '@marinetes/database';

async function findAll() {
  return UserRepository.find({});
}
```

</details>
