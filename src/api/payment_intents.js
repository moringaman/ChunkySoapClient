import Stripe from 'stripe'

const stripe = new Stripe('sk_test_rvboOk0S3wSR1tPGYuzzcjpV')

export default async(req, res) => {
    try {
        const { amount } = req.query
        console.log(amount)
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'gbp'
        });

        res.status(200).send(paymentIntent.client_secret)
    } catch(err) {
        res.status(500).json({statusCode: 500, message: err.message})
    }
}