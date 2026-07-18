# LEEME PRIMERO — Books of Hunny / El Libro de la Miel

Handoff para otra instancia de Claude. Léelo entero antes de tocar nada.

Marcos escribe una precuela mitológica de *Winnie-the-Pooh* para sus dos hijas, en inglés
con edición paralela en español (registro tico). El proyecto tiene dos mitades cosidas:
**el Book of Hunny** (la mano de Sallie, luminosa, milniana) y **el Lay of Fangorn** (la
segunda mano, anónima, la caída del Bosque). La obra está TERMINADA en su primer arco.

---

## CUÁLES SON LOS ARCHIVOS FINALES (los únicos canónicos)

Solo dos archivos son la obra. Todo lo demás es andamiaje o manuscrito viejo.

- **`books_of_hunny/hunny.md`** — LA OBRA COMPLETA EN INGLÉS.
  Nota + 13 capítulos del Book + THE LAY OF FANGORN atado después. ~28.700 palabras.
- **`books_of_hunny/miel.md`** — LA OBRA COMPLETA EN ESPAÑOL.
  Gemela exacta: 13 capítulos + EL CANTAR DE FANGORN atado después.

Estos dos deben permanecer **espejo uno del otro**. Toda edición a uno se replica al otro.
Cuando Marcos corrige el inglés, se aplica materialmente y se espeja al español (y viceversa).

### Estructura interna de la obra (idéntica en ambos)
1. **A NOTE BEFORE BEGINNING / UNA NOTA ANTES DE EMPEZAR** — voz de Sallie (S.S.).
2. **Capítulos 1–8** — el oso Pooh dictando; el nacimiento del Bosque, las cuatro Madres
   (Mica, Mu, Lena, Unda), Bob el escarabajo, el conteo (Tart), el tejido (Ara),
   la primera canción (Bufa), y el paso de los años. Voz: Pooh cuenta, Sallie escribe.
3. **Capítulos 9–13** — Sallie en primera persona: sus siete veranos en el Bosque
   (6 a 12 años), hasta la última promesa: *"I should hear all about it in the spring."*
4. **THE LAY OF FANGORN / EL CANTAR DE FANGORN** — la segunda mano. Prosa titulada
   "Lay". Tres Partes (I–XIII secciones). La caída del Bosque tras la partida de Sallie.
   El preámbulo dice que se halló *cosido junto al Book of Hunny, y nadie sabe quién lo cosió*.

La costura viva: el Book termina con la promesa de primavera → el Lay abre con
*"In the last year of the Blossoming the Girl came no more to the Wood."* La devastación
entera vive en ese corte de página. NO se escribe; se ejecuta con el silencio.

---

## ARCHIVOS DE APOYO (NO son la obra — no publicar, no confundir con canon)

En `books_of_hunny/`:
- **`Sallie.md`** — guía de voz de Sallie. Léela antes de escribir cualquier prosa nueva.
- **`expotition.md`** — andamio/scaffold estructural (beats, arquitectura, decisiones).
- **`bob.md`** — notas del personaje Bob.
- **`scrolls_honey.md`** — capa de mitología, SESIÓN DIFERIDA (las abejas del entierro de
  Galleon = puerta Mellea, sin desarrollar). No está integrada a la obra todavía.
- **`ss.md`** — LA MESA DE TRABAJO. Está vacía. Es scratch: Claude escribe prosa nueva aquí,
  Marcos corrige, se aplica, se migra a hunny.md, se vacía la mesa. Si tiene contenido,
  es trabajo en curso sin migrar.
- **`CONTEXTO_PARA_CONTINUAR.md`** — handoff viejo, puede estar desactualizado.

En `lay_fangorn/`:
- **`the_lay_of_fangorn.md`**, **`el_cantar_de_fangorn_anotado.md`**, **`the_legend_of_fangorn.md`**
  — MANUSCRITOS DE REDACCIONES ANTERIORES. **NO son canónicos.** Marcos decidió
  explícitamente dejarlos como manuscritos: divergen del Lay vivo (que está dentro de
  hunny.md) tanto en formato como en CONTENIDO. Diferencias conocidas del standalone viejo:
  dice "leaves" en vez de "pages", "Chapter" en vez de "Part", "Sanders" sin "Mr." en la
  genealogía, y le faltan varios toques tardíos (Woozlos, la tabla-como-dirección, el hunny
  del entierro, los elephantes primos de Lena). El `_anotado` tiene 34 anotaciones + taller
  de construcción (los cimientos sociológicos: Arendt, Weber, Girard, etc.). Útil como
  referencia y aparato crítico, pero la versión viva del Cantar es la de miel.md.

