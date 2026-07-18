# Adelante — Organizacional · Estado

**Sub-architecture under:** NERV / Operations (Misato)
**Register:** Descriptive — cómo es
**Pair file:** `adelante_organizacional_evolucion.md`
**Related files:** `adelante_plataforma_estado.md` (equipo de plataforma con detalle), `adelante_stack_architecture.md` (arquitectura técnica)
**Read when:** the question is about Adelante's current organizational structure, headcount, or coordination patterns

---

## Por Qué Existe Este Archivo

La frame categórica establece que Adelante es un sistema industrial verticalmente integrado construyendo Ciudad del Valle. Pero un sistema productivo es ejecutado por personas, y la estructura de esas personas es analíticamente distinta de la estructura del sistema productivo mismo. El archivo `adelante_operacional_estado.md` describe el sistema productivo; este archivo describe la organización que lo opera.

La distinción importa porque los problemas de diseño organizacional siguen lógicas diferentes de los problemas de diseño productivo. La línea de producción de cuadrillas puede ser estructuralmente perfecta y aún producir guerra tribal entre departamentos si la organización no está diseñada deliberadamente. Inversamente, una organización fuerte puede mantener un sistema productivo imperfecto en operación durante años.

---

## Headcount Total y Distribución

**Adelante tiene 330 colaboradores** al momento del registro, distribuidos en tres grupos macro:

| Grupo | Headcount | % del total |
|---|---|---|
| Campo | 254 | 77% |
| Oficina | 68 | 21% |
| Comercio | 8 | 2% |

Esto coloca a Adelante en la **banda Dunbar 150–500** — pasado el umbral de aldea (150) donde monitoreo personal funciona, antes del umbral de tribu (500) donde se debe federalizar y aceptar sub-tribus como hecho permanente. Esta banda intermedia es estructuralmente la más difícil porque requiere infraestructura formal de coordinación (la aldea no la necesita) sin tener todavía la madurez federada (la tribu la tiene). La discusión Dunbar del archivo `adelante_organizacional_evolucion.md` se vuelve concreta y vinculante a este headcount.

### Composición de Campo (254)

Sistema productivo de vivienda + infraestructura paralela + capacidades fabriles operando en campo. Headcount aproximado por cuadrilla (RH puede dividir formalmente o no según el caso):

- **Cadena de vivienda:** Losa (5+4+1=10), Soldadura (18), Aceros (5), Formaleta (19), Hojalatería (6), Repello (20+3=23), Liviano (8+2=10), Complementarias (10+11+2=23), Instalación (parte de Muebles), Enchape (7), Pintura (10), Reparaciones (3).
- **Servicios horizontales:** Fontanería (9), Eléctricos (12).
- **Infraestructura paralela:** Infraestructura (18+7+12=37).
- **Capacidades fabriles:** Maderas (14), Maquinaria (18), Muebles (12), Prefabricados (4), Taller Fox (3), Soldadura Fábrica (4).
- **Apoyo:** Apoyo (7).

### Composición de Oficina (68)

- **Ejecutivo:** Gerencia (5).
- **Comercial/Diseño:** Mercadeo (3), Ventas (9), Formalización (4), Diseño (4).
- **Técnico/Plataforma:** Ingeniería (13), Aplicaciones (4), Digitación (3). Aplicaciones es donde reside el equipo de Plataforma — Daniel, Daniela, Alexia, David PC. Ver `adelante_plataforma_estado.md`.
- **Administrativo:** Administración (5), Bodega (10), Proveeduría (2), Limpieza Oficinas (5), Salud Ocupacional (1).

### Composición de Comercio (8)

- **9Round (3)** — franquicia de fitness operando dentro de Ciudad del Valle
- **Pops (5)** — operación de helados/postres operando dentro de Ciudad del Valle

