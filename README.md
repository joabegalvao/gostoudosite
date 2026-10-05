# Gostou do site? | gostoudosite.com.br

Página única, estática, em HTML, CSS e JavaScript puro. Não há etapa de build
nem dependências de execução: basta servir a pasta. É a vitrine dos sites
feitos nesta série e o ponto de contato para novos pedidos.

## Como visualizar

```bash
# na raiz do projeto
python3 -m http.server 4188
# abra http://localhost:4188
```

Qualquer servidor estático funciona (Nginx, Apache, Netlify, Vercel, Hostinger,
GitHub Pages). Publique `index.html` e a pasta `assets/`. A pasta `tools/` não
precisa ir para o servidor.

### Materiais de origem

Os arquivos de origem ficam reunidos na pasta `materiais-de-origem/`, que não
faz parte do repositório: ela existe só na pasta local e é ignorada pelo git.
As imagens que o site usa já estão prontas em `assets/img`.

```
materiais-de-origem/
  logo/    gostou_do_site_logo.png (1570 x 1002, com xadrez de transparência pintado no fundo)
  sites/   34 capturas dos 17 sites publicados (desktop 1440 x 1000 e celular 780 x 1560), feitas por tools/capture-sites.js
```

## Repositório

| Item | Valor |
| --- | --- |
| Endereço | `git@github.com:joabegalvao/gostoudosite.git` |
| Página | https://github.com/joabegalvao/gostoudosite |
| Visibilidade | pública (conferida em 01/10/2026) |
| Branch | `main` |

O repositório guarda só o que o site precisa para funcionar e ser mantido:
`index.html`, `assets/`, `tools/`, `README.md` e `.gitignore`.

```bash
git clone git@github.com:joabegalvao/gostoudosite.git
```

Um clone novo abre e publica o site normalmente. Só não roda os scripts de
imagens, que dependem da pasta `materiais-de-origem/`.

## Publicação no EasyPanel

O repositório traz um `Dockerfile` em duas etapas e um `nginx.conf` com gzip
e cache. Na primeira etapa, a imagem **clona os 17 sites dos clientes a
partir do GitHub**, um por pasta, conforme a lista em `sites.txt`; na segunda,
o Nginx serve este site na raiz e cada cliente em `gostoudosite.com.br/<pasta>/`
(por exemplo, `gostoudosite.com.br/fialho-barbearia/`). Nada dos clientes é
copiado para este repositório: cada Deploy publica a versão mais nova de cada
um. No EasyPanel:

1. **Projetos > Criar projeto**, nome `gostoudosite`.
2. Dentro do projeto, **Criar serviço > App**.
3. **Origem (Source):** GitHub, repositório `joabegalvao/gostoudosite`, branch
   `main`. O repositório é público; não precisa de token.
4. **Build:** `Dockerfile` (caminho `./Dockerfile`).
5. **Domínios:** adicione `gostoudosite.com.br` e `www.gostoudosite.com.br`, porta
   do container `80`, HTTPS ligado (o EasyPanel emite o certificado Let's
   Encrypt sozinho, depois que o DNS apontar).
6. **Deploy.** A cada `git push` na `main`, basta clicar em Deploy de novo (ou
   ligar o deploy automático nas configurações do serviço, com o webhook que
   ele mostra).

DNS, no registrador do domínio: um registro **A** para `gostoudosite.com.br`
apontando para o IP do servidor, e um **CNAME** (ou outro A) para `www`.

## Selo do showroom nos sites dos clientes

Os sites em `gostoudosite.com.br/<pasta>/` são vitrine. Cada página deles recebe um selo fixo no canto inferior esquerdo ("Site feito por / Peça o seu", com a marca clara sobre o marinho), ligando para a página principal. O canto direito fica livre para o botão de WhatsApp que todos os sites têm.

Além do selo, uma **marca d'água** do logo ocupa o centro da tela (72% da largura, até 900 px): a silhueta branca do logo (`assets/showroom/marca-dagua.webp`, gerada a partir do PNG de 960 px) com opacidade 0,13 e `mix-blend-mode: difference`, que a faz aparecer escura em fundo claro e clara em fundo escuro. Ela tem `pointer-events: none`, então não atrapalha nenhum clique nem rolagem.

