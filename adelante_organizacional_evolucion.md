# Adelante — Organizacional · Evolución

**Sub-architecture under:** NERV / Operations (Misato)
**Register:** Prescriptive — bajo qué marco evoluciona
**Pair file:** `adelante_organizacional_estado.md`
**Read when:** the question is about how to evolve Adelante's organization as it scales, team structure design, scaling beyond Dunbar thresholds, or culture engineering

---

## El Problema Central

El problema central de diseño organizacional para Adelante — y para cualquier organización que crece más allá del rango Dunbar — es una **dualidad fundamental** entre dos modos de falla que surgen del mismo desajuste subyacente: la maquinaria de cooperación que la evolución nos dio fue afinada para grupos de 50-150 personas, y estamos intentando correr grupos de 500, 5,000, 50,000.

Los dos modos de falla:

**Free-riding a escala de organización completa.** Cuando la organización supera el número de Dunbar (~150 personas), los individuos dejan de sentir que su contribución importa. El monitoreo social se rompe — no puedes saber quién está jalando el peso cuando hay demasiadas caras. El free-riding se vuelve racional. La gente se acomoda. El esfuerzo decae.

**Guerra tribal a escala de subgrupo.** La solución estándar es romper la organización en equipos del tamaño de una pizza (6-12 personas) donde todos se conocen y el monitoreo social es automático. Dentro de esos equipos, el free-riding desaparece. Pero la misma maquinaria psicológica que hace cohesivos a los equipos pequeños — identificación con el endogrupo, lealtad mutua, disposición a sacrificarse por los compañeros — es exactamente la maquinaria que produce hostilidad hacia el exogrupo. Tienes diez equipos cohesivos y un problema de guerra tribal: Ingeniería odia a Ventas, Producto le echa la culpa a Marketing, los recursos no fluyen entre fronteras.

Los dos modos son **duales en un sentido preciso**: el mecanismo que resuelve uno tiende a causar el otro. Identidad fuerte de subgrupo resuelve free-riding creando monitoreo social estrecho dentro de grupos pequeños, pero genera fragmentación entre grupos. Identidad fuerte de supergrupo (cultura corporativa, valores compartidos, rituales con todo el personal) resuelve fragmentación elevando la entidad mayor, pero debilita el monitoreo social que prevenía free-riding en primer lugar.

**No es un problema que se resuelve. Es una tensión que se administra.**

---

## Por Qué Esto Es El Problema Central Para Adelante

La integración vertical industrial de Adelante hace este problema más severo, no menos.

**Adelante tiene múltiples sitios físicos.** Obra, plantas, fábricas, oficina. La geografía amplifica la identidad de subgrupo — la gente que pasa el día en la planta de concreto desarrolla identidad de planta-de-concreto. La gente en obra desarrolla identidad de obra. La gente en oficina desarrolla identidad de oficina. Sin diseño deliberado, estas identidades se vuelven tribus.

**Adelante tiene cadena de handoffs.** Las cuadrillas pasan trabajo entre sí, y la fábrica produce para obra. Cada handoff es un sitio potencial de culpa: si algo sale mal en Estructura, Muros está bajo escrutinio. Si la fábrica entrega tarde, obra es retrasada. Los handoffs son las superficies donde la fricción tribal se vuelve operativa.

**Adelante crece a través de absorción.** Cada nueva capacidad absorbida trae su propia cultura previa de proveedor externo. Integrar la gente de la fábrica de muebles que antes era proveedor externo no es solo absorción de capacidad técnica; es absorción de cultura, y las nuevas tribus se forman alrededor de la historia previa.

**Adelante opera con horizonte generacional.** Las herramientas culturales estilo Schultz/Sinek funcionan a corto y mediano plazo, pero la identidad organizacional que sostiene cohesión a través de décadas requiere algo más profundo — instituciones, no solo cultura.

---

## Los Cuatro Approaches en la Literatura

La literatura seria sobre cómo manejar esta tensión converge en cuatro approaches principales. Ninguno la resuelve; cada uno produce diferentes trade-offs. Adelante necesitará una combinación selectiva.

### Approach 1 — Ostrom: Estructuras Anidadas Con Reglas Explícitas