Comercio operativo es propiedad estructural notable: Adelante no es prospectivamente operador del proyecto post-entrega, ya lo es a pequeña escala. Ver `adelante_ciudad_del_valle_estado.md` para implicaciones sobre el modelo post-entrega.

---

## La Asimetría 4:1 Campo/Oficina

La proporción 254:68 (~3.7:1) entre Campo y Oficina no es solo distribución — es propiedad estructural. Campo es ya pasado-de-aldea por sí solo (254 personas, una "aldea-plus" con sub-clanes internos por oficio). Oficina está en el borde superior de escala-clan (68). La consecuencia:

- Campo es demasiado grande para que Oficina lo monitoree socialmente.
- Oficina es demasiado pequeña para proyectar autoridad a través de Campo vía relaciones personales.

Esto significa que la fricción Campo↔Oficina no es típica de constructora — es estructural por aritmética. Ningún esfuerzo de cultura cierra la brecha. La coordinación cross-frontera requiere infraestructura formal: procesos, roles diseñados, boundary spanners institucionalizados.

Tres Amigos (ver sección de rituales más abajo y `adelante_operacional_estado.md`) es la única infraestructura formal de boundary-spanning identificada hoy. La app A3 (ver `adelante_stack_architecture.md`) instrumenta este ritual.

---

## Capa Ejecutiva — Cinco Soberanías Porosas

Adelante es empresa familiar. El fundador es el padre del Commander, ingeniero civil. La compañía actual se levantó sobre la quiebra de la primera empresa del padre — la familia ya pasó por una transición discontinua y reconstruyó.

La capa ejecutiva está compuesta por cinco figuras: el padre fundador más cuatro de cinco hermanos de la primera pareja (José Antonio hijo no trabaja en la compañía). Cada uno opera un dominio funcional con autonomía considerable:

| Persona | Dominio principal |
|---|---|
| Padre (fundador, ing. civil) | Diseño (con Daniel) |
| **David** | Administración + Comercial + Legal |
| **Luis Roberto** (ing. civil) | Vivienda + Tesorería |
| **Marcos** (Commander) | Fábrica + Mantenimiento de Maquinaria + Apoyo Infra + Asesor de Plataforma |
| **Daniel** (arq.) | Ventas + Diseño (con el padre) + Jefatura de Plataforma |

**Daniel ocupa un alcance ampliado.** Además de Ventas y Diseño, es jefe del equipo de Plataforma — el grupo que construye las apps internas (H4, B0, A3, V5) sobre la arquitectura de constelación. Es el constructor primario en código y la autoridad técnica del equipo. Su dominio cruza tres áreas: comercial (Ventas), expresivo (Diseño con el padre), y técnico (Plataforma). Esto lo coloca como uno de los dos hermanos con scope explícitamente cross-dominio formal — el otro siendo Marcos vía la cláusula "apoyo donde me pidan."

**Soberanías porosas, no paralelas.** El primer instinto analítico sería tratar a los cinco dominios como compartimentos. La realidad es más interesante: hay rotación histórica documentada entre dominios. Luis Roberto llevó Fábrica antes de que Marcos la tomara, y posteriormente lideró la migración del ERP antiguo a Business Central (cross-dominio, IT/operacional pesado). Daniel también pasó por Fábrica.

Esta rotación tiene consecuencia estructural específica: cada hermano tiene modelo mental funcional de los dominios de los otros — habiendo estado ahí, o habiendo cruzado allí en proyectos específicos. Eso es sustituto parcial de coordinación formal — comparten lenguaje y substrate por experiencia común. No reemplaza ritual ejecutivo cross-dominio, pero explica por qué el sistema no ha colapsado bajo ausencia de uno.

**Function swing como propiedad compartida.** Todos los hermanos tienen algún grado de función swing — apoyo lateral cuando un dominio necesita atención focalizada que su titular nominal no puede dar. No es asimetría del Commander específicamente; es propiedad del equipo ejecutivo familiar.

