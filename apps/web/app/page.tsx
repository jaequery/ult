"use client";

import Footer from "@web/components/Footer";
import Header from "@web/components/Header";
import Home from "./home/Home";

export default function RootPage() {
  return (
    <>
      <Header />
      <Home />
      <Footer />
    </>
  );
}
