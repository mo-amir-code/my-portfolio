import {
  HomeAbout,
  HomeContacts,
  HomeEducation,
  HomeHero,
  HomeProjects,
  HomeSkills,
  HomeWork,
} from "@/section/home";
import FeaturedBlog from "@/section/home/FeaturedBlog";

export default function Page() {
  return (
    <main className="min-h-[100dvh] space-y-12">
      <div className="space-y-4">
        <HomeHero />
        <FeaturedBlog />
      </div>
      <div className="space-y-10">
        <HomeAbout />
        <HomeWork />
        <HomeEducation />
        <HomeSkills />
        <HomeProjects />
        <HomeContacts />
      </div>
    </main>
  );
}
