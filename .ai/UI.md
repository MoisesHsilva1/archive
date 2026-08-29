# UI Design Specification

## 1. Visão Geral

Foco deve ser muito em uma experiencia mobile de alto nivel e desktop tb mas com foco maior em mobile

A interface deve seguir uma estética **minimalista, monocromática e editorial**, priorizando clareza, espaço negativo, tipografia e composição visual.

A UI não deve parecer um dashboard corporativo tradicional nem uma aplicação excessivamente carregada de cards, sombras, gradientes ou elementos decorativos.

O objetivo é transmitir uma sensação de:

- Minimalismo
- Sofisticação
- Modernidade
- Organização
- Precisão
- Editorial / magazine
- Design tecnológico
- Simplicidade

A interface deve parecer **intencional**, e não simplesmente “vazia”.

> **Princípio central:** menos elementos, porém maior impacto visual em cada elemento.

---

# 2. Direção visual

A direção visual deve combinar **minimalismo moderno + design editorial + estética monocromática**.

A interface deve utilizar principalmente:

- Preto
- Branco
- Tons de cinza
- Off-white
- Pequenas variações de contraste

Cores fortes devem ser evitadas.

Caso seja necessário utilizar uma cor de destaque, ela deve aparecer de forma extremamente pontual e nunca dominar a interface.

### Paleta base

```
Background principal (Deep Black):
#050505

Background secundário:
#0A0A0A

Surface:
#111111

Border (Ultrafino):
#1A1A1A / #222222

Texto principal:
#F0F0F0

Texto secundário:
#999999

Texto discreto / Mono:
#555555
```

A paleta pode utilizar pequenas variações desses tons para criar hierarquia.

Evitar:

- Gradientes coloridos
- Neon
- Azul padrão de sistemas corporativos
- Roxo genérico de interfaces de IA
- Excessos de branco puro
- Sombras muito fortes
- Glassmorphism exagerado

---

# 3. Referências visuais

As imagens fornecidas devem ser interpretadas como **referências de direção artística**, e não como elementos para copiar literalmente.

### Referência 01

A primeira referência apresenta:

- Background predominantemente escuro
- Navegação extremamente simples
- Tipografia grande
- Hero visual forte
- Composição assimétrica
- Imagem integrada ao layout
- Elementos geométricos simples
- Alto contraste
- Poucos elementos simultaneamente na tela

O principal conceito a absorver é:

> **A interface utiliza composição e tipografia como elementos visuais, em vez de depender de componentes decorativos.**

---

### Referência 02

A segunda referência possui uma estética mais editorial.

Características importantes:

- Fotografia em preto e branco
- Tipografia oversized
- Layout assimétrico
- Grandes áreas vazias
- Imagens ocupando áreas importantes da composição
- Textos pequenos contrastando com títulos enormes
- Navegação discreta
- Elementos posicionados de maneira não convencional
- Forte sensação de revista/editorial

O conceito principal é:

> **A página deve parecer uma composição visual, não uma sequência convencional de cards.**

---

# 4. Princípios fundamentais

A IA responsável pela implementação deve seguir estes princípios.

## 4.1 Minimalismo

Não adicionar elementos simplesmente porque existe espaço disponível.

Cada elemento deve possuir uma função clara.

Evitar:
```
Card
Card
Card
Card
Button
Button
Badge
Badge
Icon
Icon
```


## 4.2 Espaço negativo

O espaço vazio é parte importante do design.

Não tentar preencher todos os espaços da tela.

O layout deve possuir áreas de respiro entre:

- Seções
- Títulos
- Imagens
- Navegação
- Conteúdo
- Elementos interativos

---

## 4.3 Tipografia como elemento visual

A tipografia deve possuir bastante presença.

Títulos podem utilizar tamanhos grandes, especialmente em:

- Hero
- Cabeçalhos de seção
- Destaques
- Frases importantes

Exemplo conceitual:
```
SMALL LABEL

Everything
in one place.
```


Em vez de:

```
Everything in one place

Lorem ipsum dolor sit amet...
```

A hierarquia deve ser visualmente evidente.

# 5. Tipografia

A tipografia deve ser moderna, limpa e predominantemente sans-serif.

Preferência por fontes como:

- Inter
- Geist
- Manrope
- Helvetica Neue
- Arial como fallback

A tipografia deve trabalhar com poucos pesos.

### Hierarquia sugerida

```
Display:
64–96px

H1:
48–72px

H2:
32–48px

H3:
24–32px

Body:
16–18px

Small:
12–14px

Label:
10–12px
```

Os valores devem ser responsivos.

Não utilizar tamanhos enormes indiscriminadamente. O objetivo é criar **hierarquia**, não transformar a interface numa placa de trânsito.
# 6. Layout

