// MainLayout.tsx
import React from "react";
import Header from "../ui/Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="main-layout">
      <Header />
      {children}
    </div>
  );
};
