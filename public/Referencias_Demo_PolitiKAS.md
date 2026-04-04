# Referencias para Demo - Proyecto PolitiKAS en Linea
## Fundacion Konrad Adenauer, Costa Rica y Panama

Documento interno para el equipo de diseno de Link Design.
Fecha: 3 de abril de 2026

---

## Contexto del proyecto

La Fundacion Konrad Adenauer (KAS), oficina Costa Rica y Panama, necesita reconstruir su plataforma de contenido politikasenlinea.com. El sitio actual esta en WordPress y presenta problemas criticos de arquitectura, navegacion y experiencia de usuario. La plataforma maneja tres formatos de contenido: podcasts (audio), videos y articulos, organizados bajo tematicas de democracia, representacion, seguridad e innovacion.

La contacto del proyecto es Marcee Gomez, Coordinadora de Proyectos. La decision final la toma Michaela Braun, representante de la fundacion. Estan cotizando con varios proveedores simultaneamente.

La referencia que el cliente menciono espontaneamente durante la reunion es dialogopolitico.org (plataforma hermana de KAS Uruguay).

---

## Dolores reales del cliente (extraidos de la reunion)

Cada referencia en este documento esta mapeada a uno o mas de estos dolores. El equipo de diseno debe tener estos dolores presentes al construir la demo.

**D1 - Contenido fragmentado sin conexion entre formatos.** Los podcasts, articulos y videos viven en secciones separadas. Para pasar de un formato a otro hay que volver a la pagina principal. No existe vinculacion tematica entre ellos.

**D2 - El contenido principal no se encuentra donde deberia estar.** En desktop, al entrar a un episodio de podcast, el reproductor queda escondido al fondo de la pagina (hay que hacer scroll para encontrarlo). En movil si se ve correctamente. Esto evidencia un problema de plantilla, no de contenido.

**D3 - No hay arquitectura basada en temas.** El cliente quiere que el eje organizador sea el tema (por ejemplo: "Democracia", "Seguridad") y que dentro de cada tema convivan todos los formatos relacionados: el podcast, el articulo y el video sobre ese mismo tema.

**D4 - Dependencia operativa y miedo a la continuidad.** La coordinadora sabe que ella es el cuello de botella. Le preocupa que si ella no esta, nadie pueda operar el sitio. Necesitan un sistema que cualquier persona pueda usar sin soporte tecnico.

**D5 - Necesitan validacion visual para decidir.** La jefa (Michaela Braun) necesita ver algo concreto para aprobar. No va a decidir basandose en descripciones tecnicas. La demo es la pieza que puede inclinar la balanza frente a otros proveedores.

**D6 - Accesibilidad como valor institucional.** Las organizaciones como KAS valoran profundamente la accesibilidad. El contenido debe llegar a la mayor cantidad de personas posible, incluyendo personas con discapacidades. Esto abarca desde transcripciones de audio hasta ajustes visuales del sitio.

---

## Referencias seleccionadas

### REFERENCIA 1: Council on Foreign Relations (CFR)
**URL:** https://www.cfr.org
**Dolores que resuelve:** D1, D3, D5

**Por que esta referencia es relevante:**
CFR es un think tank de politica internacional que maneja exactamente el mismo tipo de contenido que PolitiKAS: articulos de analisis, podcasts (7 programas activos) y video. Lo que CFR hace excepcionalmente bien es organizar todo por temas y regiones. Su navegacion principal tiene dos ejes: "Regions" y "Topics". Cuando un usuario entra a un tema como "Defense and Security", encuentra articulos, episodios de podcast y reportes sobre ese mismo tema en un solo lugar.

**Que debe observar el equipo de diseno:**
- La navegacion principal por "Topics" y "Regions" como ejes organizadores.
- Como los content cards muestran el tipo de contenido (Podcast, Article, Report) junto con fecha, autor y etiquetas tematicas.
- La seccion "Spotlight" en el homepage que destaca contenido curado de distintos formatos.
- Como las etiquetas tematicas en cada pieza de contenido sirven como puente para descubrir contenido relacionado.
- La jerarquia visual: limpio, institucional, tipografia clara, mucho espacio en blanco.

