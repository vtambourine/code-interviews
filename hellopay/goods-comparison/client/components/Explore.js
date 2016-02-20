import React, { Component, PropTypes } from 'react'

export default class Explore extends Component {
  static propTypes = {
    products: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired
  }

  getInputValues = () => {
    return Object.values(this.refs).map(ref => ref.value)
  }

  handleGoClick = (e) => {
    e.preventDefault()
    this.props.onChange(this.getInputValues())
  }

  render() {
    const { products } = this.props

    return (
      <div>
        <p>Insert two product page URLs to compare its attributes</p>
        <form>
          {products.map((product, i) => (
            <div key={i}>
              <label htmlFor={i}>Product {i}</label>
              <input className="u-full-width"
                ref={i}
                id={i}
                defaultValue={product} />
              </div>
          ))}

          <input className="button-primary"
            type="submit"
            value="Submit"
            onClick={this.handleGoClick} />
        </form>
      </div>
    )
  }
}
