import { useState } from 'react';
import { MathSolutionResult } from '../../types';
import ChartCard from './ChartCard';

interface Props { result: MathSolutionResult; }

export default function MathSolutionCard({ result }: Props) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="card-result">
      <div className="card-title">📐 数学求解</div>
      <div className="text-xs text-dark-500 mb-2 font-mono">
        {result.equation}
      </div>
      {result.steps && result.steps.length > 0 && (
        <>
          <button onClick={() => setExpanded(!expanded)} className="text-xs text-accent-cyan hover:underline mb-2">
            {expanded ? '收起步骤 ▴' : '展开步骤 ▾'}
          </button>
          {expanded && (
            <div className="space-y-1.5 mb-3">
              {result.steps.map((step, i) => (
                <div key={i} className="flex gap-2 text-sm">
                  <span className="text-dark-500 font-mono text-xs shrink-0 mt-0.5 w-6 text-right">[{i + 1}]</span>
                  <span className="text-dark-200 pl-2 border-l-2 border-dark-600 flex-1">{step}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      <div className="border-t border-dark-600 pt-3">
        <span className="text-xs text-dark-500">结果：</span>
        <span className="text-lg font-bold font-mono text-accent-green ml-2">
          {result.final_answer}
        </span>
      </div>
      {result.chart && (
        <div className="mt-4"><ChartCard data={result.chart} height={250} /></div>
      )}
    </div>
  );
}