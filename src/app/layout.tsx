import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "@/components/ui/Navbar";
import "./globals.css";
import Footer from "@/components/ui/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "YourBrand | Learn from top creators",
    template: "%s | YourBrand",
  },
  description:
    "Discover courses from expert creators. Learn new skills at your own pace.",
  openGraph: {
    title: "YourBrand | Learn from top creators",
    description:
      "Discover courses from expert creators. Learn new skills at your own pace.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" className={poppins.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}