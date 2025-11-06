import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@roastroute_favorites';

export const getFavorites = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

export const addFavorite = async (shopId) => {
  try {
    const favorites = await getFavorites();
    if (!favorites.includes(shopId)) {
      const updated = [...favorites, shopId];
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    }
  } catch (error) {
    console.error('Error adding favorite:', error);
    throw error;
  }
};

export const removeFavorite = async (shopId) => {
  try {
    const favorites = await getFavorites();
    const updated = favorites.filter((id) => id !== shopId);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error removing favorite:', error);
    throw error;
  }
};

export const clearFavorites = async () => {
  try {
    await AsyncStorage.removeItem(FAVORITES_KEY);
  } catch (error) {
    console.error('Error clearing favorites:', error);
    throw error;
  }
};