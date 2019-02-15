import * as React from 'react';

import './StationPopup.css';

interface IStationPopupProps {
  name: string;
}

export default class StationPopup extends React.PureComponent<IStationPopupProps> {
  public render() {
    return (
      <div className="StationPopup">{this.props.name}</div>
    );
  }
}
