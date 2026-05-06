"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/");
    }, 3000); // redirect after 3 sec

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-bold mb-3">
        पेज नहीं मिला 😕
      </h1>
      <p className="text-gray-600 mb-4">
        जिस पेज को आप ढूंढ रहे हैं वह मौजूद नहीं है।
      </p>
      <p className="text-sm text-gray-500">
        आपको होम पेज पर भेजा जा रहा है...
      </p>
    </div>
  );
}