Elinor Ostrom (Premio Nobel 2009) estudió cómo comunidades reales manejan recursos comunes durables — bosques, sistemas de irrigación, pesquerías — sin colapsar en tragedia de los comunes ni requerir privatización ni estado fuerte. Su trabajo es el tratamiento más riguroso de cooperación a escala.

**Principios de diseño de Ostrom (resumidos):**

1. Fronteras claramente definidas (quién está adentro, quién está afuera).
2. Reglas adaptadas a condiciones locales.
3. Participación colectiva en modificar reglas (la gente afectada las hace).
4. Monitoreo efectivo (alguien observa que las reglas se cumplan).
5. Sanciones graduadas para violadores.
6. Mecanismos de resolución de conflictos accesibles y baratos.
7. Reconocimiento mínimo del derecho a auto-organización (la autoridad externa no socava).
8. **Estructuras anidadas** — para recursos grandes, gobernanza en múltiples capas, cada capa con su propia versión de los principios 1-7.

**Aplicación a Adelante.** El principio 8 es la clave. Adelante necesita ser una organización anidada: cuadrillas autónomas con sus propias reglas internas, dentro de departamentos con reglas de interface explícitas, dentro de la organización completa con reglas de coordinación de alto nivel. Cada capa tiene autonomía real Y reglas explícitas que gobiernan cómo se conecta a la capa adyacente.

**Lo que esto significa operacionalmente.** No es suficiente que los equipos tengan identidad compartida ("somos todos Adelante"). Las interfaces entre equipos necesitan **reglas explícitas, legítimas, y aplicadas** — protocolos de handoff documentados, criterios de calidad acordados, mecanismos de escalamiento conocidos, sanciones para violaciones.

**Lectura de referencia.** Elinor Ostrom, *Governing the Commons* (1990). El libro es denso pero los primeros tres capítulos son suficientes para captar la estructura del argumento.

### Approach 2 — McChrystal: Team of Teams

Stanley McChrystal, comandante de fuerzas especiales en Iraq, enfrentó una versión militar del problema: tenía equipos altamente cohesivos y excelentes (Navy SEALs, Delta Force, Rangers) que internamente funcionaban perfectamente, pero la coordinación entre equipos era catastrófica frente a un enemigo (Al-Qaeda) que operaba como red distribuida. Su libro *Team of Teams* documenta cómo transformó la estructura.

**Movimientos clave:**

- **Transparencia radical entre equipos.** Información que solía ser need-to-know se vuelve compartida por defecto. Todos los equipos ven la mayoría de lo que todos los demás equipos ven.
- **Propósito compartido por encima de identidad compartida.** No "somos todos uno"; sí "todos servimos al mismo objetivo." La distinción importa: identidad compartida requiere relación; propósito compartido requiere alineamiento.
- **Liderazgo descentralizado.** Decisiones tomadas tan cerca de la acción como sea posible. El centro provee contexto, no comandos detallados.
- **Reuniones de operaciones masivas y abiertas.** McChrystal instituyó reuniones diarias con cientos o miles de participantes para construir entendimiento sistémico compartido.

**Aplicación a Adelante.** El argumento central: información y propósito pueden escalar donde identidad y relación no pueden. Si los equipos comparten información completa sobre el estado del sistema y un propósito común claro, pueden coordinar sin necesitar todos conocerse personalmente.

**Lo que esto significa operacionalmente.** Sistemas de información compartida (dashboards, reportes, ERP integrado) son infraestructura social, no solo herramientas técnicas. El IT propio que Adelante está construyendo tiene una función social oculta: hacer la operación visible entre equipos. La construcción de dashboards y reportes cross-funcionales debe priorizarse en parte por este motivo.

**Lectura de referencia.** Stanley McChrystal et al., *Team of Teams* (2015). Muy accesible.

### Approach 3 — Laloux: Roles de Interface Reconocidos

Frederic Laloux, en *Reinventing Organizations* (2014), estudió organizaciones que han evolucionado más allá de jerarquía tradicional. Su contribución relevante para esta dualidad: las interfaces entre equipos mismas se vuelven **roles reconocidos con autoridad reconocida**.

