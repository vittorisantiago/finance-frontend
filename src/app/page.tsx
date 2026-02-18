import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, ArrowRight, BarChart3, Lock, Zap, X } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      {/* --- NAVBAR --- */}
      <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link
            href="/"
            className="group flex items-center font-bold text-xl tracking-tighter cursor-pointer"
          >
            <Image
              src="/favicon.ico"
              alt="FinanceStart Logo"
              width={64}
              height={64}
              className="rounded-lg transition-transform duration-200 group-hover:scale-[1.03]"
            />
            <span className="transition-colors duration-200 group-hover:text-slate-950">
              FinanceStart
            </span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 hover:underline underline-offset-4 transition-colors cursor-pointer"
            >
              Login
            </Link>
            <Link href="/register">
              <Button
                size="sm"
                className="bg-black text-white hover:bg-zinc-800 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                Empezar Gratis
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* --- HERO SECTION --- */}
        <section className="container mx-auto px-4 py-24 text-center lg:py-32">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Controlá tus gastos. <br className="hidden sm:inline" />
            <span className="text-orange-600">Dominá tu futuro.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[600px] text-gray-500 md:text-xl">
            La plataforma financiera pensada para tu día a día. Registrá tus
            gastos, organizá tu dinero y tomá decisiones inteligentes.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/register">
              <Button
                size="lg"
                className="h-12 px-8 text-lg bg-black hover:bg-zinc-800 transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Crear cuenta gratis <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#pricing">
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 text-lg transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                Ver Planes
              </Button>
            </Link>
          </div>
          <div className="mt-16 rounded-2xl border bg-gray-50 p-4 sm:p-6 shadow-2xl transition-shadow hover:shadow-[0_30px_60px_-30px_rgba(15,23,42,0.35)]">
            <div className="rounded-xl bg-white shadow-inner overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b bg-gray-50">
                <div className="w-3 h-3 bg-red-400 rounded-full" />
                <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                <div className="w-3 h-3 bg-green-400 rounded-full" />
                <span className="ml-4 text-sm text-gray-500">Vista previa</span>
              </div>

              <div className="p-3 sm:p-4 bg-white">
                <div className="rounded-xl border bg-gradient-to-br from-white to-slate-50 p-4 sm:p-6 shadow-[0_20px_50px_-25px_rgba(15,23,42,0.35)]">
                  <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
                    {/* Sidebar (desktop) */}
                    <div className="hidden lg:flex flex-col rounded-xl border bg-white/70 p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold text-slate-900">
                          FinanceStart
                        </div>
                        <div className="rounded-full border bg-white px-2 py-0.5 text-[11px] text-slate-500">
                          Basic
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="rounded-lg bg-slate-900 px-3 py-2 text-left text-sm font-medium text-white">
                          Dashboard
                        </div>
                        <div className="rounded-lg px-3 py-2 text-left text-sm text-slate-600">
                          Transacciones
                        </div>
                        <div className="rounded-lg px-3 py-2 text-left text-sm text-slate-600">
                          Presupuestos
                        </div>
                        <div className="rounded-lg px-3 py-2 text-left text-sm text-slate-600">
                          Reportes
                        </div>
                        <div className="rounded-lg px-3 py-2 text-left text-sm text-slate-600">
                          Ajustes
                        </div>
                      </div>

                      <div className="mt-auto pt-4">
                        <div className="rounded-xl border bg-white p-3">
                          <div className="text-[11px] text-slate-500">
                            Consejo del día
                          </div>
                          <div className="mt-1 text-sm font-medium text-slate-900">
                            Ahorrá 10% automático
                          </div>
                          <div className="mt-2 h-2 w-full rounded-full bg-slate-100">
                            <div className="h-2 w-2/5 rounded-full bg-orange-600" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Main */}
                    <div className="space-y-4">
                      {/* Top summary cards */}
                      <div className="grid gap-3 sm:grid-cols-3">
                        <div className="rounded-xl border bg-white p-4 shadow-sm">
                          <div className="flex items-center justify-between">
                            <div className="text-[11px] font-medium text-slate-500">
                              Balance
                            </div>
                            <div className="rounded-lg bg-slate-900 px-2 py-1 text-[10px] font-semibold text-white">
                              Feb
                            </div>
                          </div>
                          <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                            $ 1.245.380
                          </div>
                          <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                            <div className="h-2 w-2 rounded-full bg-emerald-500" />
                            +12% vs. mes anterior
                          </div>
                        </div>

                        <div className="rounded-xl border bg-white p-4 shadow-sm">
                          <div className="text-[11px] font-medium text-slate-500">
                            Ingresos
                          </div>
                          <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                            $ 820.000
                          </div>
                          <div
                            className="mt-3 flex items-end gap-1"
                            aria-hidden="true"
                          >
                            <div className="h-6 w-2 rounded-sm bg-slate-200" />
                            <div className="h-9 w-2 rounded-sm bg-slate-200" />
                            <div className="h-7 w-2 rounded-sm bg-slate-200" />
                            <div className="h-11 w-2 rounded-sm bg-orange-600" />
                            <div className="h-8 w-2 rounded-sm bg-slate-200" />
                            <div className="h-10 w-2 rounded-sm bg-slate-200" />
                          </div>
                        </div>

                        <div className="rounded-xl border bg-white p-4 shadow-sm">
                          <div className="text-[11px] font-medium text-slate-500">
                            Gastos
                          </div>
                          <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                            $ 314.620
                          </div>
                          <div className="mt-2 inline-flex items-center gap-2 rounded-full border bg-white px-2.5 py-1 text-xs text-slate-600">
                            <Zap className="h-3.5 w-3.5 text-orange-600" />
                            Optimizable
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="grid gap-4 lg:grid-cols-2">
                        <div className="rounded-xl border bg-white p-4 shadow-sm">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <BarChart3 className="h-4 w-4 text-orange-600" />
                              <div className="text-sm font-semibold text-slate-900">
                                Resumen del mes
                              </div>
                            </div>
                            <div className="text-xs text-slate-500">
                              Últimos 30 días
                            </div>
                          </div>

                          <div
                            className="mt-4 grid grid-cols-12 items-end gap-2"
                            aria-hidden="true"
                          >
                            <div className="col-span-1 h-10 rounded-md bg-slate-200" />
                            <div className="col-span-1 h-16 rounded-md bg-slate-200" />
                            <div className="col-span-1 h-12 rounded-md bg-slate-200" />
                            <div className="col-span-1 h-20 rounded-md bg-orange-600" />
                            <div className="col-span-1 h-14 rounded-md bg-slate-200" />
                            <div className="col-span-1 h-18 rounded-md bg-slate-200" />
                            <div className="col-span-1 h-11 rounded-md bg-slate-200" />
                            <div className="col-span-1 h-15 rounded-md bg-slate-200" />
                            <div className="col-span-1 h-9 rounded-md bg-slate-200" />
                            <div className="col-span-1 h-13 rounded-md bg-slate-200" />
                            <div className="col-span-1 h-7 rounded-md bg-slate-200" />
                            <div className="col-span-1 h-10 rounded-md bg-slate-200" />
                          </div>

                          <div className="mt-4 grid gap-2 sm:grid-cols-2">
                            <div className="rounded-lg border bg-slate-50 px-3 py-2">
                              <div className="text-[11px] text-slate-500">
                                Meta de ahorro
                              </div>
                              <div className="mt-1 flex items-center justify-between">
                                <div className="text-sm font-semibold text-slate-900">
                                  $ 200.000
                                </div>
                                <div className="text-xs text-slate-500">
                                  62%
                                </div>
                              </div>
                              <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
                                <div className="h-2 w-[62%] rounded-full bg-slate-900" />
                              </div>
                            </div>
                            <div className="rounded-lg border bg-slate-50 px-3 py-2">
                              <div className="text-[11px] text-slate-500">
                                Estado
                              </div>
                              <div className="mt-1 text-sm font-semibold text-slate-900">
                                Ordenado
                              </div>
                              <div className="mt-2 text-xs text-slate-500">
                                Estás gastando dentro del rango.
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-xl border bg-white p-4 shadow-sm">
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-semibold text-slate-900">
                              Movimientos recientes
                            </div>
                            <div className="text-xs text-slate-500">Hoy</div>
                          </div>

                          <div className="mt-4 space-y-3">
                            <div className="flex items-center justify-between rounded-lg border bg-white px-3 py-2">
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-lg bg-slate-900" />
                                <div className="text-left">
                                  <div className="text-sm font-medium text-slate-900">
                                    Supermercado
                                  </div>
                                  <div className="text-xs text-slate-500">
                                    Alimentación
                                  </div>
                                </div>
                              </div>
                              <div className="text-sm font-semibold text-slate-900">
                                -$ 24.990
                              </div>
                            </div>

                            <div className="flex items-center justify-between rounded-lg border bg-white px-3 py-2">
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-lg bg-orange-600" />
                                <div className="text-left">
                                  <div className="text-sm font-medium text-slate-900">
                                    Suscripción
                                  </div>
                                  <div className="text-xs text-slate-500">
                                    Servicios
                                  </div>
                                </div>
                              </div>
                              <div className="text-sm font-semibold text-slate-900">
                                -$ 8.500
                              </div>
                            </div>

                            <div className="flex items-center justify-between rounded-lg border bg-white px-3 py-2">
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-lg bg-emerald-500" />
                                <div className="text-left">
                                  <div className="text-sm font-medium text-slate-900">
                                    Sueldo
                                  </div>
                                  <div className="text-xs text-slate-500">
                                    Ingreso
                                  </div>
                                </div>
                              </div>
                              <div className="text-sm font-semibold text-slate-900">
                                +$ 820.000
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 rounded-lg border bg-slate-50 px-3 py-2 text-left">
                            <div className="text-[11px] text-slate-500">
                              Siguiente paso
                            </div>
                            <div className="mt-1 text-sm font-semibold text-slate-900">
                              Revisá tus categorías más caras
                            </div>
                            <div className="mt-2 text-xs text-slate-500">
                              Te lleva 15 segundos y te ahorra plata.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- FEATURES (Bento Grid Style) --- */}
        <section className="bg-slate-50 py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
              Todo lo que necesitás
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="transition-all hover:-translate-y-1 hover:shadow-lg">
                <CardHeader>
                  <BarChart3 className="h-10 w-10 text-orange-600 mb-2" />
                  <CardTitle>Análisis en Tiempo Real</CardTitle>
                </CardHeader>
                <CardContent>
                  Gráficos interactivos para entender a dónde va tu plata mes a
                  mes.
                </CardContent>
              </Card>
              <Card className="transition-all hover:-translate-y-1 hover:shadow-lg">
                <CardHeader>
                  <Zap className="h-10 w-10 text-yellow-500 mb-2" />
                  <CardTitle>Súper Rápido</CardTitle>
                </CardHeader>
                <CardContent>
                  Interfaz optimizada. Cargar un gasto toma menos de 3 segundos.
                </CardContent>
              </Card>
              <Card className="transition-all hover:-translate-y-1 hover:shadow-lg">
                <CardHeader>
                  <Lock className="h-10 w-10 text-green-600 mb-2" />
                  <CardTitle>Seguridad Bancaria</CardTitle>
                </CardHeader>
                <CardContent>
                  Tus datos están encriptados y seguros. Privacidad absoluta.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* --- PRICING --- */}
        <section id="pricing" className="container mx-auto px-4 py-24">
          <h2 className="text-4xl font-bold tracking-tight text-center mb-4">
            Planes
          </h2>
          <p className="text-center text-gray-500 mb-16 max-w-2xl mx-auto">
            Elegí el plan que mejor se adapte a tu etapa financiera. Sin
            contratos, cancelás cuando quieras.
          </p>

          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {/* PLAN FREE */}
            <Card className="flex flex-col border-slate-200 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Starter</CardTitle>
                <CardDescription>Para empezar a ordenarte</CardDescription>
                <div className="text-4xl font-bold mt-4">
                  $0{" "}
                  <span className="text-sm font-normal text-gray-500">
                    /mes
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-orange-600" />
                    <span className="font-semibold">15 movimientos</span> / mes
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-orange-600" />
                    Historial de 30 días
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-orange-600" />1
                    Presupuesto básico
                  </li>
                  <li className="flex items-center text-gray-400">
                    <X className="mr-2 h-4 w-4" /> 1 Gráfico básico
                  </li>
                  <li className="flex items-center text-gray-400">
                    <X className="mr-2 h-4 w-4" /> Sin conversión de moneda
                  </li>
                  <li className="flex items-center text-gray-400">
                    <X className="mr-2 h-4 w-4" /> Sin exportación a Excel
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/register" className="w-full">
                  <Button
                    variant="outline"
                    className="w-full h-11 border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-800"
                  >
                    Elegir Gratis
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* PLAN BASIC */}
            <Card className="flex flex-col border-orange-500 shadow-xl relative overflow-hidden scale-105 z-10 transition-all hover:-translate-y-1 hover:shadow-2xl">
              <CardHeader>
                <CardTitle className="text-xl text-orange-600">Basic</CardTitle>
                <CardDescription>Potenciá tus ahorros</CardDescription>
                <div className="text-4xl font-bold mt-4">
                  $5.999{" "}
                  <span className="text-sm font-normal text-gray-500">
                    /mes
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-orange-600" />
                    <span className="font-semibold">50 movimientos</span> / mes
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-orange-600" />
                    Historial de 6 meses
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-orange-600" />3
                    Presupuestos activos
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-orange-600" />3 Gráficos
                    disponibles
                  </li>
                  <li className="flex items-center text-gray-400">
                    <X className="mr-2 h-4 w-4" /> Sin conversión de moneda
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/subscribe?plan=basic" className="w-full">
                  <Button className="w-full h-11 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg shadow-orange-500/30 border-0">
                    Obtener Basic
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* PLAN PREMIUM */}
            <Card className="flex flex-col bg-slate-900 text-white border-slate-800 shadow-lg relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-2xl">
              <div className="absolute top-0 right-0 bg-slate-800/90 text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wide border border-white/15 shadow-[0_6px_18px_rgba(0,0,0,0.35)]">
                Más Popular
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-white">Premium</CardTitle>
                <CardDescription className="text-gray-400">
                  Libertad total
                </CardDescription>
                <div className="text-4xl font-bold mt-4 text-white">
                  $9.999{" "}
                  <span className="text-sm font-normal text-gray-400">
                    /mes
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-emerald-400" />
                    <span className="font-semibold text-emerald-400">
                      Movimientos Ilimitados
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-white" />
                    Historial completo (Siempre)
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-white" />
                    Presupuestos Ilimitados
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-white" />
                    Todos los gráficos
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-white" />
                    Multimoneda (ARS / USD)
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-white" />
                    Exportación a Excel
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/subscribe?plan=premium" className="w-full">
                  <Button
                    variant="secondary"
                    className="w-full h-11 bg-white text-slate-900 hover:bg-gray-100"
                  >
                    Obtener Premium
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>

      <footer className="py-6 text-center text-sm text-gray-500 border-t">
        © 2026 FinanceStart. Hecho con ❤️ en Argentina.
      </footer>
    </div>
  );
}