Como funciona: o `nginx.conf` insere `<script src="/assets/showroom/selo.js" defer>` antes do `</body>` de toda página fora da raiz (`sub_filter`, no `location /`); o `index.html` do portfólio tem um `location = /index.html` próprio, sem o filtro. O `assets/showroom/selo.js` cria o selo com estilo próprio (id `gostoudosite-selo`, cores fixas, fonte do sistema), sem depender do CSS de cada site. Nada muda nos repositórios dos clientes: no domínio próprio de cada um o selo não existe, e as miniaturas do portfólio são capturadas sem ele (`tools/capture-sites.js` esconde o id antes do print). Para desligar, basta remover as duas linhas de `sub_filter` do `nginx.conf`.

Testado em 02/10/2026 com a imagem Docker construída localmente: raiz sem selo, `/firulabar/`, `/mec-bella/` e `/fialho-barbearia/` com o script inserido uma vez, gzip mantido.

## Dados

| Dado | Valor |
| --- | --- |
| Nome | Gostou do site? |
| Domínio | gostoudosite.com.br (usado em `canonical` e `og:image`) |
| O que faz | Landing pages para pequenos negócios de Maringá, PR |
| WhatsApp | (44) 98809-4010 |
| Portfólio | 50 sites feitos, segundo o cliente. 17 deles estão nesta página, servidos em `gostoudosite.com.br/<pasta>/` (e também no GitHub Pages, em `joabegalvao.github.io/<repositório>/`); os demais ainda não foram incluídos |

Não há telefone fixo, endereço, Instagram, preços, prazos ou avaliações: nada
disso foi informado, e a página não inventa.

## Estratégia

| Definição | Decisão |
| --- | --- |
| Proposta de valor | A pergunta do nome vira o argumento: "Gostou do site? O próximo pode ser o seu." A prova é o próprio portfólio, aberto para clicar |
| Principal objeção | "Vai ser mais um site de modelo pronto, igual aos outros" |
| Resposta | Uma seleção de 17 sites lado a lado, nenhum parecido com o outro, cada um com link ao vivo |
| Conversão prioritária | WhatsApp, com uma mensagem geral e uma por site ("Gostei do site da X e quero um parecido") |
| Sem formulário | O contato é só pelo WhatsApp, e a página diz isso como vantagem |

## Direção visual

O logo manda: marinho `#02182B` e azul `#076CFD`, com a moldura de navegador
e os três pontos virando elementos da interface. Cabeçalho, hero, "O que vem
no site" e chamada final são marinho; o resto é branco frio. O hero tem uma
**parede de sites**: duas fileiras com as capturas deslizando devagar em
sentidos opostos, que param ao passar o mouse e ficam paradas quando o sistema
pede movimento reduzido. Cada site do portfólio aparece em uma **moldura de
navegador** (barra marinho com os três pontos azuis do logo) com a versão de
celular sobreposta no canto; ao passar o mouse, os dois se levantam.

Tipografia: Outfit (títulos, geométrica arredondada como as letras do logo) e
Inter (textos). Sem gradientes decorativos (a máscara nas bordas da parede é
só o esmaecimento das pontas), sem efeitos de vidro, sem emojis como ícones.

## Seções da página

| Ordem | Seção | Âncora | Conteúdo |
| --- | --- | --- | --- |
| 1 | Cabeçalho | | Logo (versão clara), navegação e CTA "Quero um site". Fixo no topo |
| 2 | Hero | `#inicio` | "Gostou do site? O próximo pode ser o seu.", dois botões, a parede de sites e três fatos (50 sites feitos, 1 identidade por cliente, 0 formulários) |
| 3 | Sites feitos | `#sites` | "Cinquenta negócios, cinquenta sites diferentes" e uma seleção de 17, com moldura de navegador, celular, segmento, uma frase, "Ver site" e "Quero um assim" |
| 4 | O que vem no site | `#entrega` | Sete itens que todos os sites da série têm |
| 5 | Como funciona | `#como-funciona` | Três passos pelo WhatsApp: briefing, aprovação, ajustes e publicação |
| 6 | Para quem | | Os 13 segmentos já atendidos |
| 7 | Chamada final | `#contato` | Logo claro, "Então vamos fazer o seu." e o número do WhatsApp |
| 8 | Rodapé | | Direitos, WhatsApp e voltar ao topo |

