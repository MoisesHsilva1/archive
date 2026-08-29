# Archive

## 1. Visão do Produto

O **Archive** é um arquivo pessoal digital criado para contar um pouco sobre quem eu sou, meus interesses e as coisas que fazem parte da minha vida.

A aplicação reúne, em um único espaço, diferentes partes dos meus interesses pessoais, como coisas que gosto e recomendo, hobbies, fotografias e projetos que desenvolvi.

A proposta não é criar uma rede social, um portfólio tradicional ou uma ferramenta de produtividade.

O Archive deve funcionar como um **arquivo pessoal curado**, onde outras pessoas podem conhecer um pouco mais sobre mim através das coisas que gosto, faço, crio, registro e recomendo.

Mais do que armazenar informações, a ideia é criar um espaço que tenha **personalidade e contexto**. Cada conteúdo deve refletir algum aspecto de quem eu sou ou algo que desperta meu interesse.

> Um pequeno arquivo sobre mim e as coisas que fazem parte da minha vida.

---

# 2. Conteúdo Principal

O Archive é composto por algumas áreas principais, cada uma representando uma forma diferente de expressar meus interesses e minha personalidade.

## 2.1 Indicações & Reviews

Uma seção dedicada a coisas que consumi, descobri, experimentei e gostaria de recomendar.

Essa seção pode reunir diferentes tipos de indicações, organizadas por categorias, como:

- Filmes

- Séries

- Livros

- Música

- Jogos

- Cafeterias

- Restaurantes

- Lugares

- Experiências

- Outros conteúdos ou coisas que considero interessantes


A proposta não é criar reviews tradicionais ou avaliações objetivas. A ideia é registrar uma **opinião pessoal acompanhada de um pouco de reflexão**.

Pode ser algo que eu gostei muito, algo que me marcou, algo que me fez pensar, algum lugar que gostei de conhecer ou simplesmente algo que considero interessante e quero compartilhar.

A experiência deve ter uma mistura entre **curadoria visual e opinião pessoal**, lembrando em alguns aspectos a liberdade visual de um Pinterest, mas com o contexto e a personalidade de uma pequena review.

Cada indicação deve parecer algo que eu coloquei ali porque realmente tenho algum motivo para recomendar.

As informações apresentadas podem ser simples e variar de acordo com o conteúdo.

Uma indicação pode ser apenas uma imagem e uma pequena descrição, enquanto outra pode possuir uma review mais elaborada.

O importante não é preencher campos, mas **transmitir por que aquilo está no meu Archive**.

A seção deve priorizar:

- Curadoria pessoal

- Opinião

- Reflexão

- Descoberta

- Identidade visual


O objetivo não é competir com plataformas como IMDb, Letterboxd ou Goodreads.

O foco é:

> **"Eu gostei disso. Aqui está o motivo."**

ou simplesmente:

> **"Isso me chamou atenção e acho que você pode gostar também."**

---

## 2.3 Fotos

Uma seção dedicada às minhas fotografias e aos momentos que considero interessantes ou importantes guardar.

As fotos funcionam como uma forma mais visual de contar sobre minha vida.

Diferentemente das outras áreas, aqui o conteúdo visual deve ser o protagonista.

As fotografias podem representar:

- Lugares

- Momentos

- Pessoas

- Viagens

- Objetos

- Hobbies

- Pequenas coisas do cotidiano


A intenção não é necessariamente criar um álbum fotográfico tradicional.

O Archive deve permitir que as fotos funcionem como **fragmentos da minha vida**, mesmo quando não existe uma grande história por trás delas.

---

## 2.4 Projetos

Uma pequena seção dedicada aos projetos que desenvolvi, estou desenvolvendo ou que considero interessantes registrar.

Essa seção não pretende ser um portfólio profissional completo.

Os projetos aparecem no Archive como mais uma parte daquilo que faço e gosto de construir.

A ideia é mostrar principalmente meus **projetos pessoais como desenvolvedor**, apresentando de forma simples aquilo que criei ao longo da minha trajetória.

