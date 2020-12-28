import Stripe from 'stripe'

const stripe = new Stripe(process.env.RAZZLE_STRIPE_PRIVATE_KEY)

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