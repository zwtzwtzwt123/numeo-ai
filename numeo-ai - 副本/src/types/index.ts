// ============================================================
// 类型定义 v2.0
// ============================================================

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  result?: CalculationResult;
  timestamp: number;
}

export type CalculationResult =
  | UnitConversionResult | TemperatureResult | CurrencyResult
  | MathSolutionResult | PhysicsSolutionResult | FinanceResult
  | InfoResult | ErrorResult;

export interface BaseResult {
  type: string;
  confidence?: 'high' | 'medium' | 'low';
}

export interface UnitConversionResult extends BaseResult {
  type: 'unit_conversion_result';
  result: number; from_value: number; from_unit: string;
  to_value: number; to_unit: string;
  formula: string; reverse: string;
}

export interface TemperatureResult extends BaseResult {
  type: 'temperature_result';
  result: number; from_value: number; from_unit: string;
  to_value: number; to_unit: string; formula: string;
}

export interface CurrencyResult extends BaseResult {
  type: 'currency_result';
  result: number; from_value: number; from_unit: string;
  to_value: number; to_unit: string; rate: number;
  formula: string; disclaimer: string;
}

export interface MathSolutionResult extends BaseResult {
  type: 'math_solution';
  steps: string[]; final_answer: string; equation: string;
  operation?: string;
  chart?: ChartData;
}

export interface PhysicsSolutionResult extends BaseResult {
  type: 'physics_solution';
  formula: string; steps: string[]; result: number; unit: string;
  extra?: Record<string, number>;
}

export interface FinanceResult extends BaseResult {
  type: 'finance_result';
  category: string; formula: string; steps: string[];
  result: number; unit: string;
  extra?: Record<string, number>;
  chart?: ChartData;
}

export interface InfoResult extends BaseResult {
  type: 'info'; message: string;
}

export interface ErrorResult extends BaseResult {
  type: 'error'; message: string;
}

export interface ChartData {
  type: 'bar' | 'line' | 'pie' | 'scatter';
  title?: string;
  labels: string[];
  datasets: { name: string; values: number[] }[];
  xLabel?: string; yLabel?: string;
}

export interface ModuleInfo {
  id: string; name: string; nameEn?: string;
  category: string; description: string;
  icon?: string;
  examples?: string[];
  subModules?: { name: string; example: string }[];
}