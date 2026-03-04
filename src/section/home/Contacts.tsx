import BlurFade from "@/components/magicui/blur-fade";
import { BLUR_FADE_DELAY } from "@/data";
import ContactForm from "@/components/contact/ContactForm";
import { TypographyH2 } from "@/components/typography";

const Contacts = () => {


  return (
    <section id="contact" className="pb-12" >
      <div className="w-full">
        {/* Header */}
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <TypographyH2 text="Get in Touch" className="border" isBordered />
        </BlurFade>

        {/* Description */}
        <BlurFade delay={BLUR_FADE_DELAY * 16.5}>
          <p className="text-muted-foreground border border-t-0 border-r border-b border-l p-2 md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
            Have a project in mind or want to collaborate? I&apos;d love to hear
            from you. Send me a message below and I&apos;ll get back to you as
            soon as possible.
          </p>
        </BlurFade>

        {/* Contact Form */}
        <BlurFade delay={BLUR_FADE_DELAY * 17} className="border border-t-0 border-r border-b border-l p-6">
          <ContactForm />
        </BlurFade>
      </div>
    </section>
  );
};

export default Contacts;
