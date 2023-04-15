import { Payment } from '@prisma/client';
import { prisma } from '@/config';

async function findPaymentByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function createPayment(ticketId: number, params: paymentParams) {
  return prisma.payment.create({
    data: {
      ticketId,
      ...params,
    },
  });
}

export type paymentParams = Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>;

const paymentsRepository = {
  findPaymentByTicketId,
  createPayment,
};

export default paymentsRepository;
