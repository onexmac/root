/** Un trozo de texto del cuerpo: texto plano, un término del glosario (rojo y
 *  tocable) o el nombre de un personaje histórico (resaltado, no tocable). Los
 *  personajes son materia de examen: el temario pide "características,
 *  personajes y consecuencias". */
export type BodyPart = string | { term: string } | { name: string };

export interface Slide {
  image: string;
  title: string;
  body?: BodyPart[];
  /** A drawn diagram rather than a photograph: shown whole (letterboxed on
   *  black) instead of cropped to fill, and it does not parallax. */
  diagram?: boolean;
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

export interface Materia {
  slug: string;
  label: string;
  /** Accent color for the Clear-style expanding materia row. */
  accent: string;
  topics: Topic[];
  /** Materia with no content yet (expands to an empty "próximamente" state). */
  comingSoon?: boolean;
}

const socialesI: Topic[] = [
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
          "Durante trece días de octubre de 1962, Kennedy y Jruschov negociaron por telegrama mientras sus ejércitos esperaban la orden. De ahí salió la ",
          { term: "Crisis de los Misiles" },
          ", el momento más tenso de todo el periodo, y también el teléfono rojo que conectó directamente Washington con Moscú.",
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

// --- Cívica II ------------------------------------------------------------
// Photos: Wikimedia Commons, all public domain / CC0 / CC BY / CC BY-SA, each
// verified on its file page. One distinct Costa Rican image per slide.
//   Corte Suprema — Lex.mercurio · Casa Presidencial — MadriCR · Casa Amarilla —
//   Rodtico21 · Municipalidad de Montes de Oca — Haakon S. Krohn · Teatro
//   Nacional — AndSalx95 · Museo Nacional · Estatua de Figueres y Monumento
//   Nacional — Mariordo · «La destrucción de las armas» — Ll1324 (CC0) ·
//   Asamblea Legislativa · Hospital Calderón Guardia — Antonio Solera · marcha —
//   Leo Jiménez · Banco Central — MyCatIsAChonk · TSE — Tucancillo · Juan
//   Santamaría — Rodrigo Fernández · Parque Morazán — Rodtico21 · Día del
//   Indígena — MJPRDP.
// NOTE: the Banco Central file is misnamed "National Bank of Costa Rica" on
// Commons; the building's own inscription reads BANCO CENTRAL, which is what the
// caption says.
const CIV_CORTE = "/images/civ-constitucionalismo.jpg";
const CIV_PRESIDENCIAL = "/images/civ-consti-2.jpg";
const CIV_CASA_AMARILLA = "/images/civ-consti-3.jpg";
const CIV_MUNICIPALIDAD = "/images/civ-consti-4.jpg";
const CIV_TEATRO = "/images/civ-consti-5.jpg";
const CIV_MUSEO = "/images/civ-ejercito.jpg";
const CIV_FIGUERES = "/images/civ-ejercito-2.jpg";
const CIV_ARMAS = "/images/civ-ejercito-3.jpg";
const CIV_MONUMENTO = "/images/civ-ejercito-4.jpg";
const CIV_ASAMBLEA = "/images/civ-estado.jpg";
const CIV_HOSPITAL = "/images/civ-estado-2.jpg";
const CIV_MARCHA = "/images/civ-estado-3.jpg";
const CIV_BANCO = "/images/civ-estado-4.jpg";
const CIV_TSE = "/images/civ-cultura.jpg";
const CIV_SANTAMARIA = "/images/civ-cultura-2.jpg";
const CIV_MORAZAN = "/images/civ-cultura-3.jpg";
const CIV_INDIGENA = "/images/civ-cultura-4.jpg";

const civicaII: Topic[] = [
  {
    slug: "constitucionalismo-poderes",
    label: "Constitucionalismo y poderes del Estado",
    thumbnail: CIV_CORTE,
    glossary: {
      constitucionalismo:
        "Sistema en el que el poder del Estado se organiza y se LIMITA mediante una Constitución que protege los derechos de las personas.",
      presidencialismo:
        "Sistema de gobierno en el que el presidente es a la vez jefe de Estado y jefe de Gobierno, elegido por el pueblo.",
      "Poder Ejecutivo":
        "Rama del Estado que gobierna y administra el país; en Costa Rica la encabeza el presidente de la República.",
      "Poder Legislativo":
        "Rama del Estado que hace las leyes; en Costa Rica es la Asamblea Legislativa.",
      "Poder Judicial":
        "Rama del Estado que administra justicia e interpreta las leyes; su cabeza es la Corte Suprema de Justicia.",
      "rendición de cuentas":
        "Obligación de las autoridades de informar y responder por sus decisiones y por el uso de los recursos públicos.",
      "gobiernos locales":
        "Las municipalidades: el gobierno de cada cantón, que administra los asuntos más cercanos a la comunidad.",
      "institucionalidad democrática":
        "Conjunto de instituciones y reglas que sostienen la democracia y el equilibrio entre los poderes del Estado.",
    },
    slides: [
      {
        image: CIV_CORTE,
        title: "Constitucionalismo y poderes del Estado",
        info: "Edificio de la Corte Suprema de Justicia, San José, sede del Poder Judicial de Costa Rica.",
      },
      {
        image: CIV_PRESIDENCIAL,
        title: "Constitucionalismo y presidencialismo",
        body: [
          "Costa Rica no inventó su forma de gobierno: la heredó de dos ideas del siglo XVIII. El ",
          { term: "constitucionalismo" },
          " nació de las revoluciones que quisieron ponerle freno a los reyes; el ",
          { term: "presidencialismo" },
          " se copió de Estados Unidos, y por eso aquí no existe la figura aparte de un primer ministro.",
        ],
        info: "Fachada de la Casa Presidencial de Costa Rica, sede del Poder Ejecutivo, con un estanque de nenúfares al frente y la bandera nacional izada.",
      },
      {
        image: CIV_ASAMBLEA,
        title: "Los tres poderes",
        body: [
          "El poder se divide en ",
          { term: "Poder Ejecutivo" },
          ", ",
          { term: "Poder Legislativo" },
          " y ",
          { term: "Poder Judicial" },
          ", que se controlan entre sí (frenos y contrapesos) para que ninguno abuse.",
        ],
        info: "Edificio de la Asamblea Legislativa de Costa Rica, sede del Poder Legislativo, en San José.",
      },
      {
        image: CIV_MUNICIPALIDAD,
        title: "Rendición de cuentas y gobiernos locales",
        body: [
          "Los mecanismos de ",
          { term: "rendición de cuentas" },
          " y de incidencia permiten vigilar y participar. Los ",
          { term: "gobiernos locales" },
          " acercan las decisiones a la comunidad.",
        ],
        info: "Edificio de la Municipalidad de Montes de Oca, con el escudo del cantón sobre el portal de entrada y la bandera nacional izada.",
      },
      {
        image: CIV_TSE,
        title: "La institucionalidad democrática",
        body: [
          "La ",
          { term: "institucionalidad democrática" },
          " de Costa Rica es su mayor patrimonio, y es más frágil de lo que parece: no se pierde de un golpe, sino cuando se va normalizando que las reglas se salten «solo esta vez».",
        ],
        info: "El Tribunal Supremo de Elecciones (TSE) en San José, la institución que organiza y supervisa las elecciones en Costa Rica.",
      },
    ],
  },
  {
    slug: "abolicion-ejercito",
    label: "La abolición del ejército",
    thumbnail: CIV_MUSEO,
    glossary: {
      "abolición del ejército":
        "Decisión de Costa Rica, el 1 de diciembre de 1948, de eliminar sus fuerzas armadas permanentes.",
      "cultura pacifista":
        "Forma de convivencia que rechaza la guerra y resuelve los conflictos por medios pacíficos.",
      "institucionalidad militar":
        "Conjunto de instituciones armadas de un país; Costa Rica no la tiene desde 1948.",
    },
    slides: [
      {
        image: CIV_MUSEO,
        title: "La abolición del ejército",
        info: "Museo Nacional de Costa Rica, antiguo Cuartel Bellavista donde en 1948 se abolió el ejército.",
      },
      {
        image: CIV_FIGUERES,
        title: "1 de diciembre de 1948",
        body: [
          "Tras la guerra civil, José Figueres decretó la ",
          { term: "abolición del ejército" },
          " y entregó el Cuartel Bellavista para convertirlo en museo.",
        ],
        info: "Estatua de bronce de José Figueres Ferrer en la Plaza de la Democracia, en San José.",
      },
      {
        image: CIV_ARMAS,
        title: "Una cultura pacifista",
        body: [
          "Sin ejército, el país construyó una ",
          { term: "cultura pacifista" },
          " y democrática: los recursos que iban a lo militar se destinaron a educación y salud.",
        ],
        info: "Monumento «La destrucción de las armas», en el Parque de la Paz de San José.",
      },
      {
        image: CIV_MONUMENTO,
        title: "Trascendencia",
        body: [
          "La ausencia de ",
          { term: "institucionalidad militar" },
          " fortaleció la estabilidad democrática y proyectó a Costa Rica como un país de paz.",
        ],
        info: "El Monumento Nacional de Costa Rica, en el Parque Nacional de San José, rodeado de árboles y senderos.",
      },
    ],
  },
  {
    slug: "desafios-estado",
    label: "Desafíos de la organización estatal",
    thumbnail: CIV_CASA_AMARILLA,
    glossary: {
      eficacia: "Capacidad de lograr los objetivos propuestos.",
      eficiencia: "Lograr los objetivos usando la menor cantidad de recursos posible.",
      transparencia:
        "Que la información pública sea abierta y accesible para que la ciudadanía pueda vigilar al Estado.",
      "participación ciudadana":
        "Intervención de las personas en los asuntos públicos y en la toma de decisiones.",
      legitimidad:
        "Reconocimiento y aceptación de la autoridad porque se ejerce de forma justa y conforme a la ley.",
      corrupción:
        "Uso indebido del poder o de los recursos públicos para obtener un beneficio privado.",
      gobernabilidad:
        "Capacidad de un gobierno para tomar decisiones y aplicarlas con estabilidad y apoyo social.",
    },
    slides: [
      {
        image: CIV_CASA_AMARILLA,
        title: "Desafíos del Estado",
        info: "La Casa Amarilla, sede del Ministerio de Relaciones Exteriores en San José, de fachada neocolonial amarilla y con la bandera nacional al frente.",
      },
      {
        image: CIV_HOSPITAL,
        title: "Eficacia y eficiencia",
        body: [
          "Un buen Estado busca ",
          { term: "eficacia" },
          " (lograr sus metas) y ",
          { term: "eficiencia" },
          " (con los menores recursos), en políticas públicas inclusivas y solidarias.",
        ],
        info: "Fachada del Hospital Dr. Rafael Ángel Calderón Guardia, en San José, con personas en la plazoleta de acceso.",
      },
      {
        image: CIV_MARCHA,
        title: "Transparencia y participación",
        body: [
          "La ",
          { term: "transparencia" },
          ", la rendición de cuentas y la ",
          { term: "participación ciudadana" },
          " dan ",
          { term: "legitimidad" },
          " al Estado y combaten la ",
          { term: "corrupción" },
          ".",
        ],
        info: "Personas se manifiestan en una calle de Costa Rica; una de las mantas dice «La expresión, un derecho ciudadano».",
      },
      {
        image: CIV_BANCO,
        title: "Gobernabilidad",
        body: [
          "Los grandes desafíos son la ",
          { term: "gobernabilidad" },
          " y la transparencia: gobernar con acuerdos, reglas claras y confianza ciudadana.",
        ],
        info: "Sede del Banco Central de Costa Rica en San José: edificio de fachada de vidrio oscuro, con su rótulo sobre la entrada y la bandera nacional al frente.",
      },
    ],
  },
  {
    slug: "cultura-politica",
    label: "La cultura política costarricense",
    thumbnail: CIV_TEATRO,
    glossary: {
      "valores democráticos":
        "Principios que sostienen la democracia: libertad, igualdad, solidaridad, tolerancia, respeto, paz y honestidad.",
      "igualdad política":
        "Que todas las personas tengan los mismos derechos y el mismo peso en las decisiones públicas (un voto por persona).",
      "cultura política":
        "Conjunto de creencias, valores y costumbres con que un pueblo se relaciona con el poder y con la vida pública.",
      civismo:
        "Comportamiento de quien respeta las leyes, cuida lo público y participa en la vida de su comunidad.",
      tolerancia:
        "Respeto por las ideas, creencias y prácticas distintas a las propias.",
    },
    slides: [
      {
        image: CIV_TEATRO,
        title: "La cultura política",
        body: [
          "La ",
          { term: "cultura política" },
          " es la forma en que un pueblo se relaciona con el poder: lo que cree, lo que espera del Estado y cómo participa.",
        ],
        info: "Fachada del Teatro Nacional de Costa Rica iluminada de noche, con las estatuas sobre el frontón y los faroles del frente.",
      },
      {
        image: CIV_SANTAMARIA,
        title: "Valores democráticos",
        body: [
          "Los ",
          { term: "valores democráticos" },
          " no se heredan: se aprenden y se practican. La ",
          { term: "igualdad política" },
          " es el más exigente de todos, porque obliga a aceptar que el voto del vecino pesa exactamente lo mismo que el propio.",
        ],
        info: "Estatua de bronce de Juan Santamaría en Alajuela, que lo representa avanzando con una antorcha en alto y un fusil en la otra mano.",
      },
      {
        image: CIV_MORAZAN,
        title: "Actitudes cívicas",
        body: [
          "Respetar la libertad propia y ajena, cumplir la ley y cuidar lo público: el ",
          { term: "civismo" },
          " son las actitudes cotidianas que sostienen la democracia.",
        ],
        info: "Personas reunidas alrededor del Templo de la Música, en el Parque Morazán de San José.",
      },
      {
        image: CIV_INDIGENA,
        title: "Tolerancia vs intolerancia",
        body: [
          "El gran desafío es fortalecer la ",
          { term: "tolerancia" },
          " frente a la intolerancia, para convivir en la diversidad.",
        ],
        info: "Celebración del Día del Indígena en Rancho Grande, Talamanca, con participantes vestidos de indígenas y de conquistadores españoles.",
      },
    ],
  },
];

// --- Sociales II -----------------------------------------------------------
// Una sección por documento del profesor Rudy Alexander Pérez Moya:
//   · Descolonización de Asia y África (presentación)
//   · Descolonización Política — Jigsaw + Matriz + guía de preguntas
//     (los cuatro casos van SEPARADOS, como los trabaja él)
//   · Guía de preguntas — Operación Cóndor
//   · Modelos Económicos en la Guerra Fría (presentación)
//   · Fin del socialismo Real (presentación)
// Dictaduras, Centroamérica y derechos civiles no tienen presentación: salen
// del temario.
const SII_DESC_1 = "/images/sii-desc-1.jpg";
const SII_DESC_2 = "/images/sii-desc-2.jpg";
const SII_DESC_ASIA = "/images/sii-desc-asia.jpg";
const SII_DESC_AFRICA = "/images/sii-desc-africa.jpg";
const SII_DESC_SUBSAHARA = "/images/sii-desc-subsahara.jpg";
const SII_DESC_5 = "/images/sii-desc-5.jpg";
const SII_CASOS = "/images/sii-casos.jpg";
const SII_DESC_4 = "/images/sii-desc-4.jpg";
const SII_DESC_SIRIA = "/images/sii-desc-siria.jpg";
const SII_DESC_3 = "/images/sii-desc-3.jpg";
const SII_PER_GADAFI = "/images/sii-per-gadafi.jpg";
const SII_PER_IDRIS = "/images/sii-per-idris.jpg";
const SII_PER_BOURGUIBA = "/images/sii-per-bourguiba.jpg";
const SII_PER_QUWATLI = "/images/sii-per-quwatli.jpg";
const SII_PER_GANDHI = "/images/sii-per-gandhi.jpg";
const SII_DICT_1 = "/images/sii-dict-1.jpg";
const SII_DICT_GF = "/images/sii-dict-gf.jpg";
const SII_DICT_2 = "/images/sii-dict-2.jpg";
const SII_DICT_3 = "/images/sii-dict-3.jpg";
const SII_DICT_4 = "/images/sii-dict-4.jpg";
const SII_DICT_CONDOR = "/images/sii-dict-condor.jpg";
const SII_CONDOR_COMO = "/images/sii-condor-como.jpg";
const SII_CONDOR_MEMORIA = "/images/sii-condor-memoria.jpg";
const SII_DICT_5 = "/images/sii-dict-5.jpg";
const SII_CA_GUERRAS = "/images/sii-ca-guerras.jpg";
const SII_CA_ESQUIPULAS = "/images/sii-ca-esquipulas.jpg";
const SII_CIV_1 = "/images/sii-civ-1.jpg";
const SII_CIV_2 = "/images/sii-civ-2.jpg";
const SII_CIV_3 = "/images/sii-civ-3.jpg";
const SII_CIV_4 = "/images/sii-civ-4.jpg";
const SII_ECO_1 = "/images/sii-eco-1.jpg";
const SII_ECO_2 = "/images/sii-eco-2.jpg";
const SII_ECO_KEYNES = "/images/sii-eco-keynes.jpg";
const SII_ECO_BIENESTAR = "/images/sii-eco-bienestar.jpg";
const SII_ECO_3 = "/images/sii-eco-3.jpg";
const SII_ECO_PLANES = "/images/sii-eco-planes.jpg";
const SII_ECO_4 = "/images/sii-eco-4.jpg";
const SII_FIN_GORBACHOV = "/images/sii-fin-gorbachov.jpg";
const SII_FIN_REFORMAS = "/images/sii-fin-reformas.jpg";
const SII_FIN_URSS = "/images/sii-fin-urss.jpg";
const SII_FIN_YUGO = "/images/sii-fin-yugoslavia.jpg";
const SII_FIN_BLOQUE = "/images/sii-fin-bloque.jpg";

const socialesII: Topic[] = [
  {
    slug: "descolonizacion",
    label: "Descolonización de Asia y África",
    thumbnail: SII_DESC_1,
    glossary: {
      descolonización:
        "Proceso por el que las colonias de Asia y África se independizaron de las potencias europeas, sobre todo entre 1945 y 1975.",
      "autodeterminación de los pueblos":
        "Derecho de cada pueblo a decidir su forma de gobierno y su destino, reconocido en la Carta de San Francisco que creó la ONU en 1945.",
      "Carta del Atlántico":
        "Declaración de 1941 entre Estados Unidos y el Reino Unido que reconoció el derecho de los pueblos a elegir su gobierno.",
      panafricanismo:
        "Movimiento que defendía la unidad de todos los pueblos africanos frente al colonialismo.",
      "Organización de la Unidad Africana":
        "Organismo creado en 1963 por los países africanos independientes para defender su soberanía y apoyar a los que aún luchaban.",
      "Primavera Árabe":
        "Ola de protestas populares que desde 2010 recorrió Túnez, Egipto, Libia, Siria y Yemen exigiendo democracia.",
    },
    slides: [
      {
        image: SII_DESC_1,
        title: "Descolonización de Asia y África",
        info: "Sukarno, acompañado de Mohammad Hatta, proclama la independencia de Indonesia la mañana del 17 de agosto de 1945 en Yakarta. Foto de Frans Mendur, dominio público.",
      },
      {
        image: SII_DESC_2,
        title: "Las siete causas",
        info: "Delegados en la sesión inaugural de la Conferencia de Bandung, Indonesia, 1955: la primera vez que los países recién independizados de Asia y África se sentaron juntos. Foto del Ministerio de Exteriores de Indonesia, dominio público.",
        body: [
          "Colonias empobrecidas que, sin embargo, fueron protagonistas en la Segunda Guerra Mundial. Europa perdió su hegemonía militar y económica. Crecieron los nacionalismos. La ",
          { term: "Carta del Atlántico" },
          " y la ",
          { term: "autodeterminación de los pueblos" },
          " dieron el argumento legal. Y en plena Guerra Fría, EE. UU. y la URSS empujaron desde afuera.",
        ],
      },
      {
        image: SII_DESC_ASIA,
        title: "Asia: dos caminos",
        info: "Tropas del Viet Minh plantan su bandera sobre el puesto de mando francés capturado en Dien Bien Phu, 1954: la derrota que sacó a Francia de Indochina. Foto del Ejército Popular de Vietnam, dominio público.",
        body: [
          "La ",
          { term: "descolonización" },
          " asiática fue rápida: 1945 la Liga Árabe, 1946 Siria, 1947 India y Pakistán, 1948 Israel, 1955 Indonesia, 1957 Malasia, 1971 Bangladesh. Pero no todos llegaron igual: mientras Gandhi negociaba sin armas, Ho Chi Minh expulsó a Francia de Vietnam por la vía militar.",
        ],
      },
      {
        image: SII_DESC_AFRICA,
        title: "África: más tarde y más difícil",
        info: "Kwame Nkrumah (Ghana) y Gamal Abdel Nasser (Egipto) reunidos en El Cairo en febrero de 1966, dos de las caras del panafricanismo. Foto de Anefo, CC0.",
        body: [
          "Llegó después que en Asia, por estructuras sociales antiguas e instituciones muy débiles. El ",
          { term: "panafricanismo" },
          " le dio impulso y en 1963 nació la ",
          { term: "Organización de la Unidad Africana" },
          ". El proceso empezó por el norte y de ahí bajó.",
        ],
      },
      {
        image: SII_DESC_SUBSAHARA,
        title: "La África subsahariana",
        info: "El primer ministro congoleño Patrice Lumumba firma el documento que concede la independencia al Congo, junto al primer ministro belga Gaston Eyskens, el 30 de junio de 1960. Fotografía de Congopresse, dominio público.",
        body: [
          "Fue la peor preparada, porque a las potencias les interesaba menos. No se habían formado naciones: la organización seguía siendo tribal y rudimentaria. Al irse los europeos quedaron fronteras artificiales, y con ellas violencia y discursos de odio entre etnias.",
        ],
      },
      {
        image: SII_DESC_5,
        title: "Lo que quedó",
        info: "La plaza Tahrir de El Cairo llena de manifestantes el 29 de julio de 2011, durante la Primavera Árabe. Foto de Ahmed Abd El-Fatah, CC BY 2.0.",
        body: [
          "Economías atadas al exterior que terminaron cayendo, inestabilidad política y un crecimiento de población sin crecimiento económico, que empeoró el nivel de vida. Medio siglo después, la ",
          { term: "Primavera Árabe" },
          " mostró que esas cuentas seguían sin saldarse.",
        ],
      },
    ],
  },
  {
    slug: "casos-descolonizacion",
    label: "Los cuatro casos",
    thumbnail: SII_CASOS,
    glossary: {
      "potencia colonial":
        "El país europeo que gobernaba la colonia y se beneficiaba de sus recursos.",
      protectorado:
        "Territorio que conserva su gobierno propio pero queda bajo el control político y militar de una potencia extranjera.",
      mandato:
        "Territorio que la Sociedad de Naciones entregó a una potencia para administrarlo tras la caída de los imperios otomano y alemán.",
      "no violencia":
        "Método de lucha que rechaza las armas y usa marchas, boicots y desobediencia civil.",
      partición:
        "División de un territorio en dos o más Estados nuevos.",
      "No Alineados":
        "Bloque de países que en la Guerra Fría se negaron a tomar partido por Estados Unidos o por la URSS.",
    },
    slides: [
      {
        image: SII_CASOS,
        title: "Los cuatro casos",
        info: "Mapa de las Naciones Unidas de 1960 con los territorios que aún dependían de una potencia extranjera: más de 60 millones de personas. Documento de la ONU, dominio público.",
      },
      {
        image: SII_DESC_4,
        title: "Túnez",
        info: "Firma del protocolo de independencia de Túnez en París, 20 de marzo de 1956. Ahmed Mestiri, miembro de la delegación tunecina, aparece en la mesa. Fotografía de dominio público (Wikimedia Commons).",
        body: [
          "Su ",
          { term: "potencia colonial" },
          " fue Francia, que lo gobernaba como ",
          { term: "protectorado" },
          " desde 1881. La independencia se negoció en una mesa, no en una guerra: primero la autonomía en 1955, y el protocolo firmado en París el 20 de marzo de 1956. Después el país se alineó con Occidente. Hoy: aquí empezó la Primavera Árabe.",
        ],
      },
      {
        image: SII_PER_BOURGUIBA,
        title: "Túnez: los personajes",
        info: "Habib Bourguiba, líder independentista y primer presidente de Túnez, en un retrato oficial de 1960. Foto de Habib Osman, dominio público.",
        body: [
          { name: "Habib Bourguiba" },
          " dirigía el Neo-Destur, el partido que pedía la independencia. Pasó años preso y exiliado antes de sentarse a negociar, y luego gobernó Túnez treinta años. Quien firmó en París fue el primer ministro ",
          { name: "Taher Ben Ammar" },
          ".",
        ],
      },
      {
        image: SII_PER_IDRIS,
        title: "Libia",
        info: "Sayyid Mohammed Idris as-Senussi, emir de Cirenaica y primer rey de Libia, fotografiado el 24 de julio de 1951, meses antes de la independencia. Foto de Anefo / Nationaal Archief, CC0.",
        body: [
          "Su ",
          { term: "potencia colonial" },
          " fue Italia desde 1911; al perder la guerra quedó bajo administración británica y francesa. Su independencia no la negoció nadie: la decidió la ",
          { name: "ONU" },
          ", y el 24 de diciembre de 1951 Libia fue el primer país del mundo en nacer así, como reino de ",
          { name: "Idris I" },
          ". Hoy: dividida y en conflicto desde 2011.",
        ],
      },
      {
        image: SII_PER_GADAFI,
        title: "Libia: los personajes",
        info: "Muamar Gadafi en Belgrado el 25 de febrero de 1970, pocos meses después del golpe que lo llevó al poder. Foto de Stevan Kragujević, CC BY-SA 3.0.",
        body: [
          { name: "Idris I" },
          " era emir de Cirenaica y jefe de la orden religiosa senusí; reinó sobre un país nuevo y pobre, y permitió bases militares de EE. UU. y el Reino Unido. En 1969 lo derrocó un coronel de 27 años, ",
          { name: "Muamar Gadafi" },
          ", que cerró esas bases, acercó Libia a la URSS y gobernó 42 años.",
        ],
      },
      {
        image: SII_DESC_SIRIA,
        title: "Siria",
        info: "Izado de la bandera siria en 1946, tras la salida de las tropas francesas. Fotografía de dominio público (Wikimedia Commons).",
        body: [
          "Su ",
          { term: "potencia colonial" },
          " fue Francia, pero no como colonia: al caer el Imperio Otomano, Siria quedó como ",
          { term: "mandato" },
          ". Las revueltas y el bombardeo francés de Damasco forzaron la salida, y el 17 de abril de 1946 se fue el último soldado. Siria celebra esa fecha como el Día de la Evacuación. En la Guerra Fría se alineó con la URSS. Hoy: en guerra civil desde 2011.",
        ],
      },
      {
        image: SII_PER_QUWATLI,
        title: "Siria: los personajes",
        info: "Shukri al-Quwatli, presidente de Siria en la independencia de 1946, dando un discurso en Homs en 1947. Fotografía de autor desconocido, dominio público.",
        body: [
          { name: "Shukri al-Quwatli" },
          " era el presidente el día de la evacuación, después de militar desde joven contra el dominio extranjero. Volvió al poder en 1955, y en 1958 entregó la presidencia para unir Siria con el Egipto de ",
          { name: "Nasser" },
          " en la República Árabe Unida.",
        ],
      },
      {
        image: SII_DESC_3,
        title: "India – Pakistán",
        info: "Lord Mountbatten, último virrey británico de la India, con Muhammad Ali Jinnah, fundador de Pakistán, durante las negociaciones de 1947. Fotografía de dominio público (Wikimedia Commons).",
        body: [
          "Su ",
          { term: "potencia colonial" },
          " fue el Reino Unido. Décadas de ",
          { term: "no violencia" },
          " desgastaron al imperio y la salida se ejecutó en 1947, pero con ",
          { term: "partición" },
          ": millones de desplazados y matanzas entre comunidades. Luego India lideró a los ",
          { term: "No Alineados" },
          " y Pakistán se alió con EE. UU. Hoy: enfrentados por Cachemira, ambos con armas nucleares.",
        ],
      },
      {
        image: SII_PER_GANDHI,
        title: "India: los personajes",
        info: "Mohandas K. Gandhi en su residencia de Delhi el 2 de octubre de 1946, el día que cumplía 77 años. Foto de Fox Photos, dominio público.",
        body: [
          { name: "Gandhi" },
          " pasó casi treinta años al frente de la resistencia india sin tomar un arma, y por eso lo llamaron Mahatma, «alma grande». ",
          { name: "Nehru" },
          " sería el primer primer ministro de India y ",
          { name: "Jinnah" },
          " el fundador de Pakistán; el virrey ",
          { name: "Mountbatten" },
          " fue el británico encargado de entregar el poder y de trazar la división.",
        ],
      }
    ],
  },
  {
    slug: "dictaduras-latinoamerica",
    label: "Dictaduras en Latinoamérica",
    thumbnail: SII_DICT_1,
    glossary: {
      dictadura:
        "Régimen en el que una persona o un grupo concentra todo el poder, sin elecciones libres ni división de poderes.",
      "golpe de Estado":
        "Toma del poder por la fuerza, generalmente militar, derrocando al gobierno legítimo.",
      "doctrina de seguridad nacional":
        "Idea impulsada durante la Guerra Fría según la cual el enemigo estaba dentro del propio país.",
      "Pacto de Punto Fijo":
        "Acuerdo de 1958 entre los grandes partidos venezolanos para turnarse el poder y sostener la democracia.",
    },
    slides: [
      {
        image: SII_DICT_1,
        title: "Dictaduras en Latinoamérica",
        info: "Concentración masiva por la opción «No» durante la campaña del plebiscito chileno de 1988, el voto que puso fecha de salida a Pinochet. Foto de la Biblioteca del Congreso Nacional de Chile, CC BY 3.0 cl.",
      },
      {
        image: SII_DICT_GF,
        title: "La Guerra Fría llega a la región",
        info: "John F. Kennedy habla en el primer aniversario de la Alianza para el Progreso ante los diplomáticos latinoamericanos, 13 de marzo de 1962. Foto de Robert Knudsen, Casa Blanca, dominio público.",
        body: [
          "Estados Unidos y la URSS convirtieron América Latina en un tablero de su conflicto. Washington entrenó a los ejércitos de la región en la ",
          { term: "doctrina de seguridad nacional" },
          ", y con ese argumento los militares tomaron el poder en casi todo el continente.",
        ],
      },
      {
        image: SII_DICT_2,
        title: "El Cono Sur",
        info: "Augusto Pinochet con la Junta Militar de Gobierno de Chile, 1985. Foto del Ministerio de Relaciones Exteriores de Chile, CC BY 2.0 cl.",
        body: [
          "Un ",
          { term: "golpe de Estado" },
          " tras otro instaló una ",
          { term: "dictadura" },
          " militar: Videla en Argentina (1976-1983), Pinochet en Chile (1973-1990), Stroessner en Paraguay (1954-1989, la más larga de Sudamérica) y Banzer en Bolivia (1971-1978).",
        ],
      },
      {
        image: SII_DICT_3,
        title: "Cuba",
        info: "Fidel Castro con el secretario de Estado estadounidense Christian Herter en Nueva York, 16 de abril de 1959, pocos meses después de la Revolución y antes de la ruptura con Estados Unidos. Foto de Warren K. Leffler, dominio público.",
        body: [
          "La Revolución de 1959 derrocó a Batista y llevó al poder a Fidel Castro, que gobernó casi cinco décadas. La isla adoptó un sistema de partido único aliado con la URSS: avances en salud y educación, pero sin elecciones libres ni prensa libre.",
        ],
      },
      {
        image: SII_DICT_4,
        title: "Venezuela",
        info: "Rafael Caldera llega al palacio de Miraflores el 11 de marzo de 1969: un traspaso de mando entre civiles electos, en pleno Pacto de Punto Fijo. Fotografía de dominio público (Wikimedia Commons).",
        body: [
          "Aquí el desenlace fue distinto: en 1958 cayó la dictadura de Pérez Jiménez y el ",
          { term: "Pacto de Punto Fijo" },
          " sostuvo cuatro décadas de democracia, financiada por el petróleo. La crisis económica y la corrupción desgastaron ese modelo a finales del siglo XX.",
        ],
      },
    ],
  },
  {
    slug: "operacion-condor",
    label: "Operación Cóndor",
    thumbnail: SII_DICT_CONDOR,
    glossary: {
      "Plan Cóndor":
        "Coordinación secreta entre las dictaduras de Argentina, Chile, Uruguay, Paraguay, Bolivia y Brasil para perseguir opositores más allá de sus fronteras.",
      desaparecidos:
        "Personas detenidas por las dictaduras cuyo paradero nunca se reconoció.",
      "terrorismo de Estado":
        "Uso del aparato del Estado —policía, ejército, servicios de inteligencia— para sembrar miedo mediante secuestros, tortura y asesinatos.",
      "memoria histórica":
        "Esfuerzo de una sociedad por recordar lo ocurrido y reconocer a las víctimas, para que no vuelva a pasar.",
    },
    slides: [
      {
        image: SII_DICT_CONDOR,
        title: "Operación Cóndor",
        info: "Nombres grabados en el Parque de la Memoria de Buenos Aires, monumento a las víctimas del terrorismo de Estado argentino. Foto de ProtoplasmaKid, CC BY-SA 4.0.",
      },
      {
        image: SII_CONDOR_COMO,
        title: "Cómo funcionó",
        info: "Sótano de la Escuela de Mecánica de la Armada (ESMA) en Buenos Aires, centro clandestino de detención y tortura durante la dictadura argentina. Foto de Adam Jones, CC BY-SA 2.0.",
        body: [
          "Desde 1975 las dictaduras del Cono Sur se pasaban información, se prestaban centros de detención y se entregaban presos entre ellas, con apoyo y entrenamiento de Estados Unidos. Con el ",
          { term: "Plan Cóndor" },
          ", cruzar la frontera dejó de ser una salida: nadie estaba a salvo del otro lado.",
        ],
      },
      {
        image: SII_CONDOR_MEMORIA,
        title: "Memoria y derechos humanos",
        info: "Muro con rostros de víctimas de la dictadura chilena (1973-1990) en el Museo de la Memoria y los Derechos Humanos de Santiago. Foto de Carlos Teixidor Cadenas, CC BY-SA 4.0.",
        body: [
          "Dejó miles de ",
          { term: "desaparecidos" },
          ", torturados y exiliados: fue ",
          { term: "terrorismo de Estado" },
          ", no excesos aislados. Los gobiernos lo justificaban como una guerra contra la subversión. Décadas después, juicios y museos sostienen la ",
          { term: "memoria histórica" },
          ", y esa es la discusión de fondo: hasta dónde puede la seguridad nacional justificar perseguir a alguien por lo que piensa.",
        ],
      },
    ],
  },
  {
    slug: "centroamerica",
    label: "Centroamérica en los 80",
    thumbnail: SII_DICT_5,
    glossary: {
      democratización:
        "Proceso de volver a un sistema con elecciones libres, partidos y derechos garantizados.",
      Esquipulas:
        "Acuerdos de paz firmados en 1987 por los presidentes centroamericanos, impulsados por Óscar Arias.",
      Contra: "Grupos armados que, financiados por Estados Unidos, combatieron al gobierno sandinista de Nicaragua.",
      "guerra civil":
        "Conflicto armado entre grupos de un mismo país por el control del poder.",
    },
    slides: [
      {
        image: SII_DICT_5,
        title: "Centroamérica en los 80",
        info: "Acto del Primero de Mayo en Chinandega, Nicaragua, 1984, durante el gobierno sandinista. Foto de SLR Images, CC BY 2.0.",
      },
      {
        image: SII_CA_GUERRAS,
        title: "Cuatro países, cuatro desenlaces",
        info: "Tropas salvadoreñas descienden de un helicóptero estadounidense durante el ejercicio Granadero I, mayo de 1984: la ayuda militar de EE. UU. en plena guerra civil. Foto del Departamento de Defensa de EE. UU., dominio público.",
        body: [
          "En Nicaragua la revolución sandinista derrocó a Somoza en 1979 y enfrentó después a la ",
          { term: "Contra" },
          ". El Salvador y Guatemala vivieron cada uno una ",
          { term: "guerra civil" },
          " larguísima —la guatemalteca duró 36 años e incluyó genocidio contra comunidades indígenas—. Honduras no tuvo guerra propia, pero fue la base desde donde operaban.",
        ],
      },
      {
        image: SII_CA_ESQUIPULAS,
        title: "La paz que se negoció",
        info: "El costarricense Óscar Arias Sánchez, impulsor del plan de paz de Esquipulas y Premio Nobel de la Paz 1987. Foto de John Mathew Smith, CC BY-SA 2.0.",
        body: [
          "La ",
          { term: "democratización" },
          " no llegó por una victoria militar sino por una negociación: ",
          { term: "Esquipulas" },
          ". Fue Centroamérica resolviendo lo suyo sin las potencias, y le valió a Óscar Arias el Premio Nobel de la Paz.",
        ],
      },
    ],
  },
  {
    slug: "derechos-civiles",
    label: "Derechos civiles en Estados Unidos",
    thumbnail: SII_CIV_1,
    glossary: {
      "segregación racial":
        "Separación por ley de blancos y negros en escuelas, buses, restaurantes y baños, vigente en el sur de Estados Unidos hasta los años 60.",
      "desobediencia civil":
        "Desobedecer de forma pacífica y pública una ley injusta, aceptando las consecuencias, para forzar su cambio.",
      contracultura:
        "Movimiento juvenil que rechaza los valores dominantes de la sociedad y propone otra forma de vivir.",
      "derechos civiles":
        "Derechos que garantizan a toda persona igualdad ante la ley y participación en la vida pública, sin importar su raza.",
    },
    slides: [
      {
        image: SII_CIV_1,
        title: "Derechos civiles en Estados Unidos",
        info: "Manifestantes descansan durante la marcha de Selma a Montgomery, Alabama, en 1965; una pancarta dice que marchan juntos católicos, judíos y protestantes. Foto de Peter Pettus, dominio público.",
      },
      {
        image: SII_CIV_2,
        title: "Martin Luther King",
        info: "Martin Luther King Jr. en 1964, el año en que recibió el Premio Nobel de la Paz. Foto de Marion S. Trikosko, dominio público.",
        body: [
          "King encabezó la lucha por los ",
          { term: "derechos civiles" },
          " contra la ",
          { term: "segregación racial" },
          ", con marchas, boicots y ",
          { term: "desobediencia civil" },
          ". En la Marcha sobre Washington de 1963 pronunció su discurso «I have a dream». Recibió el Nobel de la Paz en 1964 y fue asesinado en 1968.",
        ],
      },
      {
        image: SII_CIV_3,
        title: "Malcolm X",
        info: "Malcolm X fotografiado el 12 de marzo de 1964, el día que anunció su ruptura con la Nación del Islam. Foto de Ed Ford, New York World-Telegram, dominio público.",
        body: [
          "Malcolm X defendió una postura más combativa: orgullo negro, autodefensa y desconfianza hacia la integración. Su voz dio fuerza a quienes sentían que la vía pacífica avanzaba demasiado lento. Fue asesinado en 1965.",
        ],
      },
      {
        image: SII_CIV_4,
        title: "El movimiento hippie",
        info: "Una manifestante le ofrece una flor a la policía militar que custodia el Pentágono durante una protesta contra la guerra de Vietnam, 21 de octubre de 1967. Foto del Departamento de Defensa de EE. UU., dominio público.",
        body: [
          "En los años 60 los jóvenes estadounidenses levantaron una ",
          { term: "contracultura" },
          ": marcharon contra la guerra de Vietnam, se fueron a vivir en comunas y convirtieron la música en su forma de protesta.",
        ],
      },
    ],
  },
  {
    slug: "modelos-economicos",
    label: "Modelos económicos en la Guerra Fría",
    thumbnail: SII_ECO_1,
    glossary: {
      capitalismo:
        "Sistema basado en la propiedad privada, la libre competencia y la búsqueda de ganancia; los precios los fija el mercado.",
      socialismo:
        "Sistema en el que el Estado es dueño de los medios de producción y dirige la economía buscando la igualdad social.",
      "Estado de Bienestar":
        "Forma de gobierno en la que el Estado participa activamente en la economía y crea políticas públicas que garantizan seguridad social a toda la población.",
      "impuestos directos":
        "Los que se cobran sobre la renta y la riqueza de cada quien: pagan más los que más tienen.",
      "economía planificada":
        "Modelo en el que el Estado decide qué, cuánto y cómo se produce, en lugar de dejarlo al mercado.",
      "colectivización agraria":
        "Entregar las propiedades agrícolas y ganaderas a la colectividad.",
      "planes quinquenales":
        "Programas soviéticos de cinco años en los que el Estado fijaba metas de producción y repartía los recursos.",
      "Doctrina Brezhnev":
        "Doctrina creada en 1968 según la cual ningún país firmante del Pacto de Varsovia podía abandonarlo.",
    },
    slides: [
      {
        image: SII_ECO_1,
        title: "Modelos económicos en la Guerra Fría",
        info: "Tanques estadounidenses y soviéticos frente a frente en el Checkpoint Charlie de Berlín, octubre de 1961: los dos modelos separados por unos metros de calle. Foto del Ejército de EE. UU., dominio público.",
      },
      {
        image: SII_ECO_2,
        title: "El modelo capitalista",
        info: "Corredores de bolsa trabajando en el piso de la Bolsa de Nueva York, 1963. Foto de Thomas J. O'Halloran, dominio público.",
        body: [
          "Tras la guerra, el ",
          { term: "capitalismo" },
          " cambió de cara: el Estado empezó a gastar e intervenir. Se crearon empresas públicas de electricidad, hidrocarburos y transportes, y con los ",
          { term: "impuestos directos" },
          " se redistribuyó la riqueza.",
        ],
      },
      {
        image: SII_ECO_KEYNES,
        title: "Keynes, el gestor",
        info: "John Maynard Keynes (derecha) junto a Harry Dexter White en la reunión inaugural del Fondo Monetario Internacional, Savannah, marzo de 1946. Foto del FMI, dominio público.",
        body: [
          "El modelo lo diseñó John Maynard Keynes. Lo aplicaron primero gobiernos conservadores de Francia, Alemania e Italia en los años 50, y en los 70 los socialdemócratas de Estados Unidos, Alemania, Suecia y el Reino Unido. Evitó caídas abruptas y trajo bonanza incluso a países subdesarrollados.",
        ],
      },
      {
        image: SII_ECO_BIENESTAR,
        title: "¿Qué cambió en la vida diaria?",
        info: "El ministro de Salud británico Aneurin Bevan en el primer día del Servicio Nacional de Salud, 5 de julio de 1948: atención médica gratuita para todos, el símbolo del Estado de bienestar. Fotografía de dominio público.",
        body: [
          "De ahí nació el ",
          { term: "Estado de Bienestar" },
          ". Una familia obrera europea pasó a tener médico, pensión y una escuela decente para sus hijos. Creció la fuerza de trabajo, se emparejaron los salarios y empresarios y sindicatos empezaron a negociar en vez de chocar.",
        ],
      },
      {
        image: SII_ECO_3,
        title: "El modelo socialista",
        info: "Estudiantes cargan papas para el almacén del koljós «Pravda», región de Yaroslavl, septiembre de 1979: la cosecha colectiva planificada desde el Estado. Foto de V. S. Spiridonov, CC BY-SA 3.0.",
        body: [
          "En el bloque soviético el ",
          { term: "socialismo" },
          " puso las fábricas en manos del Estado y cerró la puerta a la iniciativa privada. En el campo aplicó la ",
          { term: "colectivización agraria" },
          ", que buscaba alimentar a las ciudades y surtir de materias primas a la industria.",
        ],
      },
      {
        image: SII_ECO_PLANES,
        title: "Planificar todo, y sus costos",
        info: "Jóvenes del Komsomol en la construcción del sexto alto horno del combinado metalúrgico de Magnitogorsk, la obra insignia de los planes quinquenales soviéticos. Foto de Iván Shaguin, RIA Novosti, CC BY-SA 3.0.",
        body: [
          "El Estado dirigía la ",
          { term: "economía planificada" },
          " con ",
          { term: "planes quinquenales" },
          ". Pero faltó abastecimiento cuando el campo se vació hacia la ciudad, los campesinos resistieron, creció el descontento y la industria pesada se comió los bienes de consumo. Kruschev intentó corregirlo; Brezhnev endureció la línea y sostuvo el bloque con la ",
          { term: "Doctrina Brezhnev" },
          ".",
        ],
      },
    ],
  },
  {
    slug: "fin-socialismo-real",
    label: "El fin del socialismo real",
    thumbnail: SII_ECO_4,
    glossary: {
      "socialismo real":
        "Nombre que se dio a los regímenes socialistas que existieron de verdad en la URSS y Europa del Este.",
      Perestroika:
        "Política de Gorbachov para reordenar la economía y abrir el gobierno: mercado, actividad comercial y propiedad privada.",
      Glasnost:
        "Política de Gorbachov de libertad y transparencia de la información, que además separó el Estado del Partido Comunista.",
      "Pacto de Varsovia":
        "Alianza militar de la URSS y los países socialistas de Europa del Este, creada frente a la OTAN.",
      "Comunidad de Estados Independientes":
        "Asociación creada en diciembre de 1991 para mantener ligadas entre sí a las antiguas repúblicas soviéticas.",
      "Divorcio de Terciopelo":
        "Nombre que recibió la separación pacífica y negociada de Chequia y Eslovaquia.",
    },
    slides: [
      {
        image: SII_ECO_4,
        title: "El fin del socialismo real",
        info: "Alemanes del este y del oeste se encuentran en la brecha abierta en el Muro de Berlín junto a la Puerta de Brandeburgo, diciembre de 1989. Foto de F. Lee Corkran, dominio público.",
      },
      {
        image: SII_FIN_REFORMAS,
        title: "Las causas",
        info: "Ronald Reagan y Mijaíl Gorbachov firman el Tratado INF en la Casa Blanca, 8 de diciembre de 1987: el primer acuerdo que eliminó una clase entera de misiles nucleares. Foto de la Casa Blanca, dominio público.",
        body: [
          "El ",
          { term: "socialismo real" },
          " se agotó por corrupción, exceso de burocracia, descontento social y un fuerte déficit en los presupuestos públicos de la URSS. En 1985 Mijaíl Gorbachov llegó al poder decidido a reformarlo.",
        ],
      },
      {
        image: SII_FIN_GORBACHOV,
        title: "Perestroika y Glasnost",
        info: "Mijaíl Gorbachov en la conferencia de prensa posterior a la cumbre de Reikiavik, octubre de 1986. Foto de Yuri Abramochkin, RIA Novosti, CC BY-SA 3.0.",
        body: [
          "Gorbachov intentó salvar el sistema con dos reformas: la ",
          { term: "Perestroika" },
          " y la ",
          { term: "Glasnost" },
          ". Por primera vez en décadas se podía criticar al gobierno en voz alta. Y se acercó a Washington: el tratado de 1987 obligó a ambas potencias a reducir su arsenal nuclear y a dejarse inspeccionar.",
        ],
      },
      {
        image: SII_FIN_BLOQUE,
        title: "Las consecuencias",
        info: "Multitud en una manifestación en Praga durante la Revolución de Terciopelo, finales de noviembre de 1989. Foto de RobbieIanMorrison, CC BY 4.0.",
        body: [
          "En 1987 hubo elecciones con más de un candidato y se liberaron opositores; se derogó el artículo que daba el monopolio al Partido Comunista. En 1989 cayeron uno tras otro los gobiernos de Europa del Este, y en 1991 se rompió el ",
          { term: "Pacto de Varsovia" },
          ". Las reformas no salvaron a la URSS: la aceleraron.",
        ],
      },
      {
        image: SII_FIN_URSS,
        title: "Los 15 países de la URSS",
        info: "Leonid Kravchuk (Ucrania), Stanislav Shushkévich (Bielorrusia) y Borís Yeltsin (Rusia) en Belovézhskaya Puscha el 8 de diciembre de 1991, tras firmar el acuerdo que disolvió la URSS. Foto de Yuri Ivánov, RIA Novosti, CC BY-SA 3.0.",
        body: [
          "El 8 de diciembre de 1991 los líderes de Rusia, Ucrania y Bielorrusia firmaron el acta que liquidaba la URSS y creaba la ",
          { term: "Comunidad de Estados Independientes" },
          ". Nacieron 15 países: las tres bálticas (Estonia, Letonia, Lituania), las tres eslavas (Rusia, Ucrania, Bielorrusia), Moldavia, las tres del Cáucaso (Georgia, Armenia, Azerbaiyán) y las cinco de Asia Central (Kazajistán, Uzbekistán, Turkmenistán, Kirguistán, Tayikistán).",
        ],
      },
      {
        image: SII_FIN_YUGO,
        title: "Yugoslavia y Checoslovaquia",
        info: "Mapa de las Naciones Unidas de la antigua Yugoslavia, con las repúblicas que salieron de ella. Documento de la ONU, dominio público.",
        body: [
          "Yugoslavia tenía seis repúblicas y se rompió con guerra: Eslovenia y Croacia se declararon independientes en junio de 1991, Macedonia en septiembre y Bosnia y Herzegovina en 1992. Serbia y Montenegro siguieron juntas hasta 2006, y Kosovo se declaró independiente en 2008. Checoslovaquia hizo lo contrario: acordó separarse en junio de 1992 y el 1 de enero de 1993 nacieron Chequia y Eslovaquia sin un solo disparo, el ",
          { term: "Divorcio de Terciopelo" },
          ".",
        ],
      },
    ],
  },
];

export const materias: Materia[] = [
  { slug: "sociales-i", label: "Sociales I", accent: "#8a4a4a", topics: socialesI },
  { slug: "civica-ii", label: "Cívica II", accent: "#b58a2e", topics: civicaII },
  { slug: "sociales-ii", label: "Sociales II", accent: "#3f6b5e", topics: socialesII },
];

// Flat list of every topic across materias (image warming, deep-link lookup).
export const topics: Topic[] = materias.flatMap((m) => m.topics);

export function getTopic(slug: string) {
  return topics.find((t) => t.slug === slug);
}
