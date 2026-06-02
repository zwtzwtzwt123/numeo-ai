import { useState } from 'react';

interface Props {
  onClose: () => void;
}

const KEYBOARDS: Record<string, { label: string; insert: string }[][]> = {
  // ==================== 通用 ====================
  general: [
    [
      { label: 'x²', insert: '^2' }, { label: 'xⁿ', insert: '^' }, { label: '√', insert: 'sqrt()' },
      { label: 'log', insert: 'log()' }, { label: 'ln', insert: 'ln()' }, { label: '|x|', insert: 'abs()' },
    ],
    [
      { label: 'π', insert: 'pi' }, { label: 'e', insert: 'e' }, { label: '( )', insert: '()' },
      { label: '=', insert: '=' }, { label: '≠', insert: '≠' }, { label: '≈', insert: '≈' },
    ],
    [
      { label: '≤', insert: '<=' }, { label: '≥', insert: '>=' }, { label: '∞', insert: '∞' },
      { label: '°', insert: '°' }, { label: '%', insert: '%' }, { label: '‰', insert: '‰' },
    ],
    [
      { label: '×10^', insert: '×10^' }, { label: '±', insert: '±' }, { label: '→', insert: '→' },
      { label: '₁', insert: '₁' }, { label: '₂', insert: '₂' }, { label: '³', insert: '³' },
    ],
  ],

  // ==================== 数学 ====================
  math: [
    [
      { label: 'Σ', insert: 'Σ' }, { label: '∫', insert: '∫' }, { label: '∂', insert: '∂' },
      { label: 'lim', insert: 'lim' }, { label: '∇', insert: '∇' }, { label: '∏', insert: '∏' },
    ],
    [
      { label: 'sin', insert: 'sin()' }, { label: 'cos', insert: 'cos()' }, { label: 'tan', insert: 'tan()' },
      { label: 'arcsin', insert: 'arcsin()' }, { label: 'arccos', insert: 'arccos()' }, { label: 'arctan', insert: 'arctan()' },
    ],
    [
      { label: '∠', insert: '∠' }, { label: '⊥', insert: '⊥' }, { label: '∥', insert: '∥' },
      { label: '△', insert: '△' }, { label: '□', insert: '□' }, { label: '◇', insert: '◇' },
    ],
    [
      { label: '!', insert: '!' }, { label: 'C(', insert: 'C(' }, { label: 'P(', insert: 'P(' },
      { label: 'mod', insert: 'mod' }, { label: 'gcd', insert: 'gcd()' }, { label: 'lcm', insert: 'lcm()' },
    ],
  ],

  // ==================== 希腊字母 ====================
  greek: [
    [
      { label: 'α', insert: 'α' }, { label: 'β', insert: 'β' }, { label: 'γ', insert: 'γ' },
      { label: 'δ', insert: 'δ' }, { label: 'ε', insert: 'ε' }, { label: 'ζ', insert: 'ζ' },
    ],
    [
      { label: 'η', insert: 'η' }, { label: 'θ', insert: 'θ' }, { label: 'ι', insert: 'ι' },
      { label: 'κ', insert: 'κ' }, { label: 'λ', insert: 'λ' }, { label: 'μ', insert: 'μ' },
    ],
    [
      { label: 'ν', insert: 'ν' }, { label: 'ξ', insert: 'ξ' }, { label: 'π', insert: 'π' },
      { label: 'ρ', insert: 'ρ' }, { label: 'σ', insert: 'σ' }, { label: 'τ', insert: 'τ' },
    ],
    [
      { label: 'φ', insert: 'φ' }, { label: 'ψ', insert: 'ψ' }, { label: 'ω', insert: 'ω' },
      { label: 'Δ', insert: 'Δ' }, { label: 'Ω', insert: 'Ω' }, { label: 'Φ', insert: 'Φ' },
    ],
  ],

  // ==================== 物理 ====================
  physics: [
    [
      { label: '°C', insert: '°C' }, { label: '°F', insert: '°F' }, { label: 'K', insert: 'K' },
      { label: 'm/s', insert: 'm/s' }, { label: 'm/s²', insert: 'm/s²' }, { label: 'rad/s', insert: 'rad/s' },
    ],
    [
      { label: 'N', insert: 'N' }, { label: 'Pa', insert: 'Pa' }, { label: 'J', insert: 'J' },
      { label: 'W', insert: 'W' }, { label: 'A', insert: 'A' }, { label: 'V', insert: 'V' },
    ],
    [
      { label: 'Ω', insert: 'Ω' }, { label: 'T', insert: 'T' }, { label: 'Hz', insert: 'Hz' },
      { label: 'C', insert: 'C' }, { label: 'F', insert: 'F' }, { label: 'H', insert: 'H' },
    ],
    [
      { label: 'mol', insert: 'mol' }, { label: 'eV', insert: 'eV' }, { label: 'Wb', insert: 'Wb' },
      { label: 'Bq', insert: 'Bq' }, { label: 'Gy', insert: 'Gy' }, { label: 'Sv', insert: 'Sv' },
    ],
  ],

  // ==================== 财务 ====================
  finance: [
    [
      { label: '$', insert: '$' }, { label: '¥', insert: '¥' }, { label: '€', insert: '€' },
      { label: '%', insert: '%' }, { label: '‰', insert: '‰' }, { label: 'bp', insert: 'bp' },
    ],
    [
      { label: 'NPV', insert: 'NPV' }, { label: 'IRR', insert: 'IRR' }, { label: 'ROI', insert: 'ROI' },
      { label: 'FV', insert: 'FV' }, { label: 'PV', insert: 'PV' }, { label: 'PMT', insert: 'PMT' },
    ],
    [
      { label: 'CAGR', insert: 'CAGR' }, { label: 'NPV=', insert: 'NPV折现率' }, { label: 'IRR=', insert: 'IRR现金流' },
      { label: '复利', insert: '复利' }, { label: '贷款', insert: '贷款' }, { label: '投资', insert: '投资' },
    ],
    [
      { label: '万元', insert: '万元' }, { label: '年利率', insert: '年利率' }, { label: '月供', insert: '月供' },
      { label: '等额本息', insert: '等额本息' }, { label: '等额本金', insert: '等额本金' }, { label: '提前还款', insert: '提前还款' },
    ],
  ],

  // ==================== 工程 ====================
  engineering: [
    [
      { label: 'kN', insert: 'kN' }, { label: 'MPa', insert: 'MPa' }, { label: 'GPa', insert: 'GPa' },
      { label: 'm²', insert: 'm²' }, { label: 'm³', insert: 'm³' }, { label: 'mm²', insert: 'mm²' },
    ],
    [
      { label: 'L/s', insert: 'L/s' }, { label: 'm³/h', insert: 'm³/h' }, { label: 'kW', insert: 'kW' },
      { label: 'kVA', insert: 'kVA' }, { label: 'kvar', insert: 'kvar' }, { label: 'rpm', insert: 'rpm' },
    ],
    [
      { label: 'σ', insert: 'σ' }, { label: 'τ', insert: 'τ' }, { label: 'ε', insert: 'ε' },
      { label: 'δ', insert: 'δ' }, { label: 'φ', insert: 'φ' }, { label: 'ψ', insert: 'ψ' },
    ],
    [
      { label: 'Q=', insert: 'Q=' }, { label: 'ΔT=', insert: 'ΔT=' }, { label: 'ΔP=', insert: 'ΔP=' },
      { label: 'K=', insert: 'K=' }, { label: 'η=', insert: 'η=' }, { label: 'λ=', insert: 'λ=' },
    ],
  ],

  // ==================== 生活 ====================
  life: [
    [
      { label: 'BMI', insert: 'BMI' }, { label: 'BMR', insert: 'BMR' }, { label: 'TDEE', insert: 'TDEE' },
      { label: 'kcal', insert: 'kcal' }, { label: 'kg/m²', insert: 'kg/m²' }, { label: 'cm', insert: 'cm' },
    ],
    [
      { label: 'oz', insert: 'oz' }, { label: 'lb', insert: 'lb' }, { label: 'cup', insert: 'cup' },
      { label: 'tbsp', insert: 'tbsp' }, { label: 'tsp', insert: 'tsp' }, { label: 'ml', insert: 'ml' },
    ],
    [
      { label: '°C', insert: '°C' }, { label: '°F', insert: '°F' }, { label: 'Gas', insert: 'Gas Mark ' },
      { label: 'MET=', insert: 'MET=' }, { label: 'BFP', insert: 'BFP' }, { label: 'WHR', insert: 'WHR' },
    ],
    [
      { label: '跑步消耗', insert: '跑步消耗 ' }, { label: '减重', insert: '减重' }, { label: '蛋白质', insert: '蛋白质' },
      { label: '碳水', insert: '碳水' }, { label: '脂肪', insert: '脂肪' }, { label: '饮水', insert: '饮水' },
    ],
  ],
};

