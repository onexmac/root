# Adelante — Plataforma · Estado

**Sub-architecture under:** NERV / Operations (Misato)
**Register:** Descriptive — cómo es
**Pair file:** `adelante_plataforma_evolucion.md` (pendiente — articular cuando los principios evolutivos del equipo de plataforma se hayan acumulado lo suficiente)
**Companion file:** `adelante_stack_architecture.md` (arquitectura técnica)
**Read when:** la pregunta es sobre el equipo de software/plataforma, su composición, gobernanza, o dinámica de decisión

---

## Por Qué Existe Este Archivo

La sub-arquitectura Adelante distingue tres dominios — operacional (sistema productivo), organizacional (estructura amplia), y Ciudad del Valle (el proyecto de ciudad). El equipo de plataforma — el grupo pequeño que construye las herramientas de software internas — es una unidad organizacional distinta que merece su propia superficie analítica por tres razones.

Primero, su producto es categóricamente distinto del producto principal de Adelante. No construyen casas; construyen el aparato digital sobre el cual el resto de la organización opera. La lógica de calidad, ritmo de entrega, y disciplina arquitectónica que aplican a su trabajo no es la lógica de cuadrillas y takt time.

Segundo, su dinámica de decisión interna no se mapea limpiamente a la estructura organizacional más amplia. La autoridad técnica reside en una persona que también es el jefe del equipo, que también es hermano del Commander, que también es ingeniero practicante — no nominal. Esa configuración tiene implicaciones que la frame organizacional general no captura.

Tercero, el equipo es el sitio donde la herencia de la era Power Apps encuentra la era React. La memoria estructural — qué lecciones de la era anterior deben sobrevivir la transición, qué reflejos deben modificarse — vive en este equipo. Documentarla aparte ayuda a preservarla.

El archivo complementario `adelante_stack_architecture.md` cubre el qué y el cómo arquitectónico. Este archivo cubre el quién y el por qué humano.

---

## Composición del Equipo

Cinco personas, incluyendo al Commander en rol de asesor:

- **Daniel** — Arquitecto en el sentido costarricense (arquitecto de edificios), hermano mayor del Commander. Jefe del equipo y constructor primario. Code-literate desde la era Power Apps, que él inició. Actualmente desarrolla en React vía *vibe coding* — programación asistida por IA con orientación a velocidad y aprendizaje en producción. Su autoridad es de practicante, no nominal.
- **Daniela** — Diseñadora del equipo. TEC, Product Design. Gobierna la librería de componentes. Es la disciplina de diseño que mantiene la coherencia visual y de comportamiento entre las apps.
- **Alexia** — Desarrolladora. TEC, Desarrollo de Software. Ejecuta implementación dentro del modelo mental establecido por Daniel.
- **David PC** — Product Manager. TEC, ATI (Administración de Tecnologías de Información).
- **Marcos** — Commander de NERV. Rol en el equipo: asesor — conciencia de diseño, dirección técnica, memoria arquitectónica de la era Power Apps.

Toda la formación académica del equipo (excepto Daniel y el Commander) proviene del TEC. Esto significa vocabulario compartido, registro operativo similar, y una orientación ingeniería-primero propia a la formación TEC. El Commander aporta una formación de product design no-TEC que suplementa más que duplica esa orientación.

---

## Geografía del Equipo

Todo el equipo opera desde una oficina ubicada **dentro de la bodega principal de Adelante** en Sabana Grande de Cartago — terreno que es parte de Ciudad del Valle, destinado a uso comercial futuro. El equipo está literalmente dentro del proyecto que sus apps sirven.

Esta configuración disuelve una brecha que típicamente plaga a equipos de herramientas internas: la distancia mental entre "el sistema" y "la operación." Aquí no existe. Una pregunta de campo se resuelve cruzando la bodega; un supervisor real puede revisar un mockup en cinco minutos. Esto debería ser explotado como ventaja estructural, no sólo notado de paso. Rituales de retroalimentación de campo se vuelven baratos.

**Plan futuro:** mudanza a un terreno adyacente que Adelante ya adquirió. La intención es preservar la co-localización del equipo y la cercanía con la operación, sin permanecer dentro del proyecto comercial. La mudanza no rompe el patrón; lo preserva en una geografía ligeramente diferente.

---

## El Patrón de Construcción: Vibe Coding + Autoridad de Practicante

Daniel es la fuente del modelo mental que el resto del equipo implementa. Construyó las Power Apps que el equipo está migrando, y construye las nuevas apps React directamente, con asistencia de IA. Esta es una configuración específica con tensiones específicas.

**La fuerza:** la autoridad de Daniel está enraizada en práctica, no en posición. Cuando dice "construyamos esto así," el peso de la afirmación viene de que él mismo lo construye y observa cómo se comporta. El equipo aprende mirándolo trabajar, no mirándolo gestionar. Esa es una configuración rara y valiosa — la mayoría de equipos de software reportan a managers que tuvieron que *aprender* el dominio; aquí no.

**La tensión:** la velocidad del vibe coding optimiza para movimiento hacia adelante. Optimiza menos para alcanzar primitivos existentes en la librería compartida, porque hacerlo requiere conocer qué hay en la librería — y el vibe coding tiende a generar componentes nuevos cuando ya existe uno. Sin disciplina explícita (revisión de Daniela, hábito establecido, o lint rules), las apps acumulan duplicaciones que erosionan la coherencia que la arquitectura de constelación existe para preservar.

