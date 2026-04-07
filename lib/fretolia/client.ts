/**
 * Fretolia Delivery API Client
 *
 * Integrates with the Fretolia delivery platform for cravings delivery.
 * API docs: /Users/jordanbienvenue/Documents/fretolia_foundation/fretolia-microservices/API_DOCUMENTATION.md
 */

const FRETOLIA_API_URL =
  process.env.FRETOLIA_API_URL || "http://localhost:3001";
const FRETOLIA_API_KEY = process.env.FRETOLIA_API_KEY || "";

type DeliveryAddress = {
  street: string;
  city: string;
  district: string;
  latitude: number;
  longitude: number;
  instructions?: string;
};

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
  weight_kg?: number;
};

type ClientInfo = {
  name: string;
  phone: string;
  email?: string;
};

type PricingQuote = {
  delivery_fee: number;
  distance_km: number;
  base_price: number;
  estimated_time_minutes: number;
};

type DeliveryBatch = {
  id: string;
  date: string;
  time_slot: string;
  available_slots: number;
  max_capacity: number;
};

type OrderResponse = {
  tracking_id: string;
  tracking_url: string;
  status: string;
  estimated_delivery: string;
};

type TrackingInfo = {
  tracking_id: string;
  status: string;
  timeline: Array<{ status: string; timestamp: string; note?: string }>;
  courier?: { name: string; phone: string };
  estimated_arrival?: string;
};

type CourierLocation = {
  latitude: number;
  longitude: number;
  timestamp: string;
  speed?: number;
} | null;

async function fretoliaFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${FRETOLIA_API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${FRETOLIA_API_KEY}`,
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(
      `Fretolia API error: ${res.status} ${error.message || res.statusText}`
    );
  }

  return res.json();
}

/** Get a delivery pricing quote based on location and weight */
export async function getDeliveryQuote(
  latitude: number,
  longitude: number,
  weight_kg: number
): Promise<PricingQuote> {
  return fretoliaFetch<PricingQuote>("/partner/pricing/quote", {
    method: "POST",
    body: JSON.stringify({ latitude, longitude, weight_kg }),
  });
}

/** Get available delivery dates and time slots */
export async function getAvailableBatches(): Promise<DeliveryBatch[]> {
  return fretoliaFetch<DeliveryBatch[]>("/partner/batches/dates");
}

/** Create a delivery order */
export async function createDeliveryOrder(params: {
  address: DeliveryAddress;
  client: ClientInfo;
  items: OrderItem[];
  batch_id?: string;
  notes?: string;
}): Promise<OrderResponse> {
  return fretoliaFetch<OrderResponse>("/partner/orders", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

/** Get tracking info for an order (public — no API key needed) */
export async function getTrackingInfo(
  trackingId: string
): Promise<TrackingInfo> {
  const res = await fetch(`${FRETOLIA_API_URL}/tracking/${trackingId}`);
  if (!res.ok) throw new Error(`Tracking not found: ${trackingId}`);
  return res.json();
}

/** Get courier's real-time location (public — no API key needed) */
export async function getCourierLocation(
  trackingId: string
): Promise<CourierLocation> {
  const res = await fetch(
    `${FRETOLIA_API_URL}/tracking/${trackingId}/location`
  );
  if (!res.ok) return null;
  return res.json();
}
