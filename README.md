# 📖 Vocab Memory

Aplicação front-end desenvolvida para a disciplina **Front-end Engineering** (FIAP). O projeto consome um **BFF (Backend For Frontend)** em Node.js/Express integrado à OpenAI para buscar palavras em inglês, e transforma o resultado em um **jogo da memória**: o jogador combina cada palavra ao seu significado.

## 👥 Integrantes

- Ailton Lima de Andrade - RM365720
- Julio Cezar Fagundes de Oliveira - RM369185
- Kauê Fornielles de Abreu - RM368524

## 🎯 Finalidade do projeto

O app oferece uma interface para:

1. A aplicação enviar esse tema ao BFF de palavras (`GET /ask`);
2. O BFF devolver um array de objetos no formato abaixo;
3. A aplicação montar um **jogo da memória**: cada palavra vira duas cartas — uma com a palavra em inglês e outra com seu significado — que o jogador precisa encontrar e combinar. Ao acertar um par, o exemplo de uso (`useCase`) é exibido no painel lateral.

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
| Deploy       | Vercel                               |

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
4. [ ] Preencher aqui a URL pública do site após o deploy: `https://frontend-fiap-cltg4cs3n-kauefor.vercel.app/`


## 📊 Web Vitals (Lighthouse) — ponto extra

> Auditoria executada utilizando o Lighthouse do Chrome

Métricas
[Monitoring.pdf](https://github.com/user-attachments/files/31958773/Monitoring.pdf)

<img width="886" height="442" alt="image" src="https://github.com/user-attachments/assets/c30a9935-33dd-4e2b-80c7-35af9a17b685" />
<img width="886" height="435" alt="image" src="https://github.com/user-attachments/assets/82f3d962-26b8-4487-aca1-07c449904c7c" />
### O que cada métrica significa

| Métrica | O que mede |
| --- | --- |
| **LCP** (*Largest Contentful Paint*) | Tempo até o maior elemento visível da página (ex.: título, imagem principal) ser renderizado. Indica a percepção de "carregamento rápido". |
| **CLS** (*Cumulative Layout Shift*) | Quanto os elementos da tela "pulam" de posição durante o carregamento. Valores altos indicam uma experiência instável/visualmente incômoda. |
| **FCP** (*First Contentful Paint*) | Tempo até o primeiro conteúdo (texto, imagem) aparecer na tela. |
| **TBT** (*Total Blocking Time*) | Tempo total em que a thread principal ficou bloqueada, impedindo o navegador de responder a interações do usuário. |
| **Speed Index** | Velocidade com que o conteúdo visível da página é preenchido durante o carregamento. |

<img width="886" height="436" alt="image" src="https://github.com/user-attachments/assets/01c13bdb-da07-4320-b33a-4e517c87858b" />
<img width="886" height="431" alt="image" src="https://github.com/user-attachments/assets/0bbaa559-41f9-446b-8732-ea5b8b5af5ae" />
<img width="886" height="418" alt="image" src="https://github.com/user-attachments/assets/4a5c8241-9f19-4e42-a0d5-fc6c680c7b64" />



## 📝 Licença

Projeto acadêmico desenvolvido para fins educacionais na FIAP.
