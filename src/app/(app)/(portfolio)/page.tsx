import {
  HomeAbout,
  HomeContacts,
  HomeEducation,
  HomeHero,
  HomeProjects,
  HomeSkills,
  HomeWork,
} from "@/section/home";

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <HomeHero />
      <HomeAbout />
      <HomeWork />
      <HomeEducation />
      <HomeSkills />
      <HomeProjects />
      <HomeContacts />
    </main>
  );
}
