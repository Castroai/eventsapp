import { useEffect, useState } from "react";
import { Event } from "@prisma/client";
import HttpService from "../lib/httpservice";
const service = new HttpService();
export const useSearchHook = () => {
  const [results, setResults] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  const searchEvents = async ({ lat, long }: { lat: number; long: number }) => {
    setLoading(true);
    const { data } = await service.searchEvents({ lat, long });
    setResults(data);
    setLoading(false);
  };
  const fetchAllEvents = async (params?: { user: string }) => {
    setLoading(true);
    const { data } = await service.allEvents(params);
    setResults(data);
    setLoading(false);
  };

  return {
    results,
    searchEvents,
    fetchAllEvents,
    loading,
  };
};
