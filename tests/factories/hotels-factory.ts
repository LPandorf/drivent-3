import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createHotel() {
  return await prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
    },
  });
}

export async function createHotelRoom(hotelId: number) {
  return prisma.room.create({
    data: {
      name: '26',
      capacity: 2,
      hotelId: hotelId,
    },
  });
}

export async function deleteAllRooms() {
  await prisma.room.deleteMany();

  return;
}
