import { DATA } from "@/data/resume";
import type { Metadata } from "next";
import AdminPage from "./AdminPage";

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: `Admin`,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AdminPage>{children}</AdminPage>
    </div>
  );
}