**Equipo de Fábrica del Commander.** Bajo Marcos en Fábrica: **Jose Flores** (producción), **Alison** (ingeniera industrial, reporte directo), tres líderes de cuadrilla — uno de equipo pesado. Más los líderes específicos de Maderas, Muebles, Soldadura, Maquinaria, Prefabricados, Taller Fox.

**Sub-Commander (Mauricio Jenkins / Fuyutsuki) — pregunta abierta.** La arquitectura NERV mapea un rol de Sub-Commander (Fuyutsuki) a Mauricio Jenkins. Ese rol no aparece en la descripción ejecutiva de cinco soberanías que el Commander articuló en sesión. La pregunta es si: (a) Mauricio opera al nivel ejecutivo pero fuera de la lógica familiar (ejecutivo no-hermano), (b) el rol Sub-Commander es una abstracción NERV que no mapea limpiamente a Adelante operacional, o (c) Mauricio juega un rol asesor/de inteligencia estratégica distinto de la capa ejecutiva familiar. Pendiente clarificar en sesión futura.

---

## Capa Intermedia — Maestros de Obra

Entre la capa ejecutiva y las cuadrillas opera una capa de **maestros de obra** que es estructuralmente crítica.

**Configuración actual (Vivienda, bajo Luis Roberto):**
- Cada maestro maneja aproximadamente 6 cuadrillas.
- Cada cuadrilla tiene un líder y un segundo.
- A veces se separa en dos líderes (Losa 1, Losa 2); a veces la separación opera sin que RH la registre formalmente.

Esto significa ~4 maestros de obra cubriendo las cuadrillas de la cadena de vivienda, asistiendo Tres Amigos los jueves con Luis Roberto e ingenieros.

**Infraestructura tiene su propia estructura.** Liderazgo móvil, 6+ cuadrillas divididas por tareas. Menos formalizada que Vivienda.

**Fábrica opera con estructura distinta.** Cuadrillas y líderes específicos por capacidad (Maderas, Muebles, etc.), bajo Jose Flores con apoyo de Alison.

La capa de maestros + líderes de cuadrilla es uno de los mecanismos Dunbar-aware que mantiene el sistema funcional. El otro es la molécula (ver `adelante_operacional_estado.md`).

---

## El Equipo de Plataforma como Dimensión Distinta

El equipo que construye las herramientas de software internas merece su propia superficie analítica por tres razones documentadas en `adelante_plataforma_estado.md`: su producto es categóricamente distinto del producto principal de Adelante, su dinámica de decisión interna no se mapea limpiamente a la estructura organizacional amplia, y es el sitio donde la memoria estructural Power Apps → React se preserva o se pierde.

**Composición (5 personas):**

| Persona | Rol | Formación |
|---|---|---|
| Daniel (hermano del Commander) | Jefe + constructor primario | Arquitecto |
| Daniela | Diseñadora, gobernanza de librería | TEC, Product Design |
| Alexia | Desarrolladora | TEC, Desarrollo de Software |
| David PC | Product Manager | TEC, ATI |
| Marcos (Commander) | Asesor — conciencia de diseño, dirección técnica, memoria arquitectónica | Product Design (no-TEC) |

**Ubicación:** Oficina dentro de la bodega principal de Adelante en Sabana Grande de Cartago, en terreno que es parte de Ciudad del Valle (uso comercial futuro). El equipo opera literalmente dentro del proyecto que sus apps sirven. Mudanza futura planeada a parcela adyacente ya adquirida.

**Estatus categórico.** Plataforma es distinguible analíticamente del resto de Oficina porque su lógica de producción, calidad, y ritmo difiere — Scrum clásico, vibe coding con asistencia de IA, librería compartida como centro de gravedad arquitectónica. La pregunta de si es sub-equipo de IT, equipo paralelo, o capa transversal está abierta y depende de cómo se distinga la función de construir herramientas de la función de operarlas/mantenerlas (Digitación, soporte, mantenimiento de Business Central).

