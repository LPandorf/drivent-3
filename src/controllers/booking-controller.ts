import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const booking = await bookingService.getBooking(userId);

    // deve retornar { "id": bookingId, "Room":{}}
    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function makeAReservation(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;

  if (!roomId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const booking = await bookingService.bookingByRoomId(userId, roomId);

    return res.status(httpStatus.OK).send(booking.id);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}

export async function changeAReservation(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;

  if (!roomId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const bookingId = await bookingService.changeBooking(userId, roomId);

    return res.status(httpStatus.OK).send(bookingId);
  } catch (error) {
    if (error.name === 'notFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}
