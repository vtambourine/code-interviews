import { Button, List } from 'antd';
import * as classNames from 'classnames';
import * as moment from 'moment';
import * as React from 'react';
import { ITrip } from './TripViewer';

import './TripList.css';

export interface ITripListProps {
  data: object[];
  pending: boolean;
  onSampleChange: (event: number) => void;
  onItemEnter: (event: ITrip) => void;
  onItemLeave: (event: ITrip) => void;
}

class TripList extends React.Component<ITripListProps> {
  public render() {
    return (
      <div className={classNames('TripList', { '-pending': this.props.pending })}>
        <List
          bordered={true}
          header={this.renderHeader()}
          size="small"
          dataSource={this.props.data}
          renderItem={this.renderItem} />
      </div>
    )
  }

  private renderHeader() {
    const samples = [10, 50, 100, 500];
    return (
      <div className="TripList-header">
        Size of sample data:
        {samples.map(s => (
          <Button
            key={s}
            className="TripList-headerButton"
            size="small"
            type="primary"
            disabled={this.props.pending}
            onClick={this.props.onSampleChange.bind(null, s)}>
            {s}
          </Button>
        ))}
      </div>
    )
  }

  private renderItem = (item: ITrip, i: number) => {
    return (
      <List.Item className="TripList-item" key={i}>
        <div className="TripList-itemHolder"
          onMouseEnter={this.props.onItemEnter.bind(this, item)}
          onMouseLeave={this.props.onItemLeave.bind(this, item)}>
          <List.Item.Meta
            title={this.renderTitle(item)}
            description={this.renderDescription(item)}/>
        </div>
      </List.Item>
    );
  }

  private renderTitle(item: ITrip) {
    return (
      <div className="TripList-itemTitle">
        {item.startStationName}
        <em>&rarr;</em>
        {item.endStationName}
      </div>
    );
  }

  private renderDescription(item: ITrip) {
    const startTimeFormatted = moment(item.startTime).format('MM/D HH:mm');
    const stopTimeFormatted = moment(item.stopTime).format('MM/D HH:mm');
    const durationFormatted = moment.duration(item.tripDuration, 'seconds').humanize();

    return (
      <div className="TripList-itemDescription">
        <strong className="TripList-itemDuration">
          {durationFormatted}
        </strong>
        {`${startTimeFormatted} — ${stopTimeFormatted}`}
      </div>
    );
  }
}

export default TripList;
