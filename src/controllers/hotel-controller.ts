import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import hotelService from '@/services/hotel-service';

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  try {
    const hotels = await hotelService.getHotelsByUserId();

    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getHotelRooms(req: AuthenticatedRequest, res: Response) {
  const { hotelId } = req.params;

  const hotelIdNumber = Number(hotelId);

  try {
    const hotelAndHisRooms = await hotelService.getHotelsAndHisRooms(hotelIdNumber);

    return res.status(httpStatus.OK).send(hotelAndHisRooms);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    console.log(error);
    console.log(hotelId, hotelIdNumber);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
