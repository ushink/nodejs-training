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