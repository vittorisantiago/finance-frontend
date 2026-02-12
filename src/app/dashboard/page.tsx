"use client";
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Wallet,
  Pizza,
  Coffee,
  Utensils,
  Zap,
  Car,
  Home,
  Smartphone,
  ShoppingCart,
  Heart,
  Book,
  Briefcase,
  Gift,
  TrendingUp,
  Bus,
  Gamepad2,
  Stethoscope,
  GraduationCap,
  ShoppingBag,
  Banknote,
  Laptop,
  CircleDollarSign,
} from "lucide-react";
import { AddTransactionModal } from "@/components/AddTransactionModal";
import { NotificationsPanel } from "@/components/NotificationsPanel";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mapeo de nombres de iconos a componentes
const iconMap: Record<string, typeof DollarSign> = {
  Pizza,
  Coffee,
  Utensils,
  Zap,
  Car,
  Home,
  Smartphone,
  ShoppingCart,
  Heart,
  Book,
  Briefcase,
  Gift,
  TrendingUp,
  DollarSign,
  Bus,
  Gamepad2,
  Stethoscope,
  GraduationCap,
  ShoppingBag,
  Banknote,
  Laptop,
  CircleDollarSign,
};

// Mapeo de colores por categoría (variados y bonitos)
const colorMap: Record<string, { bg: string; text: string }> = {
  Pizza: { bg: "bg-yellow-100", text: "text-yellow-600" },
  Coffee: { bg: "bg-amber-100", text: "text-amber-600" },
  Utensils: { bg: "bg-orange-100", text: "text-orange-600" },
  Zap: { bg: "bg-blue-100", text: "text-blue-600" },
  Car: { bg: "bg-red-100", text: "text-red-600" },
  Home: { bg: "bg-indigo-100", text: "text-indigo-600" },
  Smartphone: { bg: "bg-purple-100", text: "text-purple-600" },
  ShoppingCart: { bg: "bg-pink-100", text: "text-pink-600" },
  Heart: { bg: "bg-rose-100", text: "text-rose-600" },
  Book: { bg: "bg-green-100", text: "text-green-600" },
  Briefcase: { bg: "bg-cyan-100", text: "text-cyan-600" },
  Gift: { bg: "bg-fuchsia-100", text: "text-fuchsia-600" },
  TrendingUp: { bg: "bg-emerald-100", text: "text-emerald-600" },
  Bus: { bg: "bg-orange-100", text: "text-orange-600" },
  Gamepad2: { bg: "bg-purple-100", text: "text-purple-600" },
  Stethoscope: { bg: "bg-pink-100", text: "text-pink-600" },
  GraduationCap: { bg: "bg-teal-100", text: "text-teal-600" },
  ShoppingBag: { bg: "bg-rose-100", text: "text-rose-600" },
  Banknote: { bg: "bg-green-100", text: "text-green-600" },
  Laptop: { bg: "bg-blue-100", text: "text-blue-600" },
  CircleDollarSign: { bg: "bg-slate-100", text: "text-slate-600" },
};

// Función para obtener el icono y color
const getIconComponent = (iconName?: string) => {
  const Icon = iconName && iconMap[iconName] ? iconMap[iconName] : DollarSign;
  const colors =
    iconName && colorMap[iconName]
      ? colorMap[iconName]
      : { bg: "bg-gray-100", text: "text-gray-600" };
  return { Icon, colors };
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    value: number;
    name: string;
    payload: Record<string, number | string>;
  }[];
  label?: string;
}

// Componente personalizado para el Tooltip
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm text-sm">
        <p className="mb-2 font-semibold text-slate-700">{label}</p>
        <p className="flex items-center gap-2 text-emerald-600">
          Ingresos:{" "}
          <span className="font-bold">
            ${payload[0]?.value?.toLocaleString() ?? "0"}
          </span>
        </p>
        {payload[1] && (
          <p className="flex items-center gap-2 text-red-600">
            Gastos:{" "}
            <span className="font-bold">
              ${payload[1]?.value?.toLocaleString() ?? "0"}
            </span>
          </p>
        )}
      </div>
    );
  }
  return null;
};

interface Transaction {
  id: string;
  type: "expense" | "income";
  notes?: string;
  date: string;
  amount: number;
  category?: {
    id: number;
    name: string;
    icon?: string;
    color?: string;
  };
}

interface DashboardData {
  balance: number;
  income: number;
  expenses: number;
  recentTransactions: Transaction[];
  chartData?: Array<{
    date: string;
    day: string;
    income: number;
    expense: number;
  }>;
}

interface User {
  id: number;
  email: string;
  fullName?: string;
  role: string;
  plan: string;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [chartDays, setChartDays] = useState(30);

