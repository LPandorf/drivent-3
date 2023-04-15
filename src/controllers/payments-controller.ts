import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';

export async function getPaymentByTicketId(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const ticketId = Number(req.query.ticketId);

    if (!ticketId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const payment = await paymentsService.getPaymentByTicketId(userId, ticketId);

    if (!payment) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function createPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const { ticketId, cardData } = req.body;

    if (!ticketId || !cardData) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const payment = await paymentsService.createPayment(ticketId, cardData, userId);

    if (!payment) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    const result = {
      id: payment.id,
      ticketId: payment.ticketId,
      value: payment.value,
      cardIssuer: payment.cardIssuer,
      cardLastDigits: payment.cardLastDigits,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
    };

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
