const REGEX_DASHBOARD_KEY = 'regexDashboard';

export const saveToLocalStorage = (data: string) => {
  localStorage.setItem(REGEX_DASHBOARD_KEY, data);
};

export const getFromLocalStorage = () => {
  const data = localStorage.getItem(REGEX_DASHBOARD_KEY);
  return data ? JSON.parse(data) : null;
};