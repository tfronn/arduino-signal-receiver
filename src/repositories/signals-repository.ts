export interface SignalCreateData {
  isActive: boolean;
  timestamp: Date;
}

export interface SignalsRepository {
  create: (data: SignalCreateData) => Promise<void>;
}