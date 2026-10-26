import additionalArticles from '@/content/additional-articles.json';

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  image: string;
  imageAlt: string;
  readingTime: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  content: string[];
  sources?: { title: string; url: string }[];
};

export const articles: Article[] = [
  ...additionalArticles,
  {
    slug: "productividad-trabajando-desde-casa",
    title: "Cómo mejorar tu productividad trabajando desde casa",
    description:
      "Estrategias prácticas y fáciles de aplicar para organizar tu jornada, evitar distracciones y rendir más en el teletrabajo.",
    category: "Productividad",
    image: "/images/articulo-productividad.svg",
    imageAlt: "Escritorio ordenado con ordenador portátil para trabajar desde casa",
    readingTime: "6 min de lectura",
    publishedAt: "2024-02-12",
    updatedAt: "2024-05-03",
    author: "Equipo Claridad Digital",
    content: [
      "El trabajo remoto llegó para quedarse y, con él, nuevos retos relacionados con la gestión del tiempo y la concentración. No contar con una oficina física no significa que debamos improvisar: una rutina bien diseñada marca la diferencia entre una jornada productiva y una llena de distracciones.",
      "Lo primero es delimitar un espacio físico dedicado exclusivamente al trabajo. No hace falta una habitación entera; basta con una esquina tranquila, buena iluminación y una silla cómoda. Nuestro cerebro asocia lugares con actividades, así que reservar ese rincón solo para tareas laborales ayuda a entrar en modo productivo con mayor rapidez.",
      "En segundo lugar, define bloques de tiempo claros. Técnicas como Pomodoro (25 minutos de trabajo enfocado seguidos de 5 de descanso) funcionan especialmente bien en entornos con múltiples interrupciones domésticas. Marcar el inicio y el final de cada bloque con una alarma reduce la tentación de revisar el móvil constantemente.",
      "No subestimes el poder de una lista de tareas priorizada. Cada mañana, anota un máximo de tres objetivos importantes del día. Es preferible completar tres tareas relevantes que empezar diez y no terminar ninguna. Herramientas sencillas como una libreta o una app de notas son suficientes; no necesitas software complejo para ser ordenado.",
      "Por último, cuida las transiciones entre el trabajo y el descanso. Al teletrabajar, los límites se difuminan fácilmente. Establece un horario de cierre, apaga las notificaciones laborales fuera de ese rango y dedica unos minutos a una actividad que marque el final de la jornada, como salir a caminar o preparar la cena. Ese ritual ayuda a tu mente a desconectar y descansar mejor para el día siguiente.",
    ],
  },
  {
    slug: "guia-para-ahorrar-dinero-cada-mes",
    title: "Guía completa para ahorrar dinero cada mes sin sacrificar tu estilo de vida",
    description:
      "Consejos realistas de finanzas personales para reducir gastos innecesarios, crear un fondo de emergencia y ahorrar sin privaciones extremas.",
    category: "Finanzas",
    image: "/images/articulo-finanzas.svg",
    imageAlt: "Persona organizando monedas y calculando su presupuesto mensual",
    readingTime: "7 min de lectura",
    publishedAt: "2024-01-20",
    updatedAt: "2024-04-18",
    author: "Equipo Claridad Digital",
    content: [
      "Ahorrar no tiene por qué significar renunciar a todo lo que disfrutas. La clave está en conocer bien tus números y tomar decisiones conscientes sobre en qué gastar y en qué no. El primer paso siempre es el mismo: registra durante un mes completo todos tus ingresos y gastos, por pequeños que parezcan.",
      "Con esa información, aplica la regla 50/30/20 como punto de partida: el 50% de tus ingresos para necesidades básicas (vivienda, alimentación, suministros), el 30% para gastos personales y ocio, y el 20% para ahorro e inversión. No es una fórmula rígida, pero sí un marco útil para detectar desequilibrios.",
      "Revisa tus suscripciones y pagos recurrentes. Es habitual acumular servicios de streaming, aplicaciones o membresías que apenas se usan. Cancelar dos o tres de ellas puede liberar una cantidad sorprendente de dinero cada mes sin que notes ningún cambio real en tu día a día.",
      "Automatiza tu ahorro. En lugar de ahorrar lo que sobra a fin de mes, programa una transferencia automática a una cuenta separada justo cuando recibes tu nómina. Tratar el ahorro como una 'factura más' que debes pagarte a ti mismo es una de las estrategias más efectivas y respaldadas por expertos en finanzas personales.",
      "Finalmente, prioriza crear un fondo de emergencia equivalente a entre tres y seis meses de gastos básicos antes de pensar en inversiones más complejas. Ese colchón te dará tranquilidad ante imprevistos y evitará que tengas que recurrir a deudas con intereses elevados cuando surja un gasto inesperado.",
    ],
  },
  {
    slug: "habitos-para-una-vida-mas-saludable",
    title: "Los mejores hábitos para una vida más saludable",
    description:
      "Pequeños cambios diarios, respaldados por la ciencia, que puedes incorporar poco a poco para mejorar tu energía, tu descanso y tu bienestar general.",
    category: "Salud y bienestar",
    image: "/images/articulo-salud.svg",
    imageAlt: "Persona preparando una ensalada saludable en la cocina",
    readingTime: "5 min de lectura",
    publishedAt: "2024-03-05",
    updatedAt: "2024-03-05",
    author: "Equipo Claridad Digital",
    content: [
      "Llevar una vida saludable no requiere cambios radicales de la noche a la mañana. De hecho, los hábitos que perduran en el tiempo suelen ser los que se construyen de forma gradual, con pasos pequeños y sostenibles.",
      "Empieza por el sueño: dormir entre siete y nueve horas de forma regular mejora el estado de ánimo, la concentración y el sistema inmunológico. Mantener horarios fijos para acostarte y levantarte, incluso los fines de semana, es más efectivo que intentar compensar con siestas largas.",
      "La hidratación también suele pasarse por alto. Beber suficiente agua a lo largo del día mejora el rendimiento físico y mental. Un truco sencillo es tener siempre una botella reutilizable a la vista como recordatorio visual.",
      "En cuanto a la alimentación, no se trata de prohibiciones estrictas, sino de aumentar la proporción de alimentos frescos: verduras, frutas, legumbres y proteínas de calidad. Cocinar en casa con más frecuencia, aunque sean recetas sencillas, te da control total sobre lo que comes.",
      "Por último, incorpora movimiento diario, no necesariamente en el gimnasio. Caminar treinta minutos, subir escaleras o estirar unos minutos al despertar ya genera beneficios medibles. La constancia importa más que la intensidad cuando se trata de construir hábitos duraderos.",
    ],
  },
  {
    slug: "tendencias-tecnologicas-que-debes-conocer",
    title: "Tendencias tecnológicas que debes conocer este año",
    description:
      "Un repaso claro y sin tecnicismos de las tendencias en inteligencia artificial, ciberseguridad y dispositivos que están marcando la agenda tecnológica.",
    category: "Tecnología",
    image: "/images/articulo-tecnologia.svg",
    imageAlt: "Dispositivos electrónicos modernos sobre una mesa de trabajo",
    readingTime: "6 min de lectura",
    publishedAt: "2024-04-02",
    updatedAt: "2024-05-20",
    author: "Equipo Claridad Digital",
    content: [
      "La tecnología avanza a un ritmo que puede resultar abrumador. Sin embargo, no hace falta ser un experto para entender hacia dónde se dirigen las tendencias que más van a afectar nuestra vida cotidiana en los próximos meses.",
      "La inteligencia artificial generativa sigue siendo protagonista. Ya no se limita a generar texto o imágenes: cada vez más herramientas la integran para automatizar tareas repetitivas, resumir información y asistir en la toma de decisiones, tanto en el trabajo como en el día a día personal.",
      "La ciberseguridad gana protagonismo a medida que aumentan los ataques dirigidos a usuarios comunes, no solo a grandes empresas. Prácticas básicas como usar contraseñas únicas, activar la verificación en dos pasos y mantener el software actualizado siguen siendo la primera línea de defensa más efectiva.",
      "En el terreno de los dispositivos, los wearables de salud continúan evolucionando, ofreciendo métricas cada vez más precisas sobre sueño, actividad física y variables fisiológicas antes reservadas a entornos clínicos. Esto permite a cualquier persona tomar decisiones más informadas sobre su bienestar.",
      "Por último, la sostenibilidad empieza a influir también en el diseño tecnológico: baterías más duraderas, dispositivos reparables y materiales reciclados ganan peso en las decisiones de compra de un público cada vez más consciente del impacto ambiental de la tecnología que utiliza.",
    ],
  },
];

export function getAllArticles(): Article[] {
  return [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getRelatedArticles(slug: string, limit = 3): Article[] {
  const current = getArticleBySlug(slug);
  return articles.filter((article) => article.slug !== slug)
    .sort((a, b) => Number(b.category === current?.category) - Number(a.category === current?.category))
    .slice(0, limit);
}
