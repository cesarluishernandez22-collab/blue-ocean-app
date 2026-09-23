import { 
  AirtableContactoRecord, 
  AirtableInventarioPropiedadesRecord, 
  BlueOceanHotel 
} from '../types/airtable';

/**
 * DATOS DEMOSTRATIVOS DE LA TABLA "Contacto"
 * Base de Airtable: "Hoteles"
 * Campos exactos: Nombre del Hotel, Correo, Teléfono, Dirección, Contacto, Web, Redes Sociales, Fecha, Próximo seguimiento
 */
export const DEMO_AIRTABLE_CONTACTO: AirtableContactoRecord[] = [
  {
    id: 'recCt01Insurgentes',
    fields: {
      'Nombre del Hotel': 'Blue Ocean Hotel & Suites - Insurgentes',
      'Correo': 'gerencia.insurgentes@oceanrevenue-management.com',
      'Teléfono': '+52 55 5584 9201',
      'Dirección': 'Av. Insurgentes Sur 724, Col. del Valle, Benito Juárez, 03100 CDMX',
      'Contacto': 'Ing. Roberto Morales',
      'Web': 'https://oceanrevenue-management.com/propiedades/insurgentes',
      'Redes Sociales': 'https://instagram.com/blueocean_insurgentes',
      'Fecha': '2026-02-15',
      'Próximo seguimiento': '2026-03-20'
    }
  },
  {
    id: 'recCt02Periferico',
    fields: {
      'Nombre del Hotel': 'Blue Ocean Grand Suites - Periférico Sur',
      'Correo': 'operaciones.perisur@oceanrevenue-management.com',
      'Teléfono': '+52 55 5606 3318',
      'Dirección': 'Anillo Periférico Sur 4120, Jardines del Pedregal, Álvaro Obregón, 01900 CDMX',
      'Contacto': 'Lic. Daniela Valenzuela',
      'Web': 'https://oceanrevenue-management.com/propiedades/perisur',
      'Redes Sociales': 'https://instagram.com/blueocean_grandsur',
      'Fecha': '2026-02-18',
      'Próximo seguimiento': '2026-03-22'
    }
  },
  {
    id: 'recCt03Polanco',
    fields: {
      'Nombre del Hotel': 'Blue Ocean Boutique & Suites - Polanco',
      'Correo': 'reservas.polanco@oceanrevenue-management.com',
      'Teléfono': '+52 55 5280 4490',
      'Dirección': 'Calle Leibnitz 95, Anzures / Polanco, Miguel Hidalgo, 11590 CDMX',
      'Contacto': 'Mtro. Fernando Carrillo',
      'Web': 'https://oceanrevenue-management.com/propiedades/polanco',
      'Redes Sociales': 'https://instagram.com/blueocean_polanco',
      'Fecha': '2026-02-20',
      'Próximo seguimiento': '2026-03-25'
    }
  },
  {
    id: 'recCt04Tlalpan',
    fields: {
      'Nombre del Hotel': 'Blue Ocean Motel & Villas - Tlalpan',
      'Correo': 'administracion.tlalpan@oceanrevenue-management.com',
      'Teléfono': '+52 55 5678 1234',
      'Dirección': 'Calz. de Tlalpan 2840, Santa Úrsula Coapa, Coyoacán, 04650 CDMX',
      'Contacto': 'Lic. Gabriel Orozco',
      'Web': 'https://oceanrevenue-management.com/propiedades/tlalpan',
      'Redes Sociales': 'https://instagram.com/blueocean_villas',
      'Fecha': '2026-02-22',
      'Próximo seguimiento': '2026-03-28'
    }
  },
  {
    id: 'recCt05Viaducto',
    fields: {
      'Nombre del Hotel': 'Blue Ocean Real Motel & Suites - Viaducto',
      'Correo': 'gerencia.viaducto@oceanrevenue-management.com',
      'Teléfono': '+52 55 5530 8821',
      'Dirección': 'Viaducto Miguel Alemán 315, Roma Sur, Cuauhtémoc, 06760 CDMX',
      'Contacto': 'Sra. Patricia Echeverría',
      'Web': 'https://oceanrevenue-management.com/propiedades/viaducto',
      'Redes Sociales': 'https://instagram.com/blueocean_real',
      'Fecha': '2026-02-25',
      'Próximo seguimiento': '2026-04-02'
    }
  },
  {
    id: 'recCt06SantaFe',
    fields: {
      'Nombre del Hotel': 'Blue Ocean Executive Tower - Santa Fe',
      'Correo': 'corporativo.santafe@oceanrevenue-management.com',
      'Teléfono': '+52 55 5081 7744',
      'Dirección': 'Av. Vasco de Quiroga 3800, Santa Fe, Cuajimalpa, 05348 CDMX',
      'Contacto': 'Lic. Armando Lozano',
      'Web': 'https://oceanrevenue-management.com/propiedades/santafe',
      'Redes Sociales': 'https://instagram.com/blueocean_santafe',
      'Fecha': '2026-03-01',
      'Próximo seguimiento': '2026-04-05'
    }
  }
];

