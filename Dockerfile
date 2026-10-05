# Imagem para publicar o site no EasyPanel (ou em qualquer host com Docker).
#
# Etapa 1: clona os sites dos clientes a partir do GitHub, um por pasta,
# conforme a lista em sites.txt. Assim cada deploy publica a versão mais nova
# de cada site em gostoudosite.com.br/<pasta>/, sem copiar nada para este
# repositório.
FROM alpine/git:2.47.2 AS sites
WORKDIR /sites
COPY sites.txt .
RUN grep -v '^#' sites.txt | while read -r pasta repo; do \
      [ -z "$pasta" ] && continue; \
      git clone --depth 1 --quiet "https://github.com/joabegalvao/$repo.git" "$pasta" \
      && rm -rf "$pasta/.git" "$pasta/tools" "$pasta/README.md" "$pasta/.gitignore"; \
    done

# Etapa 2: Nginx servindo tudo como arquivos estáticos. Nada é compilado.
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html todos.html sitemap.xml robots.txt /usr/share/nginx/html/
COPY assets /usr/share/nginx/html/assets
COPY --from=sites /sites /usr/share/nginx/html/
EXPOSE 80
