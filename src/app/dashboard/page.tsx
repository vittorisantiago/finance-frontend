"use client";
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  DollarSign,
  Wallet,
} from "lucide-react";

interface Transaction {
  id: string;
  type: "expense" | "income";
  notes?: string;
  date: string;
  amount: number;
}

interface DashboardData {
  balance: number;
  income: number;
  expenses: number;
  recentTransactions: Transaction[];
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

  useEffect(() => {
    // Cargar datos reales
    const fetchData = async () => {
      try {
        const [dashboardRes, userRes] = await Promise.all([
          api.get("/dashboard/summary"),
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
    fetchData();
  }, []);

  if (loading) return <div className="p-8">Cargando tus finanzas...</div>;

  return (
    <div className="space-y-6">
      {/* Header Sección */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Hola, {user?.fullName || user?.email?.split("@")[0] || "Usuario"} 👋🏼
          </h1>
          <p className="text-gray-500">
            Aquí está el resumen financiero de este mes.
          </p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <Plus className="mr-2 h-4 w-4" /> Nuevo Gasto
          </Button>
        </div>
      </div>

      {/* --- CARDS DE RESUMEN (Punto 22) --- */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-none shadow-md bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Balance Total
            </CardTitle>
            <Wallet className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${data?.balance?.toLocaleString() || "0"}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Ingresos
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
              <ArrowUpRight className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              + ${data?.income?.toLocaleString() || "0"}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Gastos
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
              <ArrowDownRight className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              - ${data?.expenses?.toLocaleString() || "0"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* --- GRÁFICOS Y LISTA (Punto 23) --- */}
      <div className="grid gap-4 md:grid-cols-7">
        {/* Gráfico Principal */}
        <Card className="col-span-4 border-none shadow-sm">
          <CardHeader>
            <CardTitle>Flujo de Caja</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {data?.recentTransactions?.length === 0 ? (
              <div className="h-[300px] w-full flex items-center justify-center text-gray-500">
                <p>No hay datos suficientes para mostrar el gráfico</p>
              </div>
            ) : (
              <div className="h-[300px] w-full flex items-center justify-center text-gray-500">
                <p>Gráfico disponible próximamente</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Últimas Transacciones */}
        <Card className="col-span-3 border-none shadow-sm">
          <CardHeader>
            <CardTitle>Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Mapear transacciones reales aquí */}
              {data?.recentTransactions?.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  Aún no hay movimientos.
                </p>
              ) : (
                data?.recentTransactions?.map((t: Transaction) => (
                  <div key={t.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${t.type === "expense" ? "bg-orange-100" : "bg-green-100"}`}
                      >
                        <DollarSign
                          className={`h-5 w-5 ${t.type === "expense" ? "text-orange-600" : "text-green-600"}`}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium leading-none">
                          {t.notes || "Sin descripción"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(t.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`font-bold ${t.type === "expense" ? "text-red-600" : "text-green-600"}`}
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
