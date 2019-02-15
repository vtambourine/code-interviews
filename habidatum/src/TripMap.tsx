import * as MapboxGL from "mapbox-gl";
import * as React from 'react';
import * as MapGL from 'react-map-gl';
import StationPin from './StationPin';
import StationPopup from './StationPopup';
import { ITrip } from './TripViewer';

import './TripMap.css';

mapboxgl.accessToken = 'pk.eyJ1IjoidnRhbWJvdXJpbmUiLCJhIjoiYjcxZmM4NWM3NTA1YmY0NzM3NzY4ODQ1ZTFmMTIzYzEifQ.p7IrOn_DYwbmDweqe86u_Q';

interface ITripMapProps {
  data: ITrip[];
  highlightedTrip?: ITrip;
  onViewportChange?: (viewport: MapGL.MapState) => void;
}

interface ITripMapState {
  viewport: MapGL.MapState;
}

export default class TripMap extends React.Component<ITripMapProps, ITripMapState> {

  public map: MapboxGL.Map;

  public constructor(props: ITripMapProps) {
    super(props);
    this.state = {
      viewport: {
        bearing: 0,
        height: 800,
        latitude: 0,
        longitude: 0,
        pitch: 0,
        width: 800,
        zoom: 12
      }
    }
  }

  public componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  public shouldComponentUpdate(nextProps: ITripMapProps, nextState: ITripMapState) {
    if (this.props.data !== nextProps.data) {
      this.fitBounds(nextProps.data);
    }
    return true
  }

  public render() {
    return (
      <div className="TripMap">
        <MapGL.InteractiveMap
          { ... this.state.viewport }
          ref={map => map ? this.map = map.getMap() : null}
          mapboxApiAccessToken={mapboxgl.accessToken}
          onViewportChange={this.onViewportChange}
        >
          {this.props.data.map(this.renderTripPins)}
          {this.renderTripPopups()}
        </MapGL.InteractiveMap>
      </div>
    )
  }

  private fitBounds = (data: ITrip[]) => {
    const bounds = new mapboxgl.LngLatBounds();

    data.forEach(trip => {
      bounds.extend(
        new mapboxgl.LngLatBounds(
          new mapboxgl.LngLat(trip.startStationLongitude, trip.startStationLatitude),
          new mapboxgl.LngLat(trip.endStationLongitude, trip.endStationLatitude)
        )
      );
    });

    this.map.fitBounds(bounds.toArray(), {
      duration: 0,
      linear: true,
      padding: {
        bottom: 20,
        left: 450,
        right: 20,
        top: 20
      }
    });

    const zoom = this.map.getZoom();
    const { lat, lng }  = this.map.getCenter();

    this.setState({
      viewport: {
        ...this.state.viewport,
        latitude: lat,
        longitude: lng,
        zoom
      }
    });
  }

  private resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        height: window.innerHeight,
        width: window.innerWidth
      }
    });
  }

  private onViewportChange = (viewport : MapGL.MapState ) => {
    this.setState({ viewport });
  }

  private renderTripPins = (trip : ITrip, i : number) => {
    // Transform trip duration to meaningful pin size
    const size = Math.log(trip.tripDuration);

    return (
      <React.Fragment key={i}>
        <MapGL.Marker
          latitude={trip.startStationLatitude}
          longitude={trip.startStationLongitude}
        >
          <StationPin
            size={size}
            highlighted={trip === this.props.highlightedTrip}
          />
        </MapGL.Marker>
        <MapGL.Marker
          latitude={trip.endStationLatitude}
          longitude={trip.endStationLongitude}
        >
          <StationPin size={size}
            highlighted={trip === this.props.highlightedTrip} />
        </MapGL.Marker>
      </React.Fragment>
    );
  }

  private renderTripPopups() {
    if (!this.props.highlightedTrip) {
      return null;
    }

    const trip = this.props.highlightedTrip;
    const offset = Math.ceil(Math.log(trip.tripDuration) * 2);

    return (
      <React.Fragment>
        <MapGL.Popup
          className="StationPopup-popup"
          anchor="right"
          offsetLeft={-offset}
          closeOnClick={true}
          closeButton={false}
          latitude={trip.startStationLatitude}
          longitude={trip.startStationLongitude}
        >
          <StationPopup name={trip.startStationName} />
        </MapGL.Popup>
        <MapGL.Popup
          className="StationPopup-popup"
          anchor="left"
          offsetLeft={offset}
          closeOnClick={true}
          closeButton={false}
          latitude={trip.endStationLatitude}
          longitude={trip.endStationLongitude}
        >
          <StationPopup name={trip.endStationName} />
        </MapGL.Popup>
      </React.Fragment>
    );
  }
}
