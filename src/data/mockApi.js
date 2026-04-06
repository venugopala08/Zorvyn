import { seedTransactions } from './seed';

const MOCK_DELAY_MS = 650;

export function fetchTransactions() {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(seedTransactions);
    }, MOCK_DELAY_MS);
  });
}
