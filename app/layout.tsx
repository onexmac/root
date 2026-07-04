import type { Metadata, Viewport } from "next";
import { Lora } from "next/font/google";
import "./globals.css";

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Estudia Reels",
  description: "Repasa el temario en formato reel",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Estudia Reels",
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
    <html lang="es" className={`${lora.variable} h-full antialiased`}>
      <body data-app className="min-h-full bg-black text-white">
        {children}
      </body>
    </html>
  );
}
