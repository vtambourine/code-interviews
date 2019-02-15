import * as React from 'react';
import TripList from './TripList';
import TripMap from './TripMap';

import './TripViewer.css';

export interface ITrip {
  endStationId: number;
  endStationLatitude: number;
  endStationLongitude: number;
  endStationName: string;
  startStationId: number;
  startStationLatitude: number;
  startStationLongitude: number;
  startStationName: string;
  startTime: string;
  stopTime: string;
  tripDuration: number;
}

interface ITripViewerState {
  data: ITrip[];
  pending: boolean;
  selectedTrip?: ITrip;
}

export default class TripViewer extends React.Component<{}, ITripViewerState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: [],
      pending: true
    }
  }

  public componentDidMount() {
    this.setState({ pending: true });
    this.fetchSampleData(10);
  }

  public render() {
    return (
      <div className="TripViewer">
        <TripList
          data={this.state.data}
          pending={this.state.pending}
          onItemEnter={this.selectTrip}
          onItemLeave={this.unselectTrip}
          onSampleChange={this.fetchSampleData}
        />
        <TripMap
          data={this.state.data}
          highlightedTrip={this.state.selectedTrip}
        />
      </div>
    );
  }

  private fetchSampleData = (size: number = 10) => {
    this.setState({ pending: true });
    fetch(`http://localhost:3001?size=${size}`)
      .then(response => response.json())
      .then(json => this.setState({
        data: json,
        pending: false
      }));
  }

  private selectTrip = (trip: ITrip) => {
    this.setState({
      selectedTrip: trip
    })
  }

  private unselectTrip = (trip: ITrip) => {
    this.setState({
      selectedTrip: undefined
    })
  }
}
