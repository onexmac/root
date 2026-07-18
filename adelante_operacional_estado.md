# Adelante — Operacional · Estado

**Sub-architecture under:** NERV / Operations (Misato)
**Register:** Descriptive — cómo es
**Pair file:** `adelante_operacional_evolucion.md`
**Read when:** the question is about the current state of Adelante's productive system

---

## El Sistema de Dos Tiempos

Adelante corre dos sistemas con cadencias incompatibles. Entender esto es la entrada a entender todo lo demás operacionalmente.

**El sistema comercial** corre en ciclos mensuales con sesgo de fin de mes. Mercadeo produce 100 visitas al mes al proyecto; las visitas convierten a 20 reservas; las reservas convierten a 10 formalizaciones (ventas con crédito bancario aprobado). La cadencia de formalización se concentra hacia fin de mes — una mezcla de ciclos bancarios, comportamiento de cliente, y la propia dinámica de cierre mensual del equipo de ventas.

**El sistema productivo** corre en ciclos semanales con tiempo takt constante. Cada cuadrilla opera como una estación en línea. El equipo de infraestructura corre adelante de vivienda, construyendo el urbanismo antes que las casas que lo justifican. Este ritmo no puede pausar sin producir *mura* — la irregularidad que destruye sistemas productivos más rápido que la ineficiencia bruta lo hace.

**El desajuste.** Un sistema comercial con batching mensual alimentando un sistema productivo de cadencia semanal constante produce lo que el Commander ha llamado el efecto acordeón: gente moviéndose dentro y fuera de producción según la cadencia de formalización, con las correspondientes pérdidas de curva de aprendizaje, motivación, costos de re-arranque, y calidad.

**La solución actual.** Pre-iniciar viviendas con capital propio para clientes con potencial de capital propio, manteniendo 8 viviendas activas para entregar a takt. El capital propio funciona como un *buffer de sincronización* entre los dos tiempos. El capital está inmovilizado en obra pre-iniciada; el costo financiero es real pero es menor que el costo operativo del efecto acordeón.

El punto de equilibrio del sistema completo ronda las 6 viviendas. El sistema corre por encima de ese piso permanentemente.

---

## Funnel Comercial — Tasas Actuales

```
Mercadeo (KPI: 100 visitas/mes)
    ↓ 20%
Ventas (20 reservas/mes)
    ↓ 50%
Formalización (10 formalizaciones/mes, sesgo fin de mes)
    ↓
Producción (ver capacidad demand-following más abajo)
```

Las dos conversiones explícitas: visita-a-reserva al 20%, reserva-a-formalización al 50%. La conversión completa de visita a formalización es del 10%.

**Prompts para refinar este funnel en sesiones futuras:**
- ¿Qué tan estable es la cifra de 100 visitas/mes? ¿Estacionalidad?
- ¿La conversión 20% reserva está reportada a nivel agregado o varía por canal de mercadeo?
- ¿Qué porcentaje de pre-iniciados con capital propio terminan formalizándose vs. otras rutas?
- ¿Cuáles son los principales puntos de fricción identificados entre reserva y formalización?

---

## Estructura Funcional Actual

Adelante tiene **330 colaboradores totales** al momento del registro. La descripción organizacional completa vive en `adelante_organizacional_estado.md`; aquí registramos la división productiva:

- **Campo** — 254 colaboradores. Cadena de cuadrillas de vivienda, sistema paralelo de infraestructura, capacidades fabriles que operan en campo.
- **Oficina** — 68 colaboradores. Mercadeo, Ventas, Formalización, Diseño, Ingeniería, Administración, Bodega, Aplicaciones, Digitación, Limpieza, Proveeduría, Salud Ocupacional, Gerencia.
- **Comercio** — 8 colaboradores. 9Round (3) y Pops (5) — operación comercial activa dentro de Ciudad del Valle.

La asimetría 4:1 Campo/Oficina es propiedad estructural con consecuencias para coordinación cross-frontera. Ver `adelante_organizacional_estado.md`.

