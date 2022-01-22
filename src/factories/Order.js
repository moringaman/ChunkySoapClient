


function Order(user, basket, cartTotal) {

}


function OrderConfirmation(user, basket, cartTotal, orderId) {
    const { customer_title, customer_firstname, customer_lastname, email, customer_address1, customer_address2, customer_postcode, customer_town } = user
    this.message_sent = false
    this.to_address = email
    this.from_address = "sales@chunkysoap.co.uk"
    this.message_subject = "Thankyou for your order"
    this.message_text = "Please see your chunky soap order details below"
    this.message_body = {
        customer_name: customer_firstname,
        order_id: orderId,
        cart_total: cartTotal,
        products: basket.products,
        email_banner_image: "https://chunksysoap-1.s3.eu-west-2.amazonaws.com/email_header.png"
    }
    this.email_template_name = 'confirmation'
}

function OrderFactory() {
    this.create = (user, basket, cartTotal, orderId, type) => {
        switch (type) {
            case 1:
                return new OrderConfirmation(user, basket, cartTotal, orderId)
                break;
            case 2:
                return new Order(user, basket)
                break;
            default:
                return {}
        }
    }
}

module.exports = {
    OrderFactory
}