**Que NO copiar:**
El sitio de CFR es extenso y tiene mucha profundidad de contenido. PolitiKAS es mas pequeno y enfocado. No copiar la complejidad de la navegacion sino el principio de organizacion tematica.

---

### REFERENCIA 2: Chatham House
**URL:** https://www.chathamhouse.org
**Dolores que resuelve:** D1, D3, D5

**Por que esta referencia es relevante:**
Chatham House es un instituto de politica internacional con un sitio que maneja decenas de miles de paginas de contenido sin sentirse abrumador. Su navegacion se organiza en cuatro dimensiones: Topics (9 categorias tematicas con subtemas), Regions (6 zonas geograficas), Events y Publications. Lo mas destacable es como mezcla formatos dentro de bloques tematicos: comentarios de expertos (3-4 minutos de lectura), contenido de audio (30-45 minutos), papers de investigacion y eventos, todo bajo el mismo tema.

**Que debe observar el equipo de diseno:**
- El carrusel de "Trending Issues" que rota tarjetas de temas destacados (Iran, Ukraine, etc.) con descripciones breves. Esto podria adaptarse para las temporadas o temas activos de PolitiKAS.
- Como los bloques de contenido modulares mezclan articulos, audio y research sin separarlos por formato.
- La busqueda integrada con busquedas populares pre-cargadas.
- El diseno: sofisticado pero sobrio, tipicamente institucional europeo. Muy apropiado para el tono de una fundacion alemana.

**Que NO copiar:**
La cantidad de contenido y la profundidad de la navegacion. Chatham House tiene decadas de contenido acumulado. Copiar el principio de organizacion, no la escala.

---

### REFERENCIA 3: Al Jazeera Podcasts
**URL:** https://www.aljazeera.com/podcasts/
**Dolores que resuelve:** D1, D2, D6

**Por que esta referencia es relevante:**
Al Jazeera resuelve de forma elegante el problema principal que tiene PolitiKAS: como presentar un hub de podcasts que sea claro, navegable y que conecte con el resto del contenido del medio. El hub tiene tres niveles: un episodio destacado prominente con boton de escucha, un carrusel de shows ("Our Shows") con tiles visuales, y una seccion de "Latest Episodes" con tarjetas que muestran titulo, fecha, duracion, nombre del podcast y boton de play.

**Que debe observar el equipo de diseno:**
- El episodio destacado al tope de la pagina con arte, descripcion y boton de escucha. Esto es exactamente lo contrario de lo que tiene PolitiKAS donde el reproductor esta escondido al fondo.
- El carrusel de shows con navegacion por flechas. Util si PolitiKAS crece a mas de un programa de podcast.
- Las tarjetas de episodios recientes: arte, titulo, fecha, duracion, nombre del show, play. Todo visible de un vistazo.
- La conexion con el ecosistema mayor a traves del footer y la navegacion principal.

**Que NO copiar:**
Al Jazeera es un medio de noticias masivo. El volumen de contenido y la complejidad de la navegacion global no aplican. Copiar la estructura del hub de podcasts y la forma de presentar episodios.

---

### REFERENCIA 4: Carnegie Endowment for International Peace
**URL:** https://carnegieendowment.org/podcasts
**Dolores que resuelve:** D1, D4, D5

**Por que esta referencia es relevante:**
Carnegie tiene un hub de podcasts limpio y profesional que presenta 9 series de podcasts con un diseno basado en tarjetas. Cada tarjeta muestra titulo, nombre del host, descripcion de 2-3 oraciones y links a plataformas (Apple Podcasts, Spotify, YouTube). El diseno es generoso en espacio en blanco, con tipografia clara y elementos decorativos SVG sutiles.

**Que debe observar el equipo de diseno:**
- La simplicidad de las tarjetas de podcast: imagen tematica, titulo, host, descripcion corta, plataformas. Nada mas. Facil de entender para cualquier usuario.
- La distribucion multiplataforma visible en cada show (Apple, Spotify, YouTube). PolitiKAS ya esta en Spotify, esto debe ser prominente.
- El diseno limpio con mucho espacio en blanco. Se siente institucional sin ser aburrido.
- La integracion con la navegacion del sitio principal (Research, Events, Blogs, Podcasts).