Componente de apoio: botão flutuante de WhatsApp, no canto inferior direito,
em todas as telas.

## Estrutura de arquivos

```
Dockerfile, nginx.conf           publicação com Nginx (EasyPanel, Docker)
sites.txt                        lista pasta -> repositório dos sites dos clientes, lida pelo Dockerfile
index.html                       conteúdo e SEO
assets/css/styles.css            estilos (tokens de cor e tipografia no topo)
assets/js/main.js                menu e revelação na rolagem
assets/img/                      imagens otimizadas (geradas pelos scripts)
assets/fonts/                    Outfit e Inter (arquivos locais)
tools/capture-sites.js           captura a primeira tela dos 17 sites publicados (Playwright)
tools/optimize-images.py         logo sem fundo, ícones e miniaturas a partir das capturas
tools/render-compartilhamento.js monta a imagem de compartilhamento pelo Chromium
materiais-de-origem/             logo original e capturas (só na pasta local, fora do git)
```

## Os 21 sites publicados

| Site | Segmento | Pasta em gostoudosite.com.br | Repositório |
| --- | --- | --- | --- |
| Mandacaru Café | Café e restaurante | `/mandacarucafe/` | `joabegalvao/mandacarucafe` |
| Gabriela Bueno | Hair colorist | `/gabrielabueno/` | `joabegalvao/gabrielabueno` |
| Sahtén | Restaurante árabe (Córdoba, Argentina) | `/sahten/` | `joabegalvao/sahten` |
| Firula Bar | Bar e restaurante | `/firulabar/` | `joabegalvao/firulabar` |
| Mec Bella | Moda feminina | `/mec-bella/` | `joabegalvao/mec-bella` |
| Area 51 Burger | Hamburgueria | `/area51-burguer/` | `joabegalvao/area51-burguer` |
| Fialho Barbearia | Barbearia | `/fialho-barbearia/` | `joabegalvao/fialho_barbearia` |
| Viva Baby | Loja de bebê | `/viva-baby/` | `joabegalvao/viva-baby` |
| Amigos Auto Peças | Autopeças | `/amigos-autopecas/` | `joabegalvao/amigos-autopecas` |
| Nanda Bella Beauty Clinic | Esmaltação em gel | `/nanda-bella/` | `joabegalvao/nanda-bella` |
| Geral Peças | Autopeças | `/geral-pecas/` | `joabegalvao/geral-pecas` |
| Bacana Moda Feminina | Moda feminina | `/bacana-moda-feminina/` | `joabegalvao/bacana_moda_feminina` |
| Labuka Restaurante | Restaurante | `/labuka/` | `joabegalvao/labuka` |
| Ótica Visão | Ótica | `/otica-visao/` | `joabegalvao/otica-visao` |
| Vieira Fauna Shopping | Pet shop | `/vieira-fauna/` | `joabegalvao/vieira-fauna` |
| Relojoaria Omega | Relojoaria | `/relojoaria-omega/` | `joabegalvao/relojoaria_omega` |
| Modelle | Moda feminina | `/modelle/` | `joabegalvao/modelle` |
| Angel Cappucho | Piercing e tattoo | `/angel-cappucho/` | `joabegalvao/angel-cappucho` |
| Studio Ratier | Nail designer | `/studio-ratier/` | `joabegalvao/studio-ratier` |
| Posto Tacs | Posto de combustível | `/posto-tacs/` | `joabegalvao/posto-tacs` |
| Armazém da Ju Essências | Essências e artesanato | `/armazem-da-ju/` | `joabegalvao/armazem_da_ju` |

A ordem na página alterna sites escuros e claros, para a grade ter ritmo. As
frases de cada card descrevem o que a página do cliente tem; nenhuma cita
resultado comercial.

