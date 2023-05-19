export const saveData = (key, value) => {
  window.localStorage.setItem(key, value);
};

export const getData = (key) => {
  const value = window.localStorage.getItem(key);
  return value;
};

export const removeData = (key) => {
  window.localStorage.removeItem(key);
};
