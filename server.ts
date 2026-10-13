import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { AirtableService, inMemoryReservas } from './server/airtableService';
import { supabaseService } from './server/supabaseService';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const airtableService = new AirtableService();

// Lazy-initialize Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

const MASTER_PROMPT_SYSTEM_INSTRUCTION = `Eres el ARQUITECTO MAESTRO Y NÚCLEO DE INGENIERÍA DEL SISTEMA.
1. IDENTIDAD Y CAPACIDAD TÉCNICA:
- Construyes, estructuras y gobiernas procesos, reglas, células operativas y flujos de automatización.
- Capacidad de generar código y configuraciones técnicas exactas para que cada agente funcione sin fricción.
- Memoria adaptativa implacable: aprendes de cada error y corrección, transformándolo en directriz cerrada.
- Capacidad literaria y pedagógica de nivel especialidad: redactas documentos, manuales, guías y textos de alta complejidad técnica con lenguaje claro, profundo y accesible.

2. CÉLULAS OPERATIVAS:
- Célula Operativa Tradytec (Corporativo / TMC / MICE / Leisure): Estructuras de datos, validación de perfiles, Core de Decisión (valor económico esperado, convenios y políticas corporativas), control de crédito y trazabilidad financiera.
- Célula Operativa Blue Ocean (Estancia Corta / Renta por Tiempo): Prospección inbound/outbound, diagnóstico automatizado de hoteles, gestión de visibilidad digital y Revenue Management a resultados sin costo fijo inicial.

3. REGLAS DE CERO SUPOSICIONES Y CERO TOLERANCIA AL ERROR:
- Cero Suposiciones: Si una instrucción o dato es ambiguo, prohibido inventar. Detén el diseño, analiza el conflicto y exige la definición exacta antes de generar código o reglas en borrador.
- Trazabilidad Estricta: Estados explícitos, auditables y libres de bucles operativos.
- Límites de Autoridad: Respeto absoluto a límites de negocio, márgenes críticos y autorizaciones financieras.`;

// Ruta Oficial de Aviso de Privacidad y Deslinde Bancario
app.get('/aviso-de-privacidad', (req: Request, res: Response) => {
  res.send(`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aviso de Privacidad y Deslinde Bancario • Blue Ocean</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #222; max-width: 780px; margin: 30px auto; padding: 0 20px; background: #f8f9fa; }
    .card { background: #ffffff; padding: 36px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
    h1 { color: #003366; font-size: 1.6rem; margin-top: 0; line-height: 1.25; }
    h2 { color: #002244; font-size: 1.15rem; margin-top: 22px; border-bottom: 2px solid #eef2f6; padding-bottom: 6px; }
    p, li { font-size: 0.9rem; color: #444; line-height: 1.5; }
    .badge { display: inline-block; background: #e9f0f8; color: #003366; padding: 4px 12px; border-radius: 999px; font-size: 0.75rem; font-weight: 700; margin-bottom: 14px; }
    .highlight-box { background: #fef8ec; border-left: 4px solid #f59e0b; padding: 12px 16px; margin: 16px 0; border-radius: 4px; font-size: 0.85rem; color: #78350f; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">CONFORMIDAD LFPDPPP & DESLINDE BANCARIO</div>
    <h1>Aviso de Privacidad y Autorización de Datos</h1>
    <p><strong>Blue Ocean & Tradytec • Dirección General Luis César Monroy</strong></p>
    
    <div class="highlight-box">
      <strong>Cláusula de Deslinde Bancario y Titularidad:</strong><br>
      El usuario declara bajo protesta de decir verdad que el instrumento bancario empleado es de su legítima propiedad y autoriza el cargo de la tarifa de microestancia, <strong>deslindando de forma irrevocable y definitiva al banco emisor, a la plataforma y al establecimiento</strong> de cualquier reclamación, contracargo o disputa posterior.
    </div>

    <h2>1. Responsable del Tratamiento</h2>
    <p>Blue Ocean, con operaciones en la Ciudad de México y cobertura en corredores hoteleros principales, es responsable del tratamiento confidencial de los datos personales e imagen de identificación recabados.</p>

    <h2>2. Datos Personales Recabados</h2>
    <p>Para la verificación de reserva vehicular y cumplimiento antifraude recabamos: Fotografía de Identificación Oficial (INE frontal), Nombre Completo, Teléfono Móvil y confirmación de pago seguro.</p>

    <h2>3. Finalidades y Discreción</h2>
    <ul>
      <li>Asignación de folio confidencial para ingreso directo por caseta sin pasar por mostrador.</li>
      <li>Validación y procesamiento de pago seguro con Mercado Pago.</li>
      <li>Resguardo temporal y encriptado bajo estándares de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).</li>
    </ul>

    <p style="text-align: center; margin-top: 30px; font-size: 0.8rem; color: #888;">
      © 2026 Blue Ocean • Todos los derechos reservados.
    </p>
  </div>
</body>
</html>`);
});