---

## REGLAS DE VOZ (esenciales, no negociables)

**Sallie (inglés):** base Milne + Schulz + Quino + Wilde. Frases serpenteantes con comas y
"and" que aterrizan verdades de costado. JAMÁS explicar el chiste — el mecanismo vive en el
diálogo o el fraseo, nunca en la narración. Sin paréntesis en la prosa. Británico:
mummy/daddy hablado, mother/father narrado; spelt, favourite, liveable. Capítulos de Sallie
~750–1.200 palabras.

**La hunny es INERTE.** Nunca recibe verbos de deseo ni de conciencia. Se escribe "hunny"
en toda la obra; "honey" aparece UNA sola vez, en la Nota, para ser renunciada en esa misma
oración (es el chiste fundacional). No introducir más "honey".

**En voz de Sallie el oso es siempre "Pooh".** El Bosque lo llama "Mr. Sanders" desde el
Cap. 11 (cuando tiene cachorro). Escribir es actividad de Mr. Sanders; jugar es de Pooh.

**Español:** voseo en el diálogo, "la hunny" (femenino), CERO calcos, registro tico natural
(taltuzas, campo, calientito). Los chistes se RECONSTRUYEN sobre mecanismos del español, no
se traducen: p.ej. "calculations"→"cuálesnaciones", "encyclopaedia"→"En-ciclo-pedías"
(ciclo+pedir+día), gophers→taltuzas. Test: ¿lo diría naturalmente una mamá tica en voseo?

**Ley del gradiente:** el Génesis (Cap. 1) es lo más Tolkien; la obra se ablanda hacia
Milne/Schulz/Quino conforme el oso crece. El Lay es el registro más oscuro y arcaico.

**Nadie se despide jamás** en el corpus. La magia del corazón se narra como clima. Sin
tribus en el Florecer (las "bandas" son "quienquiera que iba en la misma dirección", no
clases de animal).

---

## LOOP DE TRABAJO (cómo colaborar con Marcos)

1. Claude escribe prosa nueva directo a `ss.md` (la mesa).
2. Marcos corrige — devuelve sustituciones directas (palabras o frases), a veces el
   documento entero pegado. Sus paréntesis en borradores = DIRECTIVAS (ejecutar Y borrar).
3. Claude aplica MATERIALMENTE (nunca cosmético), diffea, y analiza brevemente. NUNCA
   defiende la versión previa. Corrige deslices mecánicos de ESL en silencio y los reporta
   en una línea. Preserva TODOS los cortes y elecciones intencionales de Marcos.
4. Se migra de la mesa a `hunny.md`; se vacía la mesa.
5. Se espeja al español en `miel.md`.
6. SIEMPRE usar `present_files` tras escribir.

Chat operativo en español. La prosa del Book en inglés.

Marcos es terso, directo, correction-forward. No dar menús de opciones cuando pide una
decisión — dar la recomendación decidida y sostenerla con razón, pero soltarla si trae mejor
evidencia. Nada de cierres aforísticos o glib.

---

## ESTADO ACTUAL / PENDIENTES

- **La obra está terminada** en su primer arco: 13 capítulos + Lay, en los dos idiomas,
  espejados, encuadernados. ~57.000 palabras entre ambos volúmenes.
- Para las lectoras: en carta a espacio sencillo, cada volumen ronda 57–58 páginas.
- **Diferido:** sesión de mitología `scrolls_honey.md` (abejas del entierro = puerta Mellea).
- **Diferido:** Segundo Movimiento y más Lay of Fangorn — el arco futuro del proyecto.
- Los manuscritos standalone del Fangorn NO se sincronizan (decisión de Marcos).
- Barrido honey→hunny: COMPLETO. Solo queda el honey único de la Nota (correcto).
