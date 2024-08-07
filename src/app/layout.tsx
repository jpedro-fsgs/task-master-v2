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
import { TimerProvider } from "./context/TimerContext";
import { MetronomeProvider } from "./context/MetronomeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className=" bg-main-backgroundcolordarker">
        <header>
          <Links />
        </header>
        <MetronomeProvider>
          <TimerProvider>
            <StopwatchProvider>
              <main>{children}</main>
            </StopwatchProvider>
          </TimerProvider>
        </MetronomeProvider>
      </body>
    </html>
  );
}
