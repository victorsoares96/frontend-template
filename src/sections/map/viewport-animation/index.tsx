import { useCallback, useState } from 'react';
import MapGL, { FlyToInterpolator, InteractiveMapProps } from 'react-map-gl';

import {
  MapControlFullscreen,
  MapControlGeolocate,
  MapControlNavigation,
  MapControlScale,
} from '@/components/map';

import ControlPanel from './ControlPanel';

interface MapViewportAnimationProps extends InteractiveMapProps {
  data: any[];
}

export default function MapViewportAnimation({ data, ...other }: MapViewportAnimationProps) {
  const [selectedCity, setSelectedCity] = useState(data[2].city);
  const [viewport, setViewport] = useState({
    latitude: 37.7751,
    longitude: -122.4193,
    zoom: 10,
    bearing: 0,
    pitch: 0,
  });

  const handleChangeCity = useCallback((event, { longitude, latitude }) => {
    setSelectedCity(event.target.value);
    setViewport({
      longitude,
      latitude,
      zoom: 10,
      transitionInterpolator: new FlyToInterpolator({ speed: 1.2 }),
      transitionDuration: 'auto',
    });
  }, []);

  return (
    <MapGL {...viewport} onViewportChange={setViewport} dragRotate={false} {...other}>
      <MapControlScale />
      <MapControlNavigation />
      <MapControlFullscreen />
      <MapControlGeolocate />

      <ControlPanel data={data} selectedCity={selectedCity} handleChange={handleChangeCity} />
    </MapGL>
  );
}
