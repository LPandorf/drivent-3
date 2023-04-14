import { Ticket } from '@prisma/client';
import { prisma } from '@/config';

async function findTicketTypes() {
  return prisma.ticketType.findMany();
}

async function findTicketByEnrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

async function createTicket(ticket: CreateTicketsParams) {
  return prisma.ticket.create({
    data: {
      ...ticket,
    },
  });
}

export type CreateTicketsParams = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>;

const ticketRepository = {
  findTicketTypes,
  findTicketByEnrollmentId,
  createTicket,
};

export default ticketRepository;
