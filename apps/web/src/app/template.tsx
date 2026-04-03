"use client";

import { usePathname } from "next/navigation";

export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      <div
        key={`route-overlay-${pathname}`}
        className="routeTransitionOverlay"
        aria-hidden="true"
      />

      <div
        key={`route-content-${pathname}`}
        className="routeTransitionContent"
      >
        {children}
      </div>
    </>
  );
}