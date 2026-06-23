import { useCallback, useEffect, useMemo, useState } from "react";

import { NotificationContext } from "./NotificationContextBase";


const STORAGE_KEY = "trustmart.notifications";

function seedNotificationsIfEmpty(existing) {
  if (Array.isArray(existing) && existing.length > 0) return existing;
  const now = Date.now();
  return [

    {
      id: "n_1",
      type: "NEW_MESSAGE",
      title: "New message",
      message: "John: Is the phone still available?",
      read: false,
      createdAt: new Date(now - 1000 * 60 * 12).toISOString(),
      metadata: { chatId: "c_1" },
    },
    {
      id: "n_2",
      type: "OFFER",
      title: "Offer received",
      message: "Sam offered rs320 for your listing.",
      read: false,
      createdAt: new Date(now - 1000 * 60 * 60 * 3).toISOString(),
      metadata: { listingId: "l_1" },
    },
    {
      id: "n_3",
      type: "PRODUCT_SOLD",
      title: "Product sold",
      message: "Your listing was purchased. Check purchase details.",
      read: true,
      createdAt: new Date(now - 1000 * 60 * 60 * 24).toISOString(),
      metadata: { listingId: "l_2" },
    },
    {
      id: "n_4",
      type: "PRICE_DROP",
      title: "Price drop",
      message: "The price of your favorite item dropped.",
      read: true,
      createdAt: new Date(now - 1000 * 60 * 60 * 36).toISOString(),
      metadata: { listingId: "l_3" },
    },
    {
      id: "n_5",
      type: "LISTING_EXPIRY",
      title: "Listing expiry soon",
      message: "Your listing will expire in 2 days. Renew to stay live.",
      read: false,
      createdAt: new Date(now - 1000 * 60 * 60 * 50).toISOString(),
      metadata: { listingId: "l_4" },
    },
  ];
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const existing = raw ? JSON.parse(raw) : [];
      return seedNotificationsIfEmpty(existing);
    } catch {
      return seedNotificationsIfEmpty([]);
    }
  });

  const loading = false;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  }, [notifications]);


  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const fetchNotifications = useCallback(async () => {
    // Frontend-only for now; no backend call.
    // Keep signature to allow easy swap later.
    return notifications;
  }, [notifications]);

  const markAsRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const value = useMemo(
    () => ({
      notifications,
      unreadCount,
      loading,
      fetchNotifications,
      markAsRead,
      markAllAsRead,
      // exposed for future integration/testing
      _setNotifications: setNotifications,
    }),
    [
      notifications,
      unreadCount,
      loading,
      fetchNotifications,
      markAsRead,
      markAllAsRead,
    ]
  );


  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;

