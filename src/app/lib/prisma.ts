import { PrismaClient } from "@prisma/client";
import axios from "axios";

export const prisma = new PrismaClient();

export default class HttpService {
  constructor(
    private instance = axios.create({
      baseURL: "/api/event",
    })
  ) {}
  public async createEvent(data: {
    date: Date;
    location: string;
    eventName: string;
    description: string;
  }) {
    return await this.instance.post("", data);
  }
}
