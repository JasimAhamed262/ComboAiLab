"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function HomePageContent() {
  const searchParams = useSearchParams();
  const model = searchParams.get("model");

  return (
    <div>
      <h1>Welcome to AI Combo</h1>
      <p>Selected model: {model}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent />
    </Suspense>
  );
}
