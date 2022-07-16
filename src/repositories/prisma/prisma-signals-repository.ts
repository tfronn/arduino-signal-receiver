import { prisma } from '../../prisma';
import { SignalCreateData, SignalsRepository } from '../signals-repository';

export class PrismaSignalsRepository implements SignalsRepository {
  async create({ isActive, timestamp }: SignalCreateData) {
    await prisma.signal.create({ 
      data: { 
        isActive,
        timestamp
      }
    })
  }
}