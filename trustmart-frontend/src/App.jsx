import { Navigate, Route, Routes } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import LoginPage from "./pages/LoginPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import Users from "./pages/Users";
import Listings from "./pages/Listings";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const isAuthenticated = false; // Replace with real auth logic later

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<LoginPage />} />      {/* <-- ADD THIS */}
      <Route path="/forgot-password" element={<ForgetPasswordPage />} />

      {/* Protected routes (only if authenticated) */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
        }
      />
     

      {/* Admin routes – if you want to protect them, you can wrap AdminRoutes */}
      <Route
        path="/admin/*"
        element={
          isAuthenticated ? <AdminRoutes /> : <Navigate to="/login" replace />
        }
      />

      {/* Fallback for unknown paths */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
import ProtectedRoute from "./routes/ProtectedRoute";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Wishlist from './pages/Wishlist';
import PurchaseHistory from './pages/PurchaseHistory';
import Products from './pages/Products';

function App() {
  // Manage Active tab
   const [activeTab, setActiveTab] = useState('wishlist');

   const currentUser = {
  name: "Dilasha",
  role: "Customer",
};
    
const handleLogout = () => {
  console.log("Logout clicked");
};
  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={currentUser} onLogout={handleLogout} />
      
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="flex gap-6">
          {/* Sidebar  */}
          <div className="w-64 hidden md:block flex-shrink-0">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Wishlist />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/purchase-history" element={<PurchaseHistory />} />
              <Route path="/Products" element={<Products />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
