import { SignalsRepository } from "../repositories/signals-repository";

interface SubmitSignalUseCaseRequest {
  isActive: boolean;
  timestamp: Date
}

export class SubmitSignalUseCase {

  constructor(
    private signalsRepository: SignalsRepository
  ) {}

  async execute(request: SubmitSignalUseCaseRequest) {
    const { isActive, timestamp } = request;

    await this.signalsRepository.create({
      isActive,
      timestamp
    })
  }
}