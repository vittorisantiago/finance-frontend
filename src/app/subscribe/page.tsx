"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check, X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type PlanId = "basic" | "premium";

type Feature = {
  label: string;
  available: boolean;
  accent?: "orange" | "emerald";
};

const plans: Array<{
  id: PlanId;
  title: string;
  description: string;
  price: string;
  priceSuffix: string;
  badge?: string;
  cardClassName: string;
  titleClassName: string;
  descriptionClassName?: string;
  featureTextClassName?: string;
  buttonClassName: string;
  features: Feature[];
}> = [
  {
    id: "basic",
    title: "Basic",
    description: "Potenciá tus ahorros",
    price: "$5.999",
    priceSuffix: "/mes",
    badge: undefined,
    cardClassName:
      "flex h-full flex-col border-orange-500 shadow-xl relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-2xl",
    titleClassName: "text-xl text-orange-600",
    buttonClassName:
      "w-full h-11 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg shadow-orange-500/30 border-0",
    features: [
      {
        label: "50 movimientos / mes",
        available: true,
        accent: "orange",
      },
      { label: "Historial de 6 meses", available: true, accent: "orange" },
      { label: "3 Presupuestos activos", available: true, accent: "orange" },
      { label: "3 Gráficos disponibles", available: true, accent: "orange" },
      { label: "Sin conversión de moneda", available: false },
    ],
  },
  {
    id: "premium",
    title: "Premium",
    description: "Libertad total",
    price: "$9.999",
    priceSuffix: "/mes",
    badge: "Más Popular",
    cardClassName:
      "flex h-full flex-col bg-slate-900 text-white border-slate-800 shadow-lg relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-2xl",
    titleClassName: "text-xl text-white",
    descriptionClassName: "text-gray-400",
    featureTextClassName: "text-white",
    buttonClassName: "w-full h-11 bg-white text-slate-900 hover:bg-gray-100",
    features: [
      {
        label: "Movimientos Ilimitados",
        available: true,
        accent: "emerald",
      },
      { label: "Historial completo (Siempre)", available: true },
      { label: "Presupuestos Ilimitados", available: true },
      { label: "Todos los gráficos", available: true },
      { label: "Multimoneda (ARS / USD)", available: true },
      { label: "Exportación a Excel", available: true },
    ],
  },
];

export default function SubscribePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawSelected = (searchParams.get("plan") || "").toLowerCase();
  const selected: PlanId | null =
    rawSelected === "basic" || rawSelected === "premium"
      ? (rawSelected as PlanId)
      : null;

  const onSelect = (plan: PlanId) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("plan", plan);
    router.replace(`/subscribe?${params.toString()}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-10">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <Link href="/dashboard" className="inline-flex">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Volver
            </Button>
          </Link>
          <h1 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight text-center md:text-left">
            Elegí tu plan
          </h1>
          <p className="mt-2 text-gray-500 max-w-2xl text-center md:text-left">
            Elegí el plan que mejor se adapte a tu etapa financiera. Sin
            contratos, cancelás cuando quieras.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
        {plans.map((plan) => {
          const isSelected = selected === plan.id;
          const isPremium = plan.id === "premium";

          return (
            <Card key={plan.id} className={plan.cardClassName}>
              {plan.id === "premium" ? (
                <div className="absolute top-0 right-0 bg-slate-800/90 text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wide border border-white/15 shadow-[0_6px_18px_rgba(0,0,0,0.35)]">
                  {plan.badge}
                </div>
              ) : null}

              <CardHeader className="pb-4">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className={plan.titleClassName}>
                    {plan.title}
                  </CardTitle>
                </div>

                <CardDescription className={plan.descriptionClassName}>
                  {plan.description}
                </CardDescription>

                <div
                  className={
                    isPremium
                      ? "text-3xl font-bold mt-3 text-white"
                      : "text-3xl font-bold mt-3"
                  }
                >
                  {plan.price}{" "}
                  <span
                    className={
                      isPremium
                        ? "text-sm font-normal text-gray-400"
                        : "text-sm font-normal text-gray-500"
                    }
                  >
                    {plan.priceSuffix}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="flex-1 pt-0">
                <ul className="space-y-3 text-sm">
                  {plan.features.map((feature) => {
                    const icon = feature.available ? Check : X;
                    const Icon = icon;
                    const iconClass = feature.available
                      ? feature.accent === "emerald"
                        ? "text-emerald-400"
                        : isPremium
                          ? "text-gray-300"
                          : "text-orange-600"
                      : "text-gray-400";

                    const textClass = feature.available
                      ? isPremium
                        ? plan.featureTextClassName || "text-white"
                        : "text-slate-900"
                      : "text-gray-400";

                    const strongClass =
                      feature.available && feature.accent === "emerald"
                        ? "font-semibold text-emerald-400"
                        : feature.available && feature.accent === "orange"
                          ? "font-semibold"
                          : "";

                    return (
                      <li
                        key={feature.label}
                        className={`flex items-center ${textClass}`}
                      >
                        <Icon className={`mr-2 h-4 w-4 ${iconClass}`} />
                        <span className={strongClass}>{feature.label}</span>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  onClick={() => onSelect(plan.id)}
                  className={plan.buttonClassName}
                  aria-pressed={isSelected}
                >
                  {isSelected
                    ? "Seleccionado"
                    : plan.id === "basic"
                      ? "Obtener Basic"
                      : "Obtener Premium"}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 max-w-6xl mx-auto rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
        Integración con Mercado Pago: próximamente.
      </div>
    </div>
  );
}
