import Joi from 'joi';
import { HotelIdParams } from './../protocols';

export const HotelIdSchema = Joi.object<HotelIdParams>({
  hotelId: Joi.number().required(),
});