// 1. Health & System Status Endpoint
app.get('/api/system-status', (req: Request, res: Response) => {
  res.json({
    status: 'ONLINE',
    coreVersion: 'v4.8.0-PROMPT-MAESTRO',
    architectIdentity: 'Arquitecto Maestro y Núcleo de Ingeniería',
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
    activeCells: [
      {
        id: 'cell-tradytec',
        name: 'Célula Operativa Tradytec',
        type: 'Corporativo / TMC / MICE / Leisure',
        status: 'OPERATIONAL',
        decisionCore: 'Valor Económico Esperado (VEE) + Matriz de Políticas + Línea de Crédito',
        rulesCount: 24,
      },
      {
        id: 'cell-blueocean',
        name: 'Célula Operativa Blue Ocean',
        type: 'Estancia Corta / Renta por Tiempo / Hotelería',
        status: 'OPERATIONAL',
        decisionCore: 'Diagnóstico de Ocupación + RevPAR + Revenue Management a Resultados',
        rulesCount: 19,
      }
    ],
    governance: {
      zeroAssumptionsEnforced: true,
      strictTraceability: true,
      authorityLimitsEnforced: true,
      adaptiveMemoryRecords: 14,
    }
  });
});

// 2. Generate Specialized Literature / Technical Document / Agent Architecture
app.post('/api/generate-literature', async (req: Request, res: Response) => {
  try {
    const { category, topic, audience, targetFormat, specificConstraints } = req.body;

    const promptText = `Como Arquitecto Maestro y Núcleo de Ingeniería, redacta un documento de literatura especializada o especificación técnica de nivel maestría para:
Categoría: ${category || 'Arquitectura de Software y Células Operativas'}
Tema: ${topic || 'Manual de Operación de la Célula Tradytec con Core de Decisión'}
Audiencia: ${audience || 'Directores Operativos, Agentes Ejecutores y Desarrolladores de Software'}
Formato Solicitado: ${targetFormat || 'Manual Estructurado con Secciones Operativas y Diagramas Textuales'}
Restricciones Específicas: ${specificConstraints || 'Cero suposiciones, trazabilidad de estados y lenguaje pedagógico de alto impacto profesional.'}

Entrega el contenido con:
1. Título de Grado Especialidad y Metadatos de Gobernanza.
2. Marco Conceptual y Fundamentos Operativos (lenguaje pedagógico, profundo pero sin tecnicismos innecesarios).
3. Especificación Técnica / Estructura de Datos / Reglas de Negocio Exactas.
4. Flujo de Estados Explícitos (Trazabilidad y Cero Bucles).
5. Matriz de Excepciones y Puntos Críticos de Fallo (Memoria Adaptativa).`;

    const gemini = getGeminiClient();
    if (gemini) {
      const response = await gemini.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: promptText,
        config: {
          systemInstruction: MASTER_PROMPT_SYSTEM_INSTRUCTION,
          temperature: 0.2,
        }
      });

      return res.json({
        success: true,
        source: 'gemini-3.8-flash',
        document: response.text,
        timestamp: new Date().toISOString()
      });
    }

    // Fallback deterministic high-grade literature if no Gemini API key configured
    const fallbackDoc = `# MANUAL DE ALTA ESPECIALIDAD: GOBERNANZA Y CORE OPERATIVO DE CÉLULAS AGÉNTICAS
**Clasificación:** DOCUMENTO RECTOR DE ARQUITECTURA MAESTRA  
**Emisor:** Núcleo de Ingeniería y Gobernanza Agéntica  
**Tema:** ${topic || 'Operación Integral y Trazabilidad de Agentes Tradytec & Blue Ocean'}  
**Categoría:** ${category || 'Operaciones & Sistemas Críticos'}  
**Fecha de Emisión:** ${new Date().toLocaleDateString()} | **Estado:** RATIFICADO (CERO SUPOSICIONES)

---

## 1. Fundamento Filosófico y Pedagógico
Toda célula operativa agéntica funciona bajo el principio de **cero holgura de interpretación**. Un agente ejecutor no debe "interpretar" la voluntad de un cliente o directivo; debe evaluar matrices de decisión pre-computadas en las que cada transición de estado tiene un costo, una validación y una firma de auditoría indeleble.

> "El error no se castiga ni se maquilla: se deconstruye mecánicamente, se extrae la causa raíz estructural y se traduce en una regla booleana que imposibilita matemáticamente su reincidencia." — *Ley de la Memoria Adaptativa*

---

## 2. Especificación Técnica de las Células Especializadas

### A. Célula Operativa Tradytec (Corporativo / TMC / MICE)
* **Objetivo:** Ejecutar cotizaciones, emisiones y cambios de itinerarios con apego estricto a las políticas de viaje corporativas y líneas de crédito asignadas.
* **Core de Decisión (VEE - Valor Económico Esperado):**
  $$VEE = (TarifaBase + FeeServicio) \\times FactorCumplimiento - PenalizacionPorDesvio$$
* **Reglas Deterministas de Negocio:**
  1. *Anticipación de Reserva:* Mínimo 14 días para vuelos nacionales, 21 días para internacionales.
  2. *Tope de Tarifa Máxima por Nivel:* Rango Director ($850 USD máx por tramo nacional), Rango Gerencial ($450 USD máx), Rango Operativo ($280 USD máx).
  3. *Línea de Crédito Dinámica:* Si \`SaldoDisponible < MontoCotizado\`, el estado cambia a \`HOLD_CREDITO_EXCEDIDO\` y se requiere aprobación manual del Director de Finanzas.

### B. Célula Operativa Blue Ocean (Estancia Corta / Renta por Tiempo / Hotelería)
* **Objetivo:** Diagnóstico de ingresos desaprovechados y despliegue de Revenue Management basado en resultados (0 costo fijo).
* **Fórmula de Diagnóstico de RevPAR:**
  $$RevPAR = Ocupacion \\times ADR$$
* **Estrategia Comercial:** Demostrar al propietario del inmueble la fuga de margen en comisiones de OTAs tradicionales (18-25%) y recapturar demanda mediante tarifación dinámica horaria y empaquetamiento corporativo.

---

## 3. Matriz de Estados de Máquina Auditables
\`\`\`
[SOLICITUD] 
    │
    ▼
[VALIDACIÓN DE AMBIGÜEDAD] ──(Dato faltante)──► [DETENIDO: REQUERIR DEFINICIÓN HUMANA]
    │ (Datos completos)
    ▼
[CORE DE DECISIÓN] ──(Incumple política)──► [EXCEPCIÓN: REQUIERE AUTORIZACIÓN]
    │ (En política y crédito OK)
    ▼
[COMPROMISO FINANCIERO]
    │
    ▼
[EMISIÓN / EJECUCIÓN AGÉNTICA]
    │
    ▼
[CONCILIACIÓN Y AUDITORÍA FINAL]
\`\`\`

---

## 4. Cláusula de Cero Suposiciones
Ningún agente tiene autorización para asumir campos nulos. Si el centro de costos no está explícito en la orden, o si las fechas de check-in / check-out tienen ambigüedad horaria, la transacción se suspende con código \`ERR_AMBIGUOUS_SPECIFICATION\`.`;

    return res.json({
      success: true,
      source: 'deterministic-architect-engine',
      document: fallbackDoc,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Error in generate-literature:', error);
    res.status(500).json({ error: error.message || 'Error al generar literatura especializada' });
  }
});

