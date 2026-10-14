# LP Arte da Pedra Marmoraria

Landing page de captação (Google Ads + orgânico) da **Arte da Pedra Marmoraria**, Aurora/SC.
Produto QH4: **Low Ticket Stones** (LP, Google Ads, GMN Prata, CRM, cliente oculto). Contrato de 02/10/2026 a 02/04/2027.

## Contexto do cliente

- Marmoraria familiar de Aurora (SC), cidade de cerca de 5 mil habitantes. Sócios: Marcos (medição, produção e montagem) e Larissa (comercial). Equipe: os sócios, um profissional e um ajudante.
- Marcos trabalha na área há 16 anos; antes fazia montagem terceirizada. A marmoraria própria é recente.
- Cerca de 60% do faturamento vem de marcenarias parceiras. Objetivo da LP: gerar demanda própria, aparecer no Google e alcançar outras cidades (Balneário Camboriú, Itapema).
- Medição no local: Aurora, Rio do Sul e Ituporanga. Outras cidades: orçamento pelo projeto ou pelas medidas base.
- Referência visual do cliente: granicar.com.br. Pedido explícito no briefing: botão com o ícone do WhatsApp para orçamento, e não só um formulário. Por isso o CTA principal em toda a página é o WhatsApp direto, e o formulário fica como alternativa.

## Identidade visual aplicada

| Item | Valor |
|---|---|
| Azul (marca) | `#10263e` |
| Azul claro de apoio | `#183350` (seção da história), `#21405f` (bordas) |
| Laranja (marca) | `#ff914d` (botões, linhas de faceta) |
| Laranja escuro | `#b8541b` (só para ícones/traços sobre fundo claro, por contraste) |
| Branco | `#ffffff` |
| Pedra clara (fundo mesclado) | `#eef1f3` |
| Títulos | **Belleza** (pedida no briefing), self-hosted em `assets/fonts` |
| Corpo | **Inter** 400/500/600, self-hosted |
| Logo | Vetorizado do PDF enviado: `logo-arte-da-pedra-branco.svg` (fundo escuro) e `logo-arte-da-pedra.svg` (fundo claro). Marca isolada em `marca-facetas.svg` |

Fundo **mesclado**, como pedido no briefing: hero, história, região e CTA final em azul; ambientes, obras, formulário e FAQ em claro.

Elemento de assinatura: as **linhas facetadas do logo** viram o recorte da foto do hero (desenhadas em laranja no carregamento), o recorte dos cards de ambiente, os números do passo a passo e a marca d'água do CTA final.

## Estrutura da página

1. **Hero**: headline "Marmoraria perto de você, da soleira à cozinha pronta" + CTA WhatsApp + link para o formulário.
2. **Ambientes** (abas interativas): Soleiras, Cozinhas, Banheiros, Lavanderias, Áreas gourmet, Escadarias, Túmulos. Cada aba troca foto, texto e o CTA do WhatsApp já com o ambiente na mensagem. Destaque na "casa completa começando pela soleira", como pedido no briefing.
3. **História**: 16 anos de experiência, empresa familiar, citação do propósito do Marcos (texto do próprio briefing) + vídeo vertical da tomada retrátil embutida na bancada.
4. **Como funciona** (4 passos reais): WhatsApp, medição ou medidas base, escolha da pedra, produção e montagem.
5. **Obras entregues**: galeria com filtro (cozinhas, banheiros, áreas gourmet) e lightbox com setas, teclado e swipe.
6. **Onde a gente atende**: cidades com medição, convite ao litoral pelo projeto/medidas, horário.
7. **Formulário**: nome, WhatsApp (máscara), cidade, ambiente, se já tem projeto/medidas, detalhes opcionais.
8. **FAQ** (6 perguntas, todas tiradas do briefing) + JSON-LD FAQPage.
9. **CTA final** + rodapé com CNPJ, contato, Instagram e "Desenvolvido pro QH4 Growth".

## Comportamento

- **Formulário (sem Apps Script)**: botão nasce desabilitado e libera só com todos os campos obrigatórios válidos (`checkValidity` a cada input/change). Ao enviar, monta a mensagem completa com todos os campos, passa pela `obrigado.html` (conversão rastreável) e em 3 segundos redireciona para o WhatsApp `5547996268042` com a mensagem pronta. A página de obrigado só aceita links `wa.me/5547996268042` (sem open redirect).
- **WhatsApp flutuante** fixo no canto direito.
- Animações: entrada orquestrada do hero com as facetas sendo desenhadas, parallax leve na foto, scroll reveal, microinterações nos botões e cards, transição nas abas e na galeria. Tudo desligado com `prefers-reduced-motion`.
- Vídeo só carrega e toca quando aparece na tela (mudo, em loop).

## Eventos de rastreamento (dataLayer)

