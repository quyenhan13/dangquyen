import { CONFIG } from '../config';

interface FavoriteItem {
  slug: string;
  title: string;
  poster: string;
}

const FAV_KEY = 'vteen_favorites';

const getAuthHeader = () => {
  const user = localStorage.getItem('vteen_user');
  if (user) {
    const parsed = JSON.parse(user);
    if (parsed.api_token) return { 'Authorization': `Bearer ${parsed.api_token}` };
  }
  return {};
};

export const toggleFavorite = (item: FavoriteItem): boolean => {
  const favs = getFavorites();
  const index = favs.findIndex(f => f.slug === item.slug);
  let updated;
  let isAdded = false;

  if (index === -1) {
    updated = [item, ...favs];
    isAdded = true;
    syncFavAction(item, 'add');
  } else {
    updated = favs.filter(f => f.slug !== item.slug);
    isAdded = false;
    syncFavAction(item, 'remove');
  }

  localStorage.setItem(FAV_KEY, JSON.stringify(updated));
  return isAdded;
};

const syncFavAction = async (item: FavoriteItem, action: 'add' | 'remove') => {
  try {
    await fetch(`${CONFIG.API_BASE_URL}/sync_favorites.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(getAuthHeader() as Record<string, string>)
      },
      body: JSON.stringify({ ...item, action }),
      credentials: 'include'
    });
  } catch (e) {
    console.warn('Fav sync failed');
  }
};

export const getFavorites = (): FavoriteItem[] => {
  const data = localStorage.getItem(FAV_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

export const syncFavoritesWithServer = async () => {
  try {
    const response = await fetch(`${CONFIG.API_BASE_URL}/sync_favorites.php`, {
      headers: getAuthHeader() as Record<string, string>,
      credentials: 'include'
    });
    const result = await response.json();
    if (result.status === 'success' && Array.isArray(result.data)) {
      localStorage.setItem(FAV_KEY, JSON.stringify(result.data));
      return result.data;
    }
  } catch (e) {
    console.error('Sync favorites failed:', e);
  }
  return getFavorites();
};

export const isFavorite = (slug: string): boolean => {
  const favs = getFavorites();
  return favs.some(f => f.slug === slug);
};
