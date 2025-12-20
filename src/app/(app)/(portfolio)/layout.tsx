import Navbar from "@/components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="py-12 sm:py-24 max-w-xl mx-auto">
      {children}
      <Navbar />
    </div>
  );
}
