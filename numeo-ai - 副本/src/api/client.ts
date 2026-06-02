import { CalculationResult, ModuleInfo } from '../types';

// Worker API 地址 —— 部署时改为你的实际地址
const API_URL = 'https://long-union-7f5e.zwtzwtzwt123456789.workers.dev';

export async function getPlatformInfo(): Promise<{
  platform: string;
  version: string;
  modules: ModuleInfo[];
  status: string;
}> {
  const response = await fetch(API_URL);
  return response.json();
}

export async function sendCalculation(query: string): Promise<CalculationResult | { type: string; message: string }> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  return response.json();
}