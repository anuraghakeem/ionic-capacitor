import {useState, useEffect} from 'react';

const defaultSettings = {
  enableHighAccuracy: false,
  timeout: Infinity,
  maximumAge: 0,
};

export const usePosition = (watch = false, settings = defaultSettings) => {
  const [position, setPosition] = useState({});
  const [error, setError] = useState("");

  const onChange = ({coords, timestamp}:any) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
      accuracy: coords.accuracy,
      timestamp,
    });
  };

  const onError = (error:any) => {
    setError(error.message);
  };

  useEffect(() => {
    const geo:any = navigator.geolocation;
    if (!geo) {
      setError('Geolocation is not supported');
      return;
    }

    let watcher:any = null;
    if (watch) {
      watcher = geo.watchPosition(onChange, onError, settings);
    } else {
      geo.getCurrentPosition(onChange, onError, settings);
    }

    return () => watcher && geo.clearWatch(watcher);
  }, [settings]);

  return {...position, error};
};