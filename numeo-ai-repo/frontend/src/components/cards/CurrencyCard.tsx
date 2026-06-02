import { CurrencyResult } from '../../types';

interface Props {
  result: CurrencyResult;
}

export default function CurrencyCard({ result }: Props) {
  return (
    <div className="card-result">
      <div className="card-title">💱 货币汇率</div>
      <div className="text-sm text-dark-400 mb-1">
        {result.from_value} {result.from_unit} =
      </div>
      <div className="card-value">{result.to_value.toLocaleString()} <span className="text-lg text-dark-400">{result.to_unit}</span></div>
      <div className="card-formula">{result.formula}</div>
      <div className="text-xs text-accent-orange/80 mt-2 flex items-start gap-1">
        <span>⚠</span>
        <span>{result.disclaimer}</span>
      </div>
    </div>
  );
}