import { useState, useEffect } from 'react';
import { fetchRoasts } from '../services/api';

const useRoasts = () => {
  const [roasts, setRoasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRoasts = async () => {
      try {
        const data = await fetchRoasts();
        setRoasts(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadRoasts();
  }, []);

  return { roasts, loading, error };
};

export default useRoasts;