import type { Metadata } from "next";
import Footer from "@/components/Footer";
import FloatingHeader from "@/components/FloatingHeader";

export const metadata: Metadata = {
  title: {
    template: "%s | Powero",
    default: "Powero — Your one stop shop",
  },
  description: "Powero, your one stop shop for all your needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <FloatingHeader />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  );
}
