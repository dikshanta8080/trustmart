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

const UserTable = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [data, setData] = useState(users);

  const filtered = data.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || u.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleSuspend = (id) => {
    setData((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === "suspended" ? "active" : "suspended" } : u
      )
    );
  };
}