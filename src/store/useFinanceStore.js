import { create } from 'zustand';
import { seedTransactions } from '../data/seed';
import { fetchTransactions } from '../data/mockApi';

const storageKey = 'finance-dashboard-store';

function loadPersistedState() {
  try {
    const rawValue = localStorage.getItem(storageKey);
    return rawValue ? JSON.parse(rawValue) : null;
  } catch {
    return null;
  }
}

function persistState(snapshot) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(snapshot));
  } catch {
    // Ignore persistence issues so the UI stays usable in restricted environments.
  }
}

const defaultState = {
  role: 'admin',
  darkMode: true,
  transactions: [],
  hasHydratedTransactions: false,
  isLoading: false,
  filters: {
    search: '',
    type: 'all',
    category: 'all',
    sortBy: 'date-desc',
    startDate: '',
    endDate: '',
  },
};

const persistedState = loadPersistedState();

const initialState = persistedState
  ? {
      ...defaultState,
      ...persistedState,
      filters: {
        ...defaultState.filters,
        ...persistedState.filters,
      },
    }
  : defaultState;

export const useFinanceStore = create((set) => ({
  ...initialState,
  initializeTransactions: async () => {
    set((state) => {
      if (state.hasHydratedTransactions || state.transactions.length > 0) {
        return state;
      }

      return { ...state, isLoading: true };
    });

    const currentState = useFinanceStore.getState();

    if (currentState.hasHydratedTransactions || currentState.transactions.length > 0) {
      return;
    }

    const transactions = await fetchTransactions();

    set((state) => {
      if (state.transactions.length > 0) {
        const nextState = {
          ...state,
          hasHydratedTransactions: true,
          isLoading: false,
        };
        persistState(nextState);
        return nextState;
      }

      const nextState = {
        ...state,
        transactions,
        hasHydratedTransactions: true,
        isLoading: false,
      };
      persistState(nextState);
      return nextState;
    });
  },
  setRole: (role) =>
    set((state) => {
      const nextState = { ...state, role };
      persistState(nextState);
      return nextState;
    }),
  toggleDarkMode: () =>
    set((state) => {
      const nextState = { ...state, darkMode: !state.darkMode };
      persistState(nextState);
      return nextState;
    }),
  setFilters: (filters) =>
    set((state) => {
      const nextState = { ...state, filters: { ...state.filters, ...filters } };
      persistState(nextState);
      return nextState;
    }),
  resetFilters: () =>
    set((state) => {
      const nextState = {
        ...state,
        filters: {
          search: '',
          type: 'all',
          category: 'all',
          sortBy: 'date-desc',
          startDate: '',
          endDate: '',
        },
      };
      persistState(nextState);
      return nextState;
    }),
  addTransaction: (transaction) =>
    set((state) => {
      const nextState = {
        ...state,
        transactions: [transaction, ...state.transactions],
      };
      persistState(nextState);
      return nextState;
    }),
  updateTransaction: (transactionId, updates) =>
    set((state) => {
      const nextState = {
        ...state,
        transactions: state.transactions.map((transaction) =>
          transaction.id === transactionId ? { ...transaction, ...updates } : transaction,
        ),
      };
      persistState(nextState);
      return nextState;
    }),
  deleteTransaction: (transactionId) =>
    set((state) => {
      const nextState = {
        ...state,
        transactions: state.transactions.filter((transaction) => transaction.id !== transactionId),
      };
      persistState(nextState);
      return nextState;
    }),
  restoreSeedData: () =>
    set((state) => {
      const nextState = {
        ...state,
        transactions: seedTransactions,
        hasHydratedTransactions: true,
        isLoading: false,
      };
      persistState(nextState);
      return nextState;
    }),
}));
