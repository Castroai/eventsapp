export default class HttpService {
  private baseUrl: string;

  constructor(baseUrl: string = "/api") {
    this.baseUrl = baseUrl;
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  public async createEvent(data: FormData) {
    return await fetch(`${this.baseUrl}/event`, {
      method: "POST",
      body: data,
    }).then(this.handleResponse);
  }

  public async attendEvent({ eventId }: { eventId: number }) {
    return await fetch(`${this.baseUrl}/event/attend`, {
      method: "PUT",
      body: JSON.stringify({ id: eventId }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(this.handleResponse);
  }

  public async searchEvents({ lat, long }: { lat: number; long: number }) {
    return await fetch(`${this.baseUrl}/event/search`, {
      method: "POST",
      body: JSON.stringify({ lat, long }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(this.handleResponse);
  }

  public async allEvents(params?: { user: string }) {
    const queryParams = params ? `?user=${params.user}` : "";
    return await fetch(`${this.baseUrl}/event/search${queryParams}`).then(
      this.handleResponse
    );
  }

  public async accountStatus() {
    return await fetch(`${this.baseUrl}/account/status`).then(
      this.handleResponse
    );
  }

  public async accountCreate() {
    return await fetch(`${this.baseUrl}/account`, {
      method: "POST",
    }).then(this.handleResponse);
  }
}
