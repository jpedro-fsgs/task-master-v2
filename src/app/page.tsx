import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-main-backgroundcolorlighter w-fit h-fit p-16 mx-auto mt-16 flex flex-col gap-5 font-notoSans text-main-textcolor text-6xl">
      <Link href="/todo" className="hover:opacity-70">
        Todo
      </Link>
      <Link href="/clock" className="">
        Clock
      </Link>
      <Link href="/stopwatch" className="">
        Stopwatch
      </Link>
    </div>
  );
}
