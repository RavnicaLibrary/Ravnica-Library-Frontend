import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Ravnica Library",
  description: "Discover the multiverse of Magic: The Gathering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
        </div>
        </body>
        </html>
    );
}
