import _, { stubString } from 'lodash'
import moment from 'moment'

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

export const pathMatches = (str) => {
  // console.log("PATH " , str)
    const regex = /^\/([^?\/]+)/;
    if (str === '/') {
      return "/" // str.match(regex)
    }
    // console.log("PATH MATCH ", str.match(regex)[0])
    return str.match(regex)[0];
}

export const convertDate = (date) => {
  console.log('FN DATE', date)
  console.log(moment(Date(date)).format('dd MMM Do'))
  return moment(date).format('ddd MMM Do')
}