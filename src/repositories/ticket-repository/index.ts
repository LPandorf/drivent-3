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

async function findTicketById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      Enrollment: true,
    },
  });
}

async function findTicketByIdWithType(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      TicketType: true,
    },
  });
}

export type CreateTicketsParams = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>;

const ticketRepository = {
  findTicketTypes,
  findTicketByEnrollmentId,
  createTicket,
  findTicketById,
  findTicketByIdWithType,
};

export default ticketRepository;