**Que NO copiar:**
Los llamados a donacion dentro de cada show. No aplica para KAS.

---

### REFERENCIA 5: Brookings Institution
**URL:** https://www.brookings.edu/podcasts/
**Dolores que resuelve:** D1, D3, D4

**Por que esta referencia es relevante:**
Brookings maneja 18 programas de podcast con un sistema inteligente de organizacion. Cada podcast esta presentado como una tarjeta con portada, titulo, descripcion, conteo de episodios y badges de estado ("New Episodes" para los activos, rangos de fechas para los archivados). Lo mas relevante para PolitiKAS es como Brookings diferencia entre programas activos y archivados, lo cual seria util para manejar temporadas pasadas vs. la temporada actual.

**Que debe observar el equipo de diseno:**
- Los badges de estado: "New Episodes" vs. fechas de archivo (ej: "2023-24"). Esto resuelve el problema de PolitiKAS de mantener contenido anterior mientras se agrega contenido nuevo de la tercera temporada.
- La navegacion cruzada: desde podcasts se puede ir a "Experts", "Events", "Research Programs". Cada podcast esta vinculado a un programa de investigacion.
- El breadcrumb que siempre permite volver.
- La integracion con Algolia para busqueda inteligente.
- Links a multiples plataformas (Apple, Spotify, YouTube, Pod.link).

**Que NO copiar:**
La cantidad de programas. PolitiKAS probablemente tendra 1-2 programas activos. La estructura debe funcionar para pocos programas sin verse vacia.

---

### REFERENCIA 6: Center for American Progress (CAP)
**URL:** https://www.americanprogress.org
**Dolores que resuelve:** D1, D3, D5

**Por que esta referencia es relevante:**
CAP es un think tank que organiza su contenido por prioridades tematicas (Economy, Democracy, Racial Equity, Climate, Health) y por temas especificos. Lo mas relevante es como cada hub tematico agrupa articulos, reportes, fact sheets y opiniones bajo un mismo tema. Las tarjetas de contenido son consistentes: imagen, titulo, fecha, autor, tipo de contenido (Report/Article). La navegacion por temas en el menu principal tiene dos niveles: "Priorities" (temas amplios) y "Topics" (temas especificos).

**Que debe observar el equipo de diseno:**
- La organizacion del menu en "Priorities" y "Topics". Para PolitiKAS esto podria traducirse en las categorias principales (Representacion y Participacion, Innovacion, Seguridad) como prioridades y subtemas dentro de cada una.
- Las tarjetas de contenido con tipo de contenido visible (Report, Article). Para PolitiKAS seria: Podcast, Video, Articulo.
- La tipografia seria y la paleta restringida. Nada de colores brillantes o elementos decorativos innecesarios.
- Los perfiles de expertos como eje de descubrimiento de contenido.

**Que NO copiar:**
La seccion de "Take Action" y las llamadas a accion politicas directas. KAS no opera de esa forma.

---

### REFERENCIA 7: Dialogo Politico (referencia del cliente)
**URL:** https://dialogopolitico.org
**Dolores que resuelve:** D1, D3, D6

**Por que esta referencia es relevante:**
Esta es la referencia que Marcee menciono espontaneamente durante la reunion. Es la plataforma hermana de KAS Uruguay. Maneja articulos, podcasts ("Bajo la Lupa", "En Campana"), documentos y ediciones especiales. El sitio tiene soporte multiidioma (espanol, ingles, aleman, portugues), seccion de tendencias, newsletter, apps moviles y distribucion de podcasts en Spotify, Apple Podcasts e iVoox.

**Que debe observar el equipo de diseno:**
- Esta es la aspiracion del cliente. Lo que Marcee quiere es algo como esto pero mejor.
- La organizacion de articulos: tarjetas con fecha, autor, categoria, imagen, extracto. Paginas paginadas (58 paginas de articulos).
- Los podcasts usan Simplecast como reproductor embebido.
- La seccion "Tendencias" con los 5 articulos mas relevantes.
- El soporte multiidioma (puede ser relevante si KAS Costa Rica quiere contenido en aleman o ingles tambien).

