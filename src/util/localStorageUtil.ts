export function saveToLocalStorage<T>(key: string, data: T): void {
  if (typeof key !== 'string') {
    console.error('The key must be a string.');
    return;
  }
  try {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
    console.log(`Data successfully stored under key: ${key}`);
  } catch (error) {
    console.error('Failed to store data in localStorage:', error);
  }
}

export function getFromLocalStorage<T>(key: string): T | null {
  if (typeof key !== 'string') {
    console.error('The key must be a string.');
    return null;
  }
  try {
    const jsonData = localStorage.getItem(key);
    if (!jsonData) {
      console.warn(`No data found for key: ${key}`);
      return null;
    }
    return JSON.parse(jsonData) as T;
  } catch (error) {
    console.error('Failed to retrieve data from localStorage:', error);
    return null;
  }
}

export function removeFromLocalStorage(key: string): void {
  if (typeof key !== 'string') {
    console.error('The key must be a string.');
    return;
  }
  try {
    localStorage.removeItem(key);
    console.log(`Data under key: ${key} has been removed.`);
  } catch (error) {
    console.error('Failed to remove data from localStorage:', error);
  }
}

export function getConstFromLocalStorage(key: string): string | null {
  try {
    const token = localStorage.getItem(key);
    if (!token) {
      console.warn(`No data found for key: ${key}`);
      return null;
    }
    return token;
  } catch (error) {
    console.error('Failed to retrieve data from localStorage:', error);
    return null;
  }
}

export function saveConstToLocalStorage(key: string, data: string): void {
  if (typeof key !== 'string') {
    console.error('The key must be a string.');
    return;
  }
  try {
    localStorage.setItem(key, data);
  } catch (error) {
    console.error('Failed to store data in localStorage:', error);
  }
}
