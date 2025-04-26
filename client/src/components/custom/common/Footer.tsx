import { menuItems, socialData } from "@/lib/data";
import { MaxWidthMD } from "@/wrappers";
import Link from "next/link";
import { LinkedinIcon, XIcon } from "../icons";
import { GithubIcon } from "./ProjectCard";

const Footer = () => {
  return (
    <MaxWidthMD className="mt-14">
      <footer className="border-t">
        <div className="mx-auto max-w-5xl px-6">
          <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
            {menuItems.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-muted-foreground hover:text-primary block duration-150"
              >
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
          <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
            {socialData.map(({ icon, link, title }, idx) => (
              <Link
                key={idx}
                href={link}
                target="_parent"
                rel="noopener noreferrer"
                aria-label={title}
                className="text-muted-foreground hover:text-primary block"
              >
                {(() => {
                  switch (icon) {
                    case "x":
                      return <XIcon />;
                    case "linkedin":
                      return <LinkedinIcon />;
                    case "github":
                      return <GithubIcon className="size-6" />;
                  }
                })()}
              </Link>
            ))}
          </div>
          <span className="text-muted-foreground block text-center text-sm">
            {" "}
            © {new Date().getFullYear()} mekyu.dev, All rights reserved
          </span>
        </div>
      </footer>
    </MaxWidthMD>
  );
};

export default Footer;
