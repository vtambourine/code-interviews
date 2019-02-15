import * as MapboxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import cx from "classnames";
import * as MapboxGL from "mapbox-gl";
import Head from "next/head";
import * as React from "react";
import * as MapGL from "react-map-gl";
import PropertyPin from "./PropertyPin";

declare var mapboxgl: MapboxGL;

interface IMapProps {
  className?: string;
  highlightedProperty?: Property;
  items: Property[];
}

interface IMapState {
  points: any;
  viewport: MapGL.InteractiveMapProps;
}

class Map extends React.Component<IMapProps, IMapState> {

  public map: MapboxGL.Map;
  public mapContainer = React.createRef<HTMLDivElement>();

  constructor(props) {
    super(props);

    this.state = {
      points: [],
      viewport: {
        bearing: 0,
        height: 800,
        latitude: 51.5073835,
        longitude: -0.1277801,
        pitch: 0,
        width: 800,
        zoom: 12,
      },
    };
  }

  public componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.resize();

    /* tslint:disable */
    // let mapboxgl = mapboxgl || {};
    mapboxgl.accessToken = "pk.eyJ1IjoidnRhbWJvdXJpbmUiLCJhIjoiYjcxZmM4NWM3NTA1YmY0NzM3NzY4ODQ1ZTFmMTIzYzEifQ.p7IrOn_DYwbmDweqe86u_Q";
    /* tslint:enable */

    // console.log(mapboxgl)

    this.props.items
      .map((property) => `${property.address.postCode} ${property.address.city}`)
      .map((query) => this.forwardGeocode(query));
  }

  public componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  public shouldComponentUpdate(nextProps: IMapProps) {
    if (this.props.items !== nextProps.items) {
      // this.fitBounds();
    }
    return true;
  }

  public render() {
    const classNames = cx(
      "map",
      this.props.className,
    );

    if (typeof mapboxgl === "undefined" || mapboxgl.accessToken === "") {
      return (
        <div />
      );
    }

    return (
      <div
        className={classNames}
        ref={this.mapContainer}
      >
        <MapGL.InteractiveMap
          {...this.state.viewport}
          mapboxApiAccessToken={mapboxgl.accessToken}
        >
          {this.renderPoint()}
        </MapGL.InteractiveMap>
        <style jsx={"true"}>{`
          .map {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: #cad;
          }
        `}</style>
      </div>
    );
  }

  private fitBounds() {
    const bounds = new mapboxgl.LngLatBounds();

    this.state.points.forEach((address) => {
      bounds.extend(
        new mapboxgl.LngLatBounds(
          new mapboxgl.LngLat(address[0], address[1]),
        ),
      );
    });

    this.map.fitBounds(bounds.toArray(), {
      duration: 0,
      linear: true,
      padding: {
        bottom: 20,
        left: 450,
        right: 20,
        top: 20,
      },
    });

    const zoom = this.map.getZoom();
    const { lat, lng } = this.map.getCenter();

    this.setState({
      viewport: {
        ...this.state.viewport,
        latitude: lat,
        longitude: lng,
        zoom,
      },
    });
  }

  private renderPoint() {
    if (!this.state.points) { return null; }

    return this.state.points.map((address, i) => (
      <MapGL.Marker
        key={i}
        latitude={address[1]}
        longitude={address[0]}
      >
        <PropertyPin />
      </MapGL.Marker>
    ));
  }

  // TODO: Debounce resize method
  private resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        height: this.mapContainer.current!.clientHeight,
        width: this.mapContainer.current!.clientWidth,
      },
    });
  }

  private forwardGeocode(query) {
    const geocodingClient = MapboxGeocoding({ accessToken: mapboxgl.accessToken });
    geocodingClient
      .forwardGeocode({
        limit: 1,
        query,
      })
      .send()
      .then((response) => {
        const match = response.body;
        const address = match.features[0].center;
        // this.setState({
        //   points: [ ...this.state.points, address ],
        // }, () => {
        //   this.fitBounds();
        // });
      });
  }
}

export default Map;
