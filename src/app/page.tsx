import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, ArrowRight, BarChart3, Lock, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      {/* --- NAVBAR --- */}
      <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center font-bold text-xl tracking-tighter">
            <Image
              src="/favicon.ico"
              alt="FinanceStart Logo"
              width={64}
              height={64}
              className="rounded-lg"
            />
            <span>FinanceStart</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Login
            </Link>
            <Link href="/register">
              <Button
                size="sm"
                className="bg-black text-white hover:bg-zinc-800"
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
                className="h-12 px-8 text-lg bg-black hover:bg-zinc-800"
              >
                Crear cuenta gratis <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#pricing">
              <Button variant="outline" size="lg" className="h-12 px-8 text-lg">
                Ver Planes
              </Button>
            </Link>
          </div>
          {/* Aquí iría una imagen del dashboard en el futuro */}
          <div className="mt-16 rounded-xl border bg-gray-50 p-4 shadow-2xl">
            <div className="aspect-[16/9] rounded-lg bg-white border flex items-center justify-center text-gray-400">
              [Imagen del Dashboard Próximamente]
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
              <Card>
                <CardHeader>
                  <BarChart3 className="h-10 w-10 text-orange-600 mb-2" />
                  <CardTitle>Análisis en Tiempo Real</CardTitle>
                </CardHeader>
                <CardContent>
                  Gráficos interactivos para entender a dónde va tu plata mes a
                  mes.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Zap className="h-10 w-10 text-yellow-500 mb-2" />
                  <CardTitle>Súper Rápido</CardTitle>
                </CardHeader>
                <CardContent>
                  Interfaz optimizada. Cargar un gasto toma menos de 3 segundos.
                </CardContent>
              </Card>
              <Card>
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
          <h2 className="text-3xl font-bold tracking-tight text-center mb-4">
            Planes
          </h2>
          <p className="text-center text-gray-500 mb-12">
            Empezá gratis, pagá cuando crezcas.
          </p>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {/* PLAN FREE */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <CardDescription>Para empezar a ordenarte</CardDescription>
                <div className="text-3xl font-bold mt-4">
                  $0{" "}
                  <span className="text-sm font-normal text-gray-500">
                    /mes
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" /> Registro
                    de gastos ilimitado
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" /> Gráficos
                    básicos
                  </li>
                  <li className="flex items-center text-gray-400">
                    Sin conversión a USD
                  </li>
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                <Link href="/register">
                  <Button variant="outline" className="w-full">
                    Elegir Gratis
                  </Button>
                </Link>
              </div>
            </Card>

            {/* PLAN BASIC */}
            <Card className="flex flex-col border-orange-600 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-orange-600 text-white text-xs px-3 py-1 rounded-bl-lg">
                POPULAR
              </div>
              <CardHeader>
                <CardTitle>Basic</CardTitle>
                <CardDescription>Potenciá tus ahorros</CardDescription>
                <div className="text-3xl font-bold mt-4">
                  $5000{" "}
                  <span className="text-sm font-normal text-gray-500">
                    /mes
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-orange-600" /> Todo lo
                    del plan Free
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-orange-600" />{" "}
                    Multimoneda (ARS/USD)
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-orange-600" />{" "}
                    Exportación a Excel
                  </li>
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                <Link href="/register">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    Prueba de 7 días
                  </Button>
                </Link>
              </div>
            </Card>
            {/* PLAN PREMIUM */}
            <Card className="flex flex-col bg-gray-900 text-white">
              <CardHeader>
                <CardTitle className="text-white">Premium</CardTitle>
                <CardDescription className="text-gray-400">
                  Para power users
                </CardDescription>
                <div className="text-3xl font-bold mt-4 text-white">
                  $9000{" "}
                  <span className="text-sm font-normal text-gray-400">
                    /mes
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-white" /> Soporte
                    prioritario
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-white" /> IA Advisor
                    (Próximamente)
                  </li>
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                <Link href="/register">
                  <Button variant="secondary" className="w-full">
                    Contactar
                  </Button>
                </Link>
              </div>
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
