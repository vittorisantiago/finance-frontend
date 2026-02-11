"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CreditCard,
  PieChart,
  Settings,
  Menu,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Resumen", href: "/dashboard" },
  { icon: CreditCard, label: "Transacciones", href: "/dashboard/transactions" },
  { icon: PieChart, label: "Análisis", href: "/dashboard/analytics" },
  { icon: Settings, label: "Configuración", href: "/dashboard/settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      {/* --- SIDEBAR DESKTOP --- */}
      <aside className="hidden w-64 border-r bg-white md:block fixed h-full z-10">
        <div className="flex h-16 items-center border-b px-6">
          <Image
            src="/favicon.ico"
            alt="FinanceStart Logo"
            width={56}
            height={56}
            className="rounded-lg mr-2"
          />
          <span className="font-bold text-lg">FinanceStart</span>
        </div>

        <div className="flex flex-col h-[calc(100vh-65px)] justify-between py-6">
          <nav className="space-y-1 px-4">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all
                    ${
                      isActive
                        ? "bg-orange-50 text-orange-600"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="px-4 space-y-4">
            {/* Tarjeta de Plan Actual */}
            <div className="rounded-xl bg-slate-900 p-4 text-white">
              <div className="mb-2 text-xs font-medium text-slate-400">
                Plan Actual
              </div>
              <div className="mb-4 text-sm font-bold">Free Plan</div>
              <Button
                size="sm"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white border-0"
              >
                Pasar a Premium
              </Button>
            </div>

            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
            </Button>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 md:ml-64">
        {/* Header Mobile */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-white/80 px-4 backdrop-blur-md md:hidden">
          <div className="font-bold">FinanceStart</div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </header>

        {/* Contenido de la página */}
        <div className="p-4 md:p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
