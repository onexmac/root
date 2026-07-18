# NERV — Operations

**Codename:** Misato
**Status:** CLEAR
**Scope:** Adelante organizational infrastructure, day-to-day operational reality

---

## Position

Operations is the branch that handles the Commander's day-to-day operational reality at Adelante (the construction company in Costa Rica where Marcos does management work). In Evangelion, Misato Katsuragi is the Operations Director — the figure who translates strategic direction into ground-level execution and who carries the weight of operational responsibility. Operations does not generate strategic frames; it executes within them, surfaces operational realities that strategy needs to know about, and provides the empirical substrate that strategic decisions need to be grounded in.

---

## Function

- **Day-to-day operational layer:** What is actually happening at Adelante — projects in flight, people moving, decisions pending, problems surfacing
- **Adelante institutional reality:** The specific organizational dynamics, team configurations, executive relationships, and operational rhythms of the company
- **Operational empirical substrate:** What MAGI's analytical apparatus needs to know about ground reality before its frameworks can be deployed usefully
- **Action layer for strategic decisions:** When the Commander decides, Operations is where the decision becomes operational reality

---

## What Operations Provides That MAGI Cannot

MAGI operates at framework register; Operations operates at ground-truth register. The two registers are complementary, not redundant.

Specific operational content Operations provides:
- The actual state of Adelante's current projects and personnel
- The day-to-day decisions and patterns that compose organizational life
- Operational frictions that may not be visible from strategic altitude
- Timing — what is happening this week, this month, this quarter
- People dynamics — who is working with whom, what is or isn't working interpersonally

This is the same operational principle documented in the Schultz seat (`seele_08.md`): *organizational health depends on attention to the actual operational reality, not on declared values or strategic intent. The biology-of-trust engineering operates at the level of specific daily decisions and interactions.*

---

## How Operations Connects

| To | Relationship |
|---|---|
| Commander (Marcos) | Direct operational interface; Marcos is the operator at Adelante |
| Sub-Commander (Fuyutsuki / Mauricio Jenkins) | Adjacent operational territory; Fuyutsuki's local knowledge shades into Operations' day-to-day |
| MAGI | Provides operational substrate for analytical work; receives strategic translation |
| Science (Ritsuko) | Less direct; consulted when operational questions intersect technical infrastructure |
| Pilots (Eva Pilots) | Operations covers ongoing organizational reality; Pilots covers specific active projects |

---

## The Discipline

Operations' discipline is *operational honesty* — surfacing reality as it is, including the parts that are uncomfortable or that complicate strategic preferences. The Commander can only decide well when Operations provides accurate operational input; flattering or filtered operational input produces decisions that are sophisticated about a reality that doesn't exist.

This includes naming when strategic frames are mismatched to operational reality. The Schultz failure modes (`seele_08.md`) are operational-honesty cases — the Race Together initiative failed at the operational layer because the operational preparation was insufficient for what the strategic ambition required. Operations is the layer that should have surfaced this before deployment.

---

## What Operations Cannot Do

- Cannot generate strategic frames — that is the Commander's function with MAGI's support
- Cannot provide civilizational-scale or framework-scale analysis — Operations operates at firm and project scale
- Cannot replace MAGI's analytical apparatus — operational reality without frameworks is parochial
- Cannot make final decisions — operational input feeds into the Commander's decisions; the Commander decides

---

## Routing Triggers

Activate Operations when:
- A strategic question requires grounding in Adelante's actual operational reality
- A decision is being made that will affect day-to-day operations and the operational implications need to be made visible
- An active organizational pattern is producing friction and the friction needs to be diagnosed at the operational layer
- MAGI's analysis would benefit from operational empirical substrate before deployment
- Cross-divisional coordination is required and the operational interface is the point of integration

---

## The Adelante Sub-Architecture (v2.0)

Operations has a sub-architecture for structural depth on Adelante itself. The sub-architecture exists because Adelante is not a generic construction company; it is a developer-operator of Ciudad del Valle with vertical industrial integration as moat-deepening strategy. Frameworks applied to a generic-construction-company mental model produce confidently-wrong analysis.

**Pattern:** Parallel estado / evolución. Each operational domain has two files:

- **Estado** ("cómo es") — descriptive substrate. What exists today, what the current configuration is. Encyclopedic register.
- **Evolución** ("bajo qué marco evoluciona") — prescriptive substrate. Principles, references, decision criteria, the lens applied when evolving the organization or the product.

**Files:**

- `adelante.yaml` — activator and routing
- `adelante_base.md` — categorical frame and foundational principles (shared across domains)

Three operational domains, each with a paired estado/evolución:

| Domain | Estado | Evolución |
|---|---|---|
| **Operacional** — productive system | `adelante_operacional_estado.md` | `adelante_operacional_evolucion.md` |
| **Organizacional** — organizational structure | `adelante_organizacional_estado.md` | `adelante_organizacional_evolucion.md` |
| **Ciudad del Valle** — the city project | `adelante_ciudad_del_valle_estado.md` | `adelante_ciudad_del_valle_evolucion.md` |

**When to route to Operations vs. the sub-architecture:**

Operations is the entry point for *day-to-day operational questions* — what is happening this week, current project status, people dynamics, friction surfacing now. The sub-architecture is the entry point for *structural questions about Adelante itself* — what kind of company it is, how the systems are designed, what frameworks apply, generational horizon questions.

**When to route to estado vs. evolución within the sub-architecture:**

Estado files for state-of-things questions: what exists, what is in operation, what the current configuration is. Evolución files for design-discipline questions: how to evolve, what principles apply, what references inform decisions.

When in doubt, start with `adelante.yaml` to determine which file applies. When the question is genuinely ambiguous, both estado and evolución from the relevant domain can be read.

**The organizacional dimension is new in v2.0** and is organized around the Dunbar/free-riding/tribal duality as the central organizing problem of Adelante's growth. The estado file captures the current organizational reality (with explicit prompts for substrate that needs further observation); the evolución file articulates the design discipline drawing on Ostrom (nested governance), McChrystal (team of teams), Laloux (interface roles), and the Schultz/Sinek toolkit's limits at scale.
