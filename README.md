# Cabeloliso.com — Silver Signature (React)

Versão em React do Conceito 01 da AVELLEN, com a tipografia do conceito Graphite Immersion:
**Syne** nos títulos e **Inter Tight** nos textos.

Stack: Vite · React 19 · TypeScript · Tailwind CSS 4 · Motion · Lucide.

## Rodar

```bash
npm install
npm run dev        # desenvolvimento em http://localhost:5173
npm run build      # checagem de tipos + build em dist/
npm run preview    # serve o build
```

O build usa caminhos relativos (`base: './'`), então a pasta `dist/` funciona em qualquer subpasta do domínio.

## Estrutura

```
src/
  data/content.ts          → todo o conteúdo e dados comerciais (endereço, WhatsApp, horários, textos, cursos)
  index.css                → tokens de tema (claro/escuro), vidro (Liquid Glass), cromado, botões
  hooks/                   → tema, contagem de seguidores, seção ativa, reflexo do vidro
  components/
    layout/                → Header (menu flutuante + menu mobile), Footer
    sections/              → Hero, Method, Results, Expert, Courses, Contact
    features/              → InstagramProof, BeforeAfterSlider, VideoCard, HeroVideo, WavesBackground
    ui/                    → Button, ChromeLogo, Reveal, SectionHeading, ThemeToggle, ícones
public/
  images/                  → logo original, fotos do salão, antes/depois, Renildo
  videos/hero-cabeloliso.mp4
```

## Onde mexer

- **Textos, links e dados**: `src/data/content.ts`.
- **Seguidores do Instagram**: `business.instagram.followers` em `content.ts`. Para buscar de uma API no futuro,
  passe um `fetcher` para `useInstagramFollowers()` (ver `src/hooks/useInstagramFollowers.ts`).
- **Cores dos temas**: variáveis `--c-*` no topo de `src/index.css` (`[data-theme='dark']` e `[data-theme='light']`).
  As classes do Tailwind (`bg-bg`, `text-fg/70`, `text-accent`...) leem essas variáveis.
- **Vídeo do topo**: substitua `public/videos/hero-cabeloliso.mp4` mantendo o nome.

## Acessibilidade — contraste (WCAG 2.2)

Auditado em 05/11/2026 medindo cada texto renderizado contra o fundo real (transparências compostas), nos dois temas.
Resultado: **0 reprovações no nível AA** (1.4.3: 4.5:1 texto normal, 3:1 texto grande). Textos sobre fotos e vídeos
são medidos no pior caso (foto branca ou preta por trás) e usam selo ou véu escuro.

| Token | Escuro (sobre #000) | Claro (sobre #fff) | Uso |
|---|---|---|---|
| `fg` | #ffffff · 21:1 | #000000 · 21:1 | títulos |
| `text` | #e8e8e8 · 17.1:1 | #202020 · 16.3:1 | textos |
| `muted` | #a3a3a3 · 8.3:1 | #595959 · 7.0:1 | rótulos e apoio |
| `accent` | #c0c0c0 · 11.5:1 | #484848 · 9.1:1 | destaques |
| cromado (parada mais fraca) | #8d8d8d · 6.3:1 | #6a6a6a · 5.4:1 | títulos em degradê |

Ao criar cores novas: textos com transparência (`text-text/70` etc.) devem ficar em 70% ou mais; texto branco sobre foto
só dentro de `.glass-photo` (véu de 62%) ou selo `bg-black/65`.

## Animações e transições

Em `src/components/motion/`:
- `SmoothScroll` — rolagem suave (Lenis) sincronizada com o Motion; desligada com movimento reduzido.
- `ScrollProgress` — fio prateado de progresso no topo.
- `WordReveal` — títulos surgem palavra por palavra (usado em todos os `SectionHeading` e no hero).
- `ParallaxImage` — fotos entram com "cortina" (clip-path) e se deslocam levemente na rolagem.
- `Marquee` — faixa de texto que acelera e inverte com a rolagem, entre seções.
- `ScrollStatement` — frase de transição cujas palavras acendem conforme a rolagem.
- `CountStat` — estatísticas contam até o valor ao aparecer.
- `IntroLoader` — abertura com a logo cromada (só na 1ª visita da sessão; libera as animações do topo ao terminar).
- `BackToTop` — botão "voltar ao topo" com anel de progresso, aparece depois da primeira tela.
- Galeria (`sections/Gallery.tsx`) — no desktop fica presa na tela e as fotos deslizam na horizontal; no celular, grade.
- `Button` — magnético no desktop (atraído pelo cursor).
O hero também se afasta (sobe, encolhe e esmaece) ao rolar. Espaço entre seções padronizado em `py-[clamp(48px,6vw,80px)]`. Textos das faixas e da frase: `transitions` em `content.ts`.

## Comportamentos

- Tema claro/escuro com o botão de sol/lua; a escolha fica salva no navegador. O padrão é o escuro.
- `prefers-reduced-motion`: sem animações de entrada, ondas paradas, vídeo no primeiro quadro, contador direto no valor final.
- Vídeos de depoimento só carregam o player do YouTube ao clicar.
