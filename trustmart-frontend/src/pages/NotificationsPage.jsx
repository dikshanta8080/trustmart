import { useMemo, useState } from "react";


import "./NotificationsPage.css";

const SAMPLE_NOTIFICATIONS = [
  {
    id: "n1",
    type: "MESSAGES",
    title: "New Message",
    message: "Sarah Chen sent you a message about iPhone 15 Pro Max",
    createdAt: Date.now() - 2 * 60 * 1000,
    read: false,
  },
  {
    id: "n2",
    type: "OFFERS",
    title: "Offer Received",
    message: "You received an offer of rs1,400 for MacBook Pro 14",
    createdAt: Date.now() - 60 * 60 * 1000,
    read: false,
  },
  {
    id: "n3",
    type: "SYSTEM",
    title: "Product Sold",
    message: "Your Sony XM5 was sold to David Park",
    createdAt: Date.now() - 24 * 60 * 60 * 1000,
    read: true,
  },
  {
    id: "n4",
    type: "SYSTEM",
    title: "Review",
    message: "You received a 5-star review",
    createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
    read: true,
  },
  {
    id: "n5",
    type: "SYSTEM",
    title: "Payment Received",
    message: "Payment received from buyer",
    createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
    read: false,
  },
  {
    id: "n6",
    type: "SYSTEM",
    title: "Listing Expiry",
    message: "Your listing expires in 3 days",
    createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
    read: false,
  },
  {
    id: "n7",
    type: "OFFERS",
    title: "Price Drop",
    message: "An item in your wishlist dropped in price",
    createdAt: Date.now() - 5 * 60 * 60 * 1000,
    read: true,
  },
];

function formatRelativeTime(ts) {
  const diffMs = Date.now() - ts;
  const minutes = Math.floor(diffMs / (60 * 1000));
  if (minutes < 60) return `${minutes <= 1 ? 1 : minutes} min ago`;

  const hours = Math.floor(diffMs / (60 * 60 * 1000));
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;

  const days = Math.floor(diffMs / (24 * 60 * 60 * 1000));
  if (days === 1) return "Yesterday";
  return `rs{days} days ago`;
}

function iconForType(type) {
  // Inline SVG icons (no external icon libraries)
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  };

  switch (type) {
    case "MESSAGES":
      return (
        <svg {...common} stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8z" />
          <path d="M8 9h8" />
          <path d="M8 13h6" />
        </svg>
      );
    case "OFFERS":
      return (
        <svg {...common} stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 13V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
          <path d="M8 21h8" />
          <path d="M12 17v4" />
          <path d="m7 13 2-2 2 2 2-2 2 2" />
        </svg>
      );
    case "SYSTEM":
    default:
      return (
        <svg {...common} stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 7-3 7h18s-3 0-3-7" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      );
  }
}


const TAB_DEFS = [
  { key: "ALL", label: "All" },
  { key: "UNREAD", label: "Unread" },
  { key: "OFFERS", label: "Offers" },
  { key: "MESSAGES", label: "Messages" },
  { key: "SYSTEM", label: "System" },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState("ALL");

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const filtered = useMemo(() => {
    const sorted = [...notifications].sort((a, b) => b.createdAt - a.createdAt);

    if (activeTab === "ALL") return sorted;
    if (activeTab === "UNREAD") return sorted.filter((n) => !n.read);
    return sorted.filter((n) => n.type === activeTab);
  }, [notifications, activeTab]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="tm-notifications-page">
      <div className="tm-notifications-container">
        <div className="tm-notifications-header">
          <div className="tm-title-block">
            <h1 className="tm-title">Notifications</h1>
            <p className="tm-subtitle">{unreadCount} unread notifications</p>
          </div>

          <button
            className="tm-mark-all"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            aria-label="Mark all as read"
          >
            Mark all as read
          </button>
        </div>

        <div className="tm-tabs" role="tablist" aria-label="Notification filters">
          {TAB_DEFS.map((t) => (
            <button
              key={t.key}
              className={`tm-tab ${activeTab === t.key ? "tm-tab-active" : ""}`}
              onClick={() => setActiveTab(t.key)}
              role="tab"
              aria-selected={activeTab === t.key}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="tm-list" aria-live="polite">
          {filtered.length === 0 ? (
            <div className="tm-empty">No notifications found.</div>
          ) : (
            filtered.map((n) => (
              <div key={n.id} className="tm-card" style={{ opacity: n.read ? 0.92 : 1 }}>
                <div className="tm-icon-wrap">{iconForType(n.type)}</div>

                <div className="tm-content">
                  <div className="tm-card-top">
                    <div className="tm-card-title">{n.title}</div>
                    <div className="tm-card-time">{formatRelativeTime(n.createdAt)}</div>
                  </div>

                  <div className="tm-card-msg">{n.message}</div>
                </div>

                <div className="tm-actions">
                  {!n.read && <div className="tm-unread-dot" aria-label="Unread" />}
                  {!n.read && (
                    <button className="tm-read-btn" onClick={() => markAsRead(n.id)}>
                      Mark read
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}


