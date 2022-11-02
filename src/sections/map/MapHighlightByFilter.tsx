import { useCallback, useMemo, useState } from 'react';
import MapGL, { Layer, LayerProps, MapEvent, Source } from 'react-map-gl';

import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import {
  MapControlFullscreen,
  MapControlGeolocate,
  MapControlNavigation,
  MapControlPopup,
  MapControlScale,
} from '@/components/map';

export default function MapHighlightByFilter({ ...other }) {
  const theme = useTheme();
  const [hoverInfo, setHoverInfo] = useState<{
    latitude: number;
    longitude: number;
    countyName: string;
  } | null>(null);
  const [viewport, setViewport] = useState({
    latitude: 38.88,
    longitude: -98,
    zoom: 3,
    minZoom: 2,
    bearing: 0,
    pitch: 0,
  });

  const selectedCounty = (hoverInfo && hoverInfo.countyName) || '';
  const filter = useMemo(() => ['in', 'COUNTY', selectedCounty], [selectedCounty]);

  const countiesLayer: LayerProps = {
    id: 'counties',
    type: 'fill',
    source: 'counties',
    'source-layer': 'original',
    paint: {
      'fill-outline-color': theme.palette.grey[900],
      'fill-color': theme.palette.grey[900],
      'fill-opacity': 0.12,
    },
  };

  const highlightLayer: LayerProps = {
    id: 'counties-highlighted',
    type: 'fill',
    source: 'counties',
    'source-layer': 'original',
    paint: {
      'fill-outline-color': theme.palette.error.main,
      'fill-color': theme.palette.error.main,
      'fill-opacity': 0.48,
    },
  };

  const onHover = useCallback((event: MapEvent) => {
    const county = event.features && event.features[0];
    setHoverInfo({
      longitude: event.lngLat[0],
      latitude: event.lngLat[1],
      countyName: county && county.properties.COUNTY,
    });
  }, []);

  return (
    <MapGL
      {...viewport}
      onViewportChange={setViewport}
      onHover={onHover}
      interactiveLayerIds={['counties']}
      {...other}
    >
      <MapControlScale />
      <MapControlNavigation />
      <MapControlFullscreen />
      <MapControlGeolocate />

      <Source type="vector" url="mapbox://mapbox.82pkq93d">
        <Layer beforeId="waterway-label" {...countiesLayer} />
        <Layer beforeId="waterway-label" {...highlightLayer} filter={filter} />
      </Source>

      {selectedCounty && (
        <MapControlPopup
          longitude={hoverInfo.longitude}
          latitude={hoverInfo.latitude}
          closeButton={false}
        >
          <Typography variant="body2" sx={{ color: 'common.white' }}>
            {selectedCounty}
          </Typography>
        </MapControlPopup>
      )}
    </MapGL>
  );
}