**La continuidad histórica:** Daniel construyó la generación anterior (Power Apps) y construye la nueva (React). Las lecciones estructurales sobre por qué la generación anterior fragmentó — y por qué la arquitectura nueva debe resistir esa misma tendencia — deben ser activamente preservadas en la transición. La arquitectura no es sólo documentación técnica; es un instrumento de memoria estructural que protege la nueva era de repetir los patrones de la anterior. Ése es parte sustancial del trabajo del Commander en rol de asesor.

---

## Estructura de Decisión

La autoridad técnica y la dirección del equipo conviven en Daniel. El Commander opera en rol de asesor — provee conciencia de diseño, dirección técnica, y memoria arquitectónica, pero no llama las decisiones operativas día a día. Daniela tiene autoridad técnica delegada sobre la librería. David PC tiene autoridad sobre prioridades de producto. Alexia ejecuta dentro del marco establecido.

Esta configuración es estable mientras los roles permanezcan claros. El asesor influye; el constructor decide.

**Riesgo específico:** cuando el asesor (Commander) y el constructor (Daniel) divergen sobre dirección técnica o calidad de diseño, el protocolo de resolución no está articulado externamente. Como son hermanos, la resolución probablemente pasa por conversación informal en lugar de proceso explícito. Esto es eficiente cuando funciona y opaco al equipo cuando no — Daniela, Alexia, y David PC pueden percibir señales contradictorias sin saber cómo se están resolviendo. Vale la pena observar si esto se vuelve un punto de fricción medible.

---

## Cadencia y Posición Operativa

El equipo opera en **Scrum clásico** — sprints, ceremonias, posición de Three Amigos importada como vocabulario (ver `adelante_stack_architecture.md` para el detalle del rol de A3).

El desarrollo de las apps es **secuencial, no paralelo.** H4 se construye primero; las demás esperan. La decisión de comenzar con H4 es deliberada: una vez en operación, la organización puede onboard nuevos usuarios sin involucrar al equipo de IT en modo de soporte. Eso libera capacidad de IT para construir las siguientes apps.

El orden de las demás apps (B0, A3, V5) está abierto y será determinado por presión de uso y madurez de la librería al momento que H4 entre en operación.

---

## Posición sobre Herramientas de IA

Daniel construye con asistencia de IA. El resto del equipo — ritmo, herramientas específicas, política de uso — está parcialmente articulado. Esta es una superficie de observación pendiente; la posición del equipo sobre herramientas como Claude Code, Cursor, o Copilot determina su techo de velocidad real con sólo dos desarrolladores activos (Daniel y Alexia).

---

## Superficies de Riesgo Identificadas

- **Erosión de la librería por vibe coding.** El riesgo más específico. Mitigación posible: revisión de PR por Daniela con foco en alcance de primitivos, o lint rule que detecte componentes one-off donde existe equivalente en librería.
- **Memoria estructural concentrada en una persona.** Si Daniel se reduce o sale, la conexión vivida entre la era Power Apps y la era React se atenúa. La documentación de arquitectura existe parcialmente para mitigar esto, pero sólo funciona si es un artefacto compartido y actualizado activamente — no un documento paralelo del Commander.
- **Asesor vs constructor sin protocolo explícito.** Cuando Commander y Daniel divergen, falta un mecanismo articulado de resolución. La relación fraterna provee canal informal pero opaco al equipo.
- **Velocidad de un solo dev principal como límite real.** Con Daniel como constructor primario y Alexia como segunda dev, el techo del equipo es modesto. Esto restringe cuántas apps pueden estar activas en producción simultáneamente y es la razón estructural por la cual la construcción es secuencial.

---

## Conexión con la Arquitectura Técnica

Este archivo describe la dimensión humana y de gobernanza del equipo de plataforma. La dimensión técnica — patrón de constelación, substrato compartido, fronteras que deben sostenerse, inventario de apps — vive en `adelante_stack_architecture.md`. Los dos co-evolucionan: las decisiones del equipo modifican la arquitectura; la arquitectura constrains qué decisiones son viables al equipo.

---

## Lo Que Este Archivo No Cubre Todavía

- **Política explícita sobre herramientas de IA por miembro del equipo.** Posición de Alexia, Daniela, David PC sobre Claude Code / Cursor / Copilot.
- **Mecanismos formales de revisión de código y handoff entre Daniel y Alexia.** ¿Hay pair programming? ¿Revisión de PRs? ¿Ambos comprometen a main?
- **Capacidad de crecimiento del equipo.** Cuándo se justifica un segundo dev (tercero contando a Daniel), un segundo diseñador, un QA específico. Cuándo la velocidad del equipo se vuelve restricción crítica para Adelante.
- **Sucesión de la memoria arquitectónica.** Cómo se preserva el conocimiento estructural si Daniel o Marcos reducen su involucramiento. Conexión con preguntas generacionales más amplias.
- **Métricas de salud del equipo.** Velocidad de sprint, deuda técnica acumulada, calidad de la librería, satisfacción interna. Nada de esto está medido formalmente todavía.

Estas áreas refinan conforme las sesiones acumulen observación.
