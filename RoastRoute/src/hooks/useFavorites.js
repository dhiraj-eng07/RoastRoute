import { useState, useEffect, useCallback } from 'react';
import { getFavorites, addFavorite, removeFavorite } from '../services/storageService';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = useCallback(async () => {
    try {
      const favs = await getFavorites();
      setFavorites(favs);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const addToFavorites = async (shopId) => {
    try {
      await addFavorite(shopId);
      setFavorites((prev) => [...prev, shopId]);
      return true;
    } catch (error) {
      console.error('Error adding favorite:', error);
      return false;
    }
  };

  const removeFromFavorites = async (shopId) => {
    try {
      await removeFavorite(shopId);
      setFavorites((prev) => prev.filter((id) => id !== shopId));
      return true;
    } catch (error) {
      console.error('Error removing favorite:', error);
      return false;
    }
  };

  const isFavorite = (shopId) => favorites.includes(shopId);

  return {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    refreshFavorites: loadFavorites,
  };
};