# Meu portfólio

Sou o **Matheus Maceu**, também conhecido como **K112p1**. Aqui eu reúno meus projetos, conto um pouco da minha trajetória e deixo meus contatos para quem quiser conversar sobre trabalho ou tecnologia.

**Acesse:** [matheusmaceu.github.io](https://matheusmaceu.github.io/)

O visual segue a estética **Dark Carnival Editorial**, com preto, vinho, tons de papel e referências discretas à uma banda que gosto. 

## Sobre o site

A base é **HTML, CSS e JavaScript puro**, com os scripts separados em módulos. O site é estático e pode ser publicado diretamente no GitHub Pages. Uso o Node.js apenas para rodar o servidor local e verificar os arquivos durante o desenvolvimento.

Além da página inicial, deixei um estudo de caso para cada projeto:

- [Página inicial](index.html): minha apresentação, trajetória, tecnologias, experiência, formação e contato.
- [INTEA](projetos/intea.html): a rede social para a comunidade autista que desenvolvemos em equipe como TCC na ETEC de Guaianazes.
- [Smart Waste](projetos/smart-waste.html): o projeto em equipe da SPTech sobre monitoramento de resíduos hospitalares, com dashboard e diagramas.

Nos estudos, explico o contexto de cada projeto e mostro algumas das minhas contribuições. O site também tem uma versão em inglês, e o download do currículo acompanha o idioma escolhido.

## Como rodar

Você precisa de **Node.js 18 ou superior** e npm. Dentro da pasta do repositório, rode:

```sh
npm start
```

Depois, abra [http://127.0.0.1:4182](http://127.0.0.1:4182). Para parar o servidor, use `Ctrl+C` no mesmo terminal. Se precisar de outra porta, defina a variável de ambiente `PORT` antes de iniciar.

Não há dependências npm para instalar nem uma etapa de build. O servidor local é necessário para carregar os módulos JavaScript pelo navegador; abrir o `index.html` diretamente por `file://` pode bloquear esse carregamento.

## Como organizei os arquivos

Separei o conteúdo, os estilos e as interações para facilitar as alterações. A estrutura é esta:

```text
.
├── index.html
├── projetos/
│   ├── intea.html
│   └── smart-waste.html
├── assets/
│   ├── documents/              # Meus currículos em português e inglês
│   ├── fonts/                  # Fontes locais e suas licenças
│   ├── icons/                  # Favicon e sprite SVG
│   └── images/
│       ├── decorative/         # Raios, selo e textura
│       └── projects/           # Dashboard, diagramas e capturas
│           ├── intea/
│           └── smart-waste/
├── css/
│   ├── main.css
│   ├── base/
│   ├── components/
│   ├── sections/
│   └── pages/
├── js/
│   ├── main.js
│   ├── navbar.js
│   ├── animations.js
│   ├── project-preview.js
│   ├── i18n.js
│   └── locales/
├── scripts/
│   ├── serve.mjs
│   └── check.mjs
├── .editorconfig
├── .gitattributes
├── .gitignore
├── .nojekyll
├── package.json
├── LICENSE
└── README.md
```

### As páginas e os arquivos de mídia

O `index.html` concentra as seções da home, com links que levam a cada uma delas. Os estudos ficam em `projetos/` e reaproveitam os estilos e as interações da página inicial.

Em `assets/`, guardei os arquivos usados no site: currículos em `documents/`, fontes em `fonts/`, ícones em `icons/` e imagens em `images/`.

Minha foto, `fotoCurriculo.jpeg`, fica diretamente em `assets/images/`, junto de `social-cover.png` e `social-cover.svg`, que são as capas de compartilhamento. As capturas do INTEA ficam em `projects/intea/`. No Smart Waste, o dashboard e os diagramas ficam em `projects/`, enquanto login e cadastro ficam na subpasta `smart-waste/`.

### Os estilos

O [css/main.css](css/main.css) reúne os imports. Dentro de `css/`, organizei assim:

- `base/`: cores, medidas, reset, fontes e animações. As configurações principais ficam em `variables.css`; as fontes são declaradas em `typography.css`.
- `components/`: botões, cabeçalho, rodapé e visualizadores de imagem.
- `sections/`: estilos de cada seção da home, como apresentação, sobre, projetos e contato.
- `pages/`: estilos dos estudos de caso.

Deixei os ajustes responsivos junto dos estilos de cada módulo. Os estudos usam `case-study.css`, e o Smart Waste carrega também `smart-waste.css` para ajustar o título mais longo.

### As interações

Cada módulo em `js/` cuida de uma parte do site:

| Arquivo | O que faz |
| --- | --- |
| [main.js](js/main.js) | Inicializa os outros módulos e atualiza o ano do rodapé. |
| [navbar.js](js/navbar.js) | Abre e fecha o menu mobile, controla o foco e indica a seção atual. |
| [animations.js](js/animations.js) | Revela os elementos durante a rolagem com `IntersectionObserver`. |
| [project-preview.js](js/project-preview.js) | Abre as imagens do Smart Waste e devolve o foco ao botão usado para abrir. |
| [i18n.js](js/i18n.js) | Faz a troca de idioma, incluindo textos, descrições de imagens, metadados e currículo. |
| `locales/` | Guarda as traduções em inglês, separadas por página. |

O menu mobile aparece em telas de até 1024 pixels. Escape fecha o menu, e o controle de foco mantém a navegação no cabeçalho enquanto ele está aberto.

Para visualizar as imagens, usei o `<dialog>` nativo do navegador. Dá para fechar pelo botão, pela tecla Escape ou clicando no fundo externo. Os botões de abertura aparecem quando o navegador oferece suporte a `showModal()`.

As animações respeitam `prefers-reduced-motion`. Quando essa preferência está ativa, o conteúdo continua visível, sem os efeitos de movimento.

### Os scripts e as configurações

Em `scripts/`, deixei duas ferramentas: [serve.mjs](scripts/serve.mjs), que inicia o servidor local, e [check.mjs](scripts/check.mjs), que verifica as referências e outras partes do código. Os comandos para usar os dois ficam no [package.json](package.json), junto da versão mínima do Node e da configuração de módulos ES.

O `.editorconfig` define UTF-8, indentação e quebras de linha. O `.gitattributes` cuida do tratamento dos arquivos pelo Git, e o `.gitignore` separa o que fica só no ambiente local. Já o `.nojekyll` é usado na publicação para desativar o processamento do Jekyll.

Esses arquivos fazem parte do repositório. O servidor em Node é uma ferramenta local; o GitHub Pages serve os arquivos estáticos do site.

## Como funciona a troca de idioma

Deixei o português brasileiro como padrão. Ao clicar em **EN / PT**, o site troca o idioma e guarda a escolha em `localStorage`, na chave `pp2-language`. Assim, ele lembra a preferência ao abrir outra página ou recarregar. Se o navegador bloquear o armazenamento, ainda dá para trocar o idioma na página atual.

Os textos em português ficam no próprio HTML. As traduções estão em `js/locales/`:

- `common.en.js`: textos compartilhados, como navegação e botões.
- `home.en.js`: página inicial.
- `intea.en.js`: estudo do INTEA.
- `smart-waste.en.js`: estudo do Smart Waste.

Para ligar um trecho à tradução, uso `data-i18n`:

```html
<span data-i18n="home.exploreProjects">Explorar projetos</span>
```

Os atributos `data-i18n-alt`, `data-i18n-aria-label`, `data-i18n-content` e `data-i18n-title` fazem o mesmo para descrições e outros atributos. Ao editar um texto, é preciso atualizar também sua tradução. Nos elementos com ícones ou links internos, mantenha o texto traduzível em um elemento separado.

A tradução acontece no navegador, então o HTML inicial e os metadados chegam em português. Os dois idiomas usam os mesmos endereços. As capturas e os diagramas continuam com o texto original, e as descrições em inglês avisam isso.

### Os currículos

Guardei as duas versões em `assets/documents/`:

- Português: `Matheus_Maceu_CV_com_foto.pdf`.
- Inglês: `Matheus_Maceu_CV_EN.pdf`.

Nos dois links de download da home, `href` aponta para o currículo em português e `data-cv-en-href` aponta para o inglês. O script troca o arquivo, o nome do download e o `hreflang` conforme o idioma.

Os PDFs são arquivos prontos, atualizados separadamente. Sem JavaScript, os textos e os downloads em português continuam disponíveis.

## Onde mexer para atualizar o site

Caso queira utilizar como base o que fiz: Para mudar meus textos ou contatos, edito o `index.html` e o dicionário da home. Nos estudos de caso, faço a alteração no HTML da página e na tradução correspondente.

Para trocar a foto, basta substituir `assets/images/fotoCurriculo.jpeg`. O enquadramento e o tratamento visual ficam em `css/sections/hero.css`. Se a nova imagem tiver outras dimensões, atualize `width`, `height` e o texto alternativo no HTML.

Ao atualizar os currículos, mantenha as duas versões sincronizadas. Se os arquivos mudarem de nome, ajuste `href`, `data-cv-en-href` e `download` nos links da home.

As cores, medidas e famílias tipográficas ficam em `css/base/variables.css`; os arquivos das fontes são declarados em `css/base/typography.css`. Os ícones ficam em `assets/icons/sprite.svg`, e o favicon em `assets/icons/favicon.svg`.

A capa de compartilhamento tem uma versão editável em `assets/images/social-cover.svg`. Ao mudar a arte, atualize também o PNG. Se substituir outras imagens, confira as dimensões, as descrições e os metadados que apontam para elas.

Para adicionar um projeto, inclua sua apresentação na home e os materiais em `assets/images/projects/`. Se houver um novo estudo de caso, coloque o HTML em `projetos/`. Uma página traduzida precisa de um `data-page` no `<body>`, de seu dicionário e dos registros correspondentes em `js/i18n.js` e `scripts/check.mjs`.

## Como verificar as alterações

Incluí um verificador que pode ser executado na raiz do repositório:

```sh
npm run check
```

Ele começa pela home e percorre os arquivos referenciados, incluindo os estudos. Confere arquivos ausentes, âncoras, símbolos SVG, imports CSS e JavaScript, sintaxe dos módulos, imagens, referências ARIA e algumas regras básicas de HTML.

Também verifica os atributos dos links que abrem em outra aba, as chaves de tradução e os metadados `canonical`, `og:url` e `og:image`.

Esse comando trabalha com os arquivos locais e não acessa os links externos. A parte visual e o comportamento por teclado precisam ser conferidos no navegador, incluindo menu mobile, imagens, zoom, movimento reduzido e leitor de tela.

## Como publicar

Caso queira utilizar como base o que fiz: preparei o projeto para usar **https://matheusmaceu.github.io/**, com o `index.html` na raiz e as pastas `assets/`, `css/`, `js/` e `projetos/` ao lado.

Para publicar pelo GitHub Pages:

1. Envie os arquivos para a branch de publicação.
2. Abra **Settings → Pages** no repositório.
3. Em **Source**, escolha **Deploy from a branch**.
4. Selecione a branch, a pasta **/ (root)** e salve.

Mantenha o `.nojekyll` na raiz. O projeto não precisa de um comando de build. Os detalhes dessa configuração estão na documentação do GitHub sobre [fonte de publicação](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) e [arquivos estáticos](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site#static-site-generators).

Os metadados já usam o endereço acima. Se o domínio ou a pasta de publicação mudar, atualize os três HTML e a constante `siteUrl` em `scripts/check.mjs`.

## Fontes e licença

Usei **Barlow Condensed**, **Cormorant Garamond** e **Manrope**, com os arquivos hospedados no próprio projeto. Os créditos e as licenças estão na [documentação das fontes](assets/fonts/README-fontes-pp2.md).

O código está sob a [licença MIT](LICENSE). As fontes mantêm suas próprias licenças em `assets/fonts/`.