const TAB_LABELS: Record<string, string> = {
  general: '通用',
  math: '数学',
  greek: '希腊',
  physics: '物理',
  finance: '财务',
  engineering: '工程',
  life: '生活',
};

export default function ScienceKeyboard({ onClose }: Props) {
  const [activeTab, setActiveTab] = useState('general');

  const handleInsert = (text: string) => {
    const input = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!input) return;
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const value = input.value;
    input.value = value.slice(0, start) + text + value.slice(end);
    input.selectionStart = input.selectionEnd = start + text.length;
    input.focus();
  };

  const keys = KEYBOARDS[activeTab] || KEYBOARDS.general;

  return (
    <div className="border-t border-dark-600 bg-dark-800 px-2 py-1 shrink-0">
      <div className="flex gap-1 mb-1 flex-wrap">
        {Object.keys(KEYBOARDS).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-2 py-0.5 text-xs rounded transition-colors ${activeTab === tab ? 'bg-accent-cyan/20 text-accent-cyan' : 'text-dark-400 hover:text-white'}`}
          >
            {TAB_LABELS[tab] || tab}
          </button>
        ))}
        <button onClick={onClose} className="ml-auto text-dark-400 hover:text-white text-xs px-2">✕</button>
      </div>
      {keys.map((row, ri) => (
        <div key={ri} className="grid grid-cols-6 gap-1 mb-1">
          {row.map((key, ki) => (
            <button
              key={ki}
              onClick={() => handleInsert(key.insert)}
              className="py-1.5 text-xs bg-dark-700 hover:bg-dark-600 text-dark-300 hover:text-white rounded transition-colors truncate"
              title={key.insert}
            >
              {key.label}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}