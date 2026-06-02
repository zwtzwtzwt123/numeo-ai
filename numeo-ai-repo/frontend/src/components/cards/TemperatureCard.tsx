import { TemperatureResult } from '../../types';

interface Props {
  result: TemperatureResult;
}

export default function TemperatureCard({ result }: Props) {
  return (
    <div className="card-result">
      <div className="card-title">🌡️ 温度转换</div>
      <div className="text-sm text-dark-400 mb-1">
        {result.from_value}°{result.from_unit === 'celsius' ? 'C' : result.from_unit === 'fahrenheit' ? 'F' : 'K'} =
      </div>
      <div className="card-value">{result.to_value}°<span className="text-lg text-dark-400">{result.to_unit === 'celsius' ? 'C' : result.to_unit === 'fahrenheit' ? 'F' : 'K'}</span></div>
      <div className="card-formula">{result.formula}</div>
    </div>
  );
}