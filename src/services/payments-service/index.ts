import { notFoundError, unauthorizedError } from '@/errors';
import paymentsRepository from '@/repositories/payments-repository';
import ticketRepository from '@/repositories/ticket-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';

async function getPaymentByTicketId(userId: number, ticketId: number) {
  const ticket = await ticketRepository.findTicketById(ticketId);

  if (!ticket) {
    throw notFoundError();
  }

  const enrollment = await enrollmentRepository.findByEnrollmentId(ticket.enrollmentId);

  if (enrollment.userId !== userId) {
    throw unauthorizedError();
  }

  const payment = await paymentsRepository.findPaymentByTicketId(ticketId);

  if (!payment) {
    throw notFoundError();
  }

  return payment;
}

async function createPayment(ticketId: number, cardData: cardDataBodyType, userId: number) {
  const ticket = await ticketRepository.findTicketByIdWithType(ticketId);

  if (!ticket) {
    throw notFoundError();
  }

  const ticketEnrollment = await enrollmentRepository.findByEnrollmentId(ticket.enrollmentId);

  if (ticketEnrollment.userId !== userId) {
    throw unauthorizedError();
  }

  const lastDigits = cardData.number.toString().substring(11);
  const paymentData = {
    ticketId,
    value: ticket.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits: lastDigits,
  };
  const payment = await paymentsRepository.createPayment(ticketId, paymentData);

  return payment;
}

export type cardDataBodyType = {
  issuer: string;
  number: number;
  name: string;
  expirationDate: Date;
  cvv: number;
};

const paymentsService = {
  getPaymentByTicketId,
  createPayment,
};

export default paymentsService;
