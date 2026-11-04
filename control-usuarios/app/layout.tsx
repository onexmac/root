import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Control de Usuarios",
  description: "Prototipo del flujo de control de usuarios — Losa Flotante",
  manifest: "/manifest.json",
  icons: {
    // Tab favicon comes from `app/icon.svg` (Next file convention): the
    // Adelante mark on a squircle, same asset as losa-flotante, with the
    // light/dark swap living inside the SVG's own @media query.
    // iOS "Add to Home Screen" needs a PNG — Safari ignores SVG here.
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    // "default", not black-translucent: standalone mode puts the status bar
    // over the page, and translucent made the dark sidebar swallow it.
    statusBarStyle: "default",
    title: "Usuarios",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover" as const,
  // Moved out of `metadata` — Next 15+ warns that themeColor there is
  // unsupported (it was logging on every render of /pedido and /usuarios).
  themeColor: "#BDDE3B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${roboto.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
