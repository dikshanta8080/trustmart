import { Package, Clock, CheckCircle, XCircle } from "lucide-react";
import ListingTable from "../components/ListingTable";
import { listings } from "../data/mockData";

const stats = [
  {
    label: "Total Listings",
    value: listings.length,
    icon: Package,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
    sub: "All listings",
  },
  {
    label: "Pending Review",
    value: listings.filter((l) => l.status === "pending").length,
    icon: Clock,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    sub: "Needs approval",
  },
  {
    label: "Approved",
    value: listings.filter((l) => l.status === "approved").length,
    icon: CheckCircle,
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
    sub: "Live listings",
  },
  {
    label: "Rejected",
    value: listings.filter((l) => l.status === "rejected").length,
    icon: XCircle,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    sub: "Removed listings",
  },
];
