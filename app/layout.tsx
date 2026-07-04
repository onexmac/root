import type { Metadata, Viewport } from "next";
import { Roboto_Serif } from "next/font/google";
import "./globals.css";

const robotoSerif = Roboto_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Histok",
  description: "Repasa el temario en formato reel",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Histok",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${robotoSerif.variable} h-full antialiased`}>
      <body data-app className="min-h-full bg-black text-white">
        {children}
      </body>
    </html>
  );
}
