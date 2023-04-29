import { prisma } from '@/config';

async function roomExists(roomId: number) {
  return prisma.room.findFirst({
    where: { id: roomId },
  });
}

const roomRepository = {
  roomExists,
};

export default roomRepository;
