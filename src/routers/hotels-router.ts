import { Router } from 'express';
import { authenticateToken, hotelsAuthorization, validateParams } from '@/middlewares';
import { getHotels, getHotelRooms } from '@/controllers/hotel-controller';
import { HotelIdSchema } from '@/schemas';

const hotelsRouter = Router();

hotelsRouter
  .all('/*', authenticateToken, hotelsAuthorization)
  .get('', getHotels)
  .get('/:hotelId', validateParams(HotelIdSchema), getHotelRooms);

export { hotelsRouter };