---

## La Cadena Completa de Cuadrillas de Vivienda

La arquitectura productiva está más cerca de manufactura Toyota que de construcción tradicional. La cadena de vivienda comprende doce estaciones secuenciadas en orden cronológico, cada una operando como cuadrilla con líder propio:

1. **Losa** — pacer del sistema. Una molécula = una vivienda. Dos cuadrillas paralelas (Losa 1, Losa 2). Losa Sanitaria es nombre histórico para fontanería de grifería en acabados, no es una tercera línea.
2. **Soldadura** — estructura metálica, escaleras, techos.
3. **Aceros** — armadura de varilla. Actualmente artesanal; candidato cercano de industrialización interna.
4. **Formaleta** — encofrado para chorrea de concreto de muros. Si "muros" se considera cuadrilla, contempla solo el concreto del muro.
5. **Hojalatería** — láminas, canoas, cubierta metálica.
6. **Repello** — repello y empaste, ciclo de 2 semanas. La restricción no es labor sino espacio físico — comprimir a 1 semana sería prohibitivo. La molécula crece para absorber el estiramiento temporal.
7. **Liviano** — paredes livianas internas.
8. **Complementarias** — múltiples cuadrillas operando funciones complementarias (Complementarias 1, 2, 4 visibles en headcount).
9. **Instalación** — puertas y muebles. Operacionalmente parte de Muebles: 4 fabrican en fábrica, el resto (8) instala en campo.
10. **Enchape** — pisos y revestimientos cerámicos.
11. **Pintura** — pintura final.
12. **Reparaciones** — corrección de defectos detectados.

Cada estación entrega a la siguiente y toma la siguiente unidad en cascada. Cuando Losa termina una vivienda, esa vivienda avanza a Soldadura y Losa toma la siguiente. Esto es geometría operacional Lean, no analogía decorativa.

**Líneas paralelas.** Donde el numerado aparece en la tabla de headcount (Losa/Losa 2, Repello/Repello 2, Liviano/Liviano 2, Complementarias/2/4), confirma operación de múltiples cuadrillas paralelas en esa estación. El número varía por estación según demanda; el sistema no es uniforme.

---

## La Molécula — Concepto Propietario de Escalado

La **molécula** es término propietario interno de Adelante. Es la unidad de dimensionamiento de cuadrilla, definida como *la cantidad de personal necesario para cumplir la tarea de esa estación dentro del takt semanal del sistema*.

Propiedades estructurales:

- **Una molécula = una vivienda** en estaciones que pueden cerrar en una semana. Si la meta semanal es 2 viviendas (típicamente una pequeña y una grande), la cuadrilla opera con dos moléculas — una pesada (vivienda grande) y una liviana (vivienda pequeña).
- **La molécula puede crecer en headcount** cuando una estación no se puede comprimir temporalmente. Repello requiere 2 semanas mínimas por espacio físico; la molécula absorbe ese estiramiento con más personal, no con más tiempo.
- **La molécula divide la cuadrilla al acercarse a ~20 miembros.** Esto es un techo social, no técnico — colaboración y deserción empiezan a deteriorarse cerca de ese umbral. La división puede ser formal (RH la registra como Losa 1 y Losa 2) o informal (existe operacionalmente sin registro).

La molécula es un *scaling primitive* que hace tres cosas simultáneamente: empata takt semanal, absorbe estiramiento temporal donde una tarea no se puede comprimir, y embebe un techo social Dunbar-aware a escala de cuadrilla. La disciplina de mantener cuadrillas debajo de ~20 personas es infraestructura organizacional invisible, operando empíricamente.

**Segundo scaling primitive: subcuadrilla temporal.** Cuando una necesidad puntual lo requiere, una cuadrilla puede formar un sub-equipo temporal con identidad propia. Soldadura Fábrica (4 personas) es ejemplo — parte de Soldadura, formada para necesidad específica de soporte a fábrica. No es estructura permanente; es elasticidad de respuesta dentro de la cuadrilla madre.