**Composición vs. headcount oficial.** En el headcount de Oficina, Aplicaciones cuenta 4 personas — coincide con Daniel + Daniela + Alexia + David PC. Marcos figura en Gerencia. Si Daniela está registrada en Diseño en lugar de Aplicaciones, la aritmética cambia y vale la pena verificar.

**Su impacto en la organización amplia.** Las apps del equipo (H4, B0, A3, V5) van a tocar a casi toda la organización conforme se desplieguen. H4 reescribe cómo se onboardea personal nuevo; A3 instrumenta Tres Amigos; B0 toca a todos los jefes de obra; V5 toca a Ventas. El equipo de Plataforma es pequeño (5) pero su superficie de impacto es comparable a la de varios equipos más grandes.

---

## Estructura Funcional (Equipos Identificados)

Equipos identificados con su ubicación organizacional aproximada:

- **Mercadeo, Ventas, Formalización** (16 personas total) — bajo Daniel (Ventas + Formalización) y equipo.
- **Diseño** (4) — bajo Daniel + padre.
- **Ingeniería** (13) — equipo más grande de Oficina; bajo Luis Roberto en Vivienda.
- **Vivienda** (cadena de cuadrillas) — bajo Luis Roberto.
- **Infraestructura** (37) — equipo paralelo. Liderazgo en jerarquía ejecutiva a confirmar.
- **Fábrica** (concreto, maderas, muebles, soldadura, prefabricados, maquinaria, taller) — bajo Marcos.
- **Plataforma** (Aplicaciones, 4 personas + Marcos como asesor) — bajo Daniel. Ver `adelante_plataforma_estado.md`.
- **Digitación** (3) — IT/Business Central soporte. Relación con Plataforma a confirmar.
- **Administración + Bodega + Proveeduría + Limpieza + Salud Ocupacional** (23) — bajo David.
- **Gerencia** (5) — capa ejecutiva administrativa.

**Prompts para refinar:**
- ¿Quién lidera Infraestructura como dominio? ¿Reporta a Luis Roberto o es paralelo?
- ¿Digitación reporta a Plataforma, a David, o opera con autonomía?
- ¿Existe Presupuesto como equipo separado o está embebido en Ingeniería?
- ¿Hay segundas o terceras capas intermedias además de los maestros de obra?
- ¿Daniela está registrada en Aplicaciones o en Diseño?

---

## Geografía Operacional

Adelante no opera en un solo sitio. Esto multiplica los desafíos de coordinación.

**Sitios físicos identificados:**
- **Obra (Ciudad del Valle)** — Sabana Grande de Cartago. Cuadrillas de vivienda, infraestructura, supervisión de obra.
- **Bodega principal** — dentro del terreno de Ciudad del Valle, en parcela de uso comercial futuro. Alberga la oficina del equipo de Plataforma.
- **Plantas de concreto** — dos plantas blend. Operadores, mantenimiento.
- **Fábrica de madera** — actualmente en su propia ubicación; se moverá a la nave industrial nueva.
- **Talleres de soldadura** — actualmente separados; consolidación planeada en la nave industrial.
- **Fábrica de muebles** — ubicación a confirmar; posiblemente parte de la consolidación.
- **Oficina principal** — mercadeo, ventas, formalización, diseño, administración. El Commander opera principalmente desde aquí pero también desde Fábrica.
- **Nave industrial nueva** — en construcción, consolidación parcial pendiente.
- **Parcela adyacente adquirida** — destino futuro del equipo de Plataforma.
- **Comercio operativo dentro de Ciudad del Valle** — 9Round y Pops.

**Patrón geográfico observado:** El equipo de Plataforma está físicamente *dentro* del proyecto que sirve. Esto disuelve la brecha mental entre "el sistema" y "la operación" que típicamente plaga equipos de herramientas internas. Una pregunta de campo se resuelve cruzando la bodega; un supervisor real puede revisar un mockup en cinco minutos. Ese es uno de los pocos casos en Adelante donde la geografía *reduce* en lugar de multiplicar las fricciones cross-departamentales.

