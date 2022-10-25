import { ChangeEvent, Fragment, useCallback, useState } from 'react';
import ReactMapGL, { InteractiveMapProps } from 'react-map-gl';

import {
  MapControlFullscreen,
  MapControlGeolocate,
  MapControlNavigation,
  MapControlScale,
} from '@/components/map';

import ControlPanel from './ControlPanel';

interface MapChangeThemeProps extends InteractiveMapProps {
  themes: any;
}

export default function MapChangeTheme({ themes, ...other }: MapChangeThemeProps) {
  const [selectTheme, setSelectTheme] = useState('outdoors');
  const [viewport, setViewport] = useState({
    latitude: 37.785164,
    longitude: -100,
    zoom: 3.5,
    bearing: 0,
    pitch: 0,
  });

  const handleChangeTheme = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setSelectTheme(event.target.value),
    [],
  );

  return (
    <Fragment>
      <ReactMapGL
        {...viewport}
        onViewportChange={setViewport}
        mapStyle={themes[selectTheme]}
        {...other}
      >
        <MapControlScale />
        <MapControlNavigation />
        <MapControlFullscreen />
        <MapControlGeolocate />
      </ReactMapGL>

      <ControlPanel themes={themes} selectTheme={selectTheme} onChangeTheme={handleChangeTheme} />
    </Fragment>
  );
}
