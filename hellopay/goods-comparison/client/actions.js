import fetch from 'isomorphic-fetch'

export const SELECT_PRODUCTS = 'SELECT_PRODUCTS'
export const REQUEST_ATTRIBUTES = 'REQUEST_ATTRIBUTES'
export const RECIEVE_ATTRIBUTES = 'RECIEVE_ATTRIBUTES'
export const REJECT_ATTRIBUTES = 'REJECT_ATTRIBUTES'
export const REQUEST_COMPARSION = 'REQUEST_COMPARSION'
export const COMPARE_PRODUCTS = 'COMPARE_PRODUCTS'

export function selectProducts(products) {
  return {
    type: SELECT_PRODUCTS,
    products
  }
}

function requestComparsion(products) {
  return {
    type: REQUEST_COMPARSION,
    products
  }
}

function compareProducts(products) {
  return {
    type: COMPARE_PRODUCTS,
    products
  }
}

function requestAttributes(product) {
  return {
    type: REQUEST_ATTRIBUTES,
    product
  }
}

function recieveAttributes(product, json) {
  return {
    type: RECIEVE_ATTRIBUTES,
    product,
    attributes: json.attributes
  }
}

function rejectAttributes(product, json) {
  return {
    type: REJECT_ATTRIBUTES,
    product,
    error: json.error
  }
}

function fetchAttribureIfNeeded(product, getState) {
  return dispatch => {
    dispatch(requestAttributes(product))
    const state = getState()
    const cachedProduct = state.productAttribures[product]
    if (cachedProduct.attributes) {
      return dispatch(recieveAttributes(product, cachedProduct))
    } else {
      return fetch(`/product?url=${product}`)
        .then(req => req.json())
        .then(json => {
          if (json.error) {
            dispatch(rejectAttributes(product, json))
          } else {
            dispatch(recieveAttributes(product, json))
          }
        })
    }
  }
}

export function fetchProducts(products) {
  return (dispatch, getState) => {
    dispatch(requestComparsion(products))
    return Promise.all(products.map(product => fetchAttribureIfNeeded(product, getState)(dispatch)))
      .then(res => dispatch(compareProducts(products)))
  }
}
