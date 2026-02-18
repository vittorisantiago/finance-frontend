"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  Home,
  ReceiptText,
  LineChart,
  PiggyBank,
  Settings2,
  Menu,
  X,
  ArrowLeftFromLine,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import api from "@/lib/axios";
import { AxiosError } from "axios";

const sidebarItems = [
  { icon: Home, label: "Resumen", href: "/dashboard" },
  {
    icon: ReceiptText,
    label: "Transacciones",
    href: "/dashboard/transactions",
  },
  { icon: LineChart, label: "Reportes", href: "/dashboard/analytics" },
  { icon: PiggyBank, label: "Presupuestos", href: "/dashboard/budgets" },
  { icon: Settings2, label: "Configuración", href: "/dashboard/settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const [userPlan, setUserPlan] = useState<string | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const normalizedPlan = useMemo(() => {
    const raw = (userPlan || "free").toLowerCase();
    if (raw === "basic" || raw === "premium" || raw === "free") return raw;
    return "free";
  }, [userPlan]);

  useEffect(() => {
    let isMounted = true;

    const loadMe = async () => {
      try {
        const res = await api.get("/auth/me");
        const plan = res.data?.user?.plan as string | undefined;
        if (isMounted) setUserPlan(plan ?? "free");
      } catch (error) {
        const err = error as AxiosError;
        const status = err.response?.status;
        if (status === 401 || status === 403) {
          router.replace("/login");
          return;
        }
        console.error("Error cargando usuario", error);
      } finally {
        if (isMounted) setIsLoadingUser(false);
      }
    };

    loadMe();
    return () => {
      isMounted = false;
    };
  }, [router]);

  const PlanCard = () => {
    if (isLoadingUser) {
      return (
        <div className="rounded-xl bg-slate-900 p-4 text-white">
          <div className="mb-2 text-xs font-medium text-slate-400">
            Plan Actual
          </div>
          <div className="h-4 w-32 rounded bg-slate-800" />
          <div className="mt-4 h-9 w-full rounded bg-slate-800" />
        </div>
      );
    }

    const isPremium = normalizedPlan === "premium";
    const isBasic = normalizedPlan === "basic";

    const planLabel =
      normalizedPlan === "premium"
        ? "Premium"
        : normalizedPlan === "basic"
          ? "Basic"
          : "Free";

    return (
      <div className="rounded-xl bg-slate-900 p-4 text-white">
        <div className="mb-2 text-xs font-medium text-slate-400">
          Plan Actual
        </div>

        <div className="mb-3 flex items-center gap-2">
          <div className="text-sm font-bold">{planLabel}</div>

          {isPremium ? (
            <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-200 ring-1 ring-inset ring-emerald-500/30">
              Máximo nivel
            </span>
          ) : isBasic ? (
            <span className="inline-flex items-center rounded-full bg-orange-500/20 px-2 py-0.5 text-[10px] font-semibold text-orange-200 ring-1 ring-inset ring-orange-500/30">
              Más pro
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-200 ring-1 ring-inset ring-slate-700">
              Starter
            </span>
          )}
        </div>

        {isPremium ? (
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-violet-500/20 px-2 py-0.5 text-[10px] font-semibold text-violet-200 ring-1 ring-inset ring-violet-500/30">
              Insignia premium
            </span>
            <span className="inline-flex items-center rounded-full bg-sky-500/20 px-2 py-0.5 text-[10px] font-semibold text-sky-200 ring-1 ring-inset ring-sky-500/30">
              Acceso completo
            </span>
          </div>
        ) : (
          <Link href="/subscribe" className="block">
            <Button
              size="sm"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white border-0"
            >
              Pasar a Premium
            </Button>
          </Link>
        )}
      </div>
    );
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await api.post("/auth/logout");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error al salir", error);
      setIsLoggingOut(false);
    }
  };

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
            <PlanCard />

            <Button
              onClick={() => setShowLogoutDialog(true)}
              variant="outline"
              className="w-full justify-center gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <ArrowLeftFromLine className="h-4 w-4" /> Cerrar sesión
            </Button>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 md:ml-64">
        {/* Header Mobile */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-white/80 px-4 backdrop-blur-md md:hidden">
          <div className="flex items-center gap-2">
            <Image
              src="/favicon.ico"
              alt="FinanceStart Logo"
              width={28}
              height={28}
              className="rounded-md"
            />
            <div className="font-bold">FinanceStart</div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </header>

        {/* Menú Mobile (Drawer) */}
        <div className="md:hidden">
          {/* Overlay */}
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`fixed inset-0 z-30 bg-black/40 transition-opacity duration-200 ease-out
            ${
              isMobileMenuOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          />

          {/* Panel */}
          <aside
            className={`fixed left-0 top-0 z-40 h-full w-[85vw] max-w-xs border-r bg-white shadow-lg will-change-transform transition-transform duration-200 ease-out
            ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
            aria-hidden={!isMobileMenuOpen}
          >
            <div className="flex h-16 items-center justify-between border-b px-4">
              <div className="flex items-center gap-2">
                <Image
                  src="/favicon.ico"
                  alt="FinanceStart Logo"
                  width={32}
                  height={32}
                  className="rounded-md"
                />
                <span className="font-bold text-base">FinanceStart</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Cerrar menú"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex h-[calc(100vh-65px)] flex-col justify-between py-6">
              <nav className="space-y-1 px-4">
                {sidebarItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all
                        ${
                          isActive
                            ? "bg-orange-50 text-orange-600"
                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                        }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="px-4 space-y-4">
                <PlanCard />

                <Button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setShowLogoutDialog(true);
                  }}
                  variant="outline"
                  className="w-full justify-center gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <ArrowLeftFromLine className="h-4 w-4" /> Cerrar sesión
                </Button>
              </div>
            </div>
          </aside>
        </div>

        {/* Contenido de la página */}
        <div className="p-4 md:p-8 max-w-7xl mx-auto">{children}</div>

        {/* Modal de Confirmación (global para desktop + mobile) */}
        <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
          <DialogContent>
            <DialogHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <DialogTitle>Cerrar sesión</DialogTitle>
              </div>
              <DialogDescription>
                ¿Estás seguro de que querés cerrar sesión? Tendrás que volver a
                ingresar.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowLogoutDialog(false)}
                disabled={isLoggingOut}
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? "Cerrando..." : "Sí, cerrar sesión"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
