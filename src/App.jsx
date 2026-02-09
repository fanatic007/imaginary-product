import { CartProvider } from "@/context/cartContext";
import Routes from "./Routes";

function App() {
  return (
    <CartProvider>
      <Routes />
    </CartProvider>
  );
}

export default App;
