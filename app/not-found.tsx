import Link from "next/link";
import { Metadata } from "next";
import { JSX } from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `404 - Get Git`,
  };
}

export default function NotFound(): JSX.Element {
  return (
    <div className="w-dvw h-dvh flex items-center justify-center">
      <div className="content-wrapper w-fit h-fit flex flex-col items-center max-w-[448px] text-wrap gap-4 p-4">
        <div className="error-code w-fit h-fit text-center text-wrap font-extrabold text-6xl sm:text-8xl text-orange-700 animate-pulse">
          404
        </div>
        <div className="regrets-and-console-text w-fit h-fit flex flex-col items-center justify-center gap-2">
          <div className="regret-text w-fit h-fit text-center text-wrap font-bold text-orange-800 text-2xl">
            Sorry 😔, I couldn&apos;t find this page.
          </div>
          <div className="console-person w-fit h-fit text-center text-wrap text-orange-600 ">
            But don&apos;t worry, you can find plenty of other things on my
            homepage.
          </div>
        </div>
        <Link href={"/"} className="w-fit h-fit mt-4">
          <button className="return-to-home w-fit h-fit px-5 py-4 rounded-[30px] bg-transparent dark:bg-transparent dark:text-white border border-[#9ea5b0] hover:bg-orange-200 hover:cursor-pointer duration-300">
            Back to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
}
