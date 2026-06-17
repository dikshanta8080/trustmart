import {Routes, Route} from "react-router-dom";
import WishlistPage from "./pages/WishlistPage";


function App() {
  return (
    <Routes>
     
    <Route path="/" element={<WishlistPage />} />
    </Routes>
  );
}
export default App;