# 📖 Vocab Memory

Aplicação front-end desenvolvida para a disciplina **Front-end Engineering** (FIAP). O projeto consome um **BFF (Backend For Frontend)** em Node.js/Express integrado à OpenAI para buscar palavras em inglês por tema, e transforma o resultado em um **jogo da memória**: o jogador combina cada palavra ao seu significado.

> ⚠️ **Preencha os campos marcados com `[ ]` antes de entregar o trabalho.**

## 👥 Integrantes

- [ ] Nome completo do integrante 1
- [ ] Nome completo do integrante 2
- [ ] Nome completo do integrante 3

## 🎯 Finalidade do projeto

O app oferece uma interface para:

1. O usuário digitar um tema/assunto (ex.: "viagens", "tecnologia");
2. A aplicação enviar esse tema ao BFF de palavras (`GET /ask`);
3. O BFF devolver um array de objetos no formato abaixo;
4. A aplicação montar um **jogo da memória**: cada palavra vira duas cartas — uma com a palavra em inglês e outra com seu significado — que o jogador precisa encontrar e combinar. Ao acertar um par, o exemplo de uso (`useCase`) é exibido no painel lateral.

```json
[
  {
    "word": "Journey",
    "description": "A trip from one place to another.",
    "useCase": "Our journey to the mountains took six hours."
  }
]
```

## 🎮 Como jogar

1. Clique em "Buscar palavras e jogar" — a aplicação busca palavras direto no BFF, sem precisar digitar nenhum tema.
2. As cartas aparecem viradas para baixo, embaralhadas.
3. Clique em duas cartas por vez: se uma "Palavra" e uma "Significado" pertencerem à mesma entrada, o par fica combinado e você vê um exemplo de uso da palavra.
4. Se não combinarem, as cartas voltam a ficar viradas para baixo.
5. O jogo termina quando todos os pares forem encontrados, mostrando tempo total e número de tentativas.
6. É possível jogar de novo com as mesmas palavras (embaralhadas) ou buscar um novo conjunto de palavras no BFF.

## 🧱 Stack utilizada

| Camada       | Tecnologia                          |
| ------------ | ------------------------------------ |
| Framework    | React 18 + Vite                      |
| Estilização  | Tailwind CSS                         |
| Ícones       | lucide-react                         |
| BFF consumido| [fiap-bff](https://github.com/jaisonschmidt/fiap-bff) (Node.js + Express + OpenAI) |
| Deploy       | [ ] Netlify / Vercel / Render (escolher um) |

## 📂 Estrutura do projeto

```
vocab-app/
├── index.html
├── src/
│   ├── App.jsx                    # Botão de busca + jogo da memória + conclusão
│   ├── main.jsx                   # Bootstrap do React
│   ├── index.css                  # Diretivas Tailwind + animações
│   ├── lib/
│   │   ├── api.js                 # Cliente HTTP para o BFF
│   │   └── memoryDeck.js          # Monta e embaralha o baralho do jogo
│   └── components/
│       ├── MemoryCard.jsx         # Carta com efeito de virada 3D
│       ├── GameStats.jsx          # Cronômetro, tentativas, pares
│       ├── InfoPanel.jsx          # Último par encontrado + exemplo de uso
│       └── CompletionModal.jsx    # Tela de fim de jogo
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

## ▶️ Como executar localmente

Pré-requisitos: [Node.js](https://nodejs.org/) 18+ instalado.

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em modo desenvolvimento
npm run dev

# 3. Abrir no navegador
# http://localhost:5173
```

Para gerar a build de produção:

```bash
npm run build
npm run preview   # opcional: testa a build localmente
```

## 🔌 Configuração do BFF

Por padrão, a aplicação já aponta para o BFF criado em aula, usando **GET**:

```
https://fiap-bff-10aojr.onrender.com/ask
```

Endpoint e método ficam fixos como constantes em `src/App.jsx` (`BFF_ENDPOINT` e `BFF_METHOD`) — não há tela de configuração. Caso seu grupo faça o deploy de uma **API própria** (ver seção abaixo), basta trocar esses valores diretamente no código.

## ☁️ Deploy

1. Suba o projeto para um repositório público no GitHub.
2. Conecte o repositório à plataforma de deploy escolhida (Netlify, Vercel ou Render).
3. Configure o **comando de build** como `npm run build` e o **diretório de saída** como `dist`.
4. [ ] Preencher aqui a URL pública do site após o deploy: `https://SEU-SITE.exemplo.com`

## 🔗 API própria (ponto extra)

- [ ] Repositório da API própria: `https://github.com/SEU-USUARIO/SEU-REPO`
- [ ] URL pública da API própria: `https://SUA-API.exemplo.com`

## 📊 Web Vitals (Lighthouse) — ponto extra

> Rode uma auditoria no [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview) (aba *Lighthouse* do DevTools do Chrome, ou [PageSpeed Insights](https://pagespeed.web.dev/)) sobre a URL publicada e cole o print/PDF do relatório abaixo.

[ ] _Inserir aqui o print ou PDF do relatório do Lighthouse_

### O que cada métrica significa

| Métrica | O que mede |
| --- | --- |
| **LCP** (*Largest Contentful Paint*) | Tempo até o maior elemento visível da página (ex.: título, imagem principal) ser renderizado. Indica a percepção de "carregamento rápido". |
| **CLS** (*Cumulative Layout Shift*) | Quanto os elementos da tela "pulam" de posição durante o carregamento. Valores altos indicam uma experiência instável/visualmente incômoda. |
| **INP** (*Interaction to Next Paint*) | Tempo entre uma interação do usuário (clique, toque) e a próxima atualização visual da tela. Mede a responsividade da interface. |
| **FCP** (*First Contentful Paint*) | Tempo até o primeiro conteúdo (texto, imagem) aparecer na tela. |
| **TBT** (*Total Blocking Time*) | Tempo total em que a thread principal ficou bloqueada, impedindo o navegador de responder a interações do usuário. |
| **Speed Index** | Velocidade com que o conteúdo visível da página é preenchido durante o carregamento. |

## 📝 Licença

Projeto acadêmico desenvolvido para fins educacionais na FIAP.
