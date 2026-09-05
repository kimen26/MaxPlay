# Galimimo — script de áudio PT-BR (Narrateur H + Wex)

> HO-013, i18n nativa a partir de `fr/V3/gallimimus.md` (canon) + `i18n/pt-br/strings.json` (comparações traduzidas, velocidade RECALCULADA aqui).
> Gallimimus bullatus · Cretáceo · há 70 milhões de anos · Ásia (Mongólia). Dados (`dinos-data.js`) : 6 m comprimento · 2 m altura · 440 kg · **velocidade 50 km/h** (recalculado HO-009/010, o antigo "70 km/h" era um mito).
> ⚠️ **Velocidade corrigida (HO-009/010)** : os campos texto `superpower`/`fait` de `strings.json` ainda dizem "até 70 quilômetros por hora", mas o campo estruturado `vitesse_kmh` (usado por `_compVitesse`, HO-009) vale 50 — o "70" era baseado num mito ultrapassado. Este script usa 50 km/h com o repère do FR (`_compVitesse(50)` = "aussi vite qu'une voiture en ville") : "que nem um carro na cidade" (mesmo repère já em `strings.json`, campo `fait`, cuja frase de 70 km/h é substituída aqui por 50).
> Comparações de tamanho = `strings.json` palavra por palavra: "com a largura de uma rua de duas faixas — ele fechava a rua toda" / "da altura de uma porta" / "tão pesado quanto 2 leões".
> Taxonomia honesta : "primo dos raptores", nunca "é um dromeossauro" (é um ornitomimídeo, agrupado tecnicamente com os raptores no app).
> Nome falado : forma plana do léxico (Galimimo), sílabas separadas só no bloco A.

## Galimimo — Gallimimus bullatus

### BLOC A — Apresentação

**NARRATEUR H** [excited] : Ga… li… mi… mo. "Galli", em latim, [serious] é o galo, a galinha. E "mimus" é aquele que imita. [curious] Então, o que dá?
**WEX** [confident] : Aquele que imita a galinha.
**NARRATEUR H** [chuckles] : Isso mesmo, só que ele era bem maior que uma galinha. [proud] Ele vivia na Ásia, no deserto da Mongólia, há 70 milhões de anos.
**WEX** [curious] : Ele é primo dos raptores, [gasps] que nem o Velocirraptor?
**NARRATEUR H** [confident] : Um primo distante, sim, [amazed] mas ele nem tinha dentes — só um bico, que nem um pássaro.

### BLOC B — Tamanho

**NARRATEUR H** [excited] : Ele media 6 metros de comprimento — [quickly] com a largura de uma rua de duas faixas — ele fechava a rua toda! De pé, ele tinha 2 metros de altura — da altura de uma porta! E pesava 440 quilos — [proud] tão pesado quanto 2 leões. [amazed] E os cientistas acham que ele conseguia correr até 50 quilômetros por hora — que nem um carro na cidade.
**WEX** [gasps] : Que nem um carro?
**NARRATEUR H** [proud] : Isso, com as pernas longas e finas. [amazed] Um dos dinossauros mais rápidos que a gente conhece.

### BLOC C — Como ele vivia

**NARRATEUR H** [serious] : Ele comia de tudo — [confident] bichinhos pequenos, ovos, plantas. Vivia em manada grande, que nem as avestruzes de hoje.
**WEX** [curious] : E o T-Rex, conseguia pegar ele?
**NARRATEUR H** [confident] : Não fácil. [warmly] Com essa velocidade, o Galimimo disparava antes do T-Rex chegar perto.

### BLOC D — O detalhe mais louco

**NARRATEUR H** [excited] : A velocidade dele vinha de pernas longas e finas e músculos fortes, [pauses] quase que nem as patas de uma avestruz.
**WEX** [amazed] : Então é mesmo uma avestruz gigante.
**NARRATEUR H** [softly] : Quase. [proud] Uma avestruz gigante, sem penas visíveis, correndo pelo deserto em manada.
