# Carnotauro — script de áudio PT-BR (Narrateur H + Wex)

> HO-013, i18n nativa a partir de `fr/V3/carnotaurus.md` (canon) + `i18n/pt-br/strings.json` (comparações já validadas, exceto velocidade recalculada aqui).
> Carnotaurus sastrei · Cretáceo · há 72 milhões de anos · América do Sul (Argentina). Dados (`dinos-data.js`) : 8 m comprimento · 2,5 m altura · 1,6 t · **velocidade 52 km/h** (campo estruturado `vitesse_kmh`, usado aqui).
> ⚠️ **Chiffre a sinalizar (herdado do FR)** : o campo texto `superpower` do strings.json ainda diz "até 56 quilômetros por hora", mas o campo estruturado `vitesse_kmh` (usado por `_compVitesse`, HO-009) vale 52. Este script segue o campo estruturado (52), como o FR canon — sinalizado, não corrigido (fora do escopo).
> Comparações = `strings.json` palavra por palavra: "que nem dois carros um atrás do outro" / "da altura de uma trave de futebol" / "tão pesado quanto um carro pequeno e uma vaca juntos".
> Velocidade (recalculada aqui, HO-011/013) com o mesmo repère do FR (`_compVitesse(52)` = "aussi vite qu'une voiture en ville") : "que nem um carro na cidade" (repère já usado em `gallimimus` no strings.json).
> Nome falado : forma plana do léxico (Carnotauro), sílabas separadas só no bloco A.

## Carnotauro — Carnotaurus sastrei

### BLOC A — Apresentação

**NARRATEUR H** [excited] : Car… no… tau… ro. [curious] "Carno", em latim, é a carne. E "tauro" é o touro.
**WEX** [playful] : "Carno"... eu guardei a carne. [hesitant] E "tauro", o que era mesmo?
**NARRATEUR H** [happily] : O touro! O touro que come carne. [confident] Um touro caçador de verdade, com chifres em cima dos olhos. Ele vivia na América do Sul, [amazed] há 72 milhões de anos.
**WEX** [curious] : Chifres de touro, mas ele comia carne?
**NARRATEUR H** [playful] : Comia. [confident] Ele caçava hadrossauros e dinossauros médios do território dele.

### BLOC B — Tamanho

**NARRATEUR H** [excited] : Ele media 8 metros de comprimento — que nem dois carros um atrás do outro! [quickly] De pé, ele tinha 2 vírgula 5 metros de altura — da altura de uma trave de futebol! E pesava 1600 quilos — [amazed] tão pesado quanto um carro pequeno e uma vaca juntos! [excited] E ele conseguia correr a 52 quilômetros por hora — que nem um carro na cidade!
**WEX** [gasps] : Que nem um carro?
**NARRATEUR H** [confident] : De verdade. [proud] O velocista dos grandes carnívoros da época dele.

### BLOC C — Como ele vivia

**NARRATEUR H** [serious] : Era um carnívoro bem rápido. Caçava dinossauros médios, [confident] sozinho, com as patas compridas e fortes.
**WEX** [curious] : Os bracinhos dele também eram bem pequenos?
**NARRATEUR H** [serious] : Ainda menores que os do T-Rex. [warmly] Mas com chifres e patas desse jeito, ele nem precisava.

### BLOC D — O detalhe mais louco

**NARRATEUR H** [excited] : Os bracinhos dele eram tão minúsculos [chuckles] que quase não serviam pra nada. [amazed] Mas as patas de trás dele, essas sim, eram patas de corredor de verdade.
**WEX** [gasps] : Um touro-foguete.
**NARRATEUR H** [playful] : O campeão de velocidade entre os grandes carnívoros. [chuckles] Nem os bracinhos pequenos o atrapalhavam.