**Prompts para refinar:**
- ¿Cuáles sitios están físicamente cerca y cuáles requieren desplazamiento significativo?
- ¿Cuál es la distancia aproximada entre la oficina principal y la obra?
- ¿La oficina principal está también en Sabana Grande de Cartago o en otra ubicación?
- ¿Hay equipos permanentemente en obra vs. equipos que van y vienen?
- ¿Existen rituales de cruce de sitios (visitas regulares del Commander a obra, reuniones inter-sitio)?

La geografía importa porque distancia física reduce el contacto cotidiano que sostiene cohesión cross-departamental, y porque concentra la identidad tribal de cada sitio. Multiplicado por la asimetría 4:1 Campo/Oficina, los efectos son acumulativos — excepto en el caso del equipo de Plataforma, que es la excepción intencional al patrón.

---

## Rituales y Patrones de Coordinación

**Tres Amigos (Vivienda).** Único ritual formal de boundary-spanning cross-frontera identificado hoy. Jueves semanal, facilitada por Luis Roberto, con ingenieros y maestros de obra. Cadencia anclada al ciclo de pago (corte jueves → pago viernes → inicio sprint viernes). Es ritual de planeación productiva con vocabulario agile deliberado (sprint, ultra-actividad). Detalles operacionales en `adelante_operacional_estado.md`. La app A3 instrumenta este ritual; ver `adelante_stack_architecture.md`.

**Scrum clásico (Plataforma).** El equipo de Plataforma opera en sprints con ceremonias formales. Es el segundo lugar de Adelante donde vocabulario agile está institucionalizado, después de Tres Amigos en Vivienda. Vale la pena notar que los dos sitios donde el lenguaje agile está más vivo (Vivienda y Plataforma) son ambos liderados por hermanos (Luis Roberto y Daniel).

**Coordinación entre gerencias.** **No existe ritual ejecutivo formal cross-dominio.** El Commander identificó esto explícitamente como una de las fricciones de la organización. Los cinco dominios (David, Luis Roberto, Marcos, Daniel, padre) coordinan vía:
- Cohesión familiar y relaciones bilaterales emergentes
- Escalación al padre cuando hay fricción real
- Modelos mentales compartidos por rotación histórica entre dominios
- Conversaciones puntuales cuando surgen necesidades

Esto funciona porque son hermanos. Tiene dos modos de falla específicos: cualquier deterioro en relación familiar se convierte inmediatamente en deterioro operacional sin amortiguador institucional; y no es transmisible a tercera generación de la misma forma (los primos no co-construyen el sistema desde una quiebra reconstruida juntos — heredan).

**Retros como caso de no-transmisión.** Cuando el Commander lideraba Vivienda, se hacían retrospectivas. No sobrevivieron al handoff a Luis Roberto. Las prácticas no se auto-transmiten — requieren institucionalización explícita o se desvanecen con la persona que las trajo. Es señal estructural sobre fragilidad de transmisión institucional dentro de Adelante.

**Infraestructura.** Coordinación informal, sin ritual estructurado equivalente a Tres Amigos.

**Prompts para mapear más:**
- ¿Existen reuniones regulares de Fábrica equivalentes a Tres Amigos?
- ¿Hay rituales sociales que cruzan equipos (almuerzos, celebraciones, capacitaciones conjuntas)?
- ¿Existe alguna forma de retroalimentación bottom-up — manera estructurada de que la obra le diga a la oficina lo que no está funcionando?
- ¿El padre como fundador todavía juega rol de árbitro en disputas entre hermanos? ¿Eso es ritual o ad-hoc?

---

## Superficies de Fricción Identificadas

