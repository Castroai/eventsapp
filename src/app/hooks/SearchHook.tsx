import { useEffect, useState } from "react";
import { Event } from "@prisma/client";
import HttpService from "../lib/httpservice";
const service = new HttpService();
export const useSearchHook = () => {
  const [results, setResults] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const searchEvents = async ({ lat, long }: { lat: number; long: number }) => {
    setLoading(true);
    const { data } = await service.searchEvents({ lat, long });
    setResults(data);
    setLoading(false);
  };
  const fetchAllEvents = async () => {
    setLoading(true);

    const { data } = await service.allEvents();
    setResults(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchAllEvents();
  }, []);
  return {
    results,
    searchEvents,
    loading,
  };
};