### Como adicionar um site novo

1. Acrescente uma linha `pasta  repositório` em `sites.txt`. É isso que
   publica o site em `gostoudosite.com.br/<pasta>/` no próximo Deploy.
2. Acrescente o nome do repositório à lista `sites` em
   `tools/capture-sites.js` e rode `node tools/capture-sites.js` (captura
   só o que falta se você apagar as outras capturas, ou tudo de novo).
3. Rode `python3 tools/optimize-images.py` para gerar as miniaturas.
4. Acrescente o site **no começo** de `assets/data/sites.json` (a lista vai
   do mais recente ao mais antigo): `pasta`, `imagem` (nome base dos
   arquivos `site-<imagem>-*`), `segmento`, `nome`, `texto`, `alt` e
   `artigo` ("da" ou "do", usado em "Gostei do site da/do [nome]"). É essa
   lista que a página `todos.html` mostra, com busca e "carregar mais".
5. No `index.html`, a seção "SITES FEITOS" mostra só os **dez mais
   recentes**: copie um bloco `<li class="work">` para o começo da lista,
   troque nome, segmento, frase, a pasta nos dois links, os nomes dos
   arquivos e a mensagem do "Quero um assim", e remova o último card. Só
   os dois primeiros carregam sem `loading="lazy"`.
6. Se quiser o site na parede do hero, acrescente um `<li class="wall__item">`
   nas duas cópias da fileira escolhida (cada fileira é duplicada para o
   movimento ser contínuo).
7. Se o total de sites feitos mudar, atualize "50" no hero, "Cinquenta" no
   título da seção e a `description` no `<head>`; a contagem de cards é
   independente.
8. Rode `python3 tools/gerar-sitemap.py` para atualizar o `sitemap.xml`
   (ele lista a página inicial, `todos.html` e a pasta de cada site).

### Google: sitemap, robots e Search Console

`sitemap.xml` e `robots.txt` são gerados por `tools/gerar-sitemap.py` a partir
do `sites.json` e vão para a raiz do domínio pelo Dockerfile. Para o Google
encontrar e indexar as páginas dos clientes em `gostoudosite.com.br/<pasta>/`:

