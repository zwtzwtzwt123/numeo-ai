import { useEffect, useRef } from 'react';
import katex from 'katex';

interface Props {
  formula: string;
  displayMode?: boolean;
}

export default function FormulaRenderer({ formula, displayMode = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    try {
      katex.render(formula, ref.current, {
        displayMode,
        throwOnError: false,
        output: 'html',
      });
    } catch (e) {
      ref.current.textContent = formula;
    }
  }, [formula, displayMode]);

  return <div ref={ref} className="inline-block" />;
}