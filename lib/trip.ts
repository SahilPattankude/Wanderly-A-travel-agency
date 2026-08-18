export type TripItem = {
  id: string;
  day: number;
  time: string;
  title: string;
  place: string;
};

export type TripSearch = {
  from: string;
  to: string;
  dates: string;
  travelers: string;
};

export type Booking = {
  id: string;
  reference: string;
  createdAt: string;
  search: TripSearch;
  items: TripItem[];
  status: "pending" | "confirmed" | "cancelled";

  // Email confirmation
  emailStatus?: "pending" | "sent" | "failed";

  // Booking amount
  totalAmount?: number;

  // Payment information
  paymentStatus?:
    | "pending"
    | "paid"
    | "failed"
    | "refunded";

  paymentProvider?: string | null;

  paymentOrderId?: string | null;

  paymentId?: string | null;

  paymentPaidAt?: string | null;
};

export type SelectedDestination = {
  id: string;
  name: string;
  country: string;
  code: string;
};

const storageKey = "wanderly-trip-items";
const searchStorageKey = "wanderly-last-search";
const bookingStorageKey = "wanderly-bookings";
const destinationStorageKey =
  "wanderly-selected-destination";

export const tripUpdatedEvent =
  "wanderly:trip-updated";

export const destinationUpdatedEvent =
  "wanderly:destination-updated";

export function readSavedTripItems(
  destinationId?: string
): TripItem[] {
  if (typeof window === "undefined") return [];

  const activeDest =
    destinationId ||
    readSelectedDestination()?.id ||
    "santorini";

  const key = `${storageKey}-${activeDest}`;

  try {
    const value =
      window.localStorage.getItem(key);

    return value
      ? (JSON.parse(value) as TripItem[])
      : [];
  } catch {
    return [];
  }
}

export function saveTripItems(
  items: TripItem[],
  destinationId?: string
) {
  if (typeof window === "undefined") return;

  const activeDest =
    destinationId ||
    readSelectedDestination()?.id ||
    "santorini";

  const key = `${storageKey}-${activeDest}`;

  window.localStorage.setItem(
    key,
    JSON.stringify(items)
  );

  window.dispatchEvent(
    new Event(tripUpdatedEvent)
  );
}

export function readTripSearch(): TripSearch | null {
  if (typeof window === "undefined") return null;

  try {
    const value =
      window.localStorage.getItem(
        searchStorageKey
      );

    return value
      ? (JSON.parse(value) as TripSearch)
      : null;
  } catch {
    return null;
  }
}

export function saveTripSearch(
  search: TripSearch
) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(
      searchStorageKey,
      JSON.stringify(search)
    );
  }
}

export function readBookings(): Booking[] {
  if (typeof window === "undefined") return [];

  try {
    const value =
      window.localStorage.getItem(
        bookingStorageKey
      );

    return value
      ? (JSON.parse(value) as Booking[])
      : [];
  } catch {
    return [];
  }
}

export function saveBooking(
  booking: Booking
) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    bookingStorageKey,
    JSON.stringify([
      booking,
      ...readBookings(),
    ])
  );
}

export function readSelectedDestination():
  | SelectedDestination
  | null {
  if (typeof window === "undefined")
    return null;

  try {
    const value =
      window.localStorage.getItem(
        destinationStorageKey
      );

    return value
      ? (JSON.parse(
          value
        ) as SelectedDestination)
      : null;
  } catch {
    return null;
  }
}

export function saveSelectedDestination(
  destination: SelectedDestination
) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    destinationStorageKey,
    JSON.stringify(destination)
  );

  window.dispatchEvent(
    new Event(destinationUpdatedEvent)
  );
}