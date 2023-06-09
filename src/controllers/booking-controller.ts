import { Response } from 'express';
import httpStatus from 'http-status';
import ticketRepository from '@/repositories/ticket-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const booking = await bookingService.getBooking(userId);

    return res.status(httpStatus.OK).send({ id: booking.id, Room: booking.Room });
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
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

    if (!enrollment) {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }

    const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

    if (!ticket || !ticket.TicketType.includesHotel || ticket.TicketType.isRemote || ticket.status === 'RESERVED') {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }

    const booking = await bookingService.bookingByRoomId(userId, roomId);

    const body = {
      bookingId: booking.id,
    };

    return res.status(httpStatus.OK).send(body);
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

  const bookingId = Number(req.params.bookingId);

  if (!bookingId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const booking = await bookingService.changeBooking(userId, Number(roomId));

    return res.status(httpStatus.OK).send({ bookingId: booking.id });
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}
