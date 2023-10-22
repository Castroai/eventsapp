import { PrismaClient } from "@prisma/client";
import axios from "axios";

export const prisma = new PrismaClient();

export default class HttpService {
  constructor(
    private instance = axios.create({
      baseURL: "/api",
    })
  ) {}
  public async createEvent(data: {
    date: Date;
    location: string;
    eventName: string;
    description: string;
    status: string;
    lat: number;
    long: number;
  }) {
    return await this.instance.post("/event", data);
  }
  public async attendEvent({ eventId }: { eventId: number }) {
    return await this.instance.put("/user", {
      id: eventId,
    });
  }
}
