//import faker from "@faker-js/faker";
//import { Booking } from "@prisma/client";
import { prisma } from '@/config';

export function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}
