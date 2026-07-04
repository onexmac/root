export type BodyPart = string | { term: string };

export interface Slide {
  image: string;
  title: string;
  body?: BodyPart[];
}

export interface Topic {
  slug: string;
  label: string;
  thumbnail: string;
  comingSoon?: boolean;
  slides: Slide[];
  glossary: Record<string, string>;
}

export const topics: Topic[] = [
  {
    slug: "primera-guerra-mundial",
    label: "Primera Guerra Mundial",
    thumbnail: "/images/primera-guerra.jpg",
    comingSoon: true,
    glossary: {},
    slides: [
      {
        image: "/images/primera-guerra.jpg",
        title: "Próximamente",
        body: [
          "Pegá el temario de este tema y lo convertimos en tarjetas de repaso.",
        ],
      },
    ],
  },
  {
    slug: "segunda-guerra-mundial",
    label: "Segunda Guerra Mundial",
    thumbnail: "/images/cover-wwii.jpg",
    glossary: {
      "Benito Mussolini":
        "Líder del Partido Fascista italiano y jefe de gobierno de Italia entre 1922 y 1943. Aliado de Hitler durante la Segunda Guerra Mundial.",
      nacionalismo:
        "Es la idea de que una nación —un pueblo con historia, cultura, idioma o identidad común— debe ser defendida, valorada y, muchas veces, tener su propio Estado.",
      "Primera Guerra Mundial":
        "Conflicto bélico global entre 1914 y 1918 que enfrentó a las potencias aliadas contra las potencias centrales, y cuyo desenlace redefinió el mapa de Europa.",
    },
    slides: [
      {
        image: "/images/cover-wwii.jpg",
        title: "Causas de la Segunda Guerra Mundial",
      },
      {
        image: "/images/gran-depresion.jpg",
        title: "La Gran Depresión (1929)",
        body: [
          "La crisis económica mundial provocó desempleo masivo, pobreza e inestabilidad política, facilitando el ascenso de líderes autoritarios.",
        ],
      },
      {
        image: "/images/fascismo-nazismo.jpg",
        title: "El ascenso del fascismo y el nazismo",
        body: [
          "Regímenes como el de ",
          { term: "Benito Mussolini" },
          " en Italia y Adolf Hitler en Alemania promovieron el militarismo, el ",
          { term: "nacionalismo" },
          " extremo y la expansión territorial.",
        ],
      },
      {
        image: "/images/tratado-versalles.jpg",
        title: "El Tratado de Versalles",
        body: [
          "Las duras condiciones impuestas a Alemania tras la ",
          { term: "Primera Guerra Mundial" },
          " —pérdida de territorios, desarme y una enorme deuda de guerra— alimentaron el resentimiento que después explotarían los nazis.",
        ],
      },
      {
        image: "/images/invasion-polonia.jpg",
        title: "La invasión de Polonia (1939)",
        body: [
          "El 1 de setiembre de 1939 Alemania invadió Polonia sin declaración previa. Dos días después, Francia y el Reino Unido le declararon la guerra, marcando el inicio oficial del conflicto.",
        ],
      },
    ],
  },
  {
    slug: "guerra-fria",
    label: "Guerra Fría",
    thumbnail: "/images/guerra-fria.jpg",
    comingSoon: true,
    glossary: {},
    slides: [
      {
        image: "/images/guerra-fria.jpg",
        title: "Próximamente",
        body: [
          "Pegá el temario de este tema y lo convertimos en tarjetas de repaso.",
        ],
      },
    ],
  },
];

export function getTopic(slug: string) {
  return topics.find((t) => t.slug === slug);
}