La consecuencia analítica: la tabla de headcount de Campo es fotografía momentánea, no estructura fija. El sistema organizacional en Campo es genuinamente fluido — moléculas crecen, cuadrillas se dividen, subcuadrillas se forman y disuelven según demanda.

---

## Servicios Horizontales: Fontanería y Eléctrico

Fontanería (9 personas) y Eléctrico (12 personas) no son estaciones de la cadena. Son **servicios horizontales** que dan soporte a otras cuadrillas en momento específico del ciclo de cada vivienda.

**Modo de operación:** takt-locked en algunos puntos (entran en momento fijo del proceso de cada vivienda), pull-based en otros (las cuadrillas los llaman cuando los necesitan). El líder de la cuadrilla que los requiere coordina con ellos.

**Implicación de escalado.** Como no son estaciones, su capacidad no escala uno-a-uno con throughput de la cadena. Su escalado responde a *carga total* del sistema (suma de viviendas activas en múltiples estaciones), no a takt de una sola estación. Esto los hace estructuralmente distintos de las cuadrillas de cadena.

---

## Infraestructura como Sistema Productivo Paralelo

Infraestructura no es una estación de vivienda; es un sistema productivo paralelo con cadencia y disciplina propia.

**Composición actual:** al menos 6 cuadrillas divididas por tareas, con un líder móvil. Las funciones cambian dependiendo de la tarea — un día calles, otra semana un parque, un mes la fábrica nueva. La organización es fluida y task-driven, no station-locked.

**Headcount registrado:** Infraestructura (18) + Infraestructura 2 (7) + Infraestructura 3 (12) = 37 personas en la tabla, sin contar cuadrillas que pueden estar contabilizadas dentro de otras líneas según asignación temporal.

**Lógica estratégica:** Infraestructura corre *adelante* de vivienda. Construye urbanismo, estructuras comerciales, y marco del condominio antes que las viviendas que justifican esa inversión existan. Esto es apuesta deliberada de blitzscaling local — quemar capital de obra civil temprano, porque la velocidad del sistema completo importa más que la optimización de cada estación.

**Disciplina de coordinación:** menos formal que Vivienda. No tiene equivalente de Tres Amigos como ritual estructurado; la coordinación es más emergente y task-driven, ajustada al cambio de proyecto.

---

## Tres Amigos y Ultra-actividad — Coordinación Productiva

La programación semanal de Vivienda sucede en una reunión llamada **Tres Amigos**, ritual fijo todos los jueves. El nombre es préstamo de software-agile (los Three Amigos originales son BA + dev + QA revisando user story antes de desarrollarla).

**Estructura:** Asisten ingenieros y maestros de obra. Luis Roberto (ing. civil, encargado de Vivienda, hermano del Commander) facilita; la facilitación la llevaba el Commander hasta hace ~2 años. La cadencia jueves está anclada al ciclo de pago: hay corte de avance jueves para hacer pagos viernes, e inicio de sprint viernes. El resto de los procesos se acomodaron en función de este corte.

**Vocabulario operacional:**

- **Sprint** = ciclo semanal de una estación. Sprint 1 es Losa, que le entrega a Sprint 2 Muros mientras Losa sigue con la siguiente casa en cascada.
- **Ultra-actividad** = bundle cronológico de múltiples actividades del presupuesto mapeando a una estación de producción. Ejemplo: Losa como ultra-actividad comprende fundaciones, mecánico losa, eléctrico losa, acero losa, chorrea de concreto.

**Por qué importa la ultra-actividad.** Presupuesto y producción típicamente tienen granularidades distintas: Presupuesto piensa en líneas de costo (acero, concreto, fundaciones), Producción piensa en estaciones secuenciadas. Cuando esos dos no se reconcilian, aparecen huecos de pérdida y reportería desalineada — es un problema mal resuelto en la mayoría de constructoras. La ultra-actividad es el puente entre las dos granularidades: permite a Presupuesto (oficina) coordinar con Ingeniería sin renegociar la unidad de análisis cada vez. Es pequeño detalle de diseño con gran consecuencia operacional.

