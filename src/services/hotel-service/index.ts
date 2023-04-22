import { notFoundError, paymentRequiredError } from '@/errors';
import hotelRepository from '@/repositories/hotel-repository';

async function getHotelsByUserId() {
  const hotels = await hotelRepository.findHotels();

  if (!hotels) {
    throw notFoundError();
  }

  return hotels;
}

async function getHotelsAndHisRooms(hotelId: number) {
  const hotelWithRooms = await hotelRepository.findHotelWithRooms(hotelId);

  if (!hotelWithRooms) {
    throw notFoundError();
  }

  return hotelWithRooms;
}

const hotelService = {
  getHotelsByUserId,
  getHotelsAndHisRooms,
};

export default hotelService;
