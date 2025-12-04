# projeto-jogo-forca
 Um jogo da forca básico
Projeto educativo: Jogo da Forca em HTML, CSS e JavaScript puro

**Descrição rápida**: Projeto para treinar conceitos fundamentais e avançados de front-end usando apenas HTML, CSS e JavaScript sem frameworks. Contém um jogo da forca com canvas para desenho, teclado virtual, suporte a teclado físico, modal de resultado, toasts e responsividade básica.

**Propósito**
- **Treinamento**: praticar estruturação de HTML, layout responsivo com CSS e lógica de jogo em JavaScript puro.
- **Conceitos avançados**: manipulação do DOM, módulos ES6 (`type="module"`), canvas 2D, normalização de strings (remoção de acentos), controle de estado do jogo sem reload e acessibilidade básica (suporte a teclado).

**Tecnologias usadas**
- **HTML5**: marcação sem dependências externas.
- **CSS3**: layout responsivo, media queries e pequenos componentes visuais (modal, toast).
- **JavaScript (ES6 modules)**: módulos separados em `assets-scripts/` para lógica, dados e UI.
- **Canvas API**: desenho do boneco e background responsivo.

**Funcionalidades principais**
- **Seleção aleatória de palavras**: categorias e palavras em `assets-scripts/objeto-palavras.js`.
- **Normalização de caracteres**: palavras com acentos aceitam chutes sem acento.
- **Keyboard friendly**: dá pra jogar clicando nos botões ou usando o teclado físico.
- **Canvas responsivo**: os desenhos do boneco se ajustam ao tamanho do canvas quando a janela muda de tamanho.
- **Modal de resultado**: mensagem de vitória/derrota com opção de reiniciar sem recarregar a página.
- **Toast (substitui alert)**: mensagens de feedback não-intrusivas.
- **Reinício sem reload**: `resetGame()` reinicializa o estado internamente.

**Estrutura do projeto (resumo)**
- `index.html` — página principal do jogo.
- `style/style.css` — estilos principais e media queries.
- `assets-scripts/` — scripts JS:
	- `box-letters-game.js` — lógica principal do jogo (módulo).
	- `canvas.js` — funções de desenho no canvas.
	- `janela-modal.js` — cria modal de vitória/derrota.
	- `objeto-palavras.js` — lista de categorias e palavras.
- `assests/` — imagens e ativos (ex.: `estaca-forca.png`).
- `teste/` — versão de testes e experimentos do layout.

**Como rodar localmente (rápido)**
1. Abra um terminal na pasta do projeto (`projeto-jogo-forca`).
2. Inicie um servidor estático (ex.: Python):
```powershell
python -m http.server 8000
```
3. Abra no navegador: `http://localhost:8000/index.html`.

Observação: é necessário servir por HTTP por conta de módulos ES6 (import/export).
**Como rodar (Desenvolvimento e Build)**

Recomendo ter instalados: `Node.js` (v16+), `npm` e `Python 3`.

1) Instalar dependências (uma vez):
```powershell
npm install
```

2) Modo desenvolvimento (recomendo abrir dois terminais):
- Terminal A — roda o bundler em modo watch (recompila o JS quando salvar):
```powershell
npm run dev
```
- Terminal B — serve os arquivos da raiz do projeto via HTTP (necessário para ES modules):
```powershell
# a partir da pasta do projeto
python -m http.server 8000
```
Abra no navegador: `http://localhost:8000/index.html`

3) Gerar build para produção (produz `dist/`):
```powershell
npm run build
```

4) Testar o build gerado (serve a pasta `dist`):
```powershell
cd dist
python -m http.server 8000
# acessar: http://localhost:8000
```

Observação: o projeto usa módulos ES6 (import/export). Por isso é necessário servir os arquivos por HTTP — abrir o arquivo `index.html` diretamente com `file://` não funcionará.

**Configuração para deploy (Vercel)**
- Se for publicar no Vercel, use estas configurações no painel ao importar o repositório:
	- **Build command:** `npm run build`
	- **Output Directory:** `dist`
	- **Framework Preset:** Other

Vercel executará `npm install` e `npm run build` automaticamente e servirá o conteúdo da pasta `dist`.

**Como jogar**
- Ao abrir, será exibida uma categoria e espaços para as letras.
- Clique nas letras na tela ou pressione a tecla correspondente no teclado.
- Letras corretas são reveladas; letras erradas desenham partes do boneco.
- Ao esgotar tentativas aparece modal de derrota com a palavra; ao revelar todas as letras aparece modal de vitória.
- Use o ícone de "Novo Jogo" (gamepad) ou o botão do modal para reiniciar sem recarregar.

**Boas práticas e melhorias sugeridas**
- Mover estilos do modal para o CSS em vez de inline para facilitar customização.
- Adicionar testes automatizados (unitários para funções utilitárias).
- Melhorar acessibilidade do modal (focus trapping, labels ARIA).
- Adicionar persistência (localStorage) para histórico de partidas/placares.

**Licença & créditos**
- Veja o arquivo `LICENSE` no repositório para detalhes da licença.
- Desenvolvedor: Wesley (autor do repositório). Código escrito em JavaScript puro.

Se quiser, posso também: criar um `CONTRIBUTING.md`, mover estilos inline do modal para o CSS, ou criar um branch com essas alterações. Diga qual tarefa prefere seguir em seguida.

*** 
Última atualização: alterações para responsividade, modal com callback de reinício, toasts e suporte a teclado.
