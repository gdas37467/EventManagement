import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Event Management",
  description: "Manage events and attendees",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <div className="h-screen flex">
          {/* Sidebar */}
          <aside className="w-64 bg-white border-r shadow-md p-4 flex flex-col">
            <h1 className="text-2xl font-bold mb-6">🎉 Events</h1>
            <nav className="space-y-2">
              <Link href="/">
                <Button variant="ghost" className="w-full justify-start">
                  Dashboard
                </Button>
              </Link>
              <Link href="/create-event">
                <Button variant="ghost" className="w-full justify-start">
                  Create Event
                </Button>
              </Link>
            </nav>
          </aside>

          {/* Main area */}
          <div className="flex-1 flex flex-col">
            {/* Topbar */}
            <header className="h-14 bg-white border-b shadow-sm flex items-center justify-between px-4">
              <span className="font-medium">Event Management System</span>
            </header>

            {/* Page content */}
            <main className="flex-1 overflow-y-auto p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
