import { useEffect } from 'react';
import Header from './components/layout/Header';
import OverviewSection from './components/dashboard/OverviewSection';
import BalanceChart from './components/dashboard/BalanceChart';
import CategoryChart from './components/dashboard/CategoryChart';
import InsightsSection from './components/dashboard/InsightsSection';
import TransactionsSection from './components/transactions/TransactionsSection';
import { useFinanceStore } from './store/useFinanceStore';
import {
  exportTransactions,
  getBalanceTrendData,
  getCategoryExpenseData,
  getInsights,
  getSummary,
  getUniqueCategories,
} from './lib/finance';

function downloadFile(content, fileName, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

export default function App() {
  const {
    role,
    darkMode,
    transactions,
    isLoading,
    filters,
    initializeTransactions,
    setRole,
    toggleDarkMode,
    setFilters,
    resetFilters,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    restoreSeedData,
  } = useFinanceStore();

  const summary = getSummary(transactions);
  const balanceTrendData = getBalanceTrendData(transactions);
  const categoryData = getCategoryExpenseData(transactions);
  const insights = getInsights(transactions);
  const categories = getUniqueCategories(transactions);

  useEffect(() => {
    document.documentElement.style.colorScheme = darkMode ? 'dark' : 'light';
    document.body.className = darkMode ? 'bg-slate-950' : 'bg-slate-100';
  }, [darkMode]);

  useEffect(() => {
    initializeTransactions();
  }, [initializeTransactions]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'text-slate-100' : 'text-slate-900'
      }`}
    >
      <div
        className={`min-h-screen ${
          darkMode
            ? 'grid-pattern bg-transparent'
            : 'bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.12),_transparent_30%),linear-gradient(180deg,#f8fafc_0%,#e2e8f0_100%)]'
        }`}
      >
        <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Header
            role={role}
            onRoleChange={setRole}
            darkMode={darkMode}
            onDarkModeToggle={toggleDarkMode}
            onExportJson={() =>
              downloadFile(
                exportTransactions(transactions, 'json'),
                'finance-dashboard-transactions.json',
                'application/json',
              )
            }
            onExportCsv={() =>
              downloadFile(
                exportTransactions(transactions, 'csv'),
                'finance-dashboard-transactions.csv',
                'text/csv;charset=utf-8',
              )
            }
          />

          <OverviewSection summary={summary} />

          <section className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <BalanceChart data={balanceTrendData} />
            <CategoryChart data={categoryData} />
          </section>

          <TransactionsSection
            role={role}
            categories={categories}
            filters={filters}
            transactions={transactions}
            isLoading={isLoading}
            onFilterChange={setFilters}
            onResetFilters={resetFilters}
            onAddTransaction={addTransaction}
            onEditTransaction={updateTransaction}
            onDeleteTransaction={deleteTransaction}
            onRestoreSeedData={restoreSeedData}
          />

          <InsightsSection insights={insights} />
        </main>
      </div>
    </div>
  );
}