En lugar de dejar la coordinación entre equipos como responsabilidad implícita de líderes de equipo (que está sobrecargados con dirección interna), se crean roles específicos cuya función primaria es interface — coordinación, traducción, resolución de conflictos entre equipos.

**Ejemplos en organizaciones avanzadas:**

- "Liaison" roles entre departamentos.
- "Process owner" roles que cruzan equipos siguiendo un proceso end-to-end.
- "Tension processor" roles (Holacracy) cuya función es identificar y resolver fricciones organizacionales.

**Aplicación a Adelante.** Los boundary spanners informales que existen en cualquier organización funcional son recursos escasos. Laloux argumenta que deben **formalizarse**: reconocer el rol, darle autoridad explícita, capacitarlo. La gente que cruza fronteras hace trabajo crítico que es invisible en organigramas tradicionales.

**Lo que esto significa operacionalmente.** Identificar quién es actualmente el boundary spanner entre obra y oficina, entre cuadrillas, entre fábrica y obra. Y formalizar esos roles. Si nadie está haciendo ese trabajo, crear los roles e instalar gente con el perfil adecuado (típicamente: alta empatía social, comodidad con ambigüedad, capacidad de traducir entre vocabularios técnicos diferentes).

**Lectura de referencia.** Frederic Laloux, *Reinventing Organizations* (2014). Existe versión ilustrada que es más accesible.

### Approach 4 — Schultz/Sinek: Toolkit de Identidad Cultural

El approach popular y más conocido: cultura corporativa fuerte, valores compartidos, rituales con todo el personal, misión común. Howard Schultz en Starbucks, Simon Sinek's *Start With Why*, Patrick Lencioni's trabajo sobre equipos, etc.

**Movimientos clave:**

- Articulación clara de propósito ("por qué existimos") por encima de qué hacemos.
- Rituales que cruzan capas jerárquicas (almuerzos del CEO, town halls, celebraciones).
- Historias compartidas que codifican valores ("la historia de cómo manejamos X situación define quiénes somos").
- Lenguaje compartido, vocabulario específico de la organización.
- Onboarding intensivo que transmite cultura, no solo procesos.

**Aplicación a Adelante.** Estos toolkits funcionan parcialmente. Elevan la prominencia de la identidad mayor por encima de la identidad de subgrupo. Reducen fragmentación tribal al hacer la identidad organizacional más saliente.

**Su límite estructural.** Cuando subes exitosamente la identidad organizacional a 500 personas, has expandido el endogrupo a 500 personas, y a 500 ya estás de nuevo más allá del Dunbar. La cohesión que has fabricado es ahora basada en **identidad y en rituales** en vez de basada en **relaciones**, y la cohesión basada en identidad es más débil contra free-riding que la cohesión basada en relaciones. La gente siente que es parte de Adelante; eso no es lo mismo que sentir que María, tres escritorios más allá, va a notar si se relajan. El free-riding se cuela de nuevo, vestido como quiet quitting o teatro de reuniones.

**Lo que esto significa operacionalmente.** El toolkit cultural es útil pero insuficiente. No reemplaza Ostrom, McChrystal, o Laloux. Es complemento, no sustituto. La advertencia es no caer en la trampa de pensar que la próxima campaña cultural va a resolver lo que la falta de estructura anidada e interfaces explícitas está produciendo.

**Lectura de referencia.** Como referencia accesible, Sinek's *Start With Why* y Lencioni's *The Advantage*. Como crítica al límite de este approach, los trabajos de McChrystal y Ostrom.

---

## La Síntesis Operacional Para Adelante

Ninguno de los cuatro approaches solo es suficiente. La síntesis defendible es selectiva:

**Capa 1 — Cuadrillas y equipos pequeños (3-12 personas).** Aquí la maquinaria evolutiva funciona naturalmente. Mantener equipos en este rango, asegurar que la gente se conoce, evitar romper equipos cohesivos por razones administrativas. El monitoreo social es automático.

**Capa 2 — Interfaces entre equipos.** Aquí se aplica Ostrom (reglas explícitas, monitoreo, sanciones graduadas) y Laloux (roles de interface formalizados). No depender de la buena voluntad o de identidad compartida; depender de estructura.

**Capa 3 — Coordinación cross-departamental.** Aquí se aplica McChrystal (información compartida, propósito compartido, decisiones descentralizadas). Sistemas de IT son infraestructura social crítica.

