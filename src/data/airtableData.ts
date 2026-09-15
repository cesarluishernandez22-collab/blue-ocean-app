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
    id: 'recInv01Insurgentes',
    fields: {
      'Nombre': 'Blue Ocean Hotel & Suites - Insurgentes',
      'Correo': 'gerencia.insurgentes@oceanrevenue-management.com',
      'Teléfono': '+52 55 5584 9201',
      'Dirección': 'Av. Insurgentes Sur 724, Col. del Valle, Benito Juárez, 03100 CDMX',
      'Render Fachada': [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
      ],
      'Render Habitaciones': [
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80'
      ],
      'Descripción del hotel': 'Propiedad insignia diseñada para estancias cortas y pernoctas ejecutivas. Cuenta con acceso privado express, suites con iluminación ambiental regulable, regadera con hidromasaje y sistema de audio bluetooth integrado.',
      'Nombre del contacto': 'Ing. Roberto Morales'
    }
  },
  {
    id: 'recInv02Periferico',
    fields: {
      'Nombre': 'Blue Ocean Grand Suites - Periférico Sur',
      'Correo': 'operaciones.perisur@oceanrevenue-management.com',
      'Teléfono': '+52 55 5606 3318',
      'Dirección': 'Anillo Periférico Sur 4120, Jardines del Pedregal, Álvaro Obregón, 01900 CDMX',
      'Render Fachada': [
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'
      ],
      'Render Habitaciones': [
        'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80'
      ],
      'Descripción del hotel': 'Arquitectura vanguardista con fuente exterior iluminada y suites de lujo. Equipadas con jacuzzi circular, cama King size suspendida con iluminación perimetral tenue y servicio a la habitación las 24 horas.',
      'Nombre del contacto': 'Lic. Daniela Valenzuela'
    }
  },
  {
    id: 'recInv03Polanco',
    fields: {
      'Nombre': 'Blue Ocean Boutique & Suites - Polanco',
      'Correo': 'reservas.polanco@oceanrevenue-management.com',
      'Teléfono': '+52 55 5280 4490',
      'Dirección': 'Calle Leibnitz 95, Anzures / Polanco, Miguel Hidalgo, 11590 CDMX',
      'Render Fachada': [
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80'
      ],
      'Render Habitaciones': [
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80'
      ],
      'Descripción del hotel': 'Ubicación privilegiada en zona financiera y gastronómica. Máxima discreción y acabados en mármol, smart TV 65 pulgadas con streaming, tina de hidromasaje y climatización inteligente.',
      'Nombre del contacto': 'Mtro. Fernando Carrillo'
    }
  },
  {
    id: 'recInv04Tlalpan',
    fields: {
      'Nombre': 'Blue Ocean Motel & Villas - Tlalpan',
      'Correo': 'administracion.tlalpan@oceanrevenue-management.com',
      'Teléfono': '+52 55 5678 1234',
      'Dirección': 'Calz. de Tlalpan 2840, Santa Úrsula Coapa, Coyoacán, 04650 CDMX',
      'Render Fachada': [
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80'
      ],
      'Render Habitaciones': [
        'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'
      ],
      'Descripción del hotel': 'Diseño tradicional de villas privadas con cochera individual y portón eléctrico automatizado. Opciones de alberca privada en suite, vapor, tubo de pole dance y mobiliario de confort ergonómico.',
      'Nombre del contacto': 'Lic. Gabriel Orozco'
    }
  },
  {
    id: 'recInv05Viaducto',
    fields: {
      'Nombre': 'Blue Ocean Real Motel & Suites - Viaducto',
      'Correo': 'gerencia.viaducto@oceanrevenue-management.com',
      'Teléfono': '+52 55 5530 8821',
      'Dirección': 'Viaducto Miguel Alemán 315, Roma Sur, Cuauhtémoc, 06760 CDMX',
      'Render Fachada': [
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80'
      ],
      'Render Habitaciones': [
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
      ],
      'Descripción del hotel': 'Acceso vehicular ágil sobre vía rápida con fachada curvada moderna. Habitaciones temáticas con iluminación LED personalizable en tonalidades magenta/ámbar, minibar surtido y servicio discreto.',
      'Nombre del contacto': 'Sra. Patricia Echeverría'
    }
  },
  {
    id: 'recInv06SantaFe',
    fields: {
      'Nombre': 'Blue Ocean Executive Tower - Santa Fe',
      'Correo': 'corporativo.santafe@oceanrevenue-management.com',
      'Teléfono': '+52 55 5081 7744',
      'Dirección': 'Av. Vasco de Quiroga 3800, Santa Fe, Cuajimalpa, 05348 CDMX',
      'Render Fachada': [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
      ],
      'Render Habitaciones': [
        'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80'
      ],
      'Descripción del hotel': 'Edificio vertical contemporáneo ideal para ejecutivos en tránsito y descanso de alta gama. Vista panorámica a los cañones de Santa Fe, cortinas black-out automáticas y aislamiento acústico reforzado.',
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
  // Configuración de tarifas base y zonas para la Fase 1
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
  }> = {
    'Blue Ocean Hotel & Suites - Insurgentes': {
      ciudad: 'CDMX',
      zona: 'Benito Juárez / Del Valle',
      estrellas: 4,
      puntuacion: 4.8,
      totalResenas: 142,
      tipoPropiedad: 'Hotel',
      tarifas: {
        estancia4Horas: 480,
        estancia6Horas: 650,
        estancia12Horas: 950,
        nocheCompleta: 1350
      },
      servicios: ['Acceso Privado', 'Audio Bluetooth', 'Hidromasaje', 'Smart TV 65"', 'WiFi Alta Velocidad', 'Room Service']
    },
    'Blue Ocean Grand Suites - Periférico Sur': {
      ciudad: 'CDMX',
      zona: 'Pedregal / Perisur',
      estrellas: 5,
      puntuacion: 4.9,
      totalResenas: 218,
      tipoPropiedad: 'Boutique Suites',
      tarifas: {
        estancia4Horas: 580,
        estancia6Horas: 790,
        estancia12Horas: 1150,
        nocheCompleta: 1650
      },
      servicios: ['Jacuzzi Circular', 'Cama King Suspendida', 'Luz Perimetral Regulable', 'Cochera Privada', 'Snack Bar Premium']
    },
    'Blue Ocean Boutique & Suites - Polanco': {
      ciudad: 'CDMX',
      zona: 'Polanco / Anzures',
      estrellas: 5,
      puntuacion: 4.9,
      totalResenas: 184,
      tipoPropiedad: 'Boutique Suites',
      tarifas: {
        estancia4Horas: 650,
        estancia6Horas: 890,
        estancia12Horas: 1300,
        nocheCompleta: 1850
      },
      servicios: ['Mármol & Acabados de Lujo', 'Tina de Baño Profunda', 'Valet Parking', 'Streaming 4K', 'Cafetería Gourmet']
    },
    'Blue Ocean Motel & Villas - Tlalpan': {
      ciudad: 'CDMX',
      zona: 'Coyoacán / Tlalpan',
      estrellas: 4,
      puntuacion: 4.7,
      totalResenas: 310,
      tipoPropiedad: 'Motel & Villas',
      tarifas: {
        estancia4Horas: 420,
        estancia6Horas: 560,
        estancia12Horas: 820,
        nocheCompleta: 1150
      },
      servicios: ['Cochera con Portón Eléctrico', 'Opción Villa con Alberca', 'Mobiliario Ergonómico', 'Vapor', 'Discreción 100%']
    },
    'Blue Ocean Real Motel & Suites - Viaducto': {
      ciudad: 'CDMX',
      zona: 'Roma Sur / Cuauhtémoc',
      estrellas: 4,
      puntuacion: 4.6,
      totalResenas: 195,
      tipoPropiedad: 'Motel & Villas',
      tarifas: {
        estancia4Horas: 450,
        estancia6Horas: 590,
        estancia12Horas: 880,
        nocheCompleta: 1250
      },
      servicios: ['Entrada Express por Viaducto', 'Iluminación LED Multicolor', 'Minibar Completo', 'Sonido Envolvente']
    },
    'Blue Ocean Executive Tower - Santa Fe': {
      ciudad: 'CDMX',
      zona: 'Santa Fe / Cuajimalpa',
      estrellas: 5,
      puntuacion: 4.8,
      totalResenas: 126,
      tipoPropiedad: 'Hotel',
      tarifas: {
        estancia4Horas: 520,
        estancia6Horas: 720,
        estancia12Horas: 1050,
        nocheCompleta: 1500
      },
      servicios: ['Vista Panorámica', 'Black-out Automático', 'Aislamiento Acústico Total', 'Escritorio Ergonómico', 'Check-in Digital']
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
      return 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80';
    };

    const fachadaRaw = inv.fields['Render Fachada'];
    const renderFachada = Array.isArray(fachadaRaw) && fachadaRaw.length > 0 
      ? extractUrl(fachadaRaw[0])
      : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80';

    const habitacionesRaw = inv.fields['Render Habitaciones'];
    const renderHabitaciones = Array.isArray(habitacionesRaw) && habitacionesRaw.length > 0
      ? habitacionesRaw.map(extractUrl)
      : [renderFachada];

    const config = hotelMetadataConfig[nombre] || {
      ciudad: 'CDMX',
      zona: 'Área Metropolitana',
      estrellas: 4,
      puntuacion: 4.7,
      totalResenas: 85,
      tipoPropiedad: 'Hotel',
      tarifas: {
        estancia4Horas: 450,
        estancia6Horas: 600,
        estancia12Horas: 900,
        nocheCompleta: 1300
      },
      servicios: ['Acceso Privado', 'Climatización', 'Smart TV', 'Room Service']
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
      servicios: config.servicios
    };
  });
}
