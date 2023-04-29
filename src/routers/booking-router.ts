import { Router } from 'express';
import { authenticateToken, hotelsAuthorization } from '@/middlewares';
import { changeAReservation, getBooking, makeAReservation } from '@/controllers/booking-controller';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('', getBooking)
  .post('/:bookingId', hotelsAuthorization, makeAReservation)
  .put('/:bookingId', changeAReservation);

export { bookingRouter };
