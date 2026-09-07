# Notas de tradução — pt-BR

Traduzido por autoria nativa (não tradução literal), 71 fichas de dino + 11 famílias,
a partir de `_corpus/corpus-fr.json`. Ver relatório completo entregue no handoff HO-005.

## Escolhas não evidentes

- **Nomes vernaculares** : seguem o uso corrente no Brasil (livros infantis, TV) — ex.
  `Tricératops` → `Tricerátops`, `Vélociraptor` → `Velocirraptor`, `Ptéranodon` →
  `Pteranodonte`. Quando não existe uso popular fixado (ex. `Shonisaurus`, `Gorgonops`),
  usei a adaptação fonética mais natural em português (Xonissauro, Gorgonopse).
- **`comp_taille`/`comp_hauteur`/`comp_poids`** : "bus RATP" e "bus anglais à deux
  étages" viraram "ônibus articulado" e "ônibus de dois andares" — repère localizado,
  ordem de grandeza preservada (mesmo bicho de referência real: articulado ~18m,
  double-decker ~4,4m de altura). "Papa" → "Papai" mantido literal (referência familiar
  universal, funciona igual no Brasil).
- **`full`** (nome científico latino) : NUNCA traduzido, conforme a charte. 4 casos
  (`carcharodontosaurus`, `pachycephalosaurus`, `archaeopteryx`, `therizinosaurus`)
  disparam warning "idêntico ao FR" no check — é o comportamento esperado, não um erro:
  o nome latino é idêntico em todas as línguas por definição.
- **`nom_etym`** : raízes grego/latinas mantidas intactas (troo, cerat, saurus...),
  só a explicação ao redor foi traduzida, conforme a charte.

## HO-010 — recroisamento pós-mudança do canon FR (2026-09-05)

O FR (`site/js/dinos-data.js`) mudou 85 campos em 2026-09-05 (ver
`docs/handoffs/rapports/HO-010-champs-modifies.json`). Recroisei aqui os 42 campos
TEXTO/comparação afetados (25 dinos), reaproveitando ao máximo a formulação já escrita
pelos scripts de áudio `content/scripts-audio/pt-br/<id>.md` (eles já tinham corrigido
vários desses pontos antes do strings.json, cada um com nota `⚠️ Recalculado (HO-010)`
explicando o novo patamar).

- **Comparações recalculadas (`comp_*`)** : sempre no mesmo degrau do FR, nunca uma
  tradução literal do valor antigo — ex. `giganotosaurus.comp_hauteur` (4m→3,3m) virou
  "que nem dois Papais um em cima do outro" (antes "ônibus de dois andares"), o inverso
  em `allosaurus` (3,5m→4m). `utahraptor.comp_poids`/`smilodon.comp_poids`/
  `titanis.comp_poids`/`centrosaurus.comp_poids`/`coelodonta.comp_poids` seguem o mesmo
  princípio no peso.
- **`region`/`continent`** : a maioria são apenas precisões editoriais entre parênteses
  (ex. "Ásia" → "Ásia (Paquistão, China, Mongólia)"), sem mudar a escala geográfica.
  `mosasaurus.continent` : o FR virou string vazia (`''`) — mantive vazio aqui também,
  conforme a convenção da charte (o campo `continent` não é usado quando `region` já
  cobre "todos os mares do mundo").
- **Fatos corrigidos (`fait`)** : alguns eram inversões factuais no FR antigo (ex.
  `triceratops.fait` tinha a marca de chifre no osso errado — corrigido pro FR novo:
  marcas de DENTES de T-Rex em ossos de Tricerátops) ou anacronismos removidos
  (`scelidosaurus.chasseurs`, `shonisaurus.chasseurs`, `ichthyosaurus.chasseurs`,
  `mammuthus.chasseurs` — predador/caçador específico trocado por formulação mais
  honesta, seguindo a mesma prudência do FR e dos scripts-audio).
- **Verificação (`_check-traduction.cjs pt-br`)** : os WARNs de "chiffres FR" e o ERR em
  `mosasaurus.continent` vêm do fato de `_corpus/corpus-fr.json` estar desatualizado
  (extraído em 2026-09-03, antes do HO-010 de 2026-09-05) — ele ainda compara contra os
  valores ANTIGOS do FR. Os valores em pt-br aqui batem com o FR ATUAL
  (`dinos-data.js`); a regeneração do corpus está fora do escopo autorizado desta
  tarefa (arquivo não listado nos "fichiers autorisés").