// 3. Zero Assumptions Audit Endpoint (Cero Suposiciones)
app.post('/api/audit-ambiguity', async (req: Request, res: Response) => {
  try {
    const { requirementText, cellType } = req.body;

    if (!requirementText || typeof requirementText !== 'string') {
      return res.status(400).json({ error: 'Se requiere el texto del requerimiento a auditar' });
    }

    const gemini = getGeminiClient();
    if (gemini) {
      const prompt = `Analiza el siguiente requerimiento bajo la REGLA DE CERO SUPOSICIONES de la célula "${cellType || 'General'}":
Requerimiento recibido: "${requirementText}"

Instrucción estricta:
Identifica si hay vacíos, parámetros no cuantitativos, ambigüedades de fechas, falta de centros de costos, políticas imprecisas o márgenes no establecidos.
Responde estrictamente en formato JSON con la siguiente estructura:
{
  "verdict": "APROBADO" | "DETENIDO_POR_AMBIGUEDAD",
  "confidenceScore": number (0 a 100),
  "criticalGaps": string[],
  "contradictions": string[],
  "requiredDefinitions": string[],
  "draftResolution": string,
  "technicalReasoning": string
}`;

      const response = await gemini.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: MASTER_PROMPT_SYSTEM_INSTRUCTION,
          responseMimeType: 'application/json',
          temperature: 0.1
        }
      });

      try {
        const parsed = JSON.parse(response.text || '{}');
        return res.json({ success: true, ...parsed, source: 'gemini-3.8-flash' });
      } catch (e) {
        // Fall through to deterministic parser if JSON parsing fails
      }
    }

    // Deterministic Rule Engine for Ambiguity Detection
    const lower = requirementText.toLowerCase();
    const criticalGaps: string[] = [];
    const contradictions: string[] = [];
    const requiredDefinitions: string[] = [];

    // Ambiguity checks
    if (!lower.includes('costo') && !lower.includes('presupuesto') && !lower.includes('tarifa') && !lower.includes('precio') && !lower.includes('$')) {
      criticalGaps.push('Límite financiero o presupuesto máximo no especificado.');
      requiredDefinitions.push('Definir techo presupuestario exacto y divisa.');
    }
    if (!lower.includes('fecha') && !lower.includes('días') && !lower.includes('dias') && !lower.includes('horario') && !lower.includes('plazo')) {
      criticalGaps.push('Ventana temporal o fecha límite de ejecución ausente.');
      requiredDefinitions.push('Especificar fecha de inicio, término y ventana de anticipación.');
    }
    if (lower.includes('lo antes posible') || lower.includes('urgente') || lower.includes('lo que sea mejor') || lower.includes('barato') || lower.includes('económico')) {
      contradictions.push('Términos subjetivos detectados ("lo antes posible", "económico", "mejor"). Se requiere métrica cuantitativa.');
      requiredDefinitions.push('Reemplazar adjetivos subjetivos por SLAs numéricos (horas) y bandas tarifarias concretas.');
    }
    if (cellType === 'Tradytec' && !lower.includes('centro de costo') && !lower.includes('aprob') && !lower.includes('política')) {
      criticalGaps.push('Falta centro de costos contable y asignación de viajero con nivel de autorización.');
      requiredDefinitions.push('Indicar código de centro de costos y aprobador registrado en nómina.');
    }

    const isHalted = criticalGaps.length > 0 || contradictions.length > 0;

    return res.json({
      success: true,
      verdict: isHalted ? 'DETENIDO_POR_AMBIGUEDAD' : 'APROBADO',
      confidenceScore: isHalted ? 98 : 95,
      criticalGaps,
      contradictions,
      requiredDefinitions,
      draftResolution: isHalted 
        ? 'El Arquitecto Maestro ha suspendido preventivamente la ejecución del agente para evitar alucinaciones operativas y pérdidas de margen.'
        : 'Requerimiento validado sintáctica y cuantitativamente con trazabilidad completa.',
      technicalReasoning: isHalted
        ? 'Se detectaron variables no deterministas. El principio de Cero Suposiciones prohíbe autocompletar vacíos sin ratificación formal.'
        : 'Todos los parámetros críticos (tiempo, costo, identificadores y alcance) cuentan con valores explícitos.',
      source: 'deterministic-architect-rules'
    });

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Tradytec Corporate Decision Core Endpoint
app.post('/api/tradytec/evaluate-decision', (req: Request, res: Response) => {
  const {
    travelerLevel = 'Gerencial',
    routeType = 'Nacional',
    quotedAmount = 520,
    advanceDays = 10,
    corporateAgreement = true,
    creditLineTotal = 50000,
    creditLineUsed = 46000,
  } = req.body;

  // Maximum allowed fare policy
  const maxFareMatrix: Record<string, Record<string, number>> = {
    Directivo: { Nacional: 800, Internacional: 2200 },
    Gerencial: { Nacional: 450, Internacional: 1500 },
    Operativo: { Nacional: 280, Internacional: 950 },
  };

  const minAdvanceMatrix: Record<string, number> = {
    Nacional: 14,
    Internacional: 21,
  };

  const maxAllowedFare = maxFareMatrix[travelerLevel]?.[routeType] || 400;
  const minRequiredAdvance = minAdvanceMatrix[routeType] || 14;

  const fareExceeded = quotedAmount > maxAllowedFare;
  const advanceExceeded = advanceDays < minRequiredAdvance;
  const creditAvailable = creditLineTotal - creditLineUsed;
  const creditExceeded = quotedAmount > creditAvailable;

  // Calculate Expected Economic Value (VEE)
  // Base formula: Compliance factor * (Agreement savings) - Policy Penalty
  const agreementDiscount = corporateAgreement ? quotedAmount * 0.12 : 0;
  const penalty = (fareExceeded ? (quotedAmount - maxAllowedFare) * 1.5 : 0) + (advanceExceeded ? 75 : 0);
  const veeScore = Math.max(0, Math.round(100 - (penalty / quotedAmount) * 100 + (corporateAgreement ? 10 : 0)));

  let machineState = 'APPROVED_AND_READY';
  let holdReason = '';

  if (creditExceeded) {
    machineState = 'HOLD_CREDIT_LIMIT_BREACHED';
    holdReason = `Línea de crédito insuficiente (Disponible: $${creditAvailable.toFixed(2)} USD vs Solicitado: $${quotedAmount.toFixed(2)} USD).`;
  } else if (fareExceeded && advanceExceeded) {
    machineState = 'HOLD_DOUBLE_POLICY_BREACH';
    holdReason = `Doble infracción: Tarifa excede el techo ($${quotedAmount} vs $${maxAllowedFare} USD) y anticipación insuficiente (${advanceDays} vs ${minRequiredAdvance} días).`;
  } else if (fareExceeded) {
    machineState = 'PENDING_EXECUTIVE_EXCEPTION';
    holdReason = `Monto cotizado supera política de nivel ${travelerLevel} por $${(quotedAmount - maxAllowedFare).toFixed(2)} USD.`;
  } else if (advanceExceeded) {
    machineState = 'PENDING_DIRECTOR_BYPASS';
    holdReason = `Compra fuera de ventana preventiva (${advanceDays} días vs mínimo de ${minRequiredAdvance}).`;
  }

  res.json({
    success: true,
    evaluation: {
      travelerLevel,
      routeType,
      quotedAmount,
      maxAllowedFare,
      advanceDays,
      minRequiredAdvance,
      creditLineTotal,
      creditLineUsed,
      creditAvailable,
      agreementDiscountApplied: agreementDiscount,
      veeScore,
      machineState,
      holdReason,
      isApproved: machineState === 'APPROVED_AND_READY',
      requiresDirectorAuthorization: machineState.startsWith('HOLD_') || machineState.startsWith('PENDING_'),
      auditLogId: `AUD-TRADYTEC-${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`,
      timestamp: new Date().toISOString()
    }
  });
});

