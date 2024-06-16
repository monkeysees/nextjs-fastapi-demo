import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Books App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="emerald">
      <body className={inter.className}>
        <main className="container mx-auto px-32 pt-16 pb-32 ">{children}</main>
      </body>
    </html>
  );
}
