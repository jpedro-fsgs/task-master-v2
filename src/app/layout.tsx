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
import SwipeTransition from "./components/SwipeTransition";
import { ClockProvider } from "./context/ClockContext";
import { AlarmProvider } from "./alarm/components/AlarmContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className=" bg-main-backgroundcolordarker">
        <AlarmProvider>
          <SwipeTransition>
            <ClockProvider>
              <header>
                <Links />
              </header>

              <MetronomeProvider>
                <TimerProvider>
                  <StopwatchProvider>{children}</StopwatchProvider>
                </TimerProvider>
              </MetronomeProvider>
            </ClockProvider>
          </SwipeTransition>
        </AlarmProvider>
      </body>
    </html>
  );
}
