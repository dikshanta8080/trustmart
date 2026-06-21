import { useState } from "react";
import { Search, Shield, ShieldOff, Eye, CheckCircle } from "lucide-react";
import { users } from "../data/mockData";

const statusPill = {
  active: "bg-green-50 text-green-700",
  flagged: "bg-amber-50 text-amber-700",
  suspended: "bg-red-50 text-red-700",
  unverified: "bg-gray-100 text-gray-500",
};

const avatarColor = [
  "bg-blue-100 text-blue-700",
  "bg-teal-100 text-teal-700",
  "bg-amber-100 text-amber-700",
  "bg-purple-100 text-purple-700",
  "bg-pink-100 text-pink-700",
  "bg-green-100 text-green-700",
];

