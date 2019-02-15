import * as classNames from 'classnames';
import * as React from 'react';

import './StationPin.css';

interface IStationPinProps {
  size?: number;
  highlighted?: boolean;
}

export default class StationPin extends React.PureComponent<IStationPinProps> {
  public render() {
    const size: number = Math.ceil(this.props.size || 0);

    return (
      <div className={classNames(
        'StationPin',
        { '-active': this.props.highlighted }
      )}>
        <svg xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${size} ${size}`}
          width={size}
          height={size}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2}
            style={{ fill: this.props.highlighted ? '#f00' : '#225' }}
          />
        </svg>
      </div>
    );
  }
}
