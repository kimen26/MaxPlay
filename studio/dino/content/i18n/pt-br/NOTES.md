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
