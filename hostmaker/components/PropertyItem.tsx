import * as React from "react";

interface IPropertyItemProps {
  property: Property;
  onEnter?: (event: Property) => void;
  onLeave?: (event: Property) => void;
}

class PropertyItem extends React.Component<IPropertyItemProps> {
  public render() {
    const { property } = this.props;

    return (
      <div
        className="item"
        onMouseEnter={this.props.onEnter.bind(this, property)}
        onMouseLeave={this.props.onLeave.bind(this, property)}
      >
        <div className="owner">
          {this.renderOwner()}
        </div>

        <div className="address">
          {this.renderAddress()}
        </div>

        <div className="income">
          {`£ ${property.incomeGenerated}`}
        </div>

        <style jsx={true}>{`
          .item {
            position: relative;
            display: table-row;
            cursor: pointer;
            background-color: #fff;
            transition: all 0.24s ease;
            font-size: 100%;
          }

          .item:nth-child(odd) {
            background-color: #f0f0f0;
          }

          .item:after {
            content: '';
            display: block;
            position: absolute;
            background: #58c4c6;
            left: 0;
            right: 0;
            bottom: 0;
            height: 0;
            z-index: 1;
            transition: all 0.24s ease;
          }

          .item:hover {
            box-shadow: 0px 0px 0px 2px #58c4c6;
          }

          .item:hover:after {
            left: -2px;
            right: -2px;
            bottom: -2px;
            height: 2px;
          }

          .item div {
            display: table-cell;
            padding: 6px 12px;
            transition: all 0.24s ease;
            vertical-align: top;
          }

          .item .address {
            font-size: 80%;
          }
        `}</style>
      </div>
    );
  }

  private renderAddress() {
    const { address } = this.props.property;
    const addressLines = Object.entries(address).map(([key, value], index) => {
      if (/^line\d+/.test(key)) {
        return <div key={index}>{value}</div>;
      }
    });

    return (
      <>
        {addressLines}
        <div>{`${address.postCode} ${address.city}`}</div>
        <div>{address.country}</div>
      </>
    );
  }

  private renderOwner() {
    const { owner } = this.props.property;

    return (
      <div className="owner">
          <div className="photo">
            {[
              "👱🏻‍♂️", "👱🏾‍♂️", "🧔🏻", "🧔🏽",
              "👩🏻", "👩🏾", "👱🏻‍♀️", "👱🏽‍♀️",
              "🤖",
            ][Math.floor(Math.random() * 9)]}
          </div>
          {owner}
          <style jsx={true}>{`
            .owner {
              text-align: center;
            }

            .photo {
              font-size: 36px;
              line-height: 1;
            }
          `}</style>
        </div>
    );
  }

}

export default PropertyItem;
