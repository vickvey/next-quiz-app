import Link from "next/link";

import QuizSection from "@/components/quiz-section";

export default function HomePage() {
  return (
    <>
      <header>
        <div className="flex flex-col space-x-2 items-center lg:flex-row lg:justify-between lg:mx-24 my-2">
          <p>Copyright 2025</p>
          <Link href={"https://github.com/vickvey"}>Vivek Kumar</Link>
        </div>
      </header>
      <QuizSection />
    </>
  );
}
