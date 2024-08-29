import React from "react";
import { Metadata } from "next";
import { initValues } from "../../constants/seo";
import { getMetadata } from "../../utils/getMetadata";

export const metadata: Metadata = {
  ...getMetadata({
    title: `Sobre Mi | ${initValues.title}`,
    description: "Está es la página de sobre mi",
  }),
};

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>About</div>
    </main>
  );
}
