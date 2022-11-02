import { Fragment, useCallback, useState } from 'react';
import MapGL from 'react-map-gl';
import { CallbackEvent } from 'react-map-gl/src/components/draggable-control';

import {
  MapControlFullscreen,
  MapControlGeolocate,
  MapControlMarker,
  MapControlNavigation,
  MapControlScale,
} from '@/components/map';

import ControlPanel from './ControlPanel';

export default function MapDraggableMarkers({ ...other }) {
  const [events, logEvents] = useState({});
  const [marker, setMarker] = useState({
    latitude: 40,
    longitude: -100,
  });
  const [viewport, setViewport] = useState({
    latitude: 40,
    longitude: -100,
    zoom: 3.5,
    bearing: 0,
    pitch: 0,
  });

  const onMarkerDragStart = useCallback((event: CallbackEvent) => {
    logEvents((_events) => ({ ..._events, onDragStart: event.lngLat }));
  }, []);

  const onMarkerDrag = useCallback((event: CallbackEvent) => {
    logEvents((_events) => ({ ..._events, onDrag: event.lngLat }));
  }, []);

  const onMarkerDragEnd = useCallback((event: CallbackEvent) => {
    logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));
    setMarker({
      longitude: event.lngLat[0],
      latitude: event.lngLat[1],
    });
  }, []);

  return (
    <Fragment>
      <MapGL {...viewport} onViewportChange={setViewport} {...other}>
        <MapControlScale />
        <MapControlNavigation />
        <MapControlFullscreen />
        <MapControlGeolocate />

        <MapControlMarker
          draggable
          longitude={marker.longitude}
          latitude={marker.latitude}
          offsetTop={-20}
          offsetLeft={-10}
          onDragStart={onMarkerDragStart}
          onDrag={onMarkerDrag}
          onDragEnd={onMarkerDragEnd}
        />
      </MapGL>

      <ControlPanel events={events} />
    </Fragment>
  );
}
