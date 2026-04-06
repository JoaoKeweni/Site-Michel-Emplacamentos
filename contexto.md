# Contexto do Projeto - Michel Emplacamentos

## Informações Gerais
- **Nome:** Michel Emplacamentos
- **Tipo:** Site Institucional (Single-Page Application)
- **Público-alvo:** Despachantes que querem vender ANTT e cursos em seus escritórios; pessoas interessadas em serviços gerais de despachante.
- **Tecnologias Base:** HTML5 Semântico, CSS3 (Vanilla), JavaScript Vanilla (ES6+).
- **Metodologia de Desenvolvimento:** Pair programming com Inteligência Artificial, modelo ágil e desenvolvimento iterativo.

---

## Paleta de Cores
| Cor          | Hex       | Uso Principal                        |
|--------------|-----------|--------------------------------------|
| Azul         | `#1e3c8a` | Cor principal (headers, CTAs, links) |
| Amarelo      | `#fefa0a` | Destaques, botões, hover, acentos    |
| Branco       | `#ffffff` | Backgrounds, textos sobre fundo escuro, SVGs no Hover |
| Azul escuro  | `#142a5e` | Gradientes, footer, estados hover    |
| Cinza claro  | `#f5f5f5` | Backgrounds de seções alternadas     |
| Cinza texto  | `#333333` | Texto principal do corpo             |

---

## Tipografia
- **Títulos:** Montserrat (Bold/ExtraBold) — Google Fonts
- **Corpo:** Inter (Regular/Medium) — Google Fonts

---

## Estrutura de Páginas (Navegação)
Rolagem suave (Smooth Scroll) por âncoras com cabeçalho fixo (glassmorphism dinâmico).

### 1. Home (Hero)
- Banner com gradiente azul e overlay visual.
- Chamada principal focada em agilidade e segurança veicular.

### 2. Sobre Nós
- **Componente Dinâmico (Slider Automático):** Exibição de 5 imagens principais da corporação (`foto-michel.jpg`, `foto-equipe.jpg`, `foto-fachada.jpg`, `foto-sistema.jpg`, `foto-emplacamento.jpg`) em um carrossel flexível. A transição ocorre nativamente via JS a cada 4s, com suporte a marcadores clicáveis (Dots).

### 3. ANTT e 4. Serviços Gerais
- Descrição de RNTRC, TAC, ETC e demais serviços de regularização veicular e CNH.
- Cards/Grids com ícones SVGs monocromáticos padronizados que herdam a cor do texto e se tornam brancos ao passar o mouse.

### 5. AET e 6. Cursos
- Cursos e despachante parceiro. (Layout em Accordion expansível em `cursos.html`).

### 7. Contato e Envio de Documentações
- **Integração Backend (FormSubmit):** Todos os envios do formulário de contato são empacotados via `FormData` e submetidos via AJAX (`fetch`) diretamente para a API `https://formsubmit.co/ajax/emplacamentosmichel@gmail.com`.
- **Anexos (*Em Andamento*):** O formulário (`enctype="multipart/form-data"`) está preparado estruturalmente para permitir ao cliente fazer upload de PDFs ou imagens.
- Feedback em tela assíncrono: Animação de `Enviando...` sem recarregamento da página (Single Page Experience) seguido de painel de Sucesso.

---

## Padrão Visual e Ícones (Crucial para IA)
- **Sem Emojis Nativos:** Todos os emojis no sistema (telefone, checagens, alvos e marcadores) foram substituídos por **Ícones Vetoriais SVG (Material UI style)** usando atributos nativos `width="1em" height="1em" style="fill: currentColor; vertical-align: middle;"`. 
- Isso garante que a coloração do ícone obedeça completamente as regras do CSS da classe contêiner.
- **Hover States:** Na interação (ex: `.value-item:hover` ou `.service-card:hover`), os ícones SVG efetuam um `fill: var(--color-white) !important` para contrastar com os *backgrounds* azuis gerados sob demanda.
- **Micro-animações (IntersectionObserver):** Classes assíncronas de revelação (`.reveal`, `.reveal-left`, `.reveal-right`) expõem o DOM à medida que a janela avança. O botão do Whatsapp (`.whatsapp-float`) utiliza a animação `@keyframes pulse`.

---

## Arquivos Estruturais
- `index.html`: Página base.
- `cursos.html`: Sub-página independente.
- `styles.css`: Único arquivo de estilos concentrando CSS Variables e responsividade estrita (*Mobile-first rules at the bottom*).
- `script.js`: Lógica do IntersectionObserver, Máscara de Telefone, FormSubmit AJAX e Carrossel de Imagens (Sobre Nós).
