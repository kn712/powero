import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${GeistSans.variable} font-geist-sans antialiased`}>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#000000",
                color: "#fff",
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
};
export default RootLayout;
