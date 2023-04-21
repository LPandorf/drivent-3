//import { Hotel, Room, Booking} from '@prisma/client';
import { prisma } from '@/config';

async function findHotels() {
  return prisma.hotel.findMany();
}

const hotelRepository = {
  findHotels,
};

export default hotelRepository;
