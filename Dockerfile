# Usando a imagem oficial do Node.js 18 como base
FROM node:18.19.0

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar os arquivos do projeto para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install --force

# Copiar o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Construir o projeto usando Vite
RUN npm run build

# Expor a porta 3000 para acesso à aplicação
EXPOSE 5173

# Iniciar a aplicação em modo de produção
CMD ["npm", "run", "preview", "--", "--host", "--port", "5173"]
