import { Blogs, Hero, Projects } from "@/components/custom/sections";

export default function Home() {

  return (
    <main className="space-y-12" >
      <Hero />
      <Blogs />
      <Projects />
    </main>
  );
}
