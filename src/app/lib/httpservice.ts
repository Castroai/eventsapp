import axios from "axios";

export default class HttpService {
  constructor(
    private instance = axios.create({
      baseURL: "/api",
    })
  ) {}
  public async createEvent(data: FormData) {
    return await this.instance.post("/event", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  public async attendEvent({ eventId }: { eventId: number }) {
    return await this.instance.put("/event/attend", {
      id: eventId,
    });
  }
  public async searchEvents({ lat, long }: { lat: number; long: number }) {
    return await this.instance.post("/event/search", {
      lat: lat,
      long: long,
    });
  }
  public async allEvents() {
    return await this.instance.get("/event/search");
  }
}
