import ChartCard from './ChartCard';
import FormulaRenderer from '../FormulaRenderer';

interface Props {
  result: {
    type: string; category?: string; formula?: string;
    steps?: string[]; result?: number; unit?: string;
    extra?: Record<string, number>;
    chart?: { type: 'bar' | 'line' | 'pie' | 'scatter'; title?: string; labels: string[]; datasets: { name: string; values: number[] }[]; xLabel?: string; yLabel?: string };
  };
}

export default function FinanceCard({ result }: Props) {
  return (
    <div className="card-result">
      <div className="card-title">💰 {result.category || '财务计算'}</div>
      {result.formula && (
        <div className="bg-dark-900 rounded-lg p-3 mb-3 text-center">
          <FormulaRenderer formula={result.formula} displayMode={true} />
        </div>
      )}
      {result.steps && result.steps.length > 0 && (
        <div className="space-y-1.5 mb-3">
          {result.steps.map((step, i) => (
            <div key={i} className="text-sm text-dark-300 font-mono pl-2 border-l-2 border-dark-600">{step}</div>
          ))}
        </div>
      )}
      <div className="border-t border-dark-600 pt-3">
        <span className="text-lg font-bold font-mono text-accent-green">
          {result.result != null ? Number(result.result).toLocaleString() : 'N/A'} {result.unit || ''}
        </span>
      </div>
      {result.extra && Object.keys(result.extra).length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          {Object.entries(result.extra).map(([key, value]) => (
            <div key={key} className="bg-dark-700 rounded px-2 py-1 flex justify-between">
              <span className="text-dark-500">{key.replace(/_/g, ' ')}</span>
              <span className="text-white font-mono">{typeof value === 'number' ? value.toLocaleString() : value}</span>
            </div>
          ))}
        </div>
      )}
      {result.chart && (
        <div className="mt-4"><ChartCard data={result.chart} height={250} /></div>
      )}
    </div>
  );
}