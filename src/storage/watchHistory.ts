import { CONFIG } from '../config';

interface HistoryItem {
  slug: string;
  title: string;
  poster: string;
  lastEpisode: string;
  watchedAt: number;
}

const HISTORY_KEY = 'vteen_watch_history';

const getAuthHeader = () => {
  const user = localStorage.getItem('vteen_user');
  if (user) {
    const parsed = JSON.parse(user);
    if (parsed.api_token) return { 'Authorization': `Bearer ${parsed.api_token}` };
  }
  return {};
};

export const saveToHistory = async (item: Omit<HistoryItem, 'watchedAt'>) => {
  const history = getHistory();
  const newItem: HistoryItem = {
    ...item,
    watchedAt: Date.now()
  };

  const filtered = history.filter(h => h.slug !== item.slug);
  const updated = [newItem, ...filtered].slice(0, 20);

  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));

  try {
    await fetch(`${CONFIG.API_BASE_URL}/sync_history.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(getAuthHeader() as Record<string, string>)
      },
      body: JSON.stringify(item),
      credentials: 'include'
    });
  } catch (e) {
    console.warn('Failed to sync history to server');
  }
};

export const getHistory = (): HistoryItem[] => {
  const data = localStorage.getItem(HISTORY_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

export const syncHistoryWithServer = async () => {
  try {
    const response = await fetch(`${CONFIG.API_BASE_URL}/sync_history.php`, {
      headers: getAuthHeader() as Record<string, string>,
      credentials: 'include'
    });
    const result = await response.json();
    if (result.status === 'success' && Array.isArray(result.data)) {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(result.data));
      return result.data;
    }
  } catch (e) {
    console.error('Sync history failed:', e);
  }
  return getHistory();
};

export const clearHistory = () => {
  localStorage.removeItem(HISTORY_KEY);
};

export const removeFromHistory = (slug: string) => {
  const history = getHistory();
  const updated = history.filter(h => h.slug !== slug);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
};