1. **HTTPS válido**: em 05/10/2026 o domínio respondia em HTTPS com o
   certificado autoassinado do EasyPanel ("CN=Easypanel"). Navegadores mostram
   aviso de segurança e o Google não indexa direito. No EasyPanel, em
   Domains do serviço, ativar HTTPS (Let's Encrypt) para gostoudosite.com.br
   e www; a Cloudflare precisa continuar "DNS only" (nuvem cinza) para o
   certificado ser emitido.
2. **Search Console**: cadastrar a propriedade `gostoudosite.com.br`
   (verificação por registro DNS TXT na Cloudflare), enviar
   `https://gostoudosite.com.br/sitemap.xml` e pedir indexação das URLs
   principais.
3. **Links de fora**: o que mais acelera é cada cliente colocar a URL da sua
   pasta no campo "Site" do Perfil da Empresa no Google e na bio do Instagram.
   Sem isso, uma pasta em um domínio novo demora semanas para aparecer e
   dificilmente passa o próprio perfil do Google Maps da empresa na busca.

Quando um cliente tiver domínio próprio, a página dele deve sair da pasta
(ou receber `rel="canonical"` para o domínio novo), para não concorrer com
ele no Google.

### Página "todos os sites" (`todos.html`)

Mesmo cabeçalho e rodapé da principal. Lê `assets/data/sites.json` e desenha
os cards em lotes de 8: botão "Carregar mais" e, com `IntersectionObserver`,
o próximo lote entra sozinho ao chegar no fim. O campo de busca filtra por
nome, segmento e frase, ignorando acentos e maiúsculas, com contagem em
`aria-live`. Sem JavaScript, a página mostra a lista completa de links dentro
do `<noscript>`. O Nginx serve `todos.html` e o `sites.json` sem o selo do
showroom e sem cache (`location =` próprios no `nginx.conf`).

### Logo

O arquivo recebido é PNG RGB com o **xadrez de transparência pintado no
fundo** (não é transparência de verdade). O script separa a tinta do fundo
pela saturação (azul) e pela escuridão (marinho), devolve a transparência e
preserva a suavização das bordas. Como o marinho do logo some sobre o fundo
marinho da página, o script gera também uma **versão clara**, com o marinho
trocado por branco e o azul intacto; é ela que aparece no cabeçalho, na
chamada final, nos ícones e na imagem de compartilhamento. O desenho não
muda, só a cor das partes escuras.

## Como atualizar o conteúdo

| O que mudar | Onde |
| --- | --- |
| Textos | `index.html` (seções comentadas) |
| Número do WhatsApp | `index.html`: procure por `wa.me/` (16 ocorrências: 6 gerais e 10 por site); `assets/js/todos.js` (constante `WA`); `todos.html` (estado vazio). O texto vem depois de `?text=`, codificado |
| Cores e fontes | `assets/css/styles.css`, bloco `:root` |
| Sites do portfólio | veja "Como adicionar um site novo" (`sites.json` para a lista completa, `index.html` para os dez da página inicial) |
| Itens de "O que vem no site" | `index.html`, lista `checklist` |
| Passos | `index.html`, lista `steps` |
| Segmentos | `index.html`, lista `segments__list` |
| Velocidade da parede | `styles.css`, `.wall__track { animation: wall-slide 90s ... }` |

Peso: no celular, só os dois primeiros cards carregam na hora; os demais
são `loading="lazy"`. Em telas 3x o `sizes` dos cards diz 240 px, para o
navegador escolher a versão de 720 e não a de 1080. O logo do fecho usa só a
versão de 480 px.

Mensagens de WhatsApp:

| Onde | Mensagem |
| --- | --- |
| Cabeçalho, hero, "O que vem no site", chamada final, rodapé e botão flutuante | Olá! Vi o gostoudosite.com.br e quero um site para o meu negócio. |
| "Quero um assim", em cada card | Olá! Gostei do site da [nome] e quero um parecido para o meu negócio. |

Para gerar as imagens:

```bash
node tools/capture-sites.js             # capturas dos sites (requer Node e Playwright)
python3 tools/optimize-images.py        # logo, ícones e miniaturas (requer Pillow)
node tools/render-compartilhamento.js   # imagem de compartilhamento
```

Se o Playwright não estiver instalado no projeto, informe os caminhos pelas
variáveis `PLAYWRIGHT_MODULE` e `CHROMIUM_PATH`.

### Cache do navegador

Os arquivos de estilo e script são chamados com versão: `styles.css?v=1`,
`main.js?v=1` e `todos.js?v=1`. Ao alterar um deles, aumente o número no
`index.html` e no `todos.html`.

## Identidade visual

| Token | Cor | Origem |
| --- | --- | --- |
| `--navy` | `#02182B` | letras "Gostou do" e moldura do logo: fundos escuros, títulos |
| `--blue` | `#076CFD` | "site?", pontos e traços do logo: botões, destaques, pontos dos rótulos |
| `--blue-700` | `#0554C9` | azul escurecido: hover e destaques sobre fundo claro |
| `--blue-100` | `#E3EDFF` | azul bem claro: números dos passos |
| `--navy-800`, `--navy-line` | `#0A2440`, `#1A3A5C` | superfícies e linhas sobre o marinho |
| `--paper`, `--mist`, `--white`, `--line` | `#F5F7FB`, `#E9EEF7`, `#FFFFFF`, `#D6DDE9` | fundos claros e linhas |
| `--ink`, `--ink-soft`, `--soft` | `#0B1A2B`, `#4B5A6D`, `#A9B9CF` | textos |
| `--whatsapp` | `#25D366` | verde oficial do WhatsApp, só no botão flutuante e nos links "Quero um assim" |

Sobre o marinho, o destaque dos títulos usa `#4D93FF` (o azul do logo
clareado), porque o azul puro não alcança contraste suficiente para texto.

## Decisões de conteúdo

- O número de 50 sites feitos foi informado pelo cliente (01/10/2026); a
  página mostra uma seleção de 17, e diz que é uma seleção. Os outros dois
  fatos do hero são verificáveis: identidade própria por cliente e nenhum
  formulário na página.
- Nenhum número de clientes, prazo, preço ou resultado. "Rápido" refere-se ao
  carregamento da página, medido nos testes.
- A lista "O que vem no site" descreve só o que todos os 15 sites têm.
- "Como funciona" descreve o processo pelo WhatsApp sem prometer prazo.
- Os links dos cards abrem os sites em `gostoudosite.com.br/<pasta>/`, para
  o cliente ver o site no domínio da agência. Quando um cliente publicar o
  site no próprio domínio, troque o endereço no card, se quiser.
- Sem avaliações: nenhuma foi fornecida.
- Sem formulário, de propósito; a página apresenta isso como escolha.

## Testes realizados

Executados em 01/10/2026, em Chromium automatizado (Playwright).

- Revisão visual das capturas de tela: página inteira em 390 e 1440 px e
  primeira tela em 320, 768 e 1024 px.
- Sem rolagem horizontal e com o título do hero em duas linhas (três no
  celular) nos tamanhos 320, 390, 768, 1024 e 1440 px.
- Sem erros de console e sem imagens quebradas.
- 38 verificações automáticas aprovadas: menu no celular (toque, Esc, toque
  fora, foco), âncoras, botão flutuante de WhatsApp, imagens sem ampliação
  acima do tamanho real, revelação na rolagem, link de pular para o conteúdo,
  foco visível, destino e atributos de todos os links (30 links para as 15
  pastas dos sites, 21 de WhatsApp com 16 mensagens diferentes, nenhum destino
  externo fora de wa.me), hierarquia de títulos e atributos das
  imagens, sem travessões, emojis ou textos de exemplo.
- Página utilizável sem JavaScript.
- Animações desligadas quando o sistema pede movimento reduzido (a parede
  fica parada).
- Contraste AA em todos os textos.
- Carga inicial no celular de 670 KB, medida em tela de densidade 3x, sem
  saltos de layout (CLS 0). As 16 capturas da parede entram nessa conta.
  Página inteira: 1,6 MB, por causa das 15 miniaturas de desktop e 15 de
  celular, carregadas só ao rolar.

Não testado: Safari, Firefox e aparelhos físicos. Não foi verificado se o
número responde no WhatsApp.

## Histórico de ajustes

| Ajuste | Arquivos |
| --- | --- |
| Versão inicial da página | todos |
| Sites dos clientes publicados em `gostoudosite.com.br/<pasta>/` pelo Dockerfile; links do portfólio apontam para eles | `Dockerfile`, `nginx.conf`, `sites.txt`, `index.html` |
| Area 51 Burger acrescentado: 16 sites | `sites.txt`, `index.html`, `tools/capture-sites.js`, `assets/img` |
| Mec Bella acrescentada: 17 sites | `sites.txt`, `index.html`, `tools/capture-sites.js`, `assets/img` |
| Título da seção "Sites feitos" trocado para "Cinquenta negócios, cinquenta sites diferentes"; o cliente informou que são 50 sites feitos, dos quais 16 estão na página. Fato do hero e descrição ajustados; a página diz que mostra uma seleção | `index.html` |

## Créditos e licenças

- Logo: fornecido pelo cliente. Capturas: dos sites desta série, feitos para
  os respectivos clientes.
- Ícones: criados para este projeto. Ícone do WhatsApp: Simple Icons (CC0).
- Outfit e Inter: SIL Open Font License 1.1, obtidas do Google Fonts e
  hospedadas localmente.

## Pendências

- **Publicar no domínio gostoudosite.com.br.** `canonical` e `og:image` já
  apontam para ele. Se o site for publicado em outro endereço antes, ajuste
  as duas tags no `<head>`.
- Logo em vetor (SVG), se existir, para substituir a versão recortada do PNG.
- Instagram, e-mail ou outro canal, se quiser mais de um contato.
- Depoimentos de clientes dos sites, com autorização, para uma seção de
  avaliações.
- Quando um cliente publicar o site no próprio domínio, atualizar o link do
  card e, se quiser, recapturar a miniatura.