## Flora — 19 fichas de plantas (2026-09-07)

Traduzida a chave `plantes` (19 ids, 12 campos cada), a partir de
`_corpus/corpus-fr.json` → `plantes` e do contexto completo de
`content/sources/flore/_FLORE-FICHES.md`. `_check-traduction.cjs pt-br` : 0 erros
na seção plantes.

- **Nomes vernaculares** : uso que uma criança brasileira ouve de verdade —
  `Ginkgo`, `Magnólia`, `Vitória-régia` (não "nenúfar", mais raro em livro infantil
  BR), `Grama`, `Cavalinha gigante`, `Samambaia-açu`, `Cica`, `Araucária`. Quando não
  existe nome popular fixado, adaptação fonética natural: `Dicroídio`,
  `Arqueafruto`, `Podocarpo`, `Plátano`. `Williamsonia` e `Voltzia` (epônimos)
  mantidos idênticos — sem uso popular a seguir.
- **`araucaria.vivant`** : aproveitei o gancho pedido — acrescentei uma frase final
  ("é a araucária, o pinheiro-do-paraná, que dá o nome à floresta do sul do
  Brasil") ausente no FR, porque é um fato verdadeiro e um vínculo cultural forte
  pra uma criança brasileira. Único campo onde acrescentei conteúdo além da
  tradução — decisão pontual, não um padrão pra repetir sem necessidade.
- **`comp_hauteur` — repères recalculados** (nunca tradução literal do repère
  francês, sempre o mesmo grau de grandeza, verificado por cálculo contra
  `plantes.json.hauteur_m`): "lampadaire" → "poste de luz" (6m, já usado nos
  dinos); "étage de maison" → "andar de prédio" (3m); "porte" → "porta" (2m).
  Exemplos: `ginkgo` 30m = "cinco postes de luz empilhados" (5×6=30, exato);
  `araucaria` 40m = "quase sete postes de luz empilhados" (7×6=42, "quase" cobre a
  diferença); `dicroidium` 10m = "um pouco mais alto que um prédio de três andares"
  (3×3=9, "um pouco mais" cobre a diferença); `prele_geante` 4m = "duas portas, uma
  em cima da outra" (2×2=4, exato). Repères corporais diretos mantidos tal qual
  (não precisam de repère cultural): `pleuromeia`/`williamsonia` = múltiplo da
  altura da criança; `mousse` = espessura da mão; `archaefructus` = quadril;
  `nenuphar` = panturrilha; `herbe` = joelho.
- **`nom_etym`** : raízes grego/latinas mantidas intactas (dikroos, equus/seta,
  pleuron, podos/karpos, kyathos, bryon/phyton, archaios/fructus, platys, poa,
  nymphê...), só a explicação ao redor foi traduzida. Epônimos (`voltzia`,
  `williamsonia`, `magnolia`, `wollemia`) : "batizada em homenagem a X" — mesmo
  padrão em todos os quatro.
- **`full`** : nunca traduzido (Araucaria, Poaceae, Ginkgo biloba, Wollemia...),
  conforme a charte.
- **Ponto delicado — `williamsonia.graines`** : o FR descreve uma "structure ronde
  en forme de fleur" com "bractées" e avisa explicitamente "ce n'en est pas une"
  (não é uma flor de verdade — flores ainda não existiam). Traduzi "bractées" como
  **"brácteas"**, nunca "pétalas" — usar "pétalas" teria contradicho o próprio aviso
  duas linhas depois ("parece uma flor, mas não é"). O campo `superpower` mantém
  "A falsa flor do Jurássico" (rótulo do FR, correto: é uma FALSA flor, dita como
  tal).
- **Ponto delicado — `wollemia`/`platane`** : os campos `mangee_comment`/`fait`/
  `vivant` falam da FAMÍLIA (araucariáceas / platanáceas) que vivia com os
  dinossauros ou atravessou a extinção — nunca a árvore individual. Mantive a
  mesma distinção família vs. árvore em pt-br ("a família dele já vivia...", "a
  família dela atravessou a crise...").
- **`cycas.superpower`/`fait`** : veneno das sementes mantido como fato simples,
  sem alarme — mesmo tom do FR.
- Unidades : sistema métrico mantido em todos os campos, nenhum número alterado
  (charte pt-br = mesmo sistema do FR).
