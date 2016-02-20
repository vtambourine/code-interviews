import React, { Component, PropTypes } from 'react'

export default class ComparisonTable extends Component {
  static propTypes = {
    products: PropTypes.array
  }

  static defaultProps = {
    products: []
  }

  render() {
    var comparison = {}
    this.props.products.forEach((product, i) => {
      if (!product) return
      const { attributes } = product
      for (let key in attributes) {
        comparison[key] = comparison[key] || {}
        comparison[key][i] = attributes[key]
      }
    })

    const tableHead = (
      <thead>
        <tr>
          <th className="spec-name"></th>
          {this.props.products.map((product, key) => {
            var value;

            if (!product) {
              value = 'No product'
            } else {
              const { isFetching, attributes, error } = product

              if (isFetching) {
                value = 'Loading...'
              } else if (!isFetching && error) {
                value = error
              } else {
                value = product.attributes.Model
              }
            }

            return <th className="spec-value" key={key}>{value}</th>
          })}
        </tr>
      </thead>
    )

    const tableBody = (
      <tbody>
        {Object.keys(comparison).map((spec, key) => {
          return (
            <tr key={key}>
              <td className="spec-name">{spec}</td>
              <td className="spec-value">{comparison[spec][0] || '—'}</td>
              <td className="spec-value">{comparison[spec][1] || '—'}</td>
            </tr>
          )
        })}
      </tbody>
    )

    return (
      <div className="comparison">
        <table className="u-full-width">
          {tableHead}
          {tableBody}
        </table>
      </div>
    )
  }
}
