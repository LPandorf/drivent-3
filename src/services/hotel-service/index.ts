import ticketRepository from '@/repositories/ticket-repository';
import { notFoundError, paymentRequiredError } from '@/errors';
import hotelRepository from '@/repositories/hotel-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';

async function getHotelsByUserId(userId: number) {
  await getTicketsWithHotelByUserId(userId);

  const hotels = await hotelRepository.findHotels();

  return hotels;
}

async function getTicketsWithHotelByUserId(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket) {
    throw notFoundError();
  }
  if (!ticket.TicketType.includesHotel || ticket.TicketType.isRemote || ticket.status === 'RESERVED') {
    throw paymentRequiredError();
  }
}

const hotelService = {
  getHotelsByUserId,
};

export default hotelService;
