// User Profile Data
export const userProfileData = {
  name: "Alex Johnson",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  isVerified: true,
  isOnline: true,
  email: "alex.johnson@email.com",
  memberSince: "2024"
};

// Wishlist Data 
export const wishlistData = [
  {
    id: 1,
    title: "Herman Miller Aeron Chair - Size B",
    price: 650,
    originalPrice: 1495,
    location: "Berkeley",
    rating: 4.6,
    reviews: 12,
    seller: "Alex Johnson",
    sellerVerified: true,
    condition: "Like New", 
    status: "Good",
    postedDate: "1 day ago",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=150&h=150&fit=crop"
  },
  {
    id: 2,
    title: "Sony WH-1000XM5 Wireless Headphones",
    price: 249,
    originalPrice: 399,
    location: "San Jose",
    rating: 4.9,
    reviews: 89,
    seller: "David Park",
    sellerVerified: false,
    condition: "Good", 
    status: "Good",
    postedDate: "3 hours ago",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=150&h=150&fit=crop"
  },
  {
    id: 3,
    title: "Levi's 501 Original Fit Jeans - W32 L32",
    price: 45,
    originalPrice: null,
    location: "Palo Alto",
    rating: 4.3,
    reviews: 6,
    seller: "Priya Sharma",
    sellerVerified: false,
    condition: "Fair", 
    status: "Good",
    postedDate: "2 days ago",
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=300&fit=crop"
  }
];

// Purchase History Data 
export const purchaseData = {
  stats: {
    totalSpent: "$1,798",
    itemsBought: "8",
    topCategory: "Electronics",
    avgPurchase: "$225"
  },
  orders: [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      price: "$899",
      seller: "Sarah Chen",
      date: "Jun 12, 2026",
      status: "Delivered",
      statusColor: "bg-emerald-500",
      image: "📱"
    },
    {
      id: 2,
      name: "Sony WH-1000XM5",
      price: "$249",
      seller: "David Park",
      date: "Jun 8, 2026",
      status: "Shipped",
      statusColor: "bg-blue-500",
      image: "🎧"
    },
    {
      id: 3,
      name: "Herman Miller Aeron Chair",
      price: "$650",
      seller: "Emily Rodriguez",
      date: "May 28, 2026",
      status: "Processing",
      statusColor: "bg-amber-500",
      image: "🪑"
    }
  ]
};

// Sales History Data
export const salesData = {
  stats: {
    totalRevenue: "$4,891",
    itemsSold: "34",
    avgPrice: "$143",
    bestCategory: "Electronics"
  },
  monthlyData: [
    { month: "Jan", sales: 320 },
    { month: "Feb", sales: 450 },
    { month: "Mar", sales: 380 },
    { month: "Apr", sales: 520 },
    { month: "May", sales: 680 },
    { month: "Jun", sales: 750 }
  ],
  recentSales: [
    {
      id: 1,
      product: "iPhone 15 Pro Max",
      price: "$899",
      buyer: "Michael Chen",
      date: "Jun 15, 2026",
      status: "Completed",
      statusColor: "bg-emerald-500",
      image: "📱"
    },
    {
      id: 2,
      product: "Sony WH-1000XM5",
      price: "$249",
      buyer: "Jessica Park",
      date: "Jun 12, 2026",
      status: "Completed",
      statusColor: "bg-emerald-500",
      image: "🎧"
    },
    {
      id: 3,
      product: "Herman Miller Aeron Chair",
      price: "$650",
      buyer: "David Kim",
      date: "Jun 8, 2026",
      status: "Shipped",
      statusColor: "bg-blue-500",
      image: "🪑"
    },
    {
      id: 4,
      product: "MacBook Pro 14",
      price: "$1,999",
      buyer: "Sarah Lee",
      date: "Jun 5, 2026",
      status: "Processing",
      statusColor: "bg-amber-500",
      image: "💻"
    },
    {
      id: 5,
      product: "AirPods Pro 2",
      price: "$249",
      buyer: "James Wilson",
      date: "Jun 2, 2026",
      status: "Completed",
      statusColor: "bg-emerald-500",
      image: "🎧"
    }
  ]
};

// Products Data
export const productsData = [
  {
    id: 1,
    title: "Herman Miller Aeron Chair - Size B",
    price: 650,
    originalPrice: 1495,
    category: "Furniture",
    condition: "Like New",
    location: "Berkeley",
    rating: 4.6,
    reviews: 12,
    seller: "Alex Johnson",
    sellerVerified: true,
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=400&h=300&fit=crop",
    isNew: false,
    discount: 56
  },
  {
    id: 2,
    title: "Sony WH-1000XM5 Wireless Headphones",
    price: 249,
    originalPrice: 399,
    category: "Electronics",
    condition: "Good",
    location: "San Jose",
    rating: 4.9,
    reviews: 89,
    seller: "David Park",
    sellerVerified: false,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=300&fit=crop",
    isNew: true,
    discount: 38
  },
  {
    id: 3,
    title: "MacBook Pro 14-inch M3 Pro",
    price: 1999,
    originalPrice: 2499,
    category: "Electronics",
    condition: "Like New",
    location: "San Francisco",
    rating: 4.8,
    reviews: 45,
    seller: "Sarah Chen",
    sellerVerified: true,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
    isNew: true,
    discount: 20
  },
  {
    id: 4,
    title: "Levi's 501 Original Fit Jeans",
    price: 45,
    originalPrice: null,
    category: "Fashion",
    condition: "Fair",
    location: "Palo Alto",
    rating: 4.3,
    reviews: 6,
    seller: "Priya Sharma",
    sellerVerified: false,
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=300&fit=crop",
    isNew: false,
    discount: null
  },
  {
    id: 5,
    title: "Nike Air Max 270 Sneakers",
    price: 120,
    originalPrice: 160,
    category: "Fashion",
    condition: "Good",
    location: "Oakland",
    rating: 4.5,
    reviews: 23,
    seller: "Mike Johnson",
    sellerVerified: true,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
    isNew: false,
    discount: 25
  },
  {
    id: 6,
    title: "Dyson V15 Cordless Vacuum",
    price: 550,
    originalPrice: 750,
    category: "Home",
    condition: "Like New",
    location: "San Mateo",
    rating: 4.7,
    reviews: 34,
    seller: "Emma Wilson",
    sellerVerified: true,
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&h=300&fit=crop",
    isNew: false,
    discount: 27
  },
  {
    id: 7,
    title: "iPad Pro 12.9 M2",
    price: 899,
    originalPrice: 1099,
    category: "Electronics",
    condition: "Good",
    location: "Cupertino",
    rating: 4.9,
    reviews: 67,
    seller: "Tim Cook",
    sellerVerified: true,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
    isNew: true,
    discount: 18
  },
  {
    id: 8,
    title: "NordicTrack Treadmill T Series",
    price: 899,
    originalPrice: 1299,
    category: "Fitness",
    condition: "Good",
    location: "Fremont",
    rating: 4.4,
    reviews: 28,
    seller: "FitLife Store",
    sellerVerified: false,
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400&h=300&fit=crop",
    isNew: false,
    discount: 31
  }
];
