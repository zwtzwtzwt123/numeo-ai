import { InfoResult } from '../../types';

interface Props {
  result: InfoResult;
}

export default function InfoCard({ result }: Props) {
  return (
    <div className="card-result border-accent-cyan/30">
      <div className="text-sm text-dark-300">{result.message}</div>
    </div>
  );
}