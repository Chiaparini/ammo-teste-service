# Ammo teste service

Este serviço foi construído com [node.js](https://nodejs.org/en/) [ExpressJS](https://expressjs.com/), [sequelize](https://sequelize.org/), [AWS RDS (MySQL)](https://aws.amazon.com/pt/rds/), [AWS S3](https://aws.amazon.com/pt/s3/) e [AWS EB](https://aws.amazon.com/pt/elasticbeanstalk/).

## Configuração

Existem dois arquivos .json que necessitam ser configurados para rodar o projeto, são eles:

 1. `.config/aws.config.json`
 2. `.config/config.js`

Inserir as devidas chaves e os endereços para as bases de dados.

Sera utilizado o **S3** (para subir as imagens dentro da seed), por isso também é necessário criar um bucket com o nome `ammo-teste-imagens` 

Após realizar as configs, executar: 
`npm i`
`npx sequelize db:migrate`
`npx sequelize db:seed:all` (aqui sera utilizado o S3)

Para rodar o projeto:
`npm run dev`

> Esse projeto utiliza um codepipe line, todo commit na master ira atualizar o EC2

Para rodar o prjeto em `prod` é necessario também, setar as variaveis de ambiente

```
NODE_ENV=
DB_HOST=
DB_SCHEMA=
DB_USERNAME=
DB_PASSWORD=
```