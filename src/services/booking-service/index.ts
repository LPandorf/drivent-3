import { notFoundError, forbiddenError } from '@/errors';
import bookingRepository from '@/repositories/booking-repository';
import roomRepository from '@/repositories/room-repository';

async function getBooking(userId: number) {
  const booking = await bookingRepository.findBookingByUserId(userId);

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

  const booked = await bookingRepository.findBookingByRoomId(roomId);

  if (roomExists.capacity <= booked.length) {
    throw forbiddenError();
  }

  return bookingRepository.bookThisRoom({ userId, roomId });
}

async function changeBooking(userId: number, roomId: number) {
  const roomExists = await roomRepository.roomExists(roomId);

  if (!roomExists) {
    throw notFoundError();
  }

  const booked = await bookingRepository.findBookingByRoomId(roomId);

  if (roomExists.capacity <= booked.length) {
    throw forbiddenError();
  }

  const booking = await bookingRepository.findBookingByUserId(userId);

  if (!booking) {
    throw forbiddenError();
  }

  const id = booking.id;

  await bookingRepository.updateBooking({ userId, roomId, id });

  return booking;
}

const bookingService = {
  getBooking,
  bookingByRoomId,
  changeBooking,
};

export default bookingService;
