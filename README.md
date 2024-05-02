Шпаргалка по установке необходимых пакетов

1. npm init
2. npm i express
3. npm i --save-dev @types/express

Создать tsconfig.json и добавить:
{
  "compilerOptions": {
    "esModuleInterop": true,
    "target": "es6",
    "module": "commonjs",
    "outDir": "./dist",
    "strict": true
  }
}

4. npm i ts-node
5. npm i --save-dev @types/node

В package.json: 
"scripts": {
    "dev": "nodemon --exec ts-node index.ts"
},

6. npm install mongodb
7. npm install mongoose --save

Для работы с auth
8. npm i cors
9. npm i --save-dev @types/cors