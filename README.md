# Navedex API

API criada com fins de execução do teste de backend nodejs. Tecnologias utilizadas:

1. Framework adonisjs;
2. Adonis swagger para documentação;
3. Docker e Docker compose para criação e orquestração do ambiente;

## Como utilizar

Para criar os containers node e postgres, criar e configurar a base de dados:

```bash
docker-compose up
```
Deve ser criado um ambiente todo e configurado com a aplicação em funcionamento.

### Tabelas do DB

Após isso, deve se entrar no container node e executar o comando de criação das tabelas:

```js
npm run migrations
```

As tabelas deverão ser criadas com sucesso e a aplicação estará pronta para execução!

A documentação se encontra no seguinte endereço:

http://localhost:3333/docs
