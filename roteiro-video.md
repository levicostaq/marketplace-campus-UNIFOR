# Roteiro do Vídeo — EcoCampus (Processo Seletivo Vortex 2026)

Duração total: **até 6 minutos**, dividido exatamente nos 4 blocos cronometrados que o edital pede. Grave cronometrando cada bloco — não precisa ser milimétrico, mas fique de olho pra não estourar o tempo total.

## Checklist antes de gravar

- [ ] Backend rodando (`uvicorn main:app --reload`, terminal aberto e visível se precisar)
- [ ] Frontend rodando (`npm run dev`)
- [ ] Navegador com abas extras fechadas/organizadas, zoom em 100%
- [ ] Um anúncio de teste já cadastrado (pra vitrine não aparecer vazia no início) — pode apagar depois
- [ ] VS Code aberto na pasta `marketplace-campus`, com `main.py`, `Vitrine.jsx`, `FormAnuncio.jsx` e `sw.js` fáceis de abrir
- [ ] README.md aberto em outra aba (pra mostrar o Diário de Bordo no bloco 4)
- [ ] Programa de gravação de tela testado (áudio incluso!) — Windows tem o Xbox Game Bar (`Win + G`) como opção simples, ou OBS Studio
- [ ] Ler esse roteiro uma vez em voz alta antes de gravar, cronometrando com o celular

---

## Bloco 1 — Pitch e Visão Geral (0:00 a 1:00)

**O que a banca avalia:** capacidade de síntese, comunicação clara, entendimento do problema.

Fale olhando pra tela/câmera, com naturalidade — não precisa decorar, mas pratique pra caber em 1 minuto:

> "Oi, meu nome é Levi e esse é o EcoCampus, minha proposta pro desafio técnico do Vortex 2026.
>
> A ideia parte de um problema real: a cada semestre, muita coisa boa vira lixo ou fica esquecida numa gaveta — livro, jaleco, calculadora, material de laboratório — enquanto quem está começando a faculdade precisa exatamente desses itens e não tem.
>
> O EcoCampus é um marketplace de economia circular pra dentro do campus: conecta estudantes que querem doar ou vender itens com quem precisa deles, reduzindo desperdício e o custo de entrada na vida acadêmica. É uma aplicação web, responsiva, e instalável como app (PWA)."

---

## Bloco 2 — Demonstração Prática / Demo (1:00 a 3:00)

**O que a banca avalia:** funcionalidade real do sistema, UI/UX, responsividade, validação como PWA.

Ordem sugerida (narre o que está fazendo enquanto navega, não precisa ficar em silêncio):

1. **Landing page desktop** — mostra a página inteira rolando: Hero, "Sobre", Estatísticas.
2. **Vitrine + filtro** — desce até "Últimos itens anunciados", clica em 2-3 categorias diferentes pra mostrar o filtro funcionando.
3. **Cadastro ao vivo** — preenche o formulário e publica um anúncio novo. Destaque em voz alta: *"repara que o item aparece na vitrine na hora, sem precisar recarregar a página"*.
4. **"Meus anúncios"** — clica no botão e mostra que só os itens cadastrados nesse navegador aparecem.
5. **Modo mobile** — abre o DevTools (`F12`), ativa o modo responsivo (ícone de celular/tablet no canto superior do DevTools), repete rapidamente a navegação (scroll, um filtro, o formulário) mostrando que funciona igual no formato celular.
6. **Instalação como PWA** — no Chrome, clica no ícone de instalar (perto da barra de endereço) ou no menu `⋮ > Instalar app`. Mostra o app abrindo numa janela própria, sem barra de navegador — reforça: *"esse é o app instalado, funcionando como se fosse nativo"*.

---

## Bloco 3 — Explicação Técnica do Código (3:00 a 5:00)

**O que a banca avalia:** domínio técnico, organização de código, clareza na explicação lógica, comprovação de autoria.

Abre o VS Code e narra enquanto mostra:

1. **Estrutura de pastas** — mostra o painel lateral: `backend/` e `frontend/`, explica rapidamente que são dois projetos separados que conversam por HTTP.
2. **Backend (`backend/main.py`)**:
   > "O backend é feito em FastAPI. Ele expõe uma API REST com rotas pra criar, listar, atualizar e apagar anúncios — usando o SQLite como banco de dados, guardado num arquivo local. Aqui na rota `GET /anuncios`, por exemplo, eu monto a query dinamicamente: se vier um filtro de categoria ou de dispositivo na URL, eu adiciono essa condição no SQL antes de buscar no banco."

   (aponta pro trecho do `WHERE 1=1` + `if categoria` / `if dispositivo_id`)
3. **Frontend (`Vitrine.jsx` e `FormAnuncio.jsx`)**:
   > "No frontend, em React, cada componente guarda seu próprio estado com `useState`. A Vitrine, por exemplo, guarda a lista de anúncios, a categoria ativa e o filtro 'meus anúncios' — toda vez que um desses muda, o `useEffect` dispara uma nova busca na API. E pra vitrine atualizar sozinha depois que eu cadastro um anúncio novo, eu uso um truque do React: mudo uma `key` no componente, o que faz ele remontar do zero e buscar os dados atualizados."
4. **Service Worker (`frontend/public/sw.js`)**:
   > "Pra funcionar como PWA e ter uma sobrevida offline, tem um Service Worker registrado que intercepta as requisições: ele tenta buscar da internet primeiro, e se não conseguir, usa uma cópia salva em cache."

---

## Bloco 4 — Uso Prático da Inteligência Artificial (5:00 a 6:00)

**O que a banca avalia:** maturidade no uso de IA generativa, senso crítico pra corrigir erros da IA, curadoria técnica (não só cópia cega).

Mostra o README (seção "Diário de Bordo") ou a própria conversa, e fala com suas palavras algo como:

> "Eu nunca tinha feito backend nem frontend antes desse desafio, então usei o Claude como uma espécie de tutor durante os 5 dias — mas configurei desde o início como eu queria trabalhar: pedi que ele explicasse cada linha de código, em vez de só me entregar pronto, e que me desse passo a passo detalhado pra eu mesmo digitar e testar.
>
> Teve um momento importante de correção de rumo: em um ponto a IA começou a criar arquivos sozinha, sem eu pedir — percebi isso, cobrei explicação, e a partir daí ela só passou a explicar e esperar eu executar.
>
> Um exemplo técnico real de debug: hoje, ao adicionar uma coluna nova no banco, recebi um erro de SQL dizendo que a coluna não existia. A partir só de um print do terminal, identifiquei junto com a IA que o problema era porque `CREATE TABLE IF NOT EXISTS` não altera uma tabela que já existe — e corrigi usando `ALTER TABLE`.
>
> Então usei a IA como ferramenta de aprendizado ativo, não como um gerador automático — cada decisão de arquitetura e cada linha de código passou por mim."

(Ajuste esse texto com suas próprias palavras — o importante é que soe genuíno e mostre que você entende o que fala.)

---

## Dica final

Grave em partes se precisar (bloco por bloco) e edite depois, ou grave tudo de uma vez se se sentir confortável. O que importa pra nota é: aparecer sabendo do que está falando nos blocos 3 e 4 — isso é o que comprova autoria.
