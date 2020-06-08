import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51GrZrgBuj1G8kCA9Qjvh79AJi9w2gMNPbzwQJDZxRJUtpsOTnE3BMOEm6BVaZQiPZaIhkO9OZ9eIAbJB8o1wgrPO00EhCRAjNo'
);

export const bookTour = async (tourId) => {
  try {
    // 1 Get the session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2 Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
