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
          <div className="mt-16 rounded-2xl border bg-gray-50 p-6 shadow-2xl transition-shadow hover:shadow-[0_30px_60px_-30px_rgba(15,23,42,0.35)]">
            <div className="rounded-xl bg-white shadow-inner overflow-hidden">
              {/* Barra superior tipo app */}
              <div className="flex items-center gap-2 px-4 py-3 border-b bg-gray-50">
                <div className="w-3 h-3 bg-red-400 rounded-full" />
                <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                <div className="w-3 h-3 bg-green-400 rounded-full" />
                <span className="ml-4 text-sm text-gray-500">
                  Resumen mensual
                </span>
              </div>

              {/* Contenido simulado */}
              <div className="p-6 grid grid-cols-3 gap-4">
                <div className="h-20 rounded-lg bg-gray-100" />
                <div className="h-20 rounded-lg bg-gray-100" />
                <div className="h-20 rounded-lg bg-gray-100" />
                <div className="col-span-3 h-40 rounded-lg bg-gray-100" />
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
            Planes Simples
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
              <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wide">
                Más Popular
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-orange-600">Basic</CardTitle>
                <CardDescription>Potenciá tus ahorros</CardDescription>
                <div className="text-4xl font-bold mt-4">
                  $5.000{" "}
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
                <Link href="/register" className="w-full">
                  <Button className="w-full h-11 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg shadow-orange-500/30 border-0">
                    Empezar Prueba de 7 días
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* PLAN PREMIUM */}
            <Card className="flex flex-col bg-slate-900 text-white border-slate-800 shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl">
              <CardHeader>
                <CardTitle className="text-xl text-white">Premium</CardTitle>
                <CardDescription className="text-gray-400">
                  Libertad total
                </CardDescription>
                <div className="text-4xl font-bold mt-4 text-white">
                  $9.000{" "}
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
                <Link href="/register" className="w-full">
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
