"use client";

import { Suspense } from "react";
import Results from "@/components/Results";
import SiteLoader from "@/components/SiteLoader";

export default function ResultsPage() {
  return (
    <Suspense fallback={<SiteLoader content="Loading your Data..." />}>
      <Results />
    </Suspense>
  );
}
