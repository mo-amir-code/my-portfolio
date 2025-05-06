import { Hero, Projects } from "@/components/custom/sections/pages/home";

export default function Home() {
  return (
    <main className="space-y-12">
      <Hero />
      {/* <Blogs /> */}
      <Projects />
    </main>
  );
}
