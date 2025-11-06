import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

const DEFAULT_LOCATION = {
  latitude: 34.052235,
  longitude: -118.243683,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

export const useLocation = () => {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          setError('Location permission denied');
          setLocation(DEFAULT_LOCATION);
          setLoading(false);
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } catch (err) {
        setError(err.message);
        setLocation(DEFAULT_LOCATION);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { location, loading, error };
};