**Estatus institucional.** Tres Amigos es el único ritual formal de boundary-spanning Campo/Oficina identificado hoy. Una sola reunión semanal carga toda la coordinación formal cross-frontera de una organización de 330 personas. Funciona, pero es infraestructura sorprendentemente delgada para esa carga.

**Instrumentación en software.** Una de las apps del equipo de Plataforma — A3 — está siendo construida específicamente para instrumentar este ritual: control de sprints, PPC (Percent Plan Complete), miss reason codes para diagnosticar dónde acumulan los fallos. Ver `adelante_stack_architecture.md`.

**Retros como caso documentado de no-transmisión.** Cuando el Commander lideraba Vivienda (hasta hace ~2 años), se hacían retrospectivas. No sobrevivieron al handoff a Luis Roberto. Las prácticas no se auto-transmiten — requieren institucionalización explícita o se desvanecen con la persona que las trajo. Es señal estructural relevante para el archivo de evolución.

---

## Mapa de Integración Vertical — Inventario Actual

Cada proceso absorbido fue fundado de utilidad excedente y sirve a Ciudad del Valle directamente. El patrón: proveedor externo → línea de costo → candidato de absorción → capacidad propia.

**Actualmente operando:**
- Dos plantas de concreto (blend plants)
- Maquinaria pesada (18 personas registradas)
- Fábrica de muebles (12 personas, incluyendo 4 fabricación + 8 instalación de puertas y muebles)
- Fábrica de madera (14 personas — rodapiés, puertas, marcos)
- Talleres de soldadura/estructurales (18 personas: techos, escaleras externas, hojalatería, cubierta) — más Soldadura Fábrica como subcuadrilla temporal (4)
- Líneas de prefabricado (4 personas) — tapias, baldosas, dados de concreto de contención
- Capacidad de IT — Aplicaciones (4) + Digitación (3) construyendo aplicaciones propias alrededor de Business Central. La migración del ERP antiguo a Business Central fue liderada por Luis Roberto. Las 4 personas de Aplicaciones constituyen el equipo de Plataforma (Daniel + Daniela + Alexia + David PC), que construye las apps internas H4, B0, A3, V5 sobre arquitectura de constelación. Ver `adelante_plataforma_estado.md` y `adelante_stack_architecture.md`.
- Taller Fox (3 personas)
- Bodega centralizada (10 personas)

**Actualmente en construcción:**
- Nave industrial consolidando fábrica de madera y talleres de soldadura bajo un solo techo

**Objetivos de absorción cercanos:**
- Armadura de varilla de acero para viviendas (actualmente artesanal — candidato para industrialización interna)
- Bodegas inteligentes con egreso automatizado de inventario (canastas con sensores de peso registrando incluso tornillos individuales). Las 10 personas en Bodega hoy son contexto operacional para esta absorción: automatización libera headcount real, no solo proceso.

**Mediano plazo:**
- Brazos robóticos para laqueo de puertas y otros productos terminados

**Largo plazo:**
- Automatización progresiva a través de líneas de producción, alcance por determinar conforme tecnologías adyacentes maduren

**Liderazgo de Fábrica.** El Commander lleva Fábrica como dominio. Equipo de gestión directo: Jose Flores (producción), Alison (ingeniera industrial), tres líderes de cuadrilla — uno es líder de equipo pesado. Maderas, Maquinaria, Muebles, Prefabricados, Taller Fox, mantenimiento de maquinaria, soldadura están todos bajo Fábrica, más apoyo a Infraestructura cuando se requiere. La industrialización progresiva es la disciplina central del rol.

**Prompts para refinar el inventario:**
- ¿Qué proporción del costo total de una vivienda está hoy capturada por capacidades internas vs. compra externa?
- ¿Cuál es la utilización porcentual actual de cada planta/fábrica?
- ¿Cuál es el plazo aproximado de cada absorción próxima (bodegas inteligentes, armadura)?

