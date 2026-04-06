export const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export const monthFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
});

export function formatCurrency(value) {
  return currency.format(value);
}

export function formatDate(value) {
  return dateFormatter.format(new Date(value));
}

export function getSummary(transactions) {
  const income = transactions
    .filter((item) => item.type === 'income')
    .reduce((total, item) => total + item.amount, 0);
  const expenses = transactions
    .filter((item) => item.type === 'expense')
    .reduce((total, item) => total + item.amount, 0);

  return {
    income,
    expenses,
    balance: income - expenses,
  };
}

export function getCategoryExpenseData(transactions) {
  const categoryTotals = transactions.reduce((accumulator, transaction) => {
    if (transaction.type !== 'expense') {
      return accumulator;
    }

    accumulator[transaction.category] = (accumulator[transaction.category] ?? 0) + transaction.amount;
    return accumulator;
  }, {});

  return Object.entries(categoryTotals)
    .map(([name, value]) => ({ name, value }))
    .sort((left, right) => right.value - left.value);
}

export function getBalanceTrendData(transactions) {
  const ordered = [...transactions].sort((left, right) => new Date(left.date) - new Date(right.date));
  let runningBalance = 0;

  return ordered.map((transaction) => {
    runningBalance += transaction.type === 'income' ? transaction.amount : -transaction.amount;
    return {
      date: transaction.date,
      label: `${monthFormatter.format(new Date(transaction.date))} ${new Date(transaction.date).getDate()}`,
      balance: runningBalance,
      income: transaction.type === 'income' ? transaction.amount : 0,
      expense: transaction.type === 'expense' ? transaction.amount : 0,
    };
  });
}

export function getMonthlyComparisonData(transactions) {
  const monthlyMap = transactions.reduce((accumulator, transaction) => {
    const date = new Date(transaction.date);
    const key = `${date.getFullYear()}-${date.getMonth()}`;

    if (!accumulator[key]) {
      accumulator[key] = {
        month: monthFormatter.format(date),
        income: 0,
        expenses: 0,
      };
    }

    if (transaction.type === 'income') {
      accumulator[key].income += transaction.amount;
    } else {
      accumulator[key].expenses += transaction.amount;
    }

    return accumulator;
  }, {});

  return Object.values(monthlyMap);
}

export function getInsights(transactions) {
  const expensesByCategory = getCategoryExpenseData(transactions);
  const monthlyComparison = getMonthlyComparisonData(transactions);
  const topCategory = expensesByCategory[0];
  const latestMonth = monthlyComparison.at(-1);
  const previousMonth = monthlyComparison.at(-2);
  const largestExpense = transactions
    .filter((transaction) => transaction.type === 'expense')
    .sort((left, right) => right.amount - left.amount)[0];
  const monthlyDelta = latestMonth && previousMonth
    ? latestMonth.expenses - previousMonth.expenses
    : 0;

  return {
    topCategory,
    largestExpense,
    monthlyDelta,
    savingsRate: (() => {
      const { income, expenses } = getSummary(transactions);
      return income ? Math.round(((income - expenses) / income) * 100) : 0;
    })(),
    note: topCategory
      ? `${topCategory.name} accounts for the largest share of your spending.`
      : 'Add transactions to unlock personalized insights.',
  };
}

export function getUniqueCategories(transactions) {
  return [...new Set(transactions.map((transaction) => transaction.category))].sort();
}

export function filterTransactions(transactions, filters) {
  const search = filters.search.trim().toLowerCase();

  return transactions.filter((transaction) => {
    const matchesSearch = search
      ? [transaction.description, transaction.category, transaction.type]
          .join(' ')
          .toLowerCase()
          .includes(search)
      : true;
    const matchesType = filters.type === 'all' ? true : transaction.type === filters.type;
    const matchesCategory = filters.category === 'all' ? true : transaction.category === filters.category;
    const matchesStartDate = filters.startDate ? transaction.date >= filters.startDate : true;
    const matchesEndDate = filters.endDate ? transaction.date <= filters.endDate : true;

    return matchesSearch && matchesType && matchesCategory && matchesStartDate && matchesEndDate;
  });
}

export function exportTransactions(transactions, format) {
  if (format === 'json') {
    return JSON.stringify(transactions, null, 2);
  }

  const headers = ['date', 'description', 'amount', 'category', 'type'];
  const rows = transactions.map((item) =>
    headers
      .map((header) => JSON.stringify(item[header] ?? ''))
      .join(','),
  );

  return [headers.join(','), ...rows].join('\n');
}
