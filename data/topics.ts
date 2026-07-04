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
    slug: "imperialismo-europeo",
    label: "Imperialismo Europeo",
    thumbnail: "/images/imperialismo.jpg",
    glossary: {
      imperialismo:
        "Política de un Estado poderoso de extender su dominio sobre otros territorios y pueblos, controlando su economía, su política y sus recursos.",
      colonialismo:
        "Ocupar y administrar directamente un territorio ajeno, imponiendo el gobierno, la cultura y las leyes de la potencia que coloniza.",
      nacionalismo:
        "La idea de que una nación —un pueblo con historia, cultura e identidad común— debe defenderse y valorarse, muchas veces por encima de las demás.",
      "Revolución Industrial":
        "Transformación del siglo XIX en la que las fábricas y las máquinas multiplicaron la producción, creando una enorme necesidad de materias primas y nuevos mercados.",
      "Conferencia de Berlín":
        "Reunión de 1884-1885 en la que las potencias europeas se repartieron África entre ellas, trazando fronteras sin tomar en cuenta a sus pueblos.",
    },
    slides: [
      { image: "/images/imperialismo.jpg", title: "Imperialismo Europeo" },
      {
        image: "/images/imperialismo.jpg",
        title: "¿Qué fue el imperialismo?",
        body: [
          "Durante los siglos XIX y XX, las potencias europeas se expandieron por África, Asia y Oceanía. El ",
          { term: "imperialismo" },
          " era dominar esos territorios para extraer sus recursos y ganar poder.",
        ],
      },
      {
        image: "/images/imperialismo.jpg",
        title: "Tres ideas clave",
        body: [
          "El ",
          { term: "colonialismo" },
          " era la ocupación directa de un territorio; el ",
          { term: "nacionalismo" },
          " alimentaba el orgullo y la rivalidad entre las potencias.",
        ],
      },
      {
        image: "/images/imperialismo.jpg",
        title: "¿De dónde salió?",
        body: [
          "La ",
          { term: "Revolución Industrial" },
          " llenó a Europa de fábricas que necesitaban materias primas baratas y nuevos mercados donde vender. Las colonias ofrecían ambas cosas.",
        ],
      },
      {
        image: "/images/imperialismo.jpg",
        title: "El reparto del mundo",
        body: [
          "Gran Bretaña, Francia, Alemania y Bélgica, entre otras, se repartieron continentes enteros. En la ",
          { term: "Conferencia de Berlín" },
          " dividieron África sobre un mapa, sin consultar a nadie.",
        ],
      },
      {
        image: "/images/imperialismo.jpg",
        title: "Consecuencias",
        body: [
          "Explotación de recursos y personas, fronteras artificiales, pérdida de culturas locales y una fuerte rivalidad entre potencias que, años después, estallaría en guerra.",
        ],
      },
    ],
  },
  {
    slug: "primera-guerra-mundial",
    label: "Primera Guerra Mundial",
    thumbnail: "/images/primera-guerra.jpg",
    glossary: {
      nacionalismo:
        "La idea de que una nación debe defenderse y valorarse por encima de las demás; llevado al extremo, alimenta rivalidades y conflictos.",
      "Paz Armada":
        "Periodo previo a 1914 en el que las potencias europeas, sin estar en guerra, competían acumulando armas y ejércitos cada vez más grandes.",
      Balcanes:
        "Región del sureste de Europa con muchos pueblos y tensiones; era tan inestable que se le llamó «el polvorín de Europa».",
      "Triple Alianza":
        "Bloque formado por Alemania, Austria-Hungría e Italia antes de la guerra.",
      "Triple Entente":
        "Bloque formado por Francia, el Reino Unido y Rusia, frente a la Triple Alianza.",
      "guerra de trincheras":
        "Combate en el que los ejércitos se enterraban en largas zanjas y avanzaban muy poco durante meses, con enormes pérdidas humanas.",
      "Tratado de Versalles":
        "Tratado de 1919 que puso fin a la guerra e impuso a Alemania duras condiciones: pérdida de territorios, desarme y una enorme deuda de guerra.",
    },
    slides: [
      { image: "/images/primera-guerra.jpg", title: "Primera Guerra Mundial" },
      {
        image: "/images/primera-guerra.jpg",
        title: "Las causas de fondo",
        body: [
          "Rivalidades imperialistas, ",
          { term: "nacionalismo" },
          ", una carrera de armas (la ",
          { term: "Paz Armada" },
          ") y un sistema de alianzas dividieron Europa en dos bloques enfrentados.",
        ],
      },
      {
        image: "/images/primera-guerra.jpg",
        title: "El polvorín de los Balcanes",
        body: [
          "Los ",
          { term: "Balcanes" },
          " hervían de tensiones nacionales, y en Marruecos chocaban los intereses de Francia y Alemania. Faltaba solo una chispa.",
        ],
      },
      {
        image: "/images/primera-guerra.jpg",
        title: "La chispa (1914)",
        body: [
          "El asesinato del archiduque Francisco Fernando en Sarajevo fue la causa inmediata: en pocas semanas, las alianzas arrastraron a toda Europa a la guerra.",
        ],
      },
      {
        image: "/images/primera-guerra.jpg",
        title: "Dos bandos",
        body: [
          "La ",
          { term: "Triple Alianza" },
          " se enfrentó a la ",
          { term: "Triple Entente" },
          ". Cada país entró apoyando a sus aliados.",
        ],
      },
      {
        image: "/images/primera-guerra.jpg",
        title: "Las fases",
        body: [
          "Empezó con una guerra de movimientos rápida, pero pronto se convirtió en una larga ",
          { term: "guerra de trincheras" },
          ". El final llegó con la entrada de EE. UU. y la salida de Rusia.",
        ],
      },
      {
        image: "/images/tratado-versalles.jpg",
        title: "Los tratados",
        body: [
          "El ",
          { term: "Tratado de Versalles" },
          " (1919) castigó duramente a Alemania. Cuatro grandes imperios desaparecieron del mapa.",
        ],
      },
      {
        image: "/images/primera-guerra.jpg",
        title: "Consecuencias",
        body: [
          "Millones de muertos, nuevos países, un mapa de Europa redibujado y un profundo resentimiento que alimentaría la siguiente guerra.",
        ],
      },
    ],
  },
  {
    slug: "revolucion-rusa",
    label: "Revolución Rusa",
    thumbnail: "/images/revolucion-rusa.jpg",
    glossary: {
      zar: "Título del emperador que gobernaba Rusia con poder absoluto antes de la revolución.",
      "Primera Guerra Mundial":
        "Conflicto global entre 1914 y 1918; su desgaste militar y económico hundió al régimen zarista.",
      bolcheviques:
        "Partido revolucionario comunista, liderado por Lenin, que tomó el poder en Rusia en octubre de 1917.",
      Lenin:
        "Líder de los bolcheviques y primer jefe de la Rusia soviética; dirigió la Revolución de Octubre de 1917.",
      comunismo:
        "Sistema político y económico que busca eliminar la propiedad privada y que el Estado controle la producción para repartir la riqueza.",
      URSS:
        "Unión de Repúblicas Socialistas Soviéticas: el Estado comunista creado en 1922 alrededor de Rusia, que duró hasta 1991.",
      Stalin:
        "Líder de la URSS tras la muerte de Lenin; gobernó con un régimen totalitario e industrializó el país a la fuerza.",
    },
    slides: [
      { image: "/images/revolucion-rusa.jpg", title: "Revolución Rusa" },
      {
        image: "/images/revolucion-rusa.jpg",
        title: "La Rusia de los zares",
        body: [
          "A inicios del siglo XX, Rusia era un imperio atrasado gobernado por el ",
          { term: "zar" },
          " Nicolás II: millones de campesinos pobres y muy poca industria.",
        ],
      },
      {
        image: "/images/revolucion-rusa.jpg",
        title: "El desgaste",
        body: [
          "Las derrotas militares, el hambre y el enorme costo de la ",
          { term: "Primera Guerra Mundial" },
          " hicieron insoportable la vida y debilitaron por completo al régimen.",
        ],
      },
      {
        image: "/images/revolucion-rusa.jpg",
        title: "1917: dos revoluciones",
        body: [
          "En febrero cae el zar. En octubre, los ",
          { term: "bolcheviques" },
          " de ",
          { term: "Lenin" },
          " toman el poder con la promesa de «paz, pan y tierra».",
        ],
      },
      {
        image: "/images/revolucion-rusa.jpg",
        title: "Guerra civil",
        body: [
          "Los «rojos» (revolucionarios) vencieron a los «blancos» en una dura guerra civil, y se implantó el ",
          { term: "comunismo" },
          " como nuevo sistema.",
        ],
      },
      {
        image: "/images/revolucion-rusa.jpg",
        title: "Nace la URSS",
        body: [
          "En 1922 se crea la ",
          { term: "URSS" },
          ". Tras la muerte de Lenin, ",
          { term: "Stalin" },
          " toma el control y gobierna con mano de hierro.",
        ],
      },
      {
        image: "/images/revolucion-rusa.jpg",
        title: "Consecuencias",
        body: [
          "Nació el primer Estado comunista del mundo. Se industrializó a marchas forzadas y surgió una potencia que rivalizaría con Occidente durante todo el siglo XX.",
        ],
      },
    ],
  },
  {
    slug: "gran-depresion",
    label: "La Gran Depresión",
    thumbnail: "/images/gran-depresion.jpg",
    glossary: {
      bursátil:
        "Todo lo relacionado con la Bolsa de valores, el lugar donde se compran y venden las acciones de las empresas.",
      especulación:
        "Comprar algo (como acciones) solo para revenderlo más caro y ganar dinero rápido, asumiendo mucho riesgo.",
      inflación:
        "Subida general y sostenida de los precios, que hace que el dinero valga menos y compre menos cosas.",
      escasez:
        "Falta de productos básicos disponibles, que suele encarecerlos y dificultar la vida diaria.",
    },
    slides: [
      { image: "/images/gran-depresion.jpg", title: "La Gran Depresión" },
      {
        image: "/images/gran-depresion.jpg",
        title: "El crack del 29",
        body: [
          "El 29 de octubre de 1929, la Bolsa de Nueva York se desplomó. En un solo día, millones de personas perdieron sus ahorros en el mercado ",
          { term: "bursátil" },
          ".",
        ],
      },
      {
        image: "/images/gran-depresion.jpg",
        title: "¿Por qué pasó?",
        body: [
          "Años de ",
          { term: "especulación" },
          " excesiva, préstamos fáciles y sobreproducción inflaron una burbuja que terminó por reventar.",
        ],
      },
      {
        image: "/images/gran-depresion.jpg",
        title: "Palabras clave",
        body: [
          "Los años 30 trajeron ",
          { term: "inflación" },
          ", ",
          { term: "escasez" },
          ", quiebras de bancos y un desempleo enorme en casi todo el mundo.",
        ],
      },
      {
        image: "/images/gran-depresion.jpg",
        title: "El impacto",
        body: [
          "Fábricas cerradas, familias en la pobreza y largas filas para conseguir comida. La crisis se extendió desde Estados Unidos hasta Europa y el resto del planeta.",
        ],
      },
      {
        image: "/images/gran-depresion.jpg",
        title: "Consecuencias",
        body: [
          "Desempleo masivo, desconfianza en el sistema económico y un clima de desesperación que facilitó el ascenso de líderes autoritarios.",
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
        "La idea de que una nación debe defenderse y valorarse por encima de las demás; los regímenes fascistas la llevaron al extremo.",
      fascismo:
        "Movimiento político autoritario y nacionalista, surgido en Italia con Mussolini, que exalta al Estado y al líder y rechaza la democracia.",
      nazismo:
        "La versión alemana del fascismo, liderada por Hitler, basada en el nacionalismo extremo, el racismo y la expansión territorial.",
      "Tratado de Versalles":
        "Tratado de 1919 que castigó a Alemania tras la Primera Guerra Mundial; el resentimiento que causó fue aprovechado por los nazis.",
      Blitzkrieg:
        "«Guerra relámpago»: táctica alemana de ataques rápidos y coordinados con tanques y aviación para vencer antes de que el enemigo reaccione.",
      Eje: "Alianza militar de la Segunda Guerra Mundial formada principalmente por Alemania, Italia y Japón.",
      Holocausto:
        "Exterminio sistemático de unos seis millones de judíos —y de otros grupos— por parte del régimen nazi durante la guerra.",
    },
    slides: [
      { image: "/images/cover-wwii.jpg", title: "Segunda Guerra Mundial" },
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
        image: "/images/fascismo-nazismo.jpg",
        title: "Caso: los Juegos Olímpicos de 1936",
        body: [
          "Hitler convirtió los Juegos de Berlín en un escaparate del ",
          { term: "nazismo" },
          ": pura propaganda para mostrarle al mundo una supuesta «superioridad» alemana.",
        ],
      },
      {
        image: "/images/tratado-versalles.jpg",
        title: "Los antecedentes",
        body: [
          "El ",
          { term: "Tratado de Versalles" },
          ", la Gran Depresión y el afán de expansión de Alemania e Italia prepararon el terreno para la guerra.",
        ],
      },
      {
        image: "/images/invasion-polonia.jpg",
        title: "La chispa (1939)",
        body: [
          "El 1 de setiembre de 1939, Alemania invadió Polonia sin declaración previa. Dos días después, Francia y el Reino Unido le declararon la guerra.",
        ],
      },
      {
        image: "/images/cover-wwii.jpg",
        title: "Las fases",
        body: [
          "Primero, la ",
          { term: "Blitzkrieg" },
          " dio la ventaja al ",
          { term: "Eje" },
          ". Luego, la derrota en Stalingrado y la entrada de EE. UU. cambiaron el rumbo, hasta la caída del Eje en 1945.",
        ],
      },
      {
        image: "/images/cover-wwii.jpg",
        title: "Consecuencias",
        body: [
          "Decenas de millones de muertos, el horror del ",
          { term: "Holocausto" },
          ", una Europa dividida y el comienzo de una nueva rivalidad: la Guerra Fría.",
        ],
      },
    ],
  },
  {
    slug: "guerra-fria",
    label: "Guerra Fría",
    thumbnail: "/images/guerra-fria.jpg",
    glossary: {
      capitalismo:
        "Sistema económico basado en la propiedad privada y el mercado, donde empresas y personas compiten libremente para obtener ganancias.",
      comunismo:
        "Sistema en el que el Estado controla la economía y la propiedad para repartir la riqueza; era el modelo de la URSS.",
      "Muro de Berlín":
        "Muro levantado en 1961 que dividió la ciudad de Berlín y se volvió el símbolo de la separación entre el bloque comunista y el capitalista.",
      "mundo bipolar":
        "El orden mundial de la Guerra Fría, dividido en dos grandes bloques liderados por Estados Unidos y la Unión Soviética.",
      "Primavera de Praga":
        "Intento de Checoslovaquia, en 1968, de suavizar el comunismo; fue aplastado por la invasión soviética.",
      "Crisis de los Misiles":
        "Enfrentamiento de 1962 en el que la URSS instaló misiles nucleares en Cuba y el mundo estuvo al borde de una guerra nuclear.",
      Sputnik:
        "Primer satélite artificial de la historia, lanzado por la URSS en 1957; marcó el inicio de la carrera espacial.",
    },
    slides: [
      { image: "/images/guerra-fria.jpg", title: "Guerra Fría" },
      {
        image: "/images/guerra-fria.jpg",
        title: "¿Qué fue la Guerra Fría?",
        body: [
          "Tras 1945, Estados Unidos (",
          { term: "capitalismo" },
          ") y la URSS (",
          { term: "comunismo" },
          ") se enfrentaron sin combatir directamente: una guerra de tensión, espionaje e influencia.",
        ],
      },
      {
        image: "/images/guerra-fria.jpg",
        title: "Un mundo bipolar",
        body: [
          "El planeta quedó partido en dos bloques: un ",
          { term: "mundo bipolar" },
          ". El ",
          { term: "Muro de Berlín" },
          " (1961) se volvió el símbolo de esa división.",
        ],
      },
      {
        image: "/images/guerra-fria.jpg",
        title: "Conflictos indirectos",
        body: [
          "Los bloques chocaron en otros países: la Guerra de Corea, la de Vietnam, la ",
          { term: "Primavera de Praga" },
          " y la invasión de Afganistán.",
        ],
      },
      {
        image: "/images/guerra-fria.jpg",
        title: "Al borde del abismo",
        body: [
          "La ",
          { term: "Crisis de los Misiles" },
          " de Cuba (1962) puso al mundo al filo de una guerra nuclear. Fue el momento más tenso de todo el periodo.",
        ],
      },
      {
        image: "/images/guerra-fria.jpg",
        title: "Carrera espacial y nuclear",
        body: [
          "Ambas potencias compitieron en armas nucleares y en el espacio: la URSS lanzó el ",
          { term: "Sputnik" },
          " y EE. UU. respondió llegando a la Luna en 1969.",
        ],
      },
      {
        image: "/images/guerra-fria.jpg",
        title: "El final",
        body: [
          "La Guerra Fría terminó con la caída del Muro de Berlín (1989) y la disolución de la Unión Soviética en 1991.",
        ],
      },
    ],
  },
];

export function getTopic(slug: string) {
  return topics.find((t) => t.slug === slug);
}