| Evento | Quando | Parâmetros |
|---|---|---|
| `whatsapp_click` | Clique em qualquer botão de WhatsApp | `cta_location`: header, hero, ambientes, regiao, final, rodape, flutuante |
| `ambiente_click` | Troca de aba de ambiente | `ambiente` |
| `galeria_abrir` | Abre foto no lightbox | `foto` |
| `form_start` | Primeiro foco no formulário | |
| `form_submit` | Envio válido do formulário | `ambiente`, `cidade` |
| `lead_obrigado` | Carregamento da obrigado.html | `lead_origem` |

Sugestão de conversão no Google Ads: `whatsapp_click` (todas as origens) + `lead_obrigado`.

## Antes de publicar (pendências)

- [ ] **GTM**: trocar `GTM-XXXXXXX` em `index.html` (script e noscript) e em `obrigado.html` (script). Enquanto for o placeholder, o GTM não carrega.
- [ ] **Domínio**: o cliente não tem domínio. Está tudo apontado para `https://lp-arte-da-pedra.vercel.app/`. Ao definir o domínio, trocar em: `canonical`, `og:url`, `og:image`, `twitter:image`, JSON-LD (index), `robots.txt` e `sitemap.xml`.
- [ ] **Depoimentos**: o briefing não trouxe link do GMN nem depoimentos (campo veio com "."). A LP saiu sem seção de depoimentos para não inventar nada. Quando o GMN Prata tiver avaliações, vale incluir (o cliente citou que gosta dos depoimentos da Granicar).
- [ ] **Litoral**: a LP diz que quem mora em outra cidade (BC, Itapema) recebe orçamento pelo projeto ou medidas, como está no briefing. Confirmar com o Marcos se ele instala no litoral antes de rodar campanha específica para lá.
- [ ] **Endereço**: só a cidade (Aurora/SC, CEP 89186-000) foi publicada. O endereço do briefing estava no bloco de cadastro de domínio (pessoa física), então ficou de fora. Se a marmoraria tiver endereço comercial para o GMN, incluir no JSON-LD e no rodapé.
- [ ] **E-mail**: no briefing aparece `marmorariaartedapedra@gmail.cm` em um campo e `.com` no outro. Usei `.com`; confirmar.
- [ ] **Faturamento**: o briefing diz R$ 35 mil/mês e o resumo comercial diz R$ 50 a 70 mil. Nenhum número de faturamento aparece na página, mas vale alinhar internamente.

## Fonte do conteúdo

Todo texto saiu do briefing (formulário Google preenchido pelo Marcos) e do resumo de atuação do cliente. Fotos e vídeo: pasta enviada pelo cliente (HEIC convertido, cortado e otimizado em WebP). Ficaram de fora: prints de posts de marcenarias parceiras (são fotos de terceiros), stories com moldura e dois vídeos com reflexo de pessoas.

Ideia para depois (não está na página): o cliente entrega uma cesta ou bandeja de pedra em pedidos acima de R$ 5 mil. Pode virar um diferencial na LP ou nos anúncios se ele topar comunicar isso.

## Estrutura da pasta

```
/
├── index.html
├── obrigado.html
├── 404.html
├── favicon.ico
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── vercel.json
├── README.md
└── assets/
    ├── css/style.css
    ├── js/main.js
    ├── fonts/ (Belleza + Inter woff2, self-hosted)
    ├── img/ (14 fotos WebP, logos SVG, favicon, ícones PWA, og-arte-da-pedra.jpg)
    └── video/ (tomada-embutida.mp4 + poster)
```

## Como publicar na Vercel

1. Descompactar o zip.
2. `vercel` na pasta (ou arrastar a pasta em vercel.com/new). Framework: **Other**, sem build command, output = raiz.
3. Conferir: `/`, `/obrigado.html`, uma URL inexistente (mostra a 404 personalizada) e `/robots.txt`.
4. Depois de definir o domínio, atualizar as URLs da lista de pendências e enviar o `sitemap.xml` no Search Console.

## Checklist de entrega

- [x] SEO: title e meta description com cidade e nicho, H1 com "Marmoraria" e "perto de você", headings em ordem, alt em todas as imagens, width/height nas imagens (CLS), preload da foto do hero e das fontes
- [x] JSON-LD `HomeAndConstructionBusiness` (cidade, área atendida, horário, telefone, Instagram) + `FAQPage`
- [x] Open Graph completo + Twitter Card + imagem OG 1200x630
- [x] canonical, robots.txt, sitemap.xml, site.webmanifest, favicon SVG/ICO, apple-touch-icon
- [x] vercel.json (cache longo nos assets, headers de segurança, noindex na obrigado)
- [x] Página de obrigado
- [x] Página 404 personalizada
- [x] Formulário com botão desabilitado até validar, mensagem completa pro WhatsApp
- [x] WhatsApp flutuante no canto direito
- [x] Rodapé com "Desenvolvido pro QH4 Growth" linkando @qh4growth
- [x] Responsivo testado em 390px e 1440px, sem erros de console, sem links quebrados
- [x] Acessibilidade: foco visível, abas com teclado, lightbox com Esc/setas e foco preso, reduced motion
- [x] Nada inventado: sem depoimentos, números, garantias ou anos de mercado fora do briefing
