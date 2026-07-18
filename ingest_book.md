# Ingest — Book
*Protocolo de absorción de libros · v1.0 · paralelo a `ingest_post.md`*

**Cuándo se activa:** Marcos menciona un libro para revisar, absorber, o evaluar — "book review", "¿qué saco de X?", "breakdown de X", o simplemente nombra un libro nuevo en conversación con intención de trabajarlo. No requiere comando exacto; la forma de la pregunta dispara el protocolo.

**Qué produce:** tres secciones, en este orden. La tercera es obligatoria — es la razón de ser del protocolo.

---

## 1. Desglose de tesis

Las tesis principales del libro, steel-manned, en 3–7 puntos. Cada tesis en una o dos oraciones, con el mecanismo — no el eslogan. Si el libro es post-cutoff o desconocido, se busca primero (web) y se declara la base de la lectura: texto directo, entrevistas del autor, reseñas sustantivas, o registro histórico. La procedencia se nombra siempre; los ítems interpretativos se marcan como tales.

## 2. Mapa de absorción

Qué se absorbe hacia Adelante (destino más probable: Manual de Salto) y hacia el sistema. Cada ítem con etiqueta de destino:

- **[REGLA]** — candidata a regla nueva del Manual de Salto. Solo si nombra algo que ninguna regla existente gobierna. La vara es alta: el manual prefiere absorber sobre crecer.
- **[ABSORBIDO]** — se integra a una regla existente (se nombra cuál) como mecanismo o "porqué" faltante.
- **[CONFIRMA]** — evidencia convergente para doctrina que ya existía. Valiosa como munición empírica; no cambia el manual.
- **[DESPLIEGUE]** — no es doctrina sino método de introducción: cómo instalar una práctica en la organización.
- **[LECTURA]** — disciplina de razonamiento para el sistema (MAGI / brains), no para el manual.
- **[DESCARTADO]** — considerado y rechazado, con el porqué en una línea. Se registra para no re-litigar.

Regla de sesión: si el mapa produce cambios reales a archivos, el batch de salida incluye `changelog.md` actualizado — sin excepción.

## 3. Veredicto de triaje — ¿destilable o lectura propia?

La pregunta que cierra todo ingest: ¿este libro se absorbe en conversación, o Marcos debe leerlo directo porque el ir a fondo le construye el brain system? Tres veredictos, con el criterio declarado:

### Destilable en conversación
El valor del libro es **proposicional** — cabe en afirmaciones que sobreviven la compresión.
Señales: libro de mecanismo único (una idea + 200 páginas de ejemplos — el default del género business); convergencia >70% con doctrina ya sostenida (solo importa el delta); el valor son los estudios y datos, citables sin la prosa; se quiere la *herramienta*, no la formación.
→ MAGI lo destila completo; leerlo sería costo sin retorno marginal.

### Skim guiado
El libro es mayormente destilable pero contiene **aparato que no comprime** — checklists, surveys, ejercicios, casos trabajados en detalle.
→ MAGI destila las tesis y señala los capítulos/secciones específicos que justifican el libro físico. Se lee eso y nada más.

### Lectura propia
El valor del libro es **tácito** — vive en lo que la compresión destruye. Cuatro clases:
1. **Entre líneas** — el cómo y el porqué deben inferirse del detalle narrativo que todo resumen elimina (memorias, historia primaria). El resumen entrega el qué; el qué no era lo que se buscaba.
2. **Formación** — el libro cambia cómo se piensa por exposición prolongada al método, no por sus conclusiones. Recorrer el argumento *es* cargar el inventario (principio Cassettiera: la lectura como infraestructura). La conclusión sola no instala nada.
3. **Despliegue bajo presión** — doctrina que se va a ejercer en caliente exige internalización por repetición; el resumen produce reconocimiento, no reflejo.
4. **Riesgo de mala lectura con stakes altos** — donde una síntesis equivocada de MAGI alimentaría una decisión de capa lenta; la fuente primaria es la única auditoría.

→ MAGI puede preparar el terreno (contexto, qué buscar, contra qué leerlo) pero el libro se lee entero.

**La prueba rápida:** ¿el valor sobrevive en diez afirmaciones? → destilable. ¿Sobrevive menos el aparato? → skim guiado. ¿Lo que importa es justo lo que las diez afirmaciones no pueden cargar? → lectura propia.

---

## Ejemplos trabajados (sesión fundacional, julio 2026)

| Libro | Veredicto | Por qué |
|---|---|---|
| *Mission Ready* — Elkins-Tanton | **Skim guiado** | Tesis ya destiladas y absorbidas (reglas 41, 42, 46). El valor residual es el aparato — checklists y surveys de las 304 pp. que no comprimen. Leer esos capítulos; el resto está capturado. |
| *Thinking Historically* — Gavin | **Lectura propia** (formación) | Las 12 preguntas comprimen (regla 40 las carga); la *práctica* no. Gavin lo dice él mismo: la historia como sensibilidad y discernimiento, no como información. El recorrido es el entrenamiento. |
| *From Third World to First* — LKY | **Lectura propia** (entre líneas) | El caso puro de la clase 1: el qué es historia conocida; el cómo y el porqué viven en el detalle de las memorias. Los ítems absorbidos en sesión (regla 32, hierro-en-capas-lentas, identidad-por-fricción) fueron interpretativos — la lectura directa los audita. |

---

## Destinos de salida

- Candidatas [REGLA] / [ABSORBIDO] → `manual_de_salto.md` (con changelog).
- [LECTURA] → engine / commonplace según forma.
- Registro de sesión → checklist de absorción del batch (patrón `absorption_checklist.md`).
- Veredictos → se acumulan en la tabla de este archivo como jurisprudencia del triaje.

*Mantenido por Science. La tabla de ejemplos crece con cada ingest; los criterios se corrigen cuando un veredicto resulte equivocado en retrospectiva — anotar el error, no borrarlo.*
