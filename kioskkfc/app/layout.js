import "./globals.css";
import { CartProvider } from "./CartContext";

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Kiosk KFC</title>
      </head>
      <body className="h-screen overflow-hidden">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
