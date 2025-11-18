import { BLUR_FADE_DELAY } from "@/app/page";
import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import Link from "next/link";

const Contacts = () => {
  return (
    <section id="contact">
      <div className="grid items-center justify-center gap-4 text-center w-full py-12">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <div className="">
            {/* <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
              Contact
            </div> */}
            <h2 className="text-3xl border py-2 font-bold tracking-tighter sm:text-5xl">
              Get in Touch
            </h2>
            <p className="mx-auto p-4 border border-t-0 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Want to chat? Just shoot me a dm{" "}
              <Link
                href={DATA.contact.social.X.url}
                className="text-blue-500 hover:underline"
              >
                with a direct question on twitter
              </Link>{" "}
              and I&apos;ll respond whenever I can. I will ignore all
              soliciting.
            </p>
          </div>
        </BlurFade>
      </div>
    </section>
  );
};

export default Contacts;
