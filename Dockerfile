
# Usa una imagen base de Nginx
FROM nginx:alpine

# Copia los archivos de la carpeta public_html al contenedor
COPY public_html/ /usr/share/nginx/html/

# Expone el puerto 80
EXPOSE 80