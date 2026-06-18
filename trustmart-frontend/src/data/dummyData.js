import AaratiPhoto from "../assets/Aarati.jpg";
import SmitaPhoto from "../assets/Smita.jpg";
import prashnaPhoto from "../assets/prashna.jpg";

export const users = [
  {
    id: 1,
    name: "Aarati",
    status: "Online",
    time: "2 min ago",
    unreadCount: 3,
    lastMessage: "Is the phone still available?",
    avatar: AaratiPhoto, 
    item: {
      title: "iPhone 15 Pro Max",
      price: "Rs. 1,20,000",
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=100"
    }
  },
  {
    id: 2,
    name: "Smita",
    status: "Offline",
    time: "1 hour ago",
    unreadCount: 1,
    lastMessage: "Can you do Rs.1400?",
    avatar: SmitaPhoto, 
    item: {
      title: 'MacBook Pro 14"',
      price: "Rs. 1,85,000",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100"
    }
  },
  {
    id: 3,
    name: "Prashna",
    status: "Online",
    time: "3 hours ago",
    unreadCount: 0,
    lastMessage: "Thanks! I'll pick it up tomorrow.",
    avatar: prashnaPhoto, 
    item: {
      title: "Sony XM5 Headphones",
      price: "Rs. 35,000",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100"
    }
  }
];