O layout deve fugir de uma estrutura excessivamente rígida.

Utilizar:

- Grid
- Flexbox
- Assimetria controlada
- Sobreposição de elementos
- Grandes áreas de imagem
- Margens generosas
- Composições horizontais e verticais

### Evitar

Layouts onde tudo esteja perfeitamente centralizado:

```
[ CARD ]
[ CARD ]
[ CARD ]

[ CARD ]
[ CARD ]
[ CARD ]
```

Preferir composições como:

```
TITLE                  IMAGE
        CONTENT
                  IMAGE
```

ou:

```
IMAGE        TITLE

             DESCRIPTION

       CONTENT
```

A assimetria deve parecer planejada.

---

# 7. Container

O conteúdo não deve necessariamente ocupar 100% da largura.

Utilizar um container central com largura máxima.

Exemplo:

```
max-width: 1440px;
margin: 0 auto;
padding-inline: 32px;
```

Em telas grandes, o conteúdo deve possuir bastante espaço lateral.

Em telas menores, o padding deve diminuir gradualmente.

---

# 8. Navegação

A navegação deve ser extremamente simples.

Estrutura conceitual:

```
LOGO                         MENU

                              ABOUT
                              PROJECTS
                              ARCHIVE
                              CONTACT
```

ou:

```
LOGO

ITEM 01
ITEM 02
ITEM 03

                ACTION
```

Dependendo da aplicação, a navegação pode utilizar:

- Texto simples
- Links pequenos
- Ícones discretos
- Indicadores mínimos

Evitar navbar tradicional excessivamente alta.

A navegação deve ocupar pouco espaço visual.

---

# 9. Hero

O Hero deve ser uma das partes mais importantes da interface.

Não deve parecer um banner convencional.

### Características

- Título grande
- Pouco texto
- Forte contraste
- Imagem ou elemento visual principal
- Composição assimétrica
- Espaço negativo
- CTA discreto

Estrutura conceitual:

```
SMALL LABEL

Everything
starts here.

Short supporting
description.

[ ACTION ]

                         IMAGE
                         IMAGE
                         IMAGE
```

O título deve dominar visualmente a seção.

---

# 10. Imagens

As imagens devem ser tratadas como parte da composição e não simplesmente como conteúdo dentro de cards.

Preferir:

- Fotografias grandes
- Preto e branco
- Crop agressivo
- Aspect ratios variados
- Imagens ocupando grandes áreas
- Sobreposição de texto quando fizer sentido

Evitar:

```
┌───────────────┐
│               │
│     IMAGE     │
│               │
├───────────────┤
│ Title         │
│ Description   │
└───────────────┘
```

quando uma composição editorial puder ser utilizada.

---

# 11. Cards

Cards devem ser utilizados com moderação.

Quando utilizados, devem ser minimalistas.

### Características

- Border sutil
- Pouca ou nenhuma sombra
- Background próximo ao background principal
- Bordas discretas
- Espaçamento interno generoso
- Tipografia clara

Exemplo:

```
┌─────────────────────────────┐
│ 01                          │
│                             │
│ Project title               │
│                             │
│ Short description           │
│                             │
│                         →   │
└─────────────────────────────┘
```

Evitar cards excessivamente arredondados, sombras pesadas e aparência de SaaS genérico.

---

# 12. Botões

Os botões devem ser discretos.

Preferência por:

### Primary

```
[ Explore ]
```

### Secondary

```
[ View more → ]
```

### Minimal

```
Explore →
```

Os botões podem utilizar:

- Border fino
- Background sólido
- Hover simples
- Transições rápidas

Evitar botões gigantes, excessivamente arredondados ou visualmente chamativos.

---

# 13. Bordas e formas

A interface deve utilizar formas geométricas simples.

Preferência:

```
border-radius: 0px
```

ou valores pequenos:

```
4px
6px
8px
```

Não utilizar `border-radius: 9999px` indiscriminadamente.

Pills e elementos extremamente arredondados devem ser exceções.

A estética geral deve ser mais **editorial e geométrica** do que “app moderno genérico”.

---

# 14. Ícones

Os ícones devem ser simples e discretos.

Preferir:

- Lucide
- SVG minimalista
- Ícones lineares

Os ícones não devem competir com a tipografia.

Sempre que um texto puder comunicar algo melhor que um ícone, utilizar texto.

---

# 15. Animações

As animações devem ser sutis.

Utilizar principalmente:

- Fade
- Translate pequeno
- Scale muito discreto
- Hover
- Entrada progressiva das seções

Exemplo:

```
opacity: 0 → 1
translateY: 12px → 0
```

Duração aproximada:

```
200–500ms
```

Evitar:

