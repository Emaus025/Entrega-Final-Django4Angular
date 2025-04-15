# Usar una imagen base de Node.js
FROM node:18-alpine AS build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de configuración y dependencias
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el código fuente del proyecto
COPY . .

# Compilar la aplicación Angular
RUN npm run build --configuration=production

# Usar una imagen más ligera para servir la aplicación
FROM nginx:alpine

# Copy nginx configuration
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy built files
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]