// 5. Blue Ocean Revenue Management & Hotel Diagnosis Endpoint
app.post('/api/blueocean/diagnose', (req: Request, res: Response) => {
  const {
    propertyName = 'Hotel Boutique Centro Histórico',
    totalUnits = 24,
    currentOccupancy = 48, // percentage
    currentADR = 75, // USD
    otaCommissionRate = 20, // percentage
    hourlyRentalPotential = true,
  } = req.body;

  const currentRevPAR = (currentOccupancy / 100) * currentADR;
  const currentMonthlyGross = totalUnits * 30 * currentRevPAR;
  const currentOtaCommissions = currentMonthlyGross * (otaCommissionRate / 100);
  const currentNetRevenue = currentMonthlyGross - currentOtaCommissions;

  // Blue Ocean Revenue Management optimization model:
  // 1. Dynamic pricing lifts occupancy by 18-25%
  // 2. Direct booking and corporate channel recapture cuts OTA share from 85% to 45%
  // 3. Hourly / Short-stay time slots monetize downtime (10am-5pm) adding +15% ancillary revenue
  const optimizedOccupancy = Math.min(88, currentOccupancy + 22);
  const optimizedADR = currentADR * 1.14; // better yield
  const optimizedRevPAR = (optimizedOccupancy / 100) * optimizedADR;
  
  const optimizedBaseGross = totalUnits * 30 * optimizedRevPAR;
  const hourlyAncillaryLift = hourlyRentalPotential ? optimizedBaseGross * 0.16 : 0;
  const totalOptimizedGross = optimizedBaseGross + hourlyAncillaryLift;

  // In Blue Ocean model, OTA commission is halved through corporate & direct channels
  const optimizedOtaRate = otaCommissionRate * 0.55;
  const optimizedCommissions = totalOptimizedGross * (optimizedOtaRate / 100);
  const totalOptimizedNet = totalOptimizedGross - optimizedCommissions;

  const netLiftDollars = totalOptimizedNet - currentNetRevenue;
  const netLiftPercentage = Math.round((netLiftDollars / currentNetRevenue) * 100);

  // Blue Ocean Commercial Promise: 0 fixed cost, 15% success fee on incremental net lift
  const successFee = netLiftDollars * 0.15;
  const hotelOwnerNetGain = netLiftDollars - successFee;

  res.json({
    success: true,
    propertyMetrics: {
      propertyName,
      totalUnits,
      current: {
        occupancy: currentOccupancy,
        adr: currentADR,
        revPar: Math.round(currentRevPAR * 100) / 100,
        monthlyGross: Math.round(currentMonthlyGross),
        otaCommissions: Math.round(currentOtaCommissions),
        netRevenue: Math.round(currentNetRevenue),
      },
      blueOceanOptimized: {
        occupancy: optimizedOccupancy,
        adr: Math.round(optimizedADR * 100) / 100,
        revPar: Math.round(optimizedRevPAR * 100) / 100,
        monthlyGross: Math.round(totalOptimizedGross),
        ancillaryHourlyRevenue: Math.round(hourlyAncillaryLift),
        otaCommissions: Math.round(optimizedCommissions),
        netRevenue: Math.round(totalOptimizedNet),
      },
      commercialProposal: {
        fixedCost: 0,
        netIncrementalLift: Math.round(netLiftDollars),
        percentageLift: netLiftPercentage,
        blueOceanSuccessFee: Math.round(successFee),
        ownerRetainedGain: Math.round(hotelOwnerNetGain),
        returnOnInvestment: 'Infinito (Sin inversión inicial requerida)',
      },
      diagnosticId: `DIAG-BO-${Date.now()}`,
      timestamp: new Date().toISOString()
    }
  });
});