- Animações exageradas
- Parallax excessivo
- Elementos pulando
- Transições lentas
- Efeitos chamativos sem função

A animação deve reforçar a interface, não anunciar que alguém descobriu CSS ontem.

---

# 16. Hover states

Os estados de interação devem ser discretos.

Exemplo:

```
Normal:
PROJECT

Hover:
PROJECT →
```

ou:

```
border: subtle

Hover:
background: slightly lighter
```

As interações devem possuir feedback visual claro sem alterar completamente a composição.

---

# 17. Responsividade

A interface deve ser projetada para:

- Desktop
- Tablet
- Mobile

A versão mobile não deve ser simplesmente uma versão desktop espremida.

No mobile:

- Reduzir títulos
- Transformar grids em colunas
- Simplificar navegação
- Reduzir elementos decorativos
- Preservar espaço negativo
- Priorizar conteúdo

Exemplo:

Desktop:

```
IMAGE                 TITLE
                      DESCRIPTION
```

Mobile:

```
TITLE

DESCRIPTION

IMAGE
```

---

# 18. Estrutura das páginas

A estrutura geral deve seguir uma hierarquia visual semelhante a:

```
Navigation
    ↓
Hero
    ↓
Introduction
    ↓
Featured Content
    ↓
Collection / Projects
    ↓
Secondary Content
    ↓
Call to Action
    ↓
Footer
```

Porém, essa estrutura não precisa ser visualmente linear.

As seções podem possuir diferentes alturas e composições.

---

# 19. Footer

O footer deve manter a mesma estética minimalista.

Exemplo:

```
LOGO

Navigation
About
Projects
Contact

Social
Github
Instagram
LinkedIn

© 2026
```

Pode utilizar bastante espaço vertical.

O footer não deve parecer um segundo navbar gigante.

---

# 20. Estados da interface

Todos os componentes devem considerar:

```
Default
Hover
Active
Focus
Disabled
Loading
Empty
Error
```

Especialmente para elementos interativos.

Estados devem seguir a mesma linguagem visual monocromática.

---

# 21. Acessibilidade

Mesmo com foco estético, a interface deve manter:

- Contraste adequado
- Foco visível
- Navegação por teclado
- HTML semântico
- Labels apropriados
- `alt` em imagens
- Tamanho adequado para áreas clicáveis

Minimalismo não significa transformar acessibilidade em decoração opcional.

---

# 22. O que NÃO fazer

A IA deve evitar explicitamente:

- Gradientes excessivos
- Glassmorphism
- Neumorphism
- Sombras exageradas
- Cards demais
- Border-radius exagerado
- Cores vibrantes sem necessidade
- Layout de dashboard genérico
- Muitos badges
- Muitos ícones
- Botões gigantes
- Texto demais
- Seções visualmente idênticas
- Containers excessivamente pequenos
- Centralização excessiva
- Componentes decorativos sem função
- Animações chamativas
- Aparência de template SaaS genérico

---

# 23. Regra de composição

A interface deve seguir a seguinte prioridade visual:

```
1. Tipografia
2. Imagem / elemento principal
3. Espaço negativo
4. Grid e composição
5. Conteúdo secundário
6. Elementos interativos
7. Decoração
```

A decoração deve ser a última prioridade.

Se um elemento não melhorar a compreensão ou a composição, ele provavelmente não precisa existir.

---

# 24. Princípio para implementação com IA

Ao gerar ou modificar a UI, a IA deve **preservar a direção visual existente**.

Antes de adicionar qualquer componente, avaliar:

1. Esse elemento é realmente necessário?
2. Ele melhora a experiência?
3. Ele respeita a estética monocromática?
4. Ele cria hierarquia visual?
5. Ele está adicionando complexidade desnecessária?
6. Existe uma solução mais simples?

A implementação deve priorizar **consistência visual sobre quantidade de elementos**.

Não inventar novos padrões visuais para cada seção.

Componentes semelhantes devem compartilhar:

- Tipografia
- Espaçamento
- Borders
- Radius
- Estados
- Animações
- Hierarquia

---

# 25. Resumo visual

A UI deve transmitir a seguinte sensação:

```
MONOCHROMATIC
MINIMAL
EDITORIAL
MODERN
TYPOGRAPHY-DRIVEN
ASYMMETRIC
IMAGE-FOCUSED
CLEAN
PRECISE
QUIET
```

A referência visual pode ser resumida como:

> **Uma interface minimalista e monocromática que utiliza tipografia, fotografia, espaço negativo e layouts assimétricos para criar uma experiência visual sofisticada.**

O objetivo não é reproduzir exatamente nenhuma das referências. A intenção é capturar os **princípios de design** presentes nelas e transformá-los em uma identidade própria.

---

