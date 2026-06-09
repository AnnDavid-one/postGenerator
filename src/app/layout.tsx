import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Everything needs to live inside this single metadata object
export const metadata: Metadata = {
  metadataBase: new URL("https://your-vercel-domain.vercel.app"), // Make sure to replace this with your actual live domain!
  title: "Pansonee App",
  description: "Weekly Attendance Calculator and Terminal Tools",
  openGraph: {
    title: "Pansonee App",
    description: "Weekly Attendance Calculator and Terminal Tools",
    url: "/",
    siteName: "Pansonee",
    images: [
      {
        url: "/pansonee.jpg", // Ensure this file is placed directly in your 'public' folder (e.g., public/pansonee.jpg)
        width: 1200,
        height: 630,
        alt: "Pansonee Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pansonee App",
    description: "Weekly Attendance Calculator and Terminal Tools",
    images: ["/pansonee.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}