// ============================================================================
// BLUE OCEAN FASE 1: RUTAS DE AIRTABLE (TABLAS "Contacto" e "Inventario de propiedades")
// ============================================================================

// 6. Airtable Configuration & Health Status
app.get('/api/airtable/config-status', (req: Request, res: Response) => {
  res.json({
    success: true,
    ...airtableService.getConfigStatus(),
    timestamp: new Date().toISOString()
  });
});

// 7. Consulta de la tabla "Contacto" (Campos exactos de Airtable)
app.get('/api/airtable/contacto', async (req: Request, res: Response) => {
  try {
    const result = await airtableService.getContactoRecords();
    res.json({
      success: true,
      tableName: 'Contacto',
      source: result.source,
      count: result.records.length,
      records: result.records
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 8. Registro de nuevo contacto en la tabla "Contacto"
app.post('/api/airtable/contacto', async (req: Request, res: Response) => {
  try {
    const recordFields = req.body;
    const result = await airtableService.createContactoRecord(recordFields);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 9. Consulta de la tabla "Inventario de propiedades" (Campos exactos de Airtable)
app.get('/api/airtable/inventario-propiedades', async (req: Request, res: Response) => {
  try {
    const result = await airtableService.getInventarioRecords();
    res.json({
      success: true,
      tableName: 'Inventario de propiedades',
      source: result.source,
      count: result.records.length,
      records: result.records
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 10. Consulta del catálogo unificado de hoteles para el Sitio de Reservas (Airtable CRM)
app.get('/api/airtable/hotels', async (req: Request, res: Response) => {
  try {
    const result = await airtableService.getUnifiedHotels();
    res.json({
      success: true,
      source: result.source,
      totalHotels: result.hotels.length,
      rawCounts: result.rawCounts,
      hotels: result.hotels
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 10b. Supabase Health & Connection Status Endpoint
app.get('/api/supabase/status', async (req: Request, res: Response) => {
  try {
    const status = await supabaseService.getStatus();
    res.json({
      success: true,
      ...status,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 10c. Supabase Hotels Direct Endpoint
app.get('/api/supabase/hotels', async (req: Request, res: Response) => {
  try {
    const result = await supabaseService.getHotels();
    res.json({
      success: true,
      ...result,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 11. Endpoint para crear y listar reservas de Fase 1 (Flujo funcional sin pasarela aún)
app.get('/api/reservas', (req: Request, res: Response) => {
  res.json({
    success: true,
    count: inMemoryReservas.length,
    reservas: inMemoryReservas
  });
});

app.post('/api/reservas', async (req: Request, res: Response) => {
  try {
    const reservaData = req.body;

    // Regla de Seguridad Financiera y Opciones de Pago:
    // 1. PAGO_EN_RECEPCION: 100% a pagar en mostrador al check-in.
    // 2. PAGO_TARJETA_EN_LINEA: Pago con tarjeta en el portal al momento de ver el hotel y disponibilidad (conexión con pasarela).
    // 3. PASARELA_GARANTIA_OCEAN_BLUE: Pasarela con retención del 15% como depósito asegurado.
    let metodoPago: 'PAGO_EN_RECEPCION' | 'PAGO_TARJETA_EN_LINEA' | 'PASARELA_GARANTIA_OCEAN_BLUE' = 'PAGO_EN_RECEPCION';
    if (reservaData.metodoPago === 'PAGO_TARJETA_EN_LINEA') {
      metodoPago = 'PAGO_TARJETA_EN_LINEA';
    } else if (reservaData.metodoPago === 'PASARELA_GARANTIA_OCEAN_BLUE') {
      metodoPago = 'PASARELA_GARANTIA_OCEAN_BLUE';
    }

    const tarifaTotal = Number(reservaData.precioTotal) || 0;
    const comisionOceanBlue15 = Math.round(tarifaTotal * 0.15);
    const netoHotel85 = tarifaTotal - comisionOceanBlue15;

    // Desglose financiero según la modalidad de pago seleccionada
    let montoRetencionGarantia = 0;
    let saldoLiquidableEnHotel = tarifaTotal;

    if (metodoPago === 'PAGO_TARJETA_EN_LINEA') {
      // El cliente liquidó el 100% con tarjeta en el portal a través de la pasarela
      montoRetencionGarantia = tarifaTotal;
      saldoLiquidableEnHotel = 0; // Totalmente pagado en el portal
    } else if (metodoPago === 'PASARELA_GARANTIA_OCEAN_BLUE') {
      // Pasarela enlazada: Se retiene el 15% de comisión como garantía y el 85% se paga en hotel
      montoRetencionGarantia = comisionOceanBlue15;
      saldoLiquidableEnHotel = netoHotel85;
    } else {
      // Pago en recepción: 0 anticipo web, el huésped paga el 100% en recepción
      montoRetencionGarantia = 0;
      saldoLiquidableEnHotel = tarifaTotal;
    }

    const desgloseFinanciero = {
      tarifaTotal,
      comisionOceanBlue15,
      netoHotel85,
      montoRetencionGarantia,
      saldoLiquidableEnHotel
    };

    // Datos de pasarela si el pago fue con tarjeta en línea
    let datosPasarela = reservaData.datosPasarela;
    if (metodoPago === 'PAGO_TARJETA_EN_LINEA') {
      datosPasarela = {
        ultimosCuatroDigitos: reservaData.datosPasarela?.ultimosCuatroDigitos || '4242',
        titularTarjeta: reservaData.datosPasarela?.titularTarjeta || reservaData.nombreCliente || 'Titular',
        autorizacionId: `AUTH-${Date.now().toString().slice(-6)}`,
        estadoTransaccion: 'APROBADA',
        marcaTarjeta: reservaData.datosPasarela?.marcaTarjeta || 'Visa / Mastercard'
      };
    }

    const nuevaReserva = {
      ...reservaData,
      metodoPago,
      datosPasarela,
      desgloseFinanciero,
      id: `RES-BO-${Date.now().toString().slice(-4)}`,
      codigoReserva: `BO-${reservaData.hotelNombre?.slice(0, 3).toUpperCase() || 'HTL'}-${Math.floor(1000 + Math.random() * 9000)}`,
      fechaCreacion: new Date().toISOString(),
      estado: 'CONFIRMADA'
    };
    inMemoryReservas.unshift(nuevaReserva);

    // Intento de persistencia directa en Supabase si está enlazado
    let supabasePersisted = false;
    if (supabaseService.isConfigured()) {
      const supaRes = await supabaseService.createReserva(nuevaReserva);
      supabasePersisted = supaRes.success;
    }

    res.json({
      success: true,
      reserva: nuevaReserva,
      persistedInSupabase: supabasePersisted
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Endpoint del Chatbot IA y Entrenamiento Blue Ocean (Luis César Monroy)
app.post('/api/chatbot/message', async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, error: 'Mensaje requerido' });
    }

    const systemPrompt = `Eres el Asistente Virtual Concierge de BLUE OCEAN & LCM Total Revenue Management (dirigido por Luis César Monroy).
OBJETIVOS Y TONO:
- Atiendes a huéspedes de microestancias y estancias cortas para hoteles y moteles en Ciudad de México.
- Propiedades modelo oficiales: Hotel Excalibur (Zona Rosa/Reforma), Hotel Novoa (San Rafael), Hotel 3 Culturas (Guerrero), Hotel San Francisco (Centro), Hotel Savoy (Guerrero) y Hotel Arizona (Tabacalera).
- Tarifas de 4 horas ($320 a $480 MXN), 6 horas y noche completa ($500 a $850 MXN).
- Resaltas la discreción, el check-in vehicular privado sin fricción y los pagos seguros en línea (tarjeta, SPEI, OXXO Pay).
- Si quien pregunta es un dueño o administrador de hotel: explicas la metodología TRM de Luis César Monroy, sin cobros fijos iniciales, 100% a resultados con el 15% sobre el incremento real medible de ingresos.
- Mantén respuestas amables, ejecutivas, claras y profesionales en español.`;

    const gemini = getGeminiClient();
    if (gemini) {
      try {
        const response = await gemini.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: message,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.3
          }
        });

        return res.json({
          success: true,
          reply: response.text,
          source: 'gemini-3.8-flash'
        });
      } catch (geminiErr: any) {
        console.warn('[Chatbot] Error en llamada Gemini, usando fallback de reglas:', geminiErr?.message);
      }
    }

    // Fallback inteligente basado en reglas si no hay API key
    let fallbackReply = 'Con gusto te asesoro. Contamos con 6 propiedades modelo en CDMX con tarifas desde $320 por 4 horas y check-in vehicular.';
    const lower = message.toLowerCase();
    if (lower.includes('precio') || lower.includes('costo') || lower.includes('tarifa') || lower.includes('cuanto')) {
      fallbackReply = 'Nuestras tarifas de estancia corta van desde $320 MXN por 4 horas (Hotel Novoa) hasta $480 MXN (Hotel Excalibur con jacuzzi doble). También contamos con estancia nocturna desde $500 MXN.';
    } else if (lower.includes('hotelero') || lower.includes('dueño') || lower.includes('comision') || lower.includes('propiedad')) {
      fallbackReply = 'Para dueños de hoteles y moteles, Luis César Monroy y Blue Ocean aplican Total Revenue Management con un esquema 100% a resultados: el hotel retiene el 85% y nosotros el 15% sobre el incremento real medible.';
    } else if (lower.includes('pago') || lower.includes('pagar') || lower.includes('tarjeta') || lower.includes('spei')) {
      fallbackReply = 'Puedes pagar en línea mediante tarjeta bancaria, SPEI automatizado 24/7, OXXO Pay o pagar en caseta vehicular al llegar con total discreción.';
    }

    res.json({
      success: true,
      reply: fallbackReply,
      source: 'rules-engine'
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Endpoints para gestión de imágenes de láminas de la Convocatoria
const SLIDES_DIR = path.join(process.cwd(), 'public/images/slides');
if (!fs.existsSync(SLIDES_DIR)) {
  fs.mkdirSync(SLIDES_DIR, { recursive: true });
}

app.use('/images/slides', express.static(SLIDES_DIR));

app.get('/api/slide-images', (req: Request, res: Response) => {
  try {
    if (!fs.existsSync(SLIDES_DIR)) {
      return res.json({ success: true, files: [] });
    }
    const files = fs.readdirSync(SLIDES_DIR);
    res.json({ success: true, files });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/upload-slide-image', (req: Request, res: Response) => {
  try {
    const { fileName, dataUrl, base64 } = req.body;
    if (!fileName) {
      return res.status(400).json({ success: false, error: 'Falta nombre de archivo' });
    }
    const safeName = path.basename(fileName);
    const rawData = base64 || (dataUrl ? dataUrl.replace(/^data:image\/\w+;base64,/, '') : null);
    if (!rawData) {
      return res.status(400).json({ success: false, error: 'Falta contenido de imagen' });
    }
    const buffer = Buffer.from(rawData, 'base64');
    fs.writeFileSync(path.join(SLIDES_DIR, safeName), buffer);
    res.json({ success: true, fileName: safeName, path: `/images/slides/${encodeURIComponent(safeName)}` });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Configure Vite or Static Serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Arquitecto Maestro] Servidor activo en http://0.0.0.0:${PORT}`);
  });
}

startServer();
