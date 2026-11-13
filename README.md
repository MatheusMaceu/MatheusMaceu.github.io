# Portfólio de Matheus Maceu

Portfólio pessoal de **Matheus Maceu**, também conhecido como **K112p1**. Reúne apresentação, trajetória, tecnologias, experiência, formação e estudos de caso de projetos acadêmicos.

**Endereço do portfólio:** [matheusmaceu.github.io](https://matheusmaceu.github.io/)

A identidade **Dark Carnival Editorial** combina fundos escuros, vinho, tons de papel e contraste entre tipografia condensada e serifada. As referências à estética alternativa aparecem nos ornamentos e na composição.

## Visão geral

O site usa **HTML5, CSS3 e JavaScript com módulos ES**, com arquivos estáticos servidos diretamente pelo GitHub Pages. Node.js é utilizado nas ferramentas de desenvolvimento local e verificação.

| Página | Arquivo | Conteúdo |
| --- | --- | --- |
| Página inicial | [index.html](index.html) | Apresentação, sobre, projetos, tecnologias, experiência, formação e contato. |
| INTEA | [projetos/intea.html](projetos/intea.html) | Estudo de caso da rede social para a comunidade autista, com telas, contexto e contribuições. |
| Smart Waste | [projetos/smart-waste.html](projetos/smart-waste.html) | Estudo de caso do monitoramento de resíduos hospitalares, com dashboard, diagramas e contribuições. |

As páginas oferecem alternância entre português e inglês. Os links de currículo acompanham o idioma selecionado. O cabeçalho mantém a navegação acessível durante a rolagem e apresenta um menu em telas menores.

## Executar localmente

É necessário ter **Node.js 18 ou superior**, com npm disponível.

Na raiz do repositório, execute:

```sh
npm start
```

Abra [http://127.0.0.1:4182](http://127.0.0.1:4182). Para encerrar o servidor, use `Ctrl+C` no terminal em que ele foi iniciado. A variável de ambiente `PORT` permite escolher outra porta.

O projeto não possui dependências npm nem etapa de build, portanto não exige `npm install`. Use o servidor HTTP para carregar os módulos JavaScript; abrir o HTML diretamente por `file://` pode impedir seu carregamento.

## Estrutura do projeto

```text
.
├── index.html
├── projetos/
│   ├── intea.html
│   └── smart-waste.html
├── assets/
│   ├── documents/              # Currículos em português e inglês
│   ├── fonts/                  # Fontes WOFF2, créditos e licenças
│   ├── icons/                  # Favicon e sprite SVG
│   └── images/
│       ├── decorative/         # Raios, selo e textura
│       └── projects/           # Dashboard, diagramas e capturas dos projetos
│           ├── intea/
│           └── smart-waste/
├── css/
│   ├── main.css                # Entrada dos estilos compartilhados
│   ├── base/                   # Variáveis, reset, tipografia e animações
│   ├── components/             # Botões, cabeçalho, rodapé e visualizadores
│   ├── sections/               # Estilos de cada seção da página inicial
│   └── pages/                  # Composição dos estudos de caso
├── js/
│   ├── main.js
│   ├── navbar.js
│   ├── animations.js
│   ├── project-preview.js
│   ├── i18n.js
│   └── locales/                # Dicionários em inglês
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

A fotografia `fotoCurriculo.jpeg` e as capas `social-cover.png` e `social-cover.svg` ficam diretamente em `assets/images/`.

### HTML e conteúdo

A página inicial usa âncoras para navegar entre suas seções. Os estudos de caso são documentos HTML próprios e compartilham cabeçalho, rodapé, estilos e interações com a home.

Os textos originais em português ficam no HTML. Imagens têm dimensões declaradas e textos alternativos; elementos ornamentais usam marcação decorativa.

### CSS

[css/main.css](css/main.css) importa os estilos na ordem: fundamentos, componentes, seções e movimento. Os estudos carregam também `css/pages/case-study.css`; o Smart Waste inclui `css/pages/smart-waste.css` para ajustar seu título.

- `base/variables.css`: cores, famílias tipográficas, espaçamento, largura de conteúdo e transições.
- `base/reset.css`: normalização, estrutura global e utilitários de acessibilidade.
- `base/typography.css`: fontes locais e regras de texto.
- `base/animations.css`: entrada e revelação de conteúdo, incluindo movimento reduzido.
- `components/`: componentes compartilhados pelas páginas.
- `sections/`: apresentação, sobre, projetos, tecnologias, experiência, formação e contato.
- `pages/`: regras específicas para a leitura dos estudos de caso.

Os ajustes responsivos ficam junto dos estilos de cada módulo.

### JavaScript

| Módulo | Responsabilidade |
| --- | --- |
| [main.js](js/main.js) | Inicializa as interações e atualiza o ano do rodapé. |
| [navbar.js](js/navbar.js) | Controla o menu mobile, foco, fechamento com Escape e indicação da seção ativa. |
| [animations.js](js/animations.js) | Revela elementos durante a rolagem usando `IntersectionObserver`. |
| [project-preview.js](js/project-preview.js) | Abre as imagens em diálogos nativos e devolve o foco ao acionador ao fechar. |
| [i18n.js](js/i18n.js) | Alterna textos, atributos acessíveis, metadados e links de currículo entre os idiomas. |
| `locales/` | Reúne traduções comuns e específicas da home, do INTEA e do Smart Waste. |

O menu mobile é ativado até 1024 pixels de largura. Enquanto está aberto, o conteúdo principal e o rodapé ficam inertes; Tab, Shift+Tab e Escape participam do controle de foco.

Os visualizadores usam `<dialog>` e `showModal()`. O fechamento ocorre pelo botão, pelo fundo externo ou pelo Escape nativo do navegador. Os controles de abertura são exibidos quando a API está disponível.

O conteúdo nasce visível antes das animações. A preferência `prefers-reduced-motion` desativa movimento e transições.

### Ferramentas e configurações

| Arquivo | Uso |
| --- | --- |
| [scripts/serve.mjs](scripts/serve.mjs) | Servidor HTTP local em `127.0.0.1`, com tipos de conteúdo adequados aos arquivos do site. |
| [scripts/check.mjs](scripts/check.mjs) | Verificador de arquivos, referências, módulos, traduções e metadados. |
| [package.json](package.json) | Comandos `start` e `check`, versão mínima do Node e definição de módulos ES. |
| [.editorconfig](.editorconfig) | UTF-8, indentação com espaços e quebras de linha LF. |
| [.gitattributes](.gitattributes) | Tratamento de texto e preservação dos arquivos binários pelo Git. |
| [.gitignore](.gitignore) | Exclusões de dependências e arquivos locais. |
| [.nojekyll](.nojekyll) | Desativa o processamento do Jekyll na publicação estática a partir de uma branch. |

Os scripts e o `package.json` fazem parte do repositório. O servidor local não é executado pelo GitHub Pages.

## Idiomas e currículos

O português brasileiro é o padrão. O botão **EN / PT** troca o idioma da página e salva a escolha em `localStorage`, na chave `pp2-language`. A preferência é retomada ao navegar entre páginas e recarregar. Com o armazenamento bloqueado, a troca ainda funciona na página atual.

A tradução é aplicada no navegador. O HTML inicial e seus metadados são entregues em português, e os dois idiomas usam os mesmos endereços públicos. Capturas e diagramas mantêm seus textos originais; as descrições em inglês identificam isso.

Para editar uma tradução, altere o texto em português no HTML e a chave correspondente em:

- `js/locales/common.en.js`: navegação e rótulos compartilhados.
- `js/locales/home.en.js`: página inicial.
- `js/locales/intea.en.js`: estudo do INTEA.
- `js/locales/smart-waste.en.js`: estudo do Smart Waste.

`data-i18n` identifica o texto traduzível:

```html
<span data-i18n="home.exploreProjects">Explorar projetos</span>
```

Os marcadores `data-i18n-alt`, `data-i18n-aria-label`, `data-i18n-content` e `data-i18n-title` traduzem atributos. Aplique `data-i18n` apenas a trechos de texto, preservando ícones, links e ênfases em elementos separados.

Os currículos ficam em `assets/documents/`:

| Idioma | Arquivo |
| --- | --- |
| Português | `Matheus_Maceu_CV_com_foto.pdf` |
| Inglês | `Matheus_Maceu_CV_EN.pdf` |

Nos dois links da home, `href` aponta para o PDF em português e `data-cv-en-href` aponta para o inglês. A troca de idioma atualiza também o nome do download e o atributo `hreflang`. Os PDFs são arquivos prontos, mantidos separadamente do código. Sem JavaScript, o conteúdo e os downloads em português permanecem disponíveis.

## Personalizar

| Alteração | Onde editar |
| --- | --- |
| Textos, contatos e seções da home | `index.html` e seu dicionário em inglês. |
| Conteúdo dos estudos | `projetos/intea.html`, `projetos/smart-waste.html` e seus dicionários. |
| Fotografia | `assets/images/fotoCurriculo.jpeg`; enquadramento e tratamento visual em `css/sections/hero.css`. |
| Currículos | Os dois PDFs em `assets/documents/`. Se renomeados, atualizar `href`, `data-cv-en-href` e `download` nos links da home. |
| Capturas do INTEA | `assets/images/projects/intea/`. |
| Materiais do Smart Waste | Dashboard e diagramas em `assets/images/projects/`; login e cadastro na subpasta `smart-waste/`. |
| Cores, medidas e fontes | `css/base/variables.css` e `css/base/typography.css`. |
| Ícones | `assets/icons/sprite.svg` e `assets/icons/favicon.svg`. |
| Capa de compartilhamento | `assets/images/social-cover.svg` e seu PNG correspondente. |

Ao substituir uma imagem, confira as dimensões `width` e `height`, o texto alternativo e, quando aplicável, os metadados de compartilhamento. Mantenha o conteúdo dos dois idiomas e dos currículos sincronizado.

Para incluir outro projeto, adicione sua apresentação à home, seus materiais em `assets/images/projects/` e, se necessário, um estudo em `projetos/`. Novas páginas traduzidas precisam de um identificador em `data-page` no `<body>`, de um dicionário e de registro no carregador de idiomas em `js/i18n.js` e na relação de páginas em `scripts/check.mjs`.

## Verificar o projeto

Na raiz do repositório:

```sh
npm run check
```

O comando parte da home e percorre os arquivos locais referenciados, incluindo os estudos de caso. Confere:

- Existência de arquivos, âncoras e símbolos SVG.
- Imports CSS e JavaScript, inclusive os imports dinâmicos de tradução, e sintaxe JavaScript.
- IDs, referências ARIA, textos alternativos e dimensões de imagens.
- Regras básicas de semântica, botões, ordem de foco e permissão de zoom.
- Atributos de segurança dos links que abrem em outra aba.
- Traduções inglesas ausentes, vazias ou chaves locais sem uso.
- `canonical`, `og:url` e caminhos das imagens de compartilhamento.

A verificação usa arquivos locais e não consulta a disponibilidade de sites externos. Complemente o comando com revisão no navegador: teclado, menu mobile, visualizadores, zoom, movimento reduzido e leitor de tela.

## Publicar no GitHub Pages

A estrutura está preparada para **https://matheusmaceu.github.io/**, com `index.html` na raiz da fonte de publicação e as pastas `assets/`, `css/`, `js/` e `projetos/` ao lado.

1. Envie os arquivos do projeto para a branch de publicação.
2. No repositório, abra **Settings → Pages**.
3. Em **Source**, selecione **Deploy from a branch**.
4. Escolha a branch e a pasta **/ (root)** e salve.

Mantenha o arquivo `.nojekyll` na raiz. Não há comando de build próprio do projeto. Consulte a documentação do GitHub sobre [fonte de publicação](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) e [publicação de arquivos estáticos](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site#static-site-generators).

Cada página já contém seu `canonical`, `og:url` e uma imagem Open Graph com URL absoluta. Se o domínio ou o caminho de publicação mudar, atualize os metadados nos três HTML e a constante `siteUrl` em `scripts/check.mjs`.

## Fontes e licença

A tipografia utiliza **Barlow Condensed**, **Cormorant Garamond** e **Manrope**, hospedadas no próprio projeto. As origens e licenças estão na [documentação das fontes](assets/fonts/README-fontes-pp2.md).

O código do portfólio é distribuído sob a [licença MIT](LICENSE). As fontes preservam suas licenças específicas incluídas em `assets/fonts/`.
