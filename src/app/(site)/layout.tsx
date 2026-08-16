import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/components/cart/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import { getInitialCart } from "@/lib/shopify/cart";

/* Public-site chrome — was on the true root layout, which meant /admin
   inherited it too: a second nav bar, and worse, the public header's own
   `fixed` positioning sat on top of admin pages and intercepted clicks.
   Scoped to this route group now, so /admin gets none of it. */
export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialCart = await getInitialCart();

  return (
    <CartProvider initialCart={initialCart}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
