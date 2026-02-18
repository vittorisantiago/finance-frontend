"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
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
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditTransactionModal } from "@/components/EditTransactionModal";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, Search } from "lucide-react";
import type { DateRange } from "react-day-picker";

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

const getIconComponent = (iconName?: string) => {
  const Icon = iconName && iconMap[iconName] ? iconMap[iconName] : DollarSign;
  const colors =
    iconName && colorMap[iconName]
      ? colorMap[iconName]
      : { bg: "bg-gray-100", text: "text-gray-600" };
  return { Icon, colors };
};

interface Category {
  id: string;
  name: string;
  icon?: string;
}

interface Transaction {
  id: string;
  type: "expense" | "income";
  notes?: string | null;
  date: string;
  amount: number | string;
  currency: string;
  category?: Category;
}

interface TransactionsResponse {
  items: Transaction[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export default function TransactionsPage() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState("25");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const loadCategories = useCallback(async () => {
    try {
      const res = await api.get<Category[]>("/transactions/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error al cargar categorías", error);
    }
  }, []);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get<TransactionsResponse>("/transactions", {
        params: {
          page,
          pageSize,
          search: search.trim() || undefined,
          type: typeFilter === "all" ? undefined : typeFilter,
          categoryId: categoryFilter === "all" ? undefined : categoryFilter,
          startDate: dateRange?.from?.toISOString(),
          endDate: dateRange?.to?.toISOString(),
        },
      });
      setTransactions(res.data.items);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      const err = error as AxiosError;
      const status = err.response?.status;
      if (status === 401 || status === 403) {
        router.replace("/login");
        return;
      }
      console.error("Error al cargar transacciones", error);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, search, typeFilter, categoryFilter, dateRange, router]);

  const handleDelete = useCallback(
    async (transactionId: string) => {
      try {
        await api.delete(`/transactions/${transactionId}`);
        fetchTransactions();
      } catch (error) {
        const err = error as AxiosError<{ error?: string }>;
        const message =
          err.response?.data?.error || "Error al eliminar la transacción";
        alert(message);
      }
    },
    [fetchTransactions],
  );

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const rangeLabel = dateRange?.from
    ? dateRange.to
      ? `${dateRange.from.toLocaleDateString("es-AR")} - ${dateRange.to.toLocaleDateString("es-AR")}`
      : dateRange.from.toLocaleDateString("es-AR")
    : "Rango de fechas";

  const handleFilterChange = () => {
    setPage(1);
  };

  const resetFilters = () => {
    setSearch("");
    setTypeFilter("all");
    setCategoryFilter("all");
    setDateRange(undefined);
    setPage(1);
  };

  const handleExportExcel = () => {
    if (transactions.length === 0) {
      alert("No hay transacciones para exportar");
      return;
    }

    const exportData = transactions.map((t) => ({
      Fecha: new Date(t.date).toLocaleString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      Categoría: t.category?.name || "Sin categoría",
      Notas: t.notes || "-",
      Tipo: t.type === "income" ? "Ingreso" : "Gasto",
      Monto: Number(t.amount),
      Moneda: t.currency,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transacciones");

    const fileName = `transacciones_${new Date().toISOString().slice(0, 10)}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Historial de transacciones
        </h1>
        <p className="text-slate-500">
          Todos tus movimientos en un solo lugar.
        </p>
      </div>

      <Card className="border border-slate-200 bg-white shadow-sm">
        <CardHeader className="flex flex-col gap-3">
          <div className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-slate-700">
              Filtros avanzados
            </CardTitle>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <label className="text-xs font-semibold text-slate-500">
                Buscar
              </label>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Nota o categoría"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    handleFilterChange();
                  }}
                  className="pl-9"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">
                Tipo
              </label>
              <Select
                value={typeFilter}
                onValueChange={(v) => {
                  setTypeFilter(v);
                  handleFilterChange();
                }}
              >
                <SelectTrigger className="mt-2 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="income">Ingresos</SelectItem>
                  <SelectItem value="expense">Gastos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">
                Categoría
              </label>
              <Select
                value={categoryFilter}
                onValueChange={(v) => {
                  setCategoryFilter(v);
                  handleFilterChange();
                }}
              >
                <SelectTrigger className="mt-2 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">
                Rango de fechas
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="mt-2 w-full justify-between border-slate-200"
                  >
                    <span className="truncate text-sm">{rangeLabel}</span>
                    <CalendarDays className="h-4 w-4 flex-shrink-0" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-2">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={(range) => {
                      setDateRange(range);
                      handleFilterChange();
                    }}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">
                Filas
              </label>
              <Select
                value={pageSize}
                onValueChange={(v) => {
                  setPageSize(v);
                  handleFilterChange();
                }}
              >
                <SelectTrigger className="mt-2 w-16 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="border-t border-slate-100 pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <Button variant="outline" size="sm" onClick={resetFilters}>
              Limpiar filtros
            </Button>
            <div className="flex items-center gap-3">
              <div className="text-xs text-slate-500 flex items-center gap-2">
                <SlidersHorizontal className="h-3 w-3" />
                {transactions.length} resultados
              </div>
              <Button
                size="sm"
                onClick={handleExportExcel}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
              Cargando transacciones...
            </div>
          ) : transactions.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
              Sin transacciones
            </div>
          ) : (
            <>
              <div className="overflow-hidden rounded-lg border border-slate-100">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">
                        Categoría
                      </th>
                      <th className="px-4 py-3 text-left font-semibold">
                        Notas
                      </th>
                      <th className="px-4 py-3 text-left font-semibold">
                        Fecha
                      </th>
                      <th className="px-4 py-3 text-left font-semibold">
                        Moneda
                      </th>
                      <th className="px-4 py-3 text-right font-semibold">
                        Monto
                      </th>
                      <th className="px-4 py-3 text-right font-semibold">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {transactions.map((t: Transaction) => {
                      const { Icon, colors } = getIconComponent(
                        t.category?.icon,
                      );
                      const amount = Number(t.amount);
                      return (
                        <tr key={t.id} className="hover:bg-slate-50">
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`h-10 w-10 rounded-full flex items-center justify-center ${colors.bg}`}
                              >
                                <Icon className={`h-5 w-5 ${colors.text}`} />
                              </div>
                              <div className="font-semibold text-slate-700">
                                {t.category?.name || "Sin categoría"}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-slate-600">
                            {t.notes || "-"}
                          </td>
                          <td className="px-4 py-4 text-slate-600">
                            {new Date(t.date).toLocaleString("es-AR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                          <td className="px-4 py-4 text-slate-600">
                            {t.currency}
                          </td>
                          <td className="px-4 py-4 text-right">
                            <span
                              className={`font-bold ${
                                t.type === "expense"
                                  ? "text-red-600"
                                  : "text-emerald-600"
                              }`}
                            >
                              {t.type === "expense" ? "-" : "+"} $
                              {amount.toLocaleString("es-AR")}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <EditTransactionModal
                                transaction={{
                                  ...t,
                                  amount: Number(t.amount),
                                  notes: t.notes ?? undefined,
                                }}
                                onSuccess={fetchTransactions}
                              />
                              <ConfirmDeleteDialog
                                title="Eliminar transacción"
                                description="Estas seguro? Esta accion no tiene retorno."
                                onConfirm={() => handleDelete(t.id)}
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-slate-500">
                    Página {page} de {totalPages}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                      disabled={page === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {Array.from({ length: totalPages }).map((_, i) => {
                      const pageNum = i + 1;
                      return (
                        <Button
                          key={pageNum}
                          variant={pageNum === page ? "default" : "outline"}
                          className={
                            pageNum === page
                              ? "bg-orange-500 text-white hover:bg-orange-600"
                              : "border-slate-200"
                          }
                          onClick={() => setPage(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setPage((prev) => Math.min(totalPages, prev + 1))
                      }
                      disabled={page === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
