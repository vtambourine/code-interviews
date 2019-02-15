// import dynamic from "next/dynamic";
import * as React from "react";
import Map from "../components/Map";
import PropertyList from "../components/PropertyList";

// tslint:disable-next-line
const data = require("../test/fixtures/data.json");

function getProperties() {
  return data;
}

interface IViewerState {
  selectedProperty?: Property;
}

class Viewer extends React.Component<{}, IViewerState> {
  constructor(props) {
    super(props);
    this.state = {
      selectedProperty: null,
    };
  }

  public render() {
    return (
      <>
        <Map
          className="property-map"
          items={getProperties()}
          highlightedProperty={this.state.selectedProperty}
        />
        <PropertyList
          className="property-list"
          items={getProperties()}
          onItemEnter={this.selectProperty}
          onItemLeave={this.unselectProperty}
        />

        <style jsx={true}>{`
          :global(.property-list) {
            position: absolute;
            left: 6px;
            top: 6px;
            bottom: 10px;
            overflow: auto;
            background-color: #fff;
            overflow: visible;
          }

          :global(.property-map) {
            position: absolute;
          }
        `}</style>
      </>
    );
  }

  private selectProperty = (property: Property) => {
    this.setState({
      selectedProperty: property,
    });
  }

  private unselectProperty = () => {
    this.setState({
      selectedProperty: null,
    });
  }
}

export default Viewer;
