import { Router } from 'express';
import { authenticateToken, hotelsAuthorization } from '@/middlewares';
import { getHotels, getHotelRooms } from '@/controllers/hotel-controller';

const hotelsRouter = Router();

hotelsRouter.all('/*', authenticateToken, hotelsAuthorization).get('', getHotels).get('/:hotelId', getHotelRooms);

export { hotelsRouter };