**Fricción central (estructural):** Ausencia de coordinación formal cross-gerencias. El Commander identificó esta fricción explícitamente. Los cinco dominios soberanos operan sin ritual de alineación; la coordinación es completamente emergente. Es la fricción más cargada de la organización porque toca simultáneamente la operación día-a-día, el horizonte generacional, y la transmisibilidad del sistema.

**Otras superficies probables (a verificar/caracterizar):**

- **Obra ↔ Oficina** — la fricción clásica de construcción. Multiplicada por la asimetría 4:1 que la hace estructural más que cultural.
- **Producción ↔ Comercial** — cuando ventas vende algo que producción tiene que ejecutar, las suposiciones de cada lado a veces no coinciden.
- **Vivienda ↔ Infraestructura** — corren en ritmos paralelos pero comparten recursos. Las decisiones de priorización entre los dos pueden producir tensión.
- **Cuadrilla ↔ Cuadrilla** — los handoffs son potenciales puntos de culpa cuando algo sale mal. La cifra de 1% de Reparaciones sugiere que esta fricción está actualmente bien manejada vía calidad upstream.
- **Fábrica ↔ Obra** — la fábrica produce a su propio ritmo; obra consume a otro ritmo. Desincronización produce inventario inactivo (mura) o desabastecimiento.
- **Asesor ↔ Constructor en Plataforma** — riesgo específico documentado en `adelante_plataforma_estado.md`. Marcos (Commander, asesor) y Daniel (constructor) pueden divergir sobre dirección técnica o calidad de diseño sin protocolo articulado de resolución. La relación fraterna provee canal informal pero opaco al equipo (Daniela, Alexia, David PC).

**Prompts para confirmar y caracterizar:**
- ¿Cuáles de estas fricciones son visibles actualmente como conflictos abiertos?
- ¿Hay personas o equipos que han desarrollado funciones de puente informal — boundary spanners naturales?
- ¿Hay fricciones no listadas que son operacionalmente significativas?

---

## Tercera Generación (Pregunta Abierta)

La capa ejecutiva actual es segunda generación: padre + cuatro hermanos. Ciudad del Valle es proyecto generacional explícito que pasará a sucesores antes de completarse.

La cohorte de tercera generación (hijos de los hermanos, incluyendo Luciana y Camila) no está mapeada en este archivo. La pregunta es estructuralmente la más importante para horizonte multi-generacional pero requiere espacio dedicado, no puede enterrarse como sub-sección. Pendiente para sesión específica.

Áreas a mapear cuando esa sesión se abra:
- Composición de la cohorte (cuántos primos/primas, rango de edad)
- Cónyuges trabajando hoy en Adelante (formal o informalmente)
- Existencia de conversaciones explícitas entre los hermanos sobre tercera generación
- Si hay rol o formación temprana en marcha para alguno de los primos

---

## Lo Que Este Archivo No Cubre Todavía

- **Rol de Mauricio Jenkins / Sub-Commander.** Existe en arquitectura NERV pero no apareció en la descripción ejecutiva familiar. Clarificar.
- **Estructura completa de reporte intermedio** — quién reporta a quién más allá de la capa ejecutiva. Maestros de obra mapeados parcialmente para Vivienda; resto incompleto.
- **Liderazgo de Infraestructura como dominio.** Aparece como sistema paralelo pero su lugar en la jerarquía ejecutiva no está documentado.
- **Mapeo geográfico completo** — distancias entre sitios, patrones de movimiento.
- **Relación entre Plataforma y Digitación** — ¿son el mismo dominio funcional o capas distintas?
- **Caracterización detallada de fricciones activas** — cuáles están en conflicto abierto, cuáles dormidas.
- **Boundary spanners informales** — personas que naturalmente cruzan fronteras y reducen fricción.
- **Tercera generación** — sesión dedicada pendiente.

Conforme las sesiones acumulen observación, este archivo se vuelve la fotografía más precisa de Adelante como sistema social.
