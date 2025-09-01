# Usar una imagen más ligera con Alpine
FROM node:20-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Instalar dependencias necesarias
RUN apk add --no-cache bash

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias de producción
RUN npm install --only=production

# Copiar el resto de los archivos
COPY . .

# Crear directorio para uploads
RUN mkdir -p uploads

# Variables de entorno (se pueden sobreescribir al ejecutar)
ENV NODE_ENV=production
ENV PORT=3002

# Exponer el puerto
EXPOSE 8080

# Comando para iniciar el servidor
CMD ["node", "server.js"]