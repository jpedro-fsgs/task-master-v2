"use client";

import { usePathname, useRouter } from "next/navigation";
import { useSwipeable } from "react-swipeable";

const paths = ["/todo", "/alarm", "/stopwatch", "/timer", "/metronome", "/"];

function SwipeTransition({ children }: { children: React.ReactNode }) {
    const path = usePathname();
    const router = useRouter();
  
    const handlers = useSwipeable({
      onSwipedLeft: () => {
        const currentIndex = paths.indexOf(path);
        if (currentIndex < paths.length - 1) {
          router.push(paths[currentIndex + 1]);
        }
      },
      onSwipedRight: () => {
        const currentIndex = paths.indexOf(path);
        if (currentIndex > 0) {
          router.push(paths[currentIndex - 1]);
        }
      },
    });
  return (
    <div {...handlers} className="w-svw h-svh overflow-auto ">{children}</div>
  )
}

export default SwipeTransition