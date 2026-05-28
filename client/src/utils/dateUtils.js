export const getCurrentMonthYear = () => {
  const now = new Date();
  return {
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  };
};

export const getMonthName = (month) => {
  return new Date(2000, month - 1, 1).toLocaleString("en-IN", {
    month: "long",
  });
};

export const getMonthShort = (month) => {
  return new Date(2000, month - 1, 1).toLocaleString("en-IN", {
    month: "short",
  });
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const getLastNMonths = (n = 6) => {
  const result = [];
  const now = new Date();

  for (let i = 0; i < n; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    result.push({
      month: d.getMonth() + 1,
      year: d.getFullYear(),
      label: `${getMonthName(d.getMonth() + 1)} ${d.getFullYear()}`,
    });
  }

  return result;
};
