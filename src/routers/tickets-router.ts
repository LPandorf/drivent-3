import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getTicketTypes, getTickets, createTickets } from '@/controllers';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken).get('/types', getTicketTypes).get('', getTickets).post('', createTickets);

export { ticketsRouter };
