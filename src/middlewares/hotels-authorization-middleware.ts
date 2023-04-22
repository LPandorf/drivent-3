import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import ticketRepository from '@/repositories/ticket-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { AuthenticatedRequest } from '@/middlewares';

export async function hotelsAuthorization(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;

  try {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

    if (!enrollment) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

    if (!ticket) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (!ticket.TicketType.includesHotel || ticket.TicketType.isRemote || ticket.status === 'RESERVED') {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }

    next();
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
