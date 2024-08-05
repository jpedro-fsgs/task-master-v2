import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";

import "./globals.css";
import Links from "./components/Links";

export const notoSans = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Master",
  description: "The Master of Tasks",
};

import { StopwatchProvider } from "./context/StopwatchContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en">
      <body className="h-dvh] bg-main-backgroundcolordarker">
        <Links />
        <StopwatchProvider>{children}</StopwatchProvider>
      </body>
    </html>
  );
}
