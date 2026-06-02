import { CalculationResult } from '../../types';
import UnitConversionCard from './UnitConversionCard';
import TemperatureCard from './TemperatureCard';
import CurrencyCard from './CurrencyCard';
import MathSolutionCard from './MathSolutionCard';
import PhysicsSolutionCard from './PhysicsSolutionCard';
import FinanceCard from './FinanceCard';
import InfoCard from './InfoCard';
import ErrorCard from './ErrorCard';

interface Props {
  result: CalculationResult;
}

export default function ResultCard({ result }: Props) {
  switch (result.type) {
    case 'unit_conversion_result':
      return <UnitConversionCard result={result} />;
    case 'temperature_result':
      return <TemperatureCard result={result} />;
    case 'currency_result':
      return <CurrencyCard result={result} />;
    case 'math_solution':
      return <MathSolutionCard result={result} />;
    case 'physics_solution':
      return <PhysicsSolutionCard result={result} />;
    case 'finance_result':
      return <FinanceCard result={result} />;
    case 'info':
      return <InfoCard result={result} />;
    case 'error':
      return <ErrorCard result={result} />;
    default:
      return <InfoCard result={{ type: 'info', message: `未知类型: ${result.type}` }} />;
  }
}