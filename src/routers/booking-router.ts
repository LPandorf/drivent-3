import { Router } from 'express';
import { authenticateToken, bookingAuthorization } from '@/middlewares';
import { changeAReservation, getBooking, makeAReservation } from '@/controllers/booking-controller';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('', getBooking)
  .post('', /* bookingAuthorization, */ makeAReservation)
  .put('/:bookingId', changeAReservation);

export { bookingRouter };