  // Función para recargar datos
  const fetchData = async (days = 30) => {
    try {
      const [dashboardRes, userRes] = await Promise.all([
        api.get("/dashboard/summary", { params: { days } }),
        api.get("/auth/me"),
      ]);
      setData(dashboardRes.data);
      setUser(userRes.data.user);
    } catch (error) {
      console.error("Error cargando dashboard", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div className="p-8">Cargando tus finanzas...</div>;

  return (
    <div className="space-y-8">
      {/* Header Sección Mejorado */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Hola, {user?.fullName || user?.email?.split("@")[0] || "Usuario"} 👋🏼
          </h1>
          <p className="text-slate-500">Tu resumen financiero al día.</p>
        </div>
        <div className="flex items-center gap-3">
          <NotificationsPanel />
          <AddTransactionModal onSuccess={fetchData} />
        </div>
      </div>

      {/* --- CARDS DE RESUMEN --- */}
      <div className="grid gap-8 md:grid-cols-3">
        <Card className="border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Balance del mes
            </CardTitle>
            <div className="h-9 w-9 rounded-full bg-orange-100 flex items-center justify-center">
              <Wallet className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              ${data?.balance?.toLocaleString() || "0"}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">
              Ingresos del mes
            </CardTitle>
            <div className="h-9 w-9 rounded-full bg-emerald-100 flex items-center justify-center">
              <ArrowUpRight className="h-5 w-5 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl md:text-4xl font-bold text-emerald-600 tracking-tight">
              + ${data?.income?.toLocaleString() || "0"}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">
              Gastos del mes
            </CardTitle>
            <div className="h-9 w-9 rounded-full bg-red-100 flex items-center justify-center">
              <ArrowDownRight className="h-5 w-5 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl md:text-4xl font-bold text-red-600 tracking-tight">
              - ${data?.expenses?.toLocaleString() || "0"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* --- GRÁFICOS Y LISTA --- */}
      <div className="grid gap-8 md:grid-cols-7">
        {/* Gráfico Mejorado */}
        <Card className="col-span-4 border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Flujo de caja
            </CardTitle>
            <div className="grid grid-cols-4 gap-1 rounded-lg bg-slate-100 p-1">
              {[
                { label: "3d", days: 3 },
                { label: "7d", days: 7 },
                { label: "15d", days: 15 },
                { label: "30d", days: 30 },
              ].map((filter) => (
                <button
                  key={filter.days}
                  type="button"
                  onClick={() => {
                    setChartDays(filter.days);
                    fetchData(filter.days);
                  }}
                  className={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-semibold transition-all outline-none focus-visible:ring-2 focus-visible:ring-black/10 ${
                    chartDays === filter.days
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:bg-white/60 hover:text-slate-900"
                  }`}
                  aria-pressed={chartDays === filter.days}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data?.chartData || []}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e2e8f0"
                  />

                  <XAxis
                    dataKey="day"
                    stroke="#94a3b8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    minTickGap={30}
                    tickMargin={10}
                  />

                  <YAxis
                    stroke="#94a3b8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    tickFormatter={(value) =>
                      `$${new Intl.NumberFormat("es-AR", {
                        notation: "compact",
                        maximumFractionDigits: 1,
                      }).format(Number(value))}`
                    }
                  />

                  <Tooltip
                    content={<CustomTooltip />}
                    wrapperStyle={{ outline: "none" }}
                  />

                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#10b981"
                    strokeWidth={3.5}
                    dot={false}
                    activeDot={{ r: 5 }}
                  />

                  <Line
                    type="monotone"
                    dataKey="expense"
                    stroke="#ef4444"
                    strokeWidth={3.5}
                    dot={false}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Lista Recientes Mejorada */}
        <Card className="col-span-3 border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Recientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 pr-2 max-h-[320px] overflow-y-auto custom-scrollbar">
              {data?.recentTransactions?.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-slate-400">
                  <p className="text-sm">Sin movimientos</p>
                </div>
              ) : (
                data?.recentTransactions
                  ?.sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime(),
                  )
                  .slice(0, 8)
                  .map((t: Transaction) => (
                    <div
                      key={t.id}
                      className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        {(() => {
                          const { Icon, colors } = getIconComponent(
                            t.category?.icon,
                          );
                          return (
                            <div
                              className={`h-10 w-10 rounded-full flex items-center justify-center transition-all group-hover:scale-110 shadow-sm ${colors.bg}`}
                            >
                              <Icon className={`h-5 w-5 ${colors.text}`} />
                            </div>
                          );
                        })()}
                        <div>
                          <p className="text-sm font-semibold text-slate-700 leading-none">
                            {t.category?.name || "Sin categoría"}
                          </p>
                          {t.notes && (
                            <p className="text-xs text-slate-500 mt-0.5">
                              {t.notes}
                            </p>
                          )}
                          <p className="text-xs text-slate-400 mt-1">
                            {new Date(t.date).toLocaleString("es-AR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`font-bold text-sm ${t.type === "expense" ? "text-red-600" : "text-emerald-600"}`}
                      >
                        {t.type === "expense" ? "-" : "+"} $
                        {Number(t.amount).toLocaleString()}
                      </div>
                    </div>
                  ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
