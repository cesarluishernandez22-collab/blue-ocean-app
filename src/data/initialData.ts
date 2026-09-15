import { AdaptiveMemoryRecord, TradytecProfile, LiteratureItem } from '../types';

export const INITIAL_ADAPTIVE_MEMORY: AdaptiveMemoryRecord[] = [
  {
    id: 'MEM-001',
    timestamp: '2026-08-14 09:12:00',
    incidentCode: 'FAIL-TRAD-401',
    sourceCell: 'Tradytec',
    originalFailure: 'Un agente emitió un boleto de avión para un Director 48 horas antes del vuelo superando el techo en $320 USD sin confirmación financiera.',
    structuralRootCause: 'La regla de excepción permitía "urgencia" como parámetro discrecional de texto sin chequeo de crédito.',
    immutableRuleCreated: 'Regla 14-B: Todo tramo con anticipación < 5 días o sobrecosto > 0% requiere freeze inmediato de PNR y firma del CFO vía hash token.',
    enforcementLevel: 'CRITICAL_HALT',
    status: 'CLOSED_AND_ENFORCED',
  },
  {
    id: 'MEM-002',
    timestamp: '2026-08-28 16:45:00',
    incidentCode: 'FAIL-BO-209',
    sourceCell: 'Blue Ocean',
    originalFailure: 'En una propiedad boutique de 18 habitaciones, la tarifa horaria diurna se solapó con el check-in nocturno generando overbooking.',
    structuralRootCause: 'Falta de búfer temporal estricto para limpieza y acondicionamiento entre bloques de estancia.',
    immutableRuleCreated: 'Regla BO-SLOT-07: Bloqueo inmutable de 90 minutos de turnaround sanitario entre reservas de franja diurna y pernocta.',
    enforcementLevel: 'CODE_MUTATION',
    status: 'CLOSED_AND_ENFORCED',
  },
  {
    id: 'MEM-003',
    timestamp: '2026-09-02 11:30:00',
    incidentCode: 'FAIL-GOV-003',
    sourceCell: 'Core Arquitecto',
    originalFailure: 'Un agente asumió que "viaje para el próximo lunes" correspondía a clase turista sin validar el convenio corporativo de tarifas negociadas.',
    structuralRootCause: 'Violación del principio de Cero Suposiciones al inferir la tarifa de menor costo sin cotejar la matriz de beneficios corporativos.',
    immutableRuleCreated: 'Directriz Maestro CS-01: Prohibida la deducción heurística. En caso de múltiples opciones de tarifa, se calcula el Valor Económico Esperado (VEE) exacto.',
    enforcementLevel: 'STRICT_AUDIT',
    status: 'CLOSED_AND_ENFORCED',
  },
];

export const INITIAL_TRADYTEC_PROFILES: TradytecProfile[] = [
  {
    id: 'TRAD-USR-101',
    travelerName: 'Lic. Fernando Monroy',
    email: 'fernando.monroy@corporativo-norte.com',
    costCenter: 'CC-OP-MICE-88',
    hierarchyLevel: 'Directivo',
    authorizedCreditLimit: 35000,
    currentCreditUsed: 12400,
    preferredAirlineAgreement: 'Aeroméxico Corp Preferred (Tier 1 - 14% Off)',
    hotelMaxRatePerNight: 280,
  },
  {
    id: 'TRAD-USR-102',
    travelerName: 'Ing. Sofia Del Valle',
    email: 'sofia.valle@logistica-global.com',
    costCenter: 'CC-ENG-902',
    hierarchyLevel: 'Gerencial',
    authorizedCreditLimit: 15000,
    currentCreditUsed: 8900,
    preferredAirlineAgreement: 'Delta / LATAM Corporate Accord',
    hotelMaxRatePerNight: 160,
  },
  {
    id: 'TRAD-USR-103',
    travelerName: 'Carlos Mendizábal',
    email: 'carlos.m@operaciones-red.com',
    costCenter: 'CC-LOG-FIELD-12',
    hierarchyLevel: 'Operativo',
    authorizedCreditLimit: 5000,
    currentCreditUsed: 4600,
    preferredAirlineAgreement: 'Tarifa Negociada Flex Nacional',
    hotelMaxRatePerNight: 95,
  },
];

