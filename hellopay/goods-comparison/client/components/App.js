import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectProducts, fetchProducts } from '../actions'

import Explore from '../components/Explore'
import ComparisonTable from '../components/ComparisonTable'

class App extends Component {
  static propTypes = {
    selectedProducts: PropTypes.arrayOf(PropTypes.string).isRequired,
    products: PropTypes.array.isRequired
  }

  componentDidMount() {
    const { dispatch, selectedProducts } = this.props
    dispatch(fetchProducts(selectedProducts))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedProducts !== this.props.selectedProducts) {
      const { dispatch, selectedProducts } = nextProps
      dispatch(fetchProducts(selectedProducts))
    }
  }

  handleChange = (products) => {
    this.props.dispatch(selectProducts(products))
  }

  render() {
    const { selectedProducts, products } = this.props
    return (
      <div className="container">
        <Explore products={selectedProducts}
          onChange={this.handleChange} />

        <ComparisonTable products={products} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { selectedProducts, productAttribures } = state

  const products = selectedProducts.map(product => productAttribures[product])

  return {
    selectedProducts,
    products
  }
}

export default connect(mapStateToProps)(App)
