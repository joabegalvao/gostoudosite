# Imagem para publicar o site no EasyPanel (ou em qualquer host com Docker):
# Nginx servindo os arquivos estáticos. Nada é compilado.
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/
COPY assets /usr/share/nginx/html/assets

EXPOSE 80
