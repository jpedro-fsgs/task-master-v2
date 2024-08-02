import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";

import "./globals.css";
import Links from "./components/Links";

export const notoSans = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Master",
  description: "The Master of Tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className=" bg-main-backgroundcolordarker">
        <Links/>
        {children}
      </body>
    </html>
  );
}
