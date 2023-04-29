import { notFoundError, forbiddenError } from '@/errors';
import bookingRepository from '@/repositories/booking-repository';
import roomRepository from '@/repositories/room-repository';

async function getBooking(userId: number) {
  const booking = await bookingRepository.findBookingByUserIdWithRoom(userId);

  if (!booking) {
    throw notFoundError();
  }

  return booking;
}

async function bookingByRoomId(userId: number, roomId: number) {
  const roomExists = await roomRepository.roomExists(roomId);

  if (!roomExists) {
    throw notFoundError();
  }

  const roomIsAlreadyBooked = await bookingRepository.findBookingByRoomId(roomId);

  if (roomIsAlreadyBooked) {
    throw forbiddenError();
  }

  const booking = await bookingRepository.bookThisRoom(userId, roomId);

  return booking;
}

async function changeBooking(userId: number, roomId: number) {
  const roomExists = await roomRepository.roomExists(roomId);

  if (!roomExists) {
    throw notFoundError();
  }

  const roomIsAlreadyBooked = await bookingRepository.findBookingByRoomId(roomId);

  if (roomIsAlreadyBooked) {
    throw forbiddenError();
  }

  const booking = await bookingRepository.findBookingByUserId(userId);

  const id = booking.id;

  await bookingRepository.updateBooking({ userId, roomId, id });

  return id;
}

const bookingService = {
  getBooking,
  bookingByRoomId,
  changeBooking,
};

export default bookingService;