Cada projeto deve contar brevemente:

- O que é

- Link do projeto


A apresentação deve ser simples e pessoal.

O objetivo não é listar tecnologias ou transformar a seção em um currículo técnico, mas mostrar **coisas que eu criei e que fazem parte da minha trajetória**.

## Estado Atual

<!-- Status real do projeto: se é greenfield, protótipo, MVP, legado em manutenção ou produção. -->
- **Estágio de Maturação**: Arquitetura v0 definida e aprovada — Pronto para inicialização do projeto (`/home/moisas/projects/archive`).
- **Abordagem Técnica**: Jamstack / Single Page Application estático (Vite + React + TypeScript) com pipeline de Markdown local e Cloudinary para mídia.
- **Contexto SDD**: Documentação persistente e diretrizes de design estruturadas em `.ai/` (`context.md`, `architecture.md`, `design.md`, `UI.md`).

---

## Decisões Conhecidas

<!-- Decisões de negócio e de produto já consolidadas e acordadas. -->
- **Frontend-First sem Backend proprietário na v0**: Foco total em entrega rápida de valor, experiência visual editorial e custo zero de infraestrutura.
- **Pipeline de Conteúdo via Markdown**: Reviews e artigos armazenados como arquivos `.md` versionados no Git com schema Zod estrito.
- **Gestão de Imagens via Cloudinary**: Armazenamento e CDN de mídia com transformações dinâmicas e hooks customizados no frontend.
- **Estética Monocromática e Editorial**: Fidelidade ao [UI.md](file:///home/moisas/projects/archive/.ai/UI.md) com Tailwind CSS e primitivos acessíveis do Radix UI.
- **Hospedagem em Edge CDN**: Deploy contínuo via Vercel / Cloudflare Pages.

---

# 3. Identidade do Archive

O Archive deve transmitir a sensação de estar explorando um espaço pessoal.

Não deve parecer uma plataforma construída para atender milhares de usuários.

Deve parecer algo que **pertence a uma pessoa específica**.

A personalidade do Archive deve surgir principalmente através do conteúdo, das escolhas e da forma como as coisas são apresentadas.

O conteúdo não precisa seguir uma estrutura rígida.

Algumas coisas podem ser extremamente simples, enquanto outras podem receber mais contexto.

Essa irregularidade é intencional.

O Archive não precisa catalogar tudo.

Ele deve mostrar aquilo que considero interessante o suficiente para guardar e compartilhar.

---

# 4. Curadoria

O Archive é baseado em curadoria.

Nem tudo precisa estar presente.

A escolha do que entra no Archive faz parte da própria experiência.

Uma fotografia, um filme, um livro, um lugar, um hobby ou um projeto só precisa estar presente porque representa alguma coisa para mim.

A aplicação deve favorecer **significado sobre quantidade**.

O objetivo não é construir o maior arquivo possível, mas um arquivo que, quando explorado, diga alguma coisa sobre quem está por trás dele.

---

# 5. Relação entre os Conteúdos

As diferentes áreas do Archive não precisam existir de forma completamente isolada.

Um hobby pode estar relacionado a determinadas fotos.

Uma indicação pode estar relacionada a um hobby.

Um projeto pode ter surgido de um interesse específico.

Uma fotografia pode representar um momento relacionado a alguma dessas coisas.

Uma indicação pode também estar relacionada a um lugar, experiência ou momento específico.

Essa relação entre conteúdos ajuda a criar a sensação de que o Archive representa uma pessoa inteira, e não apenas uma coleção de páginas independentes.

---

# 6. Essência

No final, o Archive deve responder a uma pergunta simples:

> **"Quem é a pessoa por trás desse arquivo?"**

As indicações mostram o que eu gosto.

Os hobbies mostram o que me interessa.

As fotos mostram momentos que escolhi guardar.

Os projetos mostram coisas que criei.

E a combinação de tudo isso conta, aos poucos, um pouco sobre mim.