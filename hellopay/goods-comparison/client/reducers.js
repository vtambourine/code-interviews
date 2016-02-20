import { combineReducers } from 'redux'
import {
  SELECT_PRODUCTS, COMPARE_PRODUCTS,
  REQUEST_ATTRIBUTES, RECIEVE_ATTRIBUTES,
  REJECT_ATTRIBUTES
} from './actions'

function selectedProducts(state = [
  'http://www.lazada.vn/alcatel-ot-idol-x-16gb-do-150683.html',
  'http://www.lazada.vn/apple-iphone-6-16gb-vang-999302.html'
], action) {
  switch (action.type) {
    case SELECT_PRODUCTS:
      return action.products
    default:
      return state
  }
}

function products(state = {
  isFetching: false,
  attributes: null,
  error: ''
}, action) {
  switch (action.type) {
    case REQUEST_ATTRIBUTES:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECIEVE_ATTRIBUTES:
      return Object.assign({}, state, {
        isFetching: false,
        attributes: action.attributes
      })
    case REJECT_ATTRIBUTES:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
        attributes: []
      })
    default:
      return false
  }
}

function productAttribures(state = {}, action) {
  switch (action.type) {
    case REQUEST_ATTRIBUTES:
    case RECIEVE_ATTRIBUTES:
    case REJECT_ATTRIBUTES:
      return Object.assign({}, state, {
        [action.product]: products(state[action.product], action)
      })
    default:
      return state
  }
}

function productsComaprison(state = [], action) {
  switch (action.type) {
    case COMPARE_PRODUCTS:
      return action.products
    default:
      return state
  }
}

const rootReducer = combineReducers({
  selectedProducts,
  productAttribures,
  productsComaprison
})

export default rootReducer