/**
 * DATOS DEMOSTRATIVOS DE LA TABLA "Inventario de propiedades"
 * Base de Airtable: "Hoteles"
 * Campos exactos: Nombre, Correo, Teléfono, Dirección, Render Fachada, Render Habitaciones, Descripción del hotel, Nombre del contacto
 */
export const DEMO_AIRTABLE_INVENTARIO: AirtableInventarioPropiedadesRecord[] = [
  {
    id: 'recInv01CentralAbastos',
    fields: {
      'Nombre': 'Blue Ocean Suites & Villas - Central de Abastos Ecatepec',
      'Correo': 'centralabastos@oceanrevenue-management.com',
      'Teléfono': '+52 55 5837 9200',
      'Dirección': 'Carretera Texcoco-Lechería Km 21.5 (A 10 min caminando de Central de Abastos), Santa Cruz Venta de Carpio, 55060 Ecatepec de Morelos, Méx.',
      'Render Fachada': [
        '/renders/Polish_20260822_225309771.jpg'
      ],
      'Render Habitaciones': [
        '/renders/image~10.jpg',
        '/renders/image~11.jpg',
        '/renders/image~12.jpg',
        '/renders/image~13.jpg'
      ],
      'Descripción del hotel': 'Propiedad insignia en el nodo logístico e industrial más transitado de Ecatepec. Diseñada con doble canal operativo: suites de romance con máxima discreción para parejas y refugio seguro para operadores de transporte de la Central de Abastos con cochera privada techada y facturación CFDI deducible de viáticos.',
      'Nombre del contacto': 'Ing. Roberto Morales - Operaciones Ecatepec'
    }
  },
  {
    id: 'recInv02ViaMorelos',
    fields: {
      'Nombre': 'Blue Ocean Motel & Villas - Vía Morelos Industrial',
      'Correo': 'viamorelos@oceanrevenue-management.com',
      'Teléfono': '+52 55 5698 3310',
      'Dirección': 'Av. Vía Morelos 340, Zona Industrial Santa Clara Coatitla, 55540 Ecatepec de Morelos, Méx.',
      'Render Fachada': [
        '/renders/Polish_20260822_230710090.jpg'
      ],
      'Render Habitaciones': [
        '/renders/image~15.jpg',
        '/renders/image~16.jpg',
        '/renders/image~17.jpg',
        '/renders/image~18.jpg'
      ],
      'Descripción del hotel': 'Ubicado en la columna vertebral industrial de Ecatepec. Cuenta con portones automatizados herméticos, villas con tina de hidromasaje y convenio empresarial para descanso antifatiga en horas muertas diurnas.',
      'Nombre del contacto': 'Lic. Daniela Valenzuela'
    }
  },
  {
    id: 'recInv03MexicoPachuca',
    fields: {
      'Nombre': 'Blue Ocean Express - Autopista México-Pachuca (Venta de Carpio)',
      'Correo': 'mexicopachuca@oceanrevenue-management.com',
      'Teléfono': '+52 55 5770 4490',
      'Dirección': 'Autopista México-Pachuca Km 26.8, Venta de Carpio / Conexión Circuito Exterior Mexiquense, 55060 Ecatepec de Morelos, Méx.',
      'Render Fachada': [
        '/renders/Polish_20260822_230305219.jpg'
      ],
      'Render Habitaciones': [
        '/renders/image~20.jpg',
        '/renders/image~21.jpg',
        '/renders/image~22.jpg',
        '/renders/image~19.jpg'
      ],
      'Descripción del hotel': 'Acceso vehicular inmediato a pie de autopista. Resuelve el grave problema del transportista que arriesga su vida durmiendo en el acotamiento: ofrece estancia express facturable, regadera caliente y salvaguarda de unidad con portón cerrado.',
      'Nombre del contacto': 'Mtro. Fernando Carrillo'
    }
  },
  {
    id: 'recInv04LecheriaTexcoco',
    fields: {
      'Nombre': 'Blue Ocean Real Suites - Lechería - Texcoco / San Cristóbal',
      'Correo': 'sancristobal@oceanrevenue-management.com',
      'Teléfono': '+52 55 5836 1234',
      'Dirección': 'Av. Revolución (30-30) 180 esq. Carretera Lechería, San Cristóbal Centro, 55000 Ecatepec de Morelos, Méx.',
      'Render Fachada': [
        '/renders/IMG-20260530-WA0001.jpg'
      ],
      'Render Habitaciones': [
        '/renders/image~25.jpg',
        '/renders/image~26.jpg',
        '/renders/image~27.jpg',
        '/renders/image~28.jpg'
      ],
      'Descripción del hotel': 'Conexión estratégica en el corazón de San Cristóbal Ecatepec. Villas modernas equipadas para parejas con cama King suspendida, tubo, vapor y suites de descanso rápido para personal logístico en ruta.',
      'Nombre del contacto': 'Lic. Gabriel Orozco'
    }
  },
  {
    id: 'recInv05AvCentral',
    fields: {
      'Nombre': 'Blue Ocean Motor Hotel - Av. Central / R-1 Ecatepec',
      'Correo': 'avcentral@oceanrevenue-management.com',
      'Teléfono': '+52 55 5775 8820',
      'Dirección': 'Av. Carlos Hank González (Av. Central) 780, Fracc. Valle de Anáhuac, 55119 Ecatepec de Morelos, Méx.',
      'Render Fachada': [
        '/renders/IMG-20260822-WA0018.jpg'
      ],
      'Render Habitaciones': [
        '/renders/image~30.jpg',
        '/renders/image~33.jpg',
        '/renders/image~34.jpg',
        '/renders/image~29.jpg'
      ],
      'Descripción del hotel': 'Fachada contemporánea iluminada sobre Avenida Central. Habitaciones temáticas con luces LED regulables, servicio a la habitación 24 horas y estacionamiento seguro para camionetas de reparto y choferes de última milla.',
      'Nombre del contacto': 'Sra. Patricia Echeverría'
    }
  },
  {
    id: 'recInv06IndiosVerdes',
    fields: {
      'Nombre': 'Blue Ocean Grand Hub - Indios Verdes / Entrada Ecatepec',
      'Correo': 'indiosverdes@oceanrevenue-management.com',
      'Teléfono': '+52 55 5081 7740',
      'Dirección': 'Carretera Federal México-Pachuca 14, Puerta Norte Indios Verdes - Conexión Ecatepec, 07300 CDMX / Edomex',
      'Render Fachada': [
        '/renders/image~2.jpg'
      ],
      'Render Habitaciones': [
        '/renders/image~3.jpg',
        '/renders/image~4.jpg',
        '/renders/image~7.jpg',
        '/renders/image~8.jpg',
        '/renders/image~9.jpg'
      ],
      'Descripción del hotel': 'Punto neurálgico en el acceso norte del Valle de México. Excelente opción para que choferes foráneos esperen su ventana de descarga nocturna descansando en una habitación climatizada y facturable, y punto de encuentro discreto para parejas.',
      'Nombre del contacto': 'Lic. Armando Lozano'
    }
  }
];

