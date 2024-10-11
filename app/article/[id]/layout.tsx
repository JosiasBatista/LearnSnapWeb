import Header from "@/app/_components/Header";

export default function ArticleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center">
      <Header />

      {children}
    </div>
  )
}