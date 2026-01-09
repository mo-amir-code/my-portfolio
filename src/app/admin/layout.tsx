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
  robots: {
    index: false,
    follow: false,
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