/**
 * Función que transforma y unifica los registros de Airtable de ambas tablas
 * ("Inventario de propiedades" + "Contacto") en el modelo para el sitio web de reservas.
 */
export function buildUnifiedHotelsList(
  inventarioRecords: AirtableInventarioPropiedadesRecord[],
  contactoRecords: AirtableContactoRecord[]
): BlueOceanHotel[] {
  // Configuración de tarifas base, zonas y descripciones duales para Ecatepec y Corredor Industrial
  const hotelMetadataConfig: Record<string, {
    ciudad: string;
    zona: string;
    estrellas: number;
    puntuacion: number;
    totalResenas: number;
    tipoPropiedad: 'Hotel' | 'Motel & Villas' | 'Boutique Suites';
    tarifas: {
      estancia4Horas: number;
      estancia6Horas: number;
      estancia12Horas: number;
      nocheCompleta: number;
    };
    servicios: string[];
    descripcionParejas: string;
    descripcionTransportistas: string;
    beneficiosTransportistas: string[];
  }> = {
    'Blue Ocean Suites & Villas - Central de Abastos Ecatepec': {
      ciudad: 'Ecatepec, Edo. Méx.',
      zona: 'Central de Abastos / Texcoco-Lechería',
      estrellas: 5,
      puntuacion: 4.9,
      totalResenas: 248,
      tipoPropiedad: 'Motel & Villas',
      tarifas: {
        estancia4Horas: 450,
        estancia6Horas: 600,
        estancia12Horas: 880,
        nocheCompleta: 1250
      },
      servicios: ['Cochera con Portón Eléctrico', 'Facturación CFDI SAT', 'Agua Caliente 24h', 'Jacuzzi Hidromasaje', 'WiFi Alta Velocidad', 'Room Service'],
      descripcionParejas: 'El refugio íntimo más exclusivo a minutos de la Central de Abastos. Discreción absoluta desde el acceso vehicular automatizado, villas independientes con tina de hidromasaje, cama King suspendida, iluminación ambiental tenue y room service las 24 horas.',
      descripcionTransportistas: 'A solo 10 minutos a pie de la Central de Abastos de Ecatepec. Olvídate de arriesgar tu vida y la carga durmiendo en la cabina o el acotamiento. Te ofrecemos descanso digno y seguro: cochera individual techada con portón cerrado para tu unidad, regadera caliente a presión, cama ortopédica y 100% Factura Electrónica CFDI para deducción de tus viáticos empresariales.',
      beneficiosTransportistas: [
        'A 10 min de los patios de descarga de Central de Abastos',
        'Cochera individual con portón eléctrico (máxima protección de unidad y carga)',
        '100% Facturable ante el SAT para comprobación de viáticos',
        'Regadera con agua caliente las 24 hrs y presión abundante',
        'Cama ortopédica para descanso antifatiga reparador',
        'Tarifas por estancia corta (4h, 6h o pernocta) adaptadas a tu turno'
      ]
    },
    'Blue Ocean Motel & Villas - Vía Morelos Industrial': {
      ciudad: 'Ecatepec, Edo. Méx.',
      zona: 'Vía Morelos / Santa Clara Industrial',
      estrellas: 4,
      puntuacion: 4.8,
      totalResenas: 192,
      tipoPropiedad: 'Motel & Villas',
      tarifas: {
        estancia4Horas: 420,
        estancia6Horas: 560,
        estancia12Horas: 820,
        nocheCompleta: 1150
      },
      servicios: ['Portón Hermético', 'Factura Electrónica Inmediata', 'Ducha Presurizada', 'TV Smart 65"', 'Climatización', 'Servicio Express'],
      descripcionParejas: 'Diseño vanguardista con máxima privacidad sobre el corredor Vía Morelos. Suites climatizadas con espejos panorámicos, sonido bluetooth envolvente y menú de coctelería a la habitación.',
      descripcionTransportistas: 'Ubicación clave sobre Vía Morelos para operadores de transporte de carga y reparto industrial. Aprovecha las horas muertas del día para bañarte y descansar seguro mientras esperas turno de carga o liberas el tráfico del Valle de México. Deducible de impuestos al 100%.',
      beneficiosTransportistas: [
        'Ubicación directa sobre el corredor industrial Vía Morelos',
        'Factura oficial inmediata CFDI para tus viáticos',
        'Portón hermético cerrado que resguarda tu herramienta y unidad',
        'Check-in express sin filas ni trámites tardados',
        'Descanso seguro que previene accidentes por microsueño en carretera'
      ]
    },
    'Blue Ocean Express - Autopista México-Pachuca (Venta de Carpio)': {
      ciudad: 'Ecatepec, Edo. Méx.',
      zona: 'Autopista México-Pachuca / Venta de Carpio',
      estrellas: 4,
      puntuacion: 4.7,
      totalResenas: 215,
      tipoPropiedad: 'Hotel',
      tarifas: {
        estancia4Horas: 390,
        estancia6Horas: 520,
        estancia12Horas: 780,
        nocheCompleta: 1050
      },
      servicios: ['Acceso Directo Autopista', 'Cochera Techada', 'Facturación SAT', 'Vigilancia CCTV 24h', 'WiFi Fibra Óptica', 'Café de Cortesía'],
      descripcionParejas: 'Acceso directo y discreto sobre la autopista México-Pachuca. Habitaciones temáticas confortables con iluminación decorativa, baño amplio y absoluto anonimato.',
      descripcionTransportistas: 'Parada obligada sobre la México-Pachuca para choferes de trailers, tortons y camionetas de carga. La delincuencia carretera acecha a los choferes estacionados en acotamientos: aquí tu unidad entra a cochera resguardada y tú duermes en cama de hotel con baño limpio por menos de lo que cuesta tu viático.',
      beneficiosTransportistas: [
        'Acceso y salida directa sobre la autopista México-Pachuca',
        'Elimina el peligro de asaltos y robo de mercancía en el acotamiento',
        'Emisión de factura deducible para la empresa transportista',
        'Tarifas económicas desde 4 horas para dormir y asearse',
        'Café caliente y alimentos ligeros disponibles 24 hrs'
      ]
    },
    'Blue Ocean Real Suites - Lechería - Texcoco / San Cristóbal': {
      ciudad: 'Ecatepec, Edo. Méx.',
      zona: 'San Cristóbal Centro / Av. 30-30',
      estrellas: 4,
      puntuacion: 4.8,
      totalResenas: 168,
      tipoPropiedad: 'Boutique Suites',
      tarifas: {
        estancia4Horas: 460,
        estancia6Horas: 620,
        estancia12Horas: 900,
        nocheCompleta: 1280
      },
      servicios: ['Jacuzzi Circular', 'Cochera Automatizada', 'Facturación CFDI', 'Cama King Size', 'Audio Bluetooth', 'Discreción 100%'],
      descripcionParejas: 'Suites de lujo y confort romántico en San Cristóbal Ecatepec. Tina de hidromasaje profunda, cama suspendida con luces perimetrales y acabados modernos para momentos inolvidables.',
      descripcionTransportistas: 'Cruce estratégico entre la Vía Morelos y la Vía José López Portillo / Lechería. Excelente para personal de logística, supervisores de ruta y choferes que requieren descansar unas horas antes de reanudar trayecto.',
      beneficiosTransportistas: [
        'Céntrico en el nodo Lechería - Texcoco - San Cristóbal',
        'Facturación electrónica 100% deducible',
        'Ducha caliente revitalizante y silencio garantizado para dormir',
        'Conexión WiFi de alta velocidad para reportar estatus de viaje'
      ]
    },
    'Blue Ocean Motor Hotel - Av. Central / R-1 Ecatepec': {
      ciudad: 'Ecatepec, Edo. Méx.',
      zona: 'Av. Central / Valle de Anáhuac',
      estrellas: 4,
      puntuacion: 4.7,
      totalResenas: 177,
      tipoPropiedad: 'Motel & Villas',
      tarifas: {
        estancia4Horas: 430,
        estancia6Horas: 580,
        estancia12Horas: 850,
        nocheCompleta: 1200
      },
      servicios: ['Entrada Discreta', 'Portón Automatizado', 'Factura Electrónica', 'Streaming 4K', 'Regadera de Lujo', 'Snacks 24h'],
      descripcionParejas: 'Villas privadas sobre Avenida Central (R-1) con diseño vanguardista, iluminación LED seleccionable, tubo y mobiliario ergonómico para disfrutar en pareja.',
      descripcionTransportistas: 'Corredor de distribución comercial hacia Neza, Ecatepec y Aragón. Ideal para unidades de reparto y choferes con jornada partida que buscan descansar de 8:00 AM a 4:00 PM con seguridad y viáticos facturados.',
      beneficiosTransportistas: [
        'Ubicación estratégica sobre Avenida Central (Av. Carlos Hank González)',
        'Descanso en horas diurnas de baja tarifa',
        'Factura oficial para comprobación ante administración',
        'Resguardo de vehículo con portón automatizado'
      ]
    },
    'Blue Ocean Grand Hub - Indios Verdes / Entrada Ecatepec': {
      ciudad: 'CDMX / Edomex',
      zona: 'Indios Verdes / Acceso Norte Ecatepec',
      estrellas: 5,
      puntuacion: 4.9,
      totalResenas: 310,
      tipoPropiedad: 'Boutique Suites',
      tarifas: {
        estancia4Horas: 520,
        estancia6Horas: 700,
        estancia12Horas: 990,
        nocheCompleta: 1400
      },
      servicios: ['Aislamiento Acústico Total', 'Facturación SAT', 'Jacuzzi', 'Cochera Privada', 'Room Service Gourmet', 'Check-in Digital'],
      descripcionParejas: 'La suite más sofisticada en la puerta norte del Valle de México. Aislamiento acústico de grado hotelero para desconectarse de la ciudad, jacuzzi y amenidades premium.',
      descripcionTransportistas: 'La antesala perfecta para transportistas foráneos que deben esperar los horarios de restricción vehicular o las ventanas nocturnas de descarga en almacenes de la CDMX. No te arriesgues en la calle: báñate, duerme seguro y factura todo.',
      beneficiosTransportistas: [
        'Espera tu ventana de horario de descarga en CDMX de forma segura',
        'Aislamiento acústico total para dormir de día sin ruido de autopista',
        'Comprobante fiscal digital (CFDI) 100% válido',
        'Cochera cerrada y resguardo perimetral monitoreado'
      ]
    }
  };

  return inventarioRecords.map((inv) => {
    const nombre = inv.fields['Nombre'] || 'Hotel Blue Ocean';
    
    // Buscar coincidencia en la tabla "Contacto"
    const contactoMatch = contactoRecords.find(
      (c) => c.fields['Nombre del Hotel']?.toLowerCase().trim() === nombre.toLowerCase().trim() ||
             c.fields['Correo']?.toLowerCase().trim() === inv.fields['Correo']?.toLowerCase().trim()
    );

    // Obtener URLs de imágenes de los campos de Airtable
    const extractUrl = (item: any): string => {
      if (typeof item === 'string') return item;
      if (item && item.url) return item.url;
      return '/renders/Polish_20260822_225309771.jpg';
    };

    const fachadaRaw = inv.fields['Render Fachada'];
    const renderFachada = Array.isArray(fachadaRaw) && fachadaRaw.length > 0 
      ? extractUrl(fachadaRaw[0])
      : '/renders/Polish_20260822_225309771.jpg';

    const habitacionesRaw = inv.fields['Render Habitaciones'];
    const renderHabitaciones = Array.isArray(habitacionesRaw) && habitacionesRaw.length > 0
      ? habitacionesRaw.map(extractUrl)
      : [renderFachada];

    const config = hotelMetadataConfig[nombre] || {
      ciudad: 'Ecatepec, Edo. Méx.',
      zona: 'Corredor Industrial Ecatepec',
      estrellas: 4,
      puntuacion: 4.8,
      totalResenas: 120,
      tipoPropiedad: 'Motel & Villas',
      tarifas: {
        estancia4Horas: 450,
        estancia6Horas: 600,
        estancia12Horas: 880,
        nocheCompleta: 1250
      },
      servicios: ['Cochera con Portón Eléctrico', 'Factura CFDI SAT', 'Agua Caliente 24h', 'WiFi Alta Velocidad'],
      descripcionParejas: 'Suites con máxima privacidad, iluminación tenue y comodidades para parejas.',
      descripcionTransportistas: 'Descanso reparador para operadores de transporte con cochera segura y factura oficial.',
      beneficiosTransportistas: ['Cochera con portón cerrado', '100% Facturable', 'Agua caliente 24h', 'Descanso antifatiga']
    };

    return {
      id: inv.id,
      airtableRecordId: inv.id,
      nombre: inv.fields['Nombre'] || 'Hotel Blue Ocean',
      correo: inv.fields['Correo'] || '',
      telefono: inv.fields['Teléfono'] || '',
      direccion: inv.fields['Dirección'] || '',
      nombreContacto: inv.fields['Nombre del contacto'] || '',
      descripcion: inv.fields['Descripción del hotel'] || '',
      renderFachada,
      renderHabitaciones,

      // Datos complementarios de la tabla "Contacto"
      web: contactoMatch?.fields['Web'] || 'https://oceanrevenue-management.com',
      redesSociales: contactoMatch?.fields['Redes Sociales'] || '',
      fechaRegistro: contactoMatch?.fields['Fecha'] || '',
      proximoSeguimiento: contactoMatch?.fields['Próximo seguimiento'] || '',

      // Parámetros de búsqueda y reservas
      ciudad: config.ciudad,
      zona: config.zona,
      estrellas: config.estrellas,
      puntuacion: config.puntuacion,
      totalResenas: config.totalResenas,
      tipoPropiedad: config.tipoPropiedad,
      tarifas: config.tarifas,
      disponibilidad: {
        habitacionesDisponibles: 4,
        tiposDisponibles: ['Suite Estándar', 'Suite con Jacuzzi', 'Villa con Cochera'],
        horariosInmediatos: ['Entrada Inmediata', '14:00 hrs', '16:00 hrs', '18:00 hrs', '20:00 hrs', '22:00 hrs']
      },
      servicios: config.servicios,

      // Segmentación Estratégica Dual
      descripcionParejas: config.descripcionParejas,
      descripcionTransportistas: config.descripcionTransportistas,
      beneficiosTransportistas: config.beneficiosTransportistas,
      aptoParaCarga: true,
      facturacionDisponible: true
    };
  });
}