---

## Calidad Upstream Como Propiedad Estructural

Reparaciones cuenta 3 personas sobre 254 en Campo (~1%). La banda típica de rework en construcción es 5–10% del costo total, frecuentemente escondido en líneas como "ajustes" o "garantía." Que Adelante ejecute a esa fracción significa que el handoff entre cuadrillas funciona — cada estación cierra su trabajo antes de pasarlo, y los defectos no acumulan a través de la cadena.

Esto no es dato neutro. Es activo estructural escaso. La calidad upstream — la disciplina de cerrar trabajo correcto en cada estación antes del handoff — es lo que mantiene Reparaciones manejable a 3 personas. Si esa disciplina se erosionara, la cifra crecería rápidamente y el sistema productivo entero se degradaría (mura, retrabajo, ciclos extendidos).

Vale la pena monitorear esta cifra como indicador estructural, no solo operacional.

---

## Capacidad Demand-Following, No Throughput Estático

**Corrección importante a lecturas anteriores.** La capacidad productiva de Adelante no es un techo estático del tipo "2 viviendas/semana por cuadrilla con N cuadrillas paralelas." Es un sistema demand-following con elasticidad por capas:

- **Capa 1 — Molécula:** Crece en headcount cuando una estación necesita más capacidad.
- **Capa 2 — Cuadrilla:** Se divide cuando se acerca a ~20 miembros, formando una segunda cuadrilla paralela.
- **Capa 3 — Vertical:** Se absorbe nueva capacidad vertical cuando la cadena se satura sistemáticamente (es la lógica de "utilidad excedente absorbe procesos adyacentes" del archivo base).

Esto significa que la fotografía actual de "2 viviendas/semana por par de moléculas pesada+liviana" no es techo con holgura — es la calibración momentánea a la demanda actual. Si la demanda crece, los equipos crecen o se forman cuadrillas nuevas; si la demanda contrae, la elasticidad simétrica está menos clara y vale la pena explorarla en sesión dedicada.

**Implicación para el cuello de botella.** Ventas no es "el cuello de botella" en sentido estático de teoría de restricciones. El cuello de botella real es la *velocidad* a la que el sistema puede escalar capacidad productiva sin perder cohesión/calidad — una restricción sobre la segunda derivada del crecimiento, no sobre el throughput actual. Esta es una formulación más precisa de por qué la disciplina de absorción progresiva importa: si ventas crece más rápido que la capacidad de absorber capacidad nueva preservando calidad upstream, el sistema se degrada.

---

## Lo Que Este Archivo No Cubre Todavía

Áreas donde el substrate aún no es suficiente para descripción confiable. Estos son los prompts más importantes para sesiones futuras:

- **Distribución completa de líneas paralelas por estación.** Sabemos que Losa, Repello, Liviano, Complementarias, Infraestructura tienen múltiples cuadrillas. Distribución exacta y cómo se mueven entre proyectos no está mapeada.
- **Métricas de handoff entre estaciones.** Cómo se verifica calidad al cerrar cada estación más allá del indicador agregado de Reparaciones.
- **Elasticidad de contracción.** La elasticidad de expansión está clara (molécula → cuadrilla → vertical). La de contracción es menos clara — qué pasa con moléculas y cuadrillas en ciclo bajo.
- **Estructura financiera básica.** Margen por vivienda, capital propio inmovilizado en pre-inicios, tasa de reinversión de excedente.
- **Geografía operacional específica.** Dónde están físicamente las plantas, fábricas, obra, oficina, distancias entre ellas. Esto importa para análisis tribal (ver `adelante_organizacional_estado.md`).
- **Estado funcional de Business Central y aplicaciones propias.** Qué procesos están absorbidos, qué se está construyendo, qué se planea absorber con tecnología propia.
- **Rituales de Infraestructura.** Cómo se coordina internamente, dado que no tiene Tres Amigos equivalente.

Estas no son fallas; son superficies de captura. Conforme las sesiones acumulen observación, este archivo crece.
