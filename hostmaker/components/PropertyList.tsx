import cx from "classnames";
import * as React from "react";
import css from "styled-jsx/css";
import PropertyItem from "./PropertyItem";

interface IPropertyListProps {
  className?: string;
  items?: Property[];
  onItemEnter: (event: Property) => void;
  onItemLeave: (event: Property) => void;
}

class PropertyList extends React.Component<IPropertyListProps> {
  public render() {
    const classNames = cx(
      "root",
      this.props.className,
    );

    return (
      <div className={classNames}>
        <div className="list">
          <div className="header">
            <div className="owner">Owner</div>
            <div className="address">Address</div>
            <div className="income">Income</div>
          </div>
          <div className="body">
            {this.props.items.map(this.renderItem)}
          </div>

          <style jsx={true}>{styles}</style>
        </div>
      </div>
    );
  }

  public renderItem = (item: Property, index) => {
    return (
      <PropertyItem
        key={index}
        onLeave={this.props.onItemLeave}
        onEnter={this.props.onItemEnter}
        property={item}
      />
    );
  }
}

const styles = css`
  .list {
    display: table;
    background-color: #fff;
  }

  .header {
    display: table-row;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 12px;
    text-align: center;
  }

  .header div {
    display: table-cell;
    padding: 8px 12px;
  }

  .body {
    display: table-row-group;
  }

  .owner {
    padding: 0;
    list-style: none;
  }
`;

export default PropertyList;
