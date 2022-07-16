import express, { Request, Response } from 'express';
import { prisma } from './prisma'
import { SubmitSignalUseCase } from './use-cases/submit-signal-use-case';
import { PrismaSignalsRepository } from './repositories/prisma/prisma-signals-repository';


export const routes = express.Router()

routes.get('/', (req, res) => {
  res.json("Hello World")
})

routes.get('/is-active', async (req: Request, res: Response) => {
  const isActive = await prisma.signal.findFirst({
    orderBy: {
      timestamp: 'desc'
    }
  })
  return res.status(201).json(isActive).send();
})

routes.get('/signal-activation-log', async (req: Request, res: Response) => {
  const signalLog = await prisma.signal.findMany({
    orderBy: {
      timestamp: 'desc'
    }
  })
  return res.status(201).json(signalLog).send();
})


routes.post('/activate-signal', async (req: Request, res: Response) => {
  try {
  const prismaSignalsRepository = new PrismaSignalsRepository()
  const submitSignalUseCase = new SubmitSignalUseCase(prismaSignalsRepository)
  
  await submitSignalUseCase.execute({
    isActive: true,
    timestamp: new Date(),

  })

    const signal = await prisma.signal.findFirst({
      where: {
        isActive: true
      }
    });
    return res.status(201).json(signal).send();
  } catch(err) {
    console.error(err)
    return res.status(500).send()
  }
})

routes.post('/deactivate-signal', async (req: Request, res: Response) => {
  try {
  const prismaSignalsRepository = new PrismaSignalsRepository()
  const submitSignalUseCase = new SubmitSignalUseCase(prismaSignalsRepository)
  
  await submitSignalUseCase.execute({
    isActive: false,
    timestamp: new Date()
  })

    const signal = await prisma.signal.findFirst({
      where: {
        isActive: false
      }
    });
    return res.status(201).json(signal).send();
  } catch(err) {
    console.error(err)
    return res.status(500).send()
  }
})



