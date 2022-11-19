const stripe = require("stripe")('sk_test_51M4yABATGyZmN1HXyRfdbOh4B3n8jSnebABucVeTwCaxeiO5rlnKDaTu877JimVpLAPpQOpJo5yaFhMTeMTNjcVC00BZ6uoVoT');
const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    console.log(items[0].amount)
    return items[0].amount;
    // return 14000;

};
exports.postPay = async (req, res, next) => {
    const {items} = req.body;
    // const {currency} = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "vnd",
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
}