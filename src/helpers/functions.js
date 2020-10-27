import _, { stubString } from 'lodash'

export const getCartTotal = (cart, postage = 0, tax = 0) => {
  if (cart.length) {
        const totals = cart.map(item => item.total_price)
        const tmpValue = totals.reduce((a, b) => a + b) 
        const basketValue = (tmpValue + postage + tax)
        // .toFixed(2)
    return basketValue
  }
  return 0.00
}

export const isEmpty = (data) => {
  return _.isEmpty(data)
}

export const createExcerpt = (string, length) => {
  return string.length > length ? string.substring(0, length - 3 ) + '...  ' : string + " "
}