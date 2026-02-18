"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import axios from "@/lib/axios";

interface AnalyticsData {
  summary: {
    totalIncome: number;
    totalExpense: number;
    totalTransactions: number;
  };
  monthlyTrend: Array<{
    month: string;
    income: number;
    expenses: number;
  }>;
  weeklyTrend: Array<{
    week: string;
    totalAmount: number;
    income: number;
    expense: number;
    transactionCount: number;
  }>;
  incomeVsExpenses: Array<{
    month: string;
    income: number;
    expenses: number;
  }>;
  topCategories: Array<{
    name: string;
    amount: number;
    percentage: number;
  }>;
}

const CHART_COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#FFA07A",
  "#98D8C8",
  "#F7DC6F",
  "#BB8FCE",
  "#85C1E2",
];

const formatCurrency = (value: number) =>
  `$${value.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get("/analytics");
        setAnalytics(response.data);
      } catch (err) {
        console.error("Error fetching analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          <p className="mt-4 text-gray-600">Cargando reportes...</p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Sin datos disponibles</p>
      </div>
    );
  }

  const netBalance = analytics.monthlyTrend.map((item) => ({
    month: item.month,
    balance: item.income - item.expenses,
  }));

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reportes</h1>
        <p className="text-gray-600 mt-1">Monitorea tu desempeño financiero</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border border-green-100 bg-gradient-to-br from-white to-green-50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-semibold text-green-700 uppercase tracking-wide">
                Ingresos Totales
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-3">
                {formatCurrency(analytics.summary.totalIncome)}
              </p>
            </div>
            <div className="p-3 bg-green-500 rounded-xl shadow-md">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-red-100 bg-gradient-to-br from-white to-red-50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-700 uppercase tracking-wide">
                Gastos Totales
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-3">
                {formatCurrency(analytics.summary.totalExpense)}
              </p>
            </div>
            <div className="p-3 bg-red-500 rounded-xl shadow-md">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-orange-100 bg-gradient-to-br from-white to-orange-50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-semibold text-orange-700 uppercase tracking-wide">
                Transacciones
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-3">
                {analytics.summary.totalTransactions}
              </p>
            </div>
            <div className="p-3 bg-orange-500 rounded-xl shadow-md">
              <Wallet className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Tendencia Mensual - Line Chart */}
        <Card className="p-6 border border-gray-100 shadow-lg bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Tendencia Mensual
            </h2>
            <p className="text-sm text-gray-500">Ingresos vs Gastos</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={analytics.monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
              <XAxis
                dataKey="month"
                stroke="#9ca3af"
                style={{ fontSize: 12 }}
              />
              <YAxis
                stroke="#9ca3af"
                style={{ fontSize: 12 }}
                tickFormatter={formatCurrency}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                formatter={(value) =>
                  value ? formatCurrency(Number(value)) : "$0"
                }
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#10b981"
                strokeWidth={2.5}
                dot={{ fill: "#10b981", r: 4 }}
                activeDot={{ r: 6 }}
                name="Ingresos"
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#ef4444"
                strokeWidth={2.5}
                dot={{ fill: "#ef4444", r: 4 }}
                activeDot={{ r: 6 }}
                name="Gastos"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 border border-gray-100 shadow-lg bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Comparación Mensual
            </h2>
            <p className="text-sm text-gray-500">Ingresos vs Gastos por mes</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={analytics.incomeVsExpenses}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
              <XAxis
                dataKey="month"
                stroke="#9ca3af"
                style={{ fontSize: 12 }}
              />
              <YAxis
                stroke="#9ca3af"
                style={{ fontSize: 12 }}
                tickFormatter={formatCurrency}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                formatter={(value) =>
                  value ? formatCurrency(Number(value)) : "$0"
                }
                cursor={{ fill: "rgba(0,0,0,0.02)" }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar
                dataKey="income"
                fill="#10b981"
                radius={[6, 6, 0, 0]}
                name="Ingresos"
              />
              <Bar
                dataKey="expenses"
                fill="#ef4444"
                radius={[6, 6, 0, 0]}
                name="Gastos"
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* 4. Balance Neto - Area Chart */}
        <Card className="p-6 border border-gray-100 shadow-lg bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Balance Neto
            </h2>
            <p className="text-sm text-gray-500">
              Ahorro mensual (Ingresos - Gastos)
            </p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={netBalance}>
              <defs>
                <linearGradient
                  id="balanceGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
              <XAxis
                dataKey="month"
                stroke="#9ca3af"
                style={{ fontSize: 12 }}
              />
              <YAxis
                stroke="#9ca3af"
                style={{ fontSize: 12 }}
                tickFormatter={formatCurrency}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                formatter={(value) =>
                  value ? formatCurrency(Number(value)) : "$0"
                }
              />
              <Area
                type="monotone"
                dataKey="balance"
                stroke="#3b82f6"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#balanceGradient)"
                name="Balance"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* 5. Top Categorías - Horizontal Bar Chart */}
        <Card className="p-6 border border-gray-100 shadow-lg bg-white lg:col-span-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Top Categorías de Gastos
            </h2>
            <p className="text-sm text-gray-500">
              Categorías con mayor impacto (último mes)
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={analytics.topCategories}
              layout="vertical"
              margin={{ left: 80 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
              <XAxis
                type="number"
                stroke="#9ca3af"
                style={{ fontSize: 12 }}
                tickFormatter={formatCurrency}
              />
              <YAxis
                type="category"
                dataKey="name"
                stroke="#9ca3af"
                style={{ fontSize: 12 }}
                width={70}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                formatter={(value) => [
                  value ? formatCurrency(Number(value)) : "$0",
                  "Monto",
                ]}
                cursor={{ fill: "rgba(0,0,0,0.02)" }}
              />
              <Bar dataKey="amount" radius={[0, 6, 6, 0]}>
                {analytics.topCategories.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
