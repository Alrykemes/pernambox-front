# Etapa 1: build da aplicação
FROM node:20-alpine AS build

# Define diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos essenciais para o build
COPY package.json package-lock.json* ./

# Instala as dependências
RUN npm ci

# Copia o restante do código-fonte
COPY . .

# Gera o build de produção
RUN npm run build

# Etapa 2: imagem final e leve usando Nginx
FROM nginx:1.27-alpine

# Remove configuração padrão do Nginx e adiciona a nossa
RUN rm -rf /usr/share/nginx/html/*

# Copia o build gerado pelo Vite para o diretório público do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia um arquivo de configuração customizado (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta padrão
EXPOSE 80

# Comando para iniciar o servidor
CMD ["nginx", "-g", "daemon off;"]