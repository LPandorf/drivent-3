import { prisma } from '@/config';

async function roomExists(roomId: number) {
  return prisma.room.findMany({
    where: { id: roomId },
  });
}

const roomRepository = {
  roomExists,
};

export default roomRepository;
