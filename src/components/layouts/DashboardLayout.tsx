interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function DashboardLayout({
  children,
  sidebar,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-600 bg-white shadow-sm"></header>
      <div className="flex">
        <aside className="hidden w-64 lg:block">{sidebar}</aside>
        // outlet
        <main className="flex-1 p-1 md:p-2 xl:p-6">{children}</main>
      </div>
    </div>
  );
}
