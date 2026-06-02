import { UnitConversionResult } from '../../types';
import FormulaRenderer from '../FormulaRenderer';

interface Props { result: UnitConversionResult; }

export default function UnitConversionCard({ result }: Props) {
  return (
    <div className="card-result">
      <div className="card-title">📏 单位换算</div>
      <div className="text-sm text-dark-400 mb-1">{result.from_value} {result.from_unit} =</div>
      <div className="text-3xl font-bold font-mono text-accent-cyan">
        {result.to_value.toLocaleString()} <span className="text-lg text-dark-400">{result.to_unit}</span>
      </div>
      <div className="text-xs text-dark-500 font-mono mt-2">
        <FormulaRenderer formula={`${result.from_value}\\,${result.from_unit} \\times ${result.conversion_factor || ''} = ${result.to_value.toLocaleString()}\\,${result.to_unit}`} />
      </div>
      <div className="text-xs text-dark-500 mt-1">{result.reverse}</div>
      <div className="mt-3 pt-3 border-t border-dark-600">
        <div className="text-xs text-dark-500 mb-2">💡 常见参考值</div>
        <div className="grid grid-cols-2 gap-1 text-xs text-dark-400">
          {getCommonValues(result.from_unit, result.to_unit).map((ref, i) => (
            <div key={i} className="bg-dark-700/50 rounded px-2 py-1">
              <span className="text-dark-500">{ref.label}: </span>
              <span className="font-mono text-white">{ref.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function getCommonValues(from: string, to: string): { label: string; value: string }[] {
  const pairs: Record<string, { label: string; value: string }[]> = {
    'meter_foot': [{ label: '1米', value: '3.28 英尺' }, { label: '1英尺', value: '0.305 米' }],
    'celsius_fahrenheit': [{ label: '0°C (冰点)', value: '32°F' }, { label: '100°C (沸点)', value: '212°F' }],
    'kg_pound': [{ label: '1kg', value: '2.20 磅' }, { label: '1磅', value: '0.454 kg' }],
    'km_mile': [{ label: '1km', value: '0.621 英里' }, { label: '1英里', value: '1.609 km' }],
    'liter_gallon': [{ label: '1升', value: '0.264 加仑' }, { label: '1加仑', value: '3.785 升' }],
    'joule_calorie': [{ label: '1卡路里', value: '4.184 焦耳' }, { label: '1千卡', value: '4184 焦耳' }],
  };
  const key = `${from}_${to}`;
  return pairs[key] || [{ label: `1 ${from}`, value: '换算因子见上' }];
}