import RazorpayCheckout from 'react-native-razorpay';
import razorpayConfig from '../../config/razorpayConfig';

const Payment = (amt, placeOrder) => {
    var options = {
        description: 'Foodie Bill',
        image: 'https://thumbs.dreamstime.com/z/chef-serve-food-multi-colors-illustration-61502303.jpg',
        currency: 'INR',
        key: razorpayConfig.key,
        amount: (amt*100).toString(),
        name: 'Foodie',
        prefill: {
            email: razorpayConfig.email,
            contact: razorpayConfig.contact,
            name: razorpayConfig.name
        },
    }
    RazorpayCheckout.open(options).then(async (data) => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}!`);
        placeOrder();
    }).catch(async (error) => {
        if(error.code !== 0) alert(`Error: ${error.code} | ${error.description}`);
        placeOrder(); //temp fix
    });
};

export default Payment;
