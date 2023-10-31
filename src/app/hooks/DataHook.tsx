import { useEffect, useState } from "react";
import { Event } from "@prisma/client";
import HttpService from "../lib/httpservice";
import Stripe from "stripe";
const service = new HttpService();
export const useDataHook = () => {
  const [results, setResults] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [stripeStatus, setStripeStatus] = useState<Stripe.Account>();

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
  const fetchStatus = async () => {
    setLoading(true);
    const { data } = await service.accountStatus();
    setStripeStatus(data);
    setLoading(false);
    return;
  };

  return {
    results,
    searchEvents,
    fetchAllEvents,
    loading,
    fetchStatus,
    stripeStatus,
  };
};
