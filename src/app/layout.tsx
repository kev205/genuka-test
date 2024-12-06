import type { Metadata } from "next";
import "./globals.css";
import { Outfit } from "next/font/google";

import Navigation from "@/components/Navigation";
import { TaskListProvider } from "@/context/TaskListContext";

export const metadata: Metadata = {
  title: "Genuka",
  description: "Genuka test",
};

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Navigation />
        <TaskListProvider>{children}</TaskListProvider>
      </body>
    </html>
  );
}
