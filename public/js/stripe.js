import axios from 'axios';
import Stripe from 'stripe';

import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51PVXN5AnvXrhqVQX8n3TQ1P3p4xNIQPpkm5uLMbawqiIjEXKXKWTQa6EOxMVaWiGJu81M2JTiO0dmB0ll6NXHNHH00zoqnub1E'
  );
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    console.log(session);

    // 2) Create checkout form + charge credit card
    // await stripe.redirectToCheckout({
    //   sessionId: session.data.session.id,
    // });

    const checkoutPageUrl = session.data.session.url;
    window.location = checkoutPageUrl;
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
