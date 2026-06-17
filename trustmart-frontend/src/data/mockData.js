export const users = [
  { id: 1, name: "Rajesh Kumar", email: "rajesh.k@gmail.com", joined: "Jan 12, 2024", listings: 34, rating: 4.8, status: "active", verified: true, avatar: "RK" },
  { id: 2, name: "Priya Sharma", email: "priya.s@yahoo.com", joined: "Mar 5, 2024", listings: 12, rating: 4.6, status: "active", verified: true, avatar: "PS" },
  { id: 3, name: "Amit Mishra", email: "a.mishra@hotmail.com", joined: "Feb 18, 2024", listings: 7, rating: 2.1, status: "flagged", verified: true, avatar: "AM" },
  { id: 4, name: "Sunita Gupta", email: "sunita.g@gmail.com", joined: "Apr 1, 2024", listings: 0, rating: null, status: "unverified", verified: false, avatar: "SG" },
  { id: 5, name: "Nikhil Joshi", email: "nikhil.j@email.com", joined: "Dec 28, 2023", listings: 51, rating: 4.9, status: "suspended", verified: true, avatar: "NJ" },
  { id: 6, name: "Kavita Rai", email: "kavita.r@gmail.com", joined: "May 3, 2024", listings: 9, rating: 4.3, status: "active", verified: true, avatar: "KR" },
];

export const listings = [
  { id: 1, title: "iPhone 14 Pro 256GB", seller: "Rajesh K.", category: "Phones", price: 65000, condition: "Good", location: "Kathmandu", submitted: "2h ago", status: "pending" },
  { id: 2, title: "Honda Activa 2022", seller: "Priya S.", category: "Vehicles", price: 110000, condition: "Good", location: "Lalitpur", submitted: "4h ago", status: "pending" },
  { id: 3, title: "Dell XPS 13 Laptop", seller: "Nikhil J.", category: "Electronics", price: 85000, condition: "Like new", location: "Bhaktapur", submitted: "6h ago", status: "approved" },
  { id: 4, title: "Sofa Set 5 Seater", seller: "Sunita G.", category: "Furniture", price: 22000, condition: "Fair", location: "Pokhara", submitted: "1d ago", status: "rejected" },
  { id: 5, title: "Samsung 55\" TV", seller: "Kavita R.", category: "Electronics", price: 48000, condition: "Good", location: "Kathmandu", submitted: "3h ago", status: "pending" },
];

export const reports = [
  { id: 1082, type: "Scam / fraud", reported: "Listing: iPhone 14 Pro", reporter: "Priya S.", priority: "high", status: "open" },
  { id: 1081, type: "Fake listing", reported: "User: amit.m", reporter: "Rajesh K.", priority: "high", status: "open" },
  { id: 1080, type: "Inappropriate content", reported: "Listing: Sofa Set", reporter: "Sunita G.", priority: "medium", status: "in_review" },
  { id: 1079, type: "Spam", reported: "User: spam_user99", reporter: "Nikhil J.", priority: "low", status: "resolved" },
  { id: 1078, type: "Fake seller", reported: "User: seller123", reporter: "System", priority: "high", status: "escalated" },
];

export const categories = [
  { id: 1, name: "Electronics", listings: 3062, subcategories: 12, status: "active" },
  { id: 2, name: "Vehicles", listings: 1923, subcategories: 8, status: "active" },
  { id: 3, name: "Furniture", listings: 1574, subcategories: 6, status: "active" },
  { id: 4, name: "Phones", listings: 1311, subcategories: 5, status: "active" },
  { id: 5, name: "Clothing", listings: 542, subcategories: 4, status: "limited" },
];

export const fraudAlerts = [
  { id: 1, title: "Multiple accounts from same device", detail: "Accounts: amit.m@, am_mishra@, amishra99@ — same IP 192.168.1.44", severity: "high" },
  { id: 2, title: "Rapid listing price changes", detail: "User nikhil.j changed prices 47 times in 2 hours", severity: "high" },
  { id: 3, title: "Unusual transaction velocity", detail: "User priya.s completed 23 transactions in 48 hours", severity: "medium" },
];

