import Homepage from "./Pages/Homepage";
import Order_Menu from "./Pages/Order_Menu";
import Menu_details from "./Pages/Menu_details";
import Cart_Menu from "./Pages/Card_Menu";
import Book_Table from "./Pages/Book_Table";
import Contact from "./Pages/Contact";
import Checkout from "./Pages/Checkout";
import AuthPage from "./Pages/AuthPage";
import Order_Tracking from "./Pages/Order_Tracking";


export default function App() {
  const path = window.location.pathname;

   if (path === "/checkout") return <Checkout />;
  if (path === "/contact") return <Contact />;
  if (path === "/book-table") return <Book_Table />;
  if (path === "/order-menu") return <Order_Menu />;
  if (path === "/order-tracking") return <Order_Tracking />;
  if (path.startsWith("/menu-details")) return <Menu_details />;
  if (path.startsWith("/cart-menu")) return <Cart_Menu />;
  if (path === "/auth") return <AuthPage />;

  return <Homepage />;
}