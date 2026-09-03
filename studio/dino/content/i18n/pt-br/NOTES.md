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