**Que SI debemos superar:**
- La navegacion entre contenido relacionado. Dialogo Politico separa articulos, documentos y podcasts en el menu. Nosotros debemos vincularlos tematicamente.
- El reproductor de podcast esta en paginas individuales sin contenido relacionado visible.
- El diseno general es funcional pero no destaca visualmente. Nuestra demo debe verse notablemente mejor.
- La experiencia de descubrimiento de contenido es basica (solo paginacion cronologica, sin filtros robustos).

---

### REFERENCIA 8: Joseph Rowntree Foundation (accesibilidad)
**URL:** https://www.jrf.org.uk
**Dolores que resuelve:** D4, D6

**Por que esta referencia es relevante:**
Fue reconocida como "the most accessible charity website in the UK" por el indice SilkTide. A pesar de manejar grandes volumenes de investigacion, su navegacion tiene solo tres elementos principales. Su diseno es deliberadamente simple, con una paleta de colores suaves y una arquitectura basada en topicos alineados con los intereses de los usuarios (no con la estructura interna de la organizacion).

**Que debe observar el equipo de diseno:**
- La simplicidad extrema de la navegacion como principio de accesibilidad.
- Como organizan la investigacion por temas relevantes para el usuario, no por departamento interno.
- El diseno de las paginas hub que dan contexto antes de listar contenido.
- La accesibilidad no es un widget o un overlay. Esta construida en el diseno y el codigo desde cero.

**Nota importante sobre accesibilidad:**
En abril de 2025, la FTC multo con USD 1 millon a un proveedor importante de widgets de accesibilidad (overlays) por afirmaciones enganosas sobre cumplimiento de WCAG. Desde 2024, mas de 1,000 demandas en Estados Unidos han apuntado a organizaciones que dependieron de estos widgets. La accesibilidad real se construye en el codigo, no se pega encima. Esto es una ventaja competitiva directa de nuestro enfoque de desarrollo a medida frente a WordPress + plugins de accesibilidad.

---

## Resumen: mapeo de referencias por dolor

| Dolor | Referencia principal | Referencia complementaria |
|-------|---------------------|--------------------------|
| D1 - Contenido fragmentado | CFR, Chatham House | Al Jazeera, Carnegie |
| D2 - Contenido escondido | Al Jazeera | Dialogo Politico (como anti-referencia) |
| D3 - Sin arquitectura tematica | CFR, CAP | Chatham House, Brookings |
| D4 - Dependencia operativa | JRF, Brookings | Carnegie |
| D5 - Necesitan ver para decidir | Todas las referencias sirven la demo | CFR y Chatham House como estandar visual |
| D6 - Accesibilidad | JRF | Al Jazeera |

---

## Recomendacion para la demo

La demo debe construirse combinando estos principios de las referencias:

1. Navegacion principal basada en temas (como CFR y CAP), no en formatos.
2. Dentro de cada tema, mostrar podcasts, articulos y videos juntos (como Chatham House).
3. Hub de podcast con episodio destacado arriba, no abajo (como Al Jazeera). Reproductor visible inmediatamente.
4. Tarjetas de contenido consistentes con tipo de formato visible: Podcast, Video, Articulo (como CAP).
5. Badges de temporada o estado: "Nueva Temporada", "Temporada 2", etc. (como Brookings).
6. Contenido relacionado en cada pagina individual: si estoy viendo un podcast sobre democracia, mostrarme el articulo y el video sobre el mismo tema.
7. Diseno corporativo, limpio, institucional. Tipografia clara, paleta restringida, mucho espacio en blanco. Mejor que Dialogo Politico visualmente, al nivel de CFR o Chatham House.
8. Debe superar visualmente a Dialogo Politico porque esa es la referencia mental del cliente. Si nuestra demo se ve igual o peor que eso, no ganamos nada.

---

## Nota sobre la competencia

El 85% de los competidores en el mercado ofrecen soluciones en WordPress/Elementor/Wix. El otro 13% usa plataformas automatizadas algo mas robustas. Solo hay un competidor que hace desarrollo a medida pero con diseno debil. Hay otro con buen portafolio pero sigue usando plantillas y cobra caro.

La demo es nuestra principal herramienta de diferenciacion. Cuando Michaela Braun compare nuestra demo navegable con un PDF de precios de un proveedor de WordPress, la diferencia debe ser obvia sin necesidad de explicarla.
