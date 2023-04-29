import { Booking } from '@prisma/client';
import { prisma } from '@/config';

type updateParams = Omit<Booking, 'createdAt' | 'updatedAt'>;

async function findBookingByUserIdWithRoom(userId: number) {
  return prisma.booking.findMany({
    where: { userId },
    include: {
      Room: true,
    },
  });
}

async function findBookingByRoomId(roomId: number) {
  return prisma.booking.findMany({
    where: { id: roomId },
  });
}

async function bookThisRoom(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}

async function updateBooking({ userId, roomId, id }: updateParams) {
  return prisma.booking.upsert({
    where: { id },
    create: {
      userId,
      roomId,
    },
    update: { roomId },
  });
}

async function findBookingByUserId(userId: number) {
  return prisma.booking.findMany({
    where: { userId },
  });
}

const bookingRepository = {
  findBookingByUserIdWithRoom,
  findBookingByRoomId,
  bookThisRoom,
  updateBooking,
  findBookingByUserId,
};

export default bookingRepository;
