import React, { PropsWithChildren } from "react";

type CenterPageProps = PropsWithChildren & { className?: string };

export default function CenterPage({ children, className }: CenterPageProps) {
  return (
    <div className={className}>
      <div className="flex items-center justify-center h-screen">
        {children}
      </div>
    </div>
  );
}