export const INITIAL_LITERATURE: LiteratureItem[] = [
  {
    id: 'LIT-001',
    title: 'Tratado de Revenue Management y Modelo de Resultados en Hotelería y Renta Corta',
    category: 'Revenue Management',
    author: 'Arquitecto Maestro - Célula Blue Ocean',
    readingTime: '8 min de lectura pedagógica',
    summary: 'Guía exhaustiva para hoteleros y directores de hospitalidad. Explica la descomposición del RevPAR, la fuga de margen en OTAs y el diseño de esquemas a riesgo compartido sin costos fijos.',
    tags: ['RevPAR', 'ADR', 'Comisiones OTAs', 'Renta Diurna', 'Sin Costo Fijo'],
    fullContent: `# TRATADO DE REVENUE MANAGEMENT: MAXIMIZACIÓN DE RENDIMIENTO EN ESTANCIA CORTA Y TIEMPO COMPARTIDO

### 1. El Dilema Fundamental del Inventario Perecedero
En la industria de la hospitalidad, una habitación que no se vende esta noche representa un ingreso que **se extingue para siempre**. A diferencia de los bienes manufacturados, el inventario hotelero posee una fecha de caducidad instantánea a las 23:59 de cada día.

Tradicionalmente, los hoteleros independientes cometen dos errores simétricos:
1. **Fijación de tarifa estática:** Mantener el mismo precio todo el año, ahuyentando demanda en temporada baja y dejando dinero sobre la mesa en fechas de alta compresión.
2. **Dependencia tóxica de OTAs:** Ceder entre el 18% y el 25% de la tarifa bruta a intermediarios digitales como Booking.com o Expedia, convirtiéndose en arrendadores de su propio cliente.

---

### 2. La Ecuación Rectora del RevPAR y el Margen Neto
Para gobernar con precisión matemática la rentabilidad, desglosamos:

$$\\text{RevPAR} = \\text{Ocupación} \\times \\text{ADR (Average Daily Rate)}$$

$$\\text{Ingreso Neto} = (\\text{Total Unidades} \\times 30 \\times \\text{RevPAR}) - \\text{Comisiones de Intermediación}$$

Cuando introducimos **microrrenta por franjas horarias** (Day-Use / Business transit slots de 10:00 a 17:00), el factor de rotación de cada habitación pasa de 1.0x a 1.45x diarios, permitiendo monetizar las horas valle sin interferir con la tarifa de pernocta regular.

---

### 3. La Promesa Comercial Blue Ocean: Cero Costo Fijo
El modelo comercial de la Célula Blue Ocean elimina la barrera de entrada para el hotelero:
* **Inversión Inicial requerida:** $0 USD.
* **Honorarios de consultoría o software:** $0 USD mensuales fijos.
* **Modelo de Retribución:** 15% estrictamente sobre el **incremento neto auditable** generado por encima de la línea base histórica del inmueble.

Si el hotel no incrementa su flujo de caja libre, el costo del servicio es cero. Esto alinea de manera perfecta los incentivos del agente ejecutor con el patrimonio del propietario.`,
  },
  {
    id: 'LIT-002',
    title: 'Manual de Políticas Corporativas TMC y Core de Decisión Tradytec',
    category: 'Políticas Corporativas TMC',
    author: 'Arquitecto Maestro - Célula Tradytec',
    readingTime: '10 min de lectura de especialidad',
    summary: 'Estructura normativa para Travel Management Companies (TMC). Cálculo del Valor Económico Esperado (VEE), jerarquías de aprobación, control de crédito rotativo y conciliación de itinerarios.',
    tags: ['TMC', 'Corporate Travel', 'VEE', 'Línea de Crédito', 'Compliance'],
    fullContent: `# MANUAL OPERATIVO: GOBERNANZA DE VIAJES CORPORATIVOS Y MOTOR DE DECISIÓN TRADYTEC

### 1. Marco Institucional del Viajero de Negocios
Un programa de viajes corporativos eficiente no busca el boleto más barato a cualquier costo; busca **optimizar el Valor Económico Esperado (VEE)** de cada desplazamiento, balanceando la productividad del colaborador, el cumplimiento del convenio corporativo y el flujo de caja de la empresa.

---

### 2. Matriz de Jerarquías y Parámetros Máximos

| Jerarquía | Ventana Preventiva Nacional | Ventana Preventiva Internacional | Techo Tarifa Nacional | Techo Tarifa Internacional | Hotel Máx / Noche |
|---|---|---|---|---|---|
| **Directivo** | 7 días | 14 días | $800 USD | $2,200 USD | $280 USD |
| **Gerencial** | 14 días | 21 días | $450 USD | $1,500 USD | $160 USD |
| **Operativo** | 21 días | 30 días | $280 USD | $950 USD | $95 USD |

---

### 3. Algoritmo del Core de Decisión Tradytec
El agente ejecutor procesa cada requerimiento a través del siguiente grafo determinista:

1. **Recepción con Centro de Costos Válido:** Todo ticket sin código presupuestal es rechazado de inmediato.
2. **Evaluación de Línea de Crédito:**
   $$\\text{Crédito Disponible} = \\text{Línea Autorizada} - \\text{Saldo Comprometido}$$
   Si $\\text{Monto Solicitado} > \\text{Crédito Disponible}$, el PNR entra en estado \\texttt{HOLD\\_CREDIT\\_LIMIT}.
3. **Cálculo del Valor Económico Esperado (VEE):**
   Puntúa de 0 a 100 el apego a políticas y beneficios de convenios aerocomerciales.
4. **Emisión Automática vs Escalación a Dirección:**
   Solo los tickets con VEE $\\ge 85$ y crédito verificado se emiten de forma desatendida.`,
  },
  {
    id: 'LIT-003',
    title: 'Protocolo Cero Suposiciones: Arquitectura de Agentes Libres de Alucinación',
    category: 'Arquitectura Agéntica',
    author: 'Arquitecto Maestro y Núcleo de Ingeniería',
    readingTime: '7 min de fundamentación técnica',
    summary: 'Directriz inviolable de diseño de software agéntico. Cómo transformar requerimientos incompletos en estados de detención preventiva y matrices de definición humana sin tolerar suposiciones.',
    tags: ['Cero Suposiciones', 'Trazabilidad', 'Máquina de Estados', 'Auditoría', 'Gobernanza'],
    fullContent: `# PROTOCOLO CERO SUPOSICIONES: ARQUITECTURA DE SOFTWARE AGÉNTICO DETERMINISTA

### 1. La Falacia de la Heurística Arbitraria
En los sistemas de inteligencia artificial tradicionales, los modelos intentan complacer al usuario "adivinando" o completando datos faltantes con valores promedio o supuestos implícitos. En un entorno de misión crítica (financiero, corporativo o de hospitalidad), **adivinar es equivalente a cometer un fraude operativo**.

---

### 2. Axiomas Inquebrantables del Arquitecto Maestro
* **Axioma I:** *Si un parámetro no posee un valor explícito en el mensaje de entrada ni en el perfil validado, el parámetro no existe.*
* **Axioma II:** *El sistema tiene estrictamente prohibido generar código de emisión, cargos bancarios o compromisos de inventario sobre parámetros inexistentes.*
* **Axioma III:** *Ante cualquier conflicto o ambigüedad, la máquina detiene la transición y emite un pliego de definición exacta para validación humana.*

---

### 3. Diagrama de Transición de Estados Auditables
\`\`\`
[REQUERIMIENTO BRUTO]
       │
       ▼
[VALIDADOR DE AMBIGÜEDAD] ──(Detecta adjetivo impreciso o dato faltante)──► [DETENCIÓN PREVENTIVA]
       │                                                                           │
       │ (100% Determinista)                                                      ▼
       ▼                                                                  [PLIEGO DE PREGUNTAS]
[CORE DE DECISIÓN]                                                                 │
       │                                                                           ▼
       ▼                                                                  [RATIFICACIÓN HUMANA]
[ESTADO EMITIDO Y AUDITADO] ◄──────────────────────────────────────────────────────┘
\`\`\``,
  }
];
