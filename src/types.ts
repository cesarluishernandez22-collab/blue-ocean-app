export type ActiveTab = 
  | 'convocatoria'
  | 'hotel_directory'
  | 'metodologia_lcm'
  | 'overview'
  | 'blueocean_portal'
  | 'blueocean_data'
  | 'supabase_sql'
  | 'roadmap_costos'
  | 'feedback'
  | 'blueocean'
  | 'tradytec'
  | 'zero_assumptions'
  | 'literature'
  | 'adaptive_memory'
  | 'governance';

export interface SystemStatus {
  status: string;
  coreVersion: string;
  architectIdentity: string;
  hasGeminiKey: boolean;
  activeCells: {
    id: string;
    name: string;
    type: string;
    status: string;
    decisionCore: string;
    rulesCount: number;
  }[];
  governance: {
    zeroAssumptionsEnforced: boolean;
    strictTraceability: boolean;
    authorityLimitsEnforced: boolean;
    adaptiveMemoryRecords: number;
  };
}

export interface AdaptiveMemoryRecord {
  id: string;
  timestamp: string;
  incidentCode: string;
  sourceCell: 'Tradytec' | 'Blue Ocean' | 'Core Arquitecto';
  originalFailure: string;
  structuralRootCause: string;
  immutableRuleCreated: string;
  enforcementLevel: 'CRITICAL_HALT' | 'STRICT_AUDIT' | 'CODE_MUTATION';
  status: 'CLOSED_AND_ENFORCED';
}

export interface TradytecProfile {
  id: string;
  travelerName: string;
  email: string;
  costCenter: string;
  hierarchyLevel: 'Directivo' | 'Gerencial' | 'Operativo';
  authorizedCreditLimit: number;
  currentCreditUsed: number;
  preferredAirlineAgreement: string;
  hotelMaxRatePerNight: number;
}

export interface TradytecEvaluationResult {
  travelerLevel: string;
  routeType: string;
  quotedAmount: number;
  maxAllowedFare: number;
  advanceDays: number;
  minRequiredAdvance: number;
  creditLineTotal: number;
  creditLineUsed: number;
  creditAvailable: number;
  agreementDiscountApplied: number;
  veeScore: number;
  machineState: string;
  holdReason: string;
  isApproved: boolean;
  requiresDirectorAuthorization: boolean;
  auditLogId: string;
  timestamp: string;
}

export interface BlueOceanDiagnosticResult {
  propertyName: string;
  totalUnits: number;
  current: {
    occupancy: number;
    adr: number;
    revPar: number;
    monthlyGross: number;
    otaCommissions: number;
    netRevenue: number;
  };
  blueOceanOptimized: {
    occupancy: number;
    adr: number;
    revPar: number;
    monthlyGross: number;
    ancillaryHourlyRevenue: number;
    otaCommissions: number;
    netRevenue: number;
  };
  commercialProposal: {
    fixedCost: number;
    netIncrementalLift: number;
    percentageLift: number;
    blueOceanSuccessFee: number;
    ownerRetainedGain: number;
    returnOnInvestment: string;
  };
  diagnosticId: string;
  timestamp: string;
}

export interface AmbiguityAuditResult {
  verdict: 'APROBADO' | 'DETENIDO_POR_AMBIGUEDAD';
  confidenceScore: number;
  criticalGaps: string[];
  contradictions: string[];
  requiredDefinitions: string[];
  draftResolution: string;
  technicalReasoning: string;
  source?: string;
}

export interface LiteratureItem {
  id: string;
  title: string;
  category: 'Revenue Management' | 'Políticas Corporativas TMC' | 'Arquitectura Agéntica' | 'Operaciones y Finanzas';
  author: string;
  readingTime: string;
  summary: string;
  fullContent: string;
  tags: string[];
}
