export type BodyPart = string | { term: string };

export interface Slide {
  image: string;
  title: string;
  body?: BodyPart[];
  /** Caption shown while peeking (tap-and-hold) the photo — what the image is
   *  and its real source. Researched per image; see git history for provenance. */
  info?: string;
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
      {
        image: "/images/imperialismo.jpg",
        title: "Imperialismo Europeo",
        info: "Ceremonia imperial británica en la India (un Durbar de Delhi): tropas y multitudes rodean el pabellón real, símbolo del poder colonial. Fotografía de inicios del siglo XX.",
      },
      {
        image: "/images/imp-rhodes.jpg",
        title: "¿Qué fue el imperialismo?",
        body: [
          "Durante los siglos XIX y XX, las potencias europeas se expandieron por África, Asia y Oceanía. El ",
          { term: "imperialismo" },
          " era dominar esos territorios para extraer sus recursos y ganar poder.",
        ],
        info: "«El Coloso de Rhodes»: caricatura de Cecil Rhodes a horcajadas sobre África, de El Cabo a El Cairo. Revista Punch, 10 de diciembre de 1892.",
      },
      {
        image: "/images/imp-delacroix.jpg",
        title: "Colonialismo y nacionalismo",
        body: [
          "El ",
          { term: "colonialismo" },
          " era la ocupación directa de un territorio. Y el ",
          { term: "nacionalismo" },
          " —el orgullo por la propia nación— alimentaba la rivalidad entre las potencias.",
        ],
        info: "«La libertad guiando al pueblo», de Eugène Delacroix (1830). Alegoría de la Revolución de Julio en Francia; ilustra el nacionalismo. Museo del Louvre, París.",
      },
      {
        image: "/images/imp-menzel.jpg",
        title: "El motor: la Revolución Industrial",
        body: [
          "La ",
          { term: "Revolución Industrial" },
          " llenó a Europa de fábricas que necesitaban materias primas baratas y nuevos mercados. Las colonias ofrecían ambas cosas.",
        ],
        info: "«La fábrica de laminado de hierro» («Eisenwalzwerk»), de Adolph Menzel (1872-1875). Retrata el trabajo industrial de la época. Alte Nationalgalerie, Berlín.",
      },
      {
        image: "/images/imp-berlin.jpg",
        title: "El reparto del mundo",
        body: [
          "En la ",
          { term: "Conferencia de Berlín" },
          " (1884) las potencias dividieron África sobre un mapa, sin consultar a nadie. El resultado: fronteras artificiales y rivalidades que años después estallarían en guerra.",
        ],
        info: "Sesión de la Conferencia de Berlín (1884-1885), donde las potencias europeas repartieron África. Al fondo, un mapa del continente; preside Bismarck. Grabado de época.",
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
      "guerra de trincheras":
        "Combate en el que los ejércitos se enterraban en largas zanjas y avanzaban muy poco durante meses, con enormes pérdidas humanas.",
      "Tratado de Versalles":
        "Tratado de 1919 que puso fin a la guerra e impuso a Alemania duras condiciones: pérdida de territorios, desarme y una enorme deuda de guerra.",
    },
    slides: [
      {
        image: "/images/primera-guerra.jpg",
        title: "Primera Guerra Mundial",
        info: "Fotografía aérea de una red de trincheras del frente occidental, con anotaciones en inglés («dugouts», «communication trench»). Primera Guerra Mundial (1914-1918).",
      },
      {
        image: "/images/pgm-dreadnought.jpg",
        title: "Las causas de fondo",
        body: [
          "Rivalidades imperialistas, ",
          { term: "nacionalismo" },
          ", una carrera de armas (la ",
          { term: "Paz Armada" },
          ") y un sistema de alianzas dividieron Europa. Los ",
          { term: "Balcanes" },
          " eran el «polvorín».",
        ],
        info: "El acorazado británico HMS Dreadnought (1906), cuyo diseño revolucionario desató la carrera naval anglo-alemana previa a la guerra.",
      },
      {
        image: "/images/pgm-princip.jpg",
        title: "La chispa (1914)",
        body: [
          "El asesinato del archiduque Francisco Fernando en Sarajevo fue la causa inmediata: en pocas semanas, las alianzas arrastraron a toda Europa a la guerra.",
        ],
        info: "Sarajevo, 28 de junio de 1914: la policía detiene a un sospechoso tras el atentado contra Francisco Fernando. Durante años se creyó que era Gavrilo Princip, pero era otro detenido.",
      },
      {
        image: "/images/pgm-trincheras.jpg",
        title: "Las fases",
        body: [
          "Empezó con una guerra de movimientos rápida, pero se estancó en una larga ",
          { term: "guerra de trincheras" },
          ". El final llegó con la entrada de EE. UU. y la salida de Rusia.",
        ],
        info: "Soldados del Regimiento de Cheshire en una trinchera del Somme; un centinela vigila mientras sus compañeros descansan. Julio de 1916.",
      },
      {
        image: "/images/tratado-versalles.jpg",
        title: "Tratados y consecuencias",
        body: [
          "El ",
          { term: "Tratado de Versalles" },
          " (1919) castigó duramente a Alemania. Cuatro imperios desaparecieron y quedó un resentimiento que alimentaría la siguiente guerra.",
        ],
        info: "La Galería de los Espejos de Versalles repleta de asistentes durante la firma del Tratado de Versalles, que puso fin a la guerra. 28 de junio de 1919.",
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
      {
        image: "/images/revolucion-rusa.jpg",
        title: "Revolución Rusa",
        info: "Lenin arenga a las tropas del Ejército Rojo en la plaza Sverdlov de Moscú, 5 de mayo de 1920. Trotsky aparece junto a la tribuna (luego borrado en versiones estalinistas).",
      },
      {
        image: "/images/rr-zar.jpg",
        title: "La Rusia de los zares",
        body: [
          "Rusia era un imperio atrasado gobernado por el ",
          { term: "zar" },
          " Nicolás II. Las derrotas y el hambre de la ",
          { term: "Primera Guerra Mundial" },
          " terminaron por hundir al régimen.",
        ],
        info: "El zar Nicolás II de Rusia con uniforme militar, en un retrato firmado y fechado en 1898.",
      },
      {
        image: "/images/rr-1917.jpg",
        title: "1917: dos revoluciones",
        body: [
          "En febrero cae el zar. En octubre, los ",
          { term: "bolcheviques" },
          " de ",
          { term: "Lenin" },
          " toman el poder con la promesa de «paz, pan y tierra» e implantan el ",
          { term: "comunismo" },
          ".",
        ],
        info: "La multitud huye tras la represión con ametralladoras en la avenida Nevski de Petrogrado, durante las Jornadas de Julio, 4 de julio de 1917.",
      },
      {
        image: "/images/rr-stalin.jpg",
        title: "Nace la URSS",
        body: [
          "En 1922 se crea la ",
          { term: "URSS" },
          ". Tras la muerte de Lenin, ",
          { term: "Stalin" },
          " toma el control con mano de hierro. Nace la primera gran potencia comunista.",
        ],
        info: "Iósif Stalin en un retrato de los primeros años soviéticos (hacia 1918), con gorra militar con estrella roja.",
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
      {
        image: "/images/gran-depresion.jpg",
        title: "La Gran Depresión",
        info: "Fila del pan frente a la panadería Fleischmann en Nueva York, 2 de enero de 1908 (colección Bain, Biblioteca del Congreso de EE. UU.).",
      },
      {
        image: "/images/gd-crack.jpg",
        title: "El crack del 29",
        body: [
          "El 29 de octubre de 1929, la Bolsa de Nueva York se desplomó y millones perdieron sus ahorros en el mercado ",
          { term: "bursátil" },
          ". Detrás había años de ",
          { term: "especulación" },
          " y una burbuja que reventó.",
        ],
        info: "Multitudes se agolpan en Wall Street, junto a la Bolsa de Nueva York, durante el crac bursátil de octubre de 1929.",
      },
      {
        image: "/images/gd-impacto.jpg",
        title: "El impacto",
        body: [
          "Llegaron el desempleo masivo, la ",
          { term: "inflación" },
          ", la ",
          { term: "escasez" },
          " y la pobreza. La crisis se extendió desde Estados Unidos hasta Europa y el resto del mundo.",
        ],
        info: "«Madre migrante»: Florence Owens Thompson, jornalera de 32 años, y sus hijos en Nipomo, California. Foto de Dorothea Lange, marzo de 1936.",
      },
      {
        image: "/images/gd-consecuencias.jpg",
        title: "Consecuencias",
        body: [
          "Filas para conseguir comida, desconfianza en el sistema económico y un clima de desesperación que facilitó el ascenso de líderes autoritarios.",
        ],
        info: "Desempleados hacen fila en el comedor de beneficencia abierto por Al Capone en Chicago: «Sopa, café y donas gratis». Febrero de 1931.",
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
      Holocausto:
        "Exterminio sistemático de unos seis millones de judíos —y de otros grupos— por parte del régimen nazi durante la guerra.",
    },
    slides: [
      {
        image: "/images/cover-wwii.jpg",
        title: "Segunda Guerra Mundial",
        info: "«Hacia las fauces de la muerte»: soldados de EE. UU. desembarcan bajo fuego en la playa Omaha, Normandía, el Día D, 6 de junio de 1944.",
      },
      {
        image: "/images/fascismo-nazismo.jpg",
        title: "El ascenso del fascismo y el nazismo",
        body: [
          "Regímenes como el de ",
          { term: "Benito Mussolini" },
          " en Italia y Adolf Hitler en Alemania promovieron el militarismo, el ",
          { term: "nacionalismo" },
          " extremo y el ",
          { term: "fascismo" },
          ".",
        ],
        info: "Mussolini (izq.) y Hitler pasan revista a las tropas: los líderes del fascismo italiano y del nazismo alemán, aliados del Eje.",
      },
      {
        image: "/images/sgm-jjoo.jpg",
        title: "Caso: los Juegos Olímpicos de 1936",
        body: [
          "Hitler usó los Juegos de Berlín como propaganda del ",
          { term: "nazismo" },
          ". Pero el atleta afroamericano Jesse Owens ganó cuatro oros y desmintió el mito de la «superioridad» aria.",
        ],
        info: "Jesse Owens, atleta afroamericano de EE. UU. que ganó cuatro medallas de oro en los Juegos Olímpicos de Berlín 1936.",
      },
      {
        image: "/images/invasion-polonia.jpg",
        title: "La chispa (1939)",
        body: [
          "El 1 de setiembre de 1939, Alemania invadió Polonia sin declaración previa. Dos días después, Francia y el Reino Unido le declararon la guerra.",
        ],
        info: "Soldados alemanes rompen la barrera fronteriza con Polonia el 1 de septiembre de 1939: comienza la Segunda Guerra Mundial. (Foto propagandística escenificada.)",
      },
      {
        image: "/images/sgm-consecuencias.jpg",
        title: "Consecuencias",
        body: [
          "Decenas de millones de muertos, el horror del ",
          { term: "Holocausto" },
          " y una Europa que las potencias vencedoras se repartieron, dando inicio a la Guerra Fría.",
        ],
        info: "Conferencia de Yalta, febrero de 1945: Churchill, Roosevelt y Stalin acuerdan cómo repartir y reorganizar Europa tras la guerra.",
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
      "Primavera de Praga":
        "Intento de Checoslovaquia, en 1968, de suavizar el comunismo; fue aplastado por la invasión soviética.",
      "Crisis de los Misiles":
        "Enfrentamiento de 1962 en el que la URSS instaló misiles nucleares en Cuba y el mundo estuvo al borde de una guerra nuclear.",
      "carrera espacial":
        "Competencia entre EE. UU. y la URSS por dominar el espacio: incluyó el primer satélite (Sputnik, 1957) y la llegada del hombre a la Luna (1969).",
    },
    slides: [
      {
        image: "/images/guerra-fria.jpg",
        title: "Guerra Fría",
        info: "Reapertura de la Puerta de Brandeburgo en Berlín, 22 de diciembre de 1989, bajo la lluvia: el símbolo del fin de la división de la Guerra Fría.",
      },
      {
        image: "/images/gf-bipolar.jpg",
        title: "Un mundo bipolar",
        body: [
          "Estados Unidos (",
          { term: "capitalismo" },
          ") y la URSS (",
          { term: "comunismo" },
          ") se enfrentaron sin combatir directamente. El ",
          { term: "Muro de Berlín" },
          " (1961) partió el mundo en dos bloques.",
        ],
        info: "Obreros de Alemania Oriental construyen el Muro de Berlín con una grúa, 1961. La ciudad quedó dividida entre los dos bloques.",
      },
      {
        image: "/images/gf-conflictos.jpg",
        title: "Conflictos indirectos",
        body: [
          "Los bloques chocaron en otros países: la Guerra de Corea, la de Vietnam, la ",
          { term: "Primavera de Praga" },
          " y la invasión de Afganistán.",
        ],
        info: "Helicópteros UH-1 «Huey» y soldados estadounidenses en la Guerra de Vietnam, 1966: un conflicto indirecto de la Guerra Fría.",
      },
      {
        image: "/images/gf-abismo.jpg",
        title: "Al borde del abismo",
        body: [
          "La ",
          { term: "Crisis de los Misiles" },
          " de Cuba (1962) puso al mundo al filo de una guerra nuclear. Fue el momento más tenso de todo el periodo.",
        ],
        info: "Foto aérea de EE. UU. de un emplazamiento de misiles soviéticos en Cuba (Los Palacios), octubre de 1962: la Crisis de los Misiles.",
      },
      {
        image: "/images/gf-espacial.jpg",
        title: "La carrera espacial",
        body: [
          "La ",
          { term: "carrera espacial" },
          " y nuclear llevó a la URSS a lanzar el Sputnik y a EE. UU. a la Luna en 1969. La Guerra Fría terminó en 1991, con el fin de la Unión Soviética.",
        ],
        info: "El astronauta Buzz Aldrin sobre la Luna, misión Apolo 11, 20 de julio de 1969. El punto culminante de la carrera espacial.",
      },
    ],
  },
];

export function getTopic(slug: string) {
  return topics.find((t) => t.slug === slug);
}