**Capa 4 — Identidad organizacional.** Aquí se aplica Schultz/Sinek (cultura, rituales, narrativas). Pero con conciencia de que esto es complemento, no sustituto de las capas 1-3.

**Capa 5 — Continuidad generacional.** Aquí entran consideraciones que cruzan a `adelante_ciudad_del_valle_evolucion.md` — la sucesión, la tradición-como-infraestructura-de-transmisión, la disposición de stewardship-sobre-ownership.

---

## Tres Preguntas Diagnósticas Para Aplicar a Adelante

Cuando se confronta una decisión de diseño organizacional, las siguientes tres preguntas ayudan a aplicar el marco:

**1. ¿Cuál de los dos modos de falla está dominando actualmente?**

Si el síntoma es free-riding (motivación decae, esfuerzo se relaja, gente se acomoda), el problema está en la capa 1: los equipos son demasiado grandes o demasiado vagamente delineados para que el monitoreo social opere.

Si el síntoma es guerra tribal (silos, culpa cruzada, información retenida, optimización local que daña al sistema), el problema está en la capa 2 o 3: las interfaces no tienen estructura suficiente, o la información y propósito no están suficientemente compartidos.

**2. ¿Qué approach está siendo subutilizado?**

La mayoría de organizaciones sobre-usan Schultz/Sinek (más campañas culturales) y subutilizan Ostrom (reglas explícitas de interface) y Laloux (roles formales de boundary spanning). Si el reflejo es "necesitamos un offsite cultural," considerar primero si el problema requiere estructura, no identidad.

**3. ¿Está el sistema en un péndulo?**

La mayoría de organizaciones oscilan: dejan que los equipos se vuelvan fuertes, notan silos, hacen empuje cultural, notan motivación flaqueando, reconstruyen equipos, notan silos otra vez. Si Adelante está en este péndulo, el problema no se resuelve aplicando el approach opuesto al actual con más fuerza; el problema se resuelve construyendo estructura nested (Ostrom) que estabilice ambas capas simultáneamente.

---

## Aplicación a la Sucesión

El problema Dunbar/tribal se cruza con la pregunta generacional. Cuando el Commander eventualmente pase mando, la organización debe poder sostener cohesión sin la presencia personal del fundador. Esto es exactamente el problema que los toolkits estilo Schultz/Sinek no resuelven solos — la cultura sin estructura institucional se erosiona en transiciones.

**Implicación.** La inversión en capas 2 y 3 (Ostrom, McChrystal, Laloux) no es solo para el Adelante de hoy; es preparación para el Adelante post-Commander. Las reglas explícitas, los sistemas de información compartida, los roles formales de interface — todos sobreviven la transición de manera que la cultura sola no.

Esto se conecta con el archivo de Ciudad del Valle (`adelante_ciudad_del_valle_evolucion.md`) donde la pregunta de stewardship-sobre-ownership al estilo Charles III se discute como disposición fundacional.

---

## Lo Que Este Archivo No Cubre Todavía

Áreas donde el marco prescriptivo necesita más desarrollo:

- **Diagnóstico actual de dónde está Adelante en la dualidad.** Para aplicar las tres preguntas diagnósticas requiere observación directa de qué modos de falla están actualmente activos. Esto debe construirse en sesiones futuras observando síntomas específicos.
- **Diseño concreto de roles de interface.** El principio de formalizar boundary spanners está aquí; los roles específicos (¿quién entre obra y oficina? ¿quién entre fábrica y obra?) no están diseñados.
- **Protocolo de revisión organizacional.** ¿Con qué cadencia se revisa la salud organizacional? ¿Quién la revisa? ¿Qué indicadores se miran?
- **Estrategia de absorción cultural.** Cuando se absorbe un proveedor externo (gente y operaciones), ¿cuál es el playbook para integrar cultura sin destruir lo bueno de la cultura previa ni mantener tribalismo entrante?
- **Métricas de salud organizacional.** Engagement, rotación, satisfacción, frecuencia de conflicto cross-funcional — qué se mide actualmente, qué se podría medir.

Estas son áreas de extensión futura conforme el substrate de observación se acumule.
