import { ErrorResult } from '../../types';

interface Props {
  result: ErrorResult;
}

export default function ErrorCard({ result }: Props) {
  return (
    <div className="card-result border-red-500/30">
      <div className="flex items-start gap-2">
        <span className="text-red-400 shrink-0">⚠</span>
        <div>
          <div className="text-sm text-red-300">{result.message}</div>
          <div className="text-xs text-dark-500 mt-1">请尝试换一种方式描述你的问题。</div>
        </div>
      </div>
    </div>
  );
}