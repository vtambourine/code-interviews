import * as React from "react";

interface IPropertyPinProps {
  highlighted?: boolean;
}

const size = 10;

const PropertyPin = (props: IPropertyPinProps) => (
  <div className="pin">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2}
        style={{ fill: props.highlighted ? "#f00" : "#225" }}
      />
    </svg>
  </div>
);

export default PropertyPin;
