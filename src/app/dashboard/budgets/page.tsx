"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  TrendingUp,
  Plus,
  AlertCircle,
  CheckCircle2,
  Trash2,
} from "lucide-react";
import axios from "@/lib/axios";

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: string;
  isDefault: boolean;
}

interface Budget {
  id: string;
  userId: string;
  categoryId: string | null;
  limit: string;
  spent?: string;
  period: string;
  month: string | null;
  alertPercentage: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface BudgetProgress {
  budgetId: string;
  categoryName: string | null;
  limit: string;
  spent: number | string;
  alertPercentage: string;
}

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [progress, setProgress] = useState<BudgetProgress[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newBudgetLimit, setNewBudgetLimit] = useState("");
  const [newBudgetCategory, setNewBudgetCategory] = useState("");
  const [alertPercentage, setAlertPercentage] = useState("80");
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    budgetId: string | null;
  }>({
    open: false,
    budgetId: null,
  });

  useEffect(() => {
    fetchCategories();
    fetchBudgets();
    fetchBudgetProgress();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/transactions/categories");
      setCategories(response.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchBudgets = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/budgets");
      setBudgets(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching budgets:", err);
      setError("Error al cargar los presupuestos");
    } finally {
      setLoading(false);
    }
  };

  const fetchBudgetProgress = async () => {
    try {
      const response = await axios.get("/budgets/progress");
      setProgress(response.data);
    } catch (err) {
      console.error("Error fetching budget progress:", err);
    }
  };

  const handleCreateBudget = async () => {
    if (!newBudgetLimit || Number(newBudgetLimit) <= 0) {
      setError("Ingresa un monto válido");
      return;
    }

    try {
      await axios.post("/budgets", {
        categoryId: newBudgetCategory || null,
        limit: Number(newBudgetLimit),
        period: "monthly",
        alertPercentage: Number(alertPercentage),
      });

      setNewBudgetLimit("");
      setNewBudgetCategory("");
      setAlertPercentage("80");
      setShowForm(false);
      fetchBudgets();
      fetchBudgetProgress();
    } catch (err) {
      console.error("Error creating budget:", err);
      setError("Error al crear el presupuesto");
    }
  };

  const handleDeleteBudget = async () => {
    if (!deleteDialog.budgetId) return;

    try {
      await axios.delete(`/budgets/${deleteDialog.budgetId}`);
      setDeleteDialog({ open: false, budgetId: null });
      fetchBudgets();
      fetchBudgetProgress();
    } catch (err) {
      console.error("Error deleting budget:", err);
      setError("Error al eliminar el presupuesto");
    }
  };

  const getSpanishCategoryName = (name: string) => {
    // Si contiene "/" extrae la parte después de la barra (español)
    if (name.includes("/")) {
      return name.split("/")[1].trim();
    }
    return name;
  };

  const getProgressPercentage = (spent: number, limit: string) => {
    const limitNum = Number(limit);
    return Math.min((spent / limitNum) * 100, 100);
  };

  const getProgressColor = (percentage: number, alertPercentage: string) => {
    const alert = Number(alertPercentage);
    if (percentage > 100) return "#ef4444"; // Rojo
    if (percentage >= alert) return "#f59e0b"; // Ámbar
    return "#10b981"; // Verde
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          <p className="mt-4 text-gray-600">Cargando presupuestos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Presupuestos</h1>
        <p className="text-gray-600 mt-1">Administra tus límites de gasto</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          {error}
        </div>
      )}

      {/* Create Budget Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        Nuevo Presupuesto
      </button>

      {/* Create Budget Form */}
      {showForm && (
        <Card className="p-8 border-2 border-orange-200 shadow-md bg-gradient-to-br from-orange-50 to-white rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-500 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              Crear Presupuesto
            </h2>
          </div>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Límite de gasto (mensual)
              </label>
              <input
                type="number"
                value={newBudgetLimit}
                onChange={(e) => setNewBudgetLimit(e.target.value)}
                placeholder="Ej: 1000"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Categoría (opcional)
              </label>
              <select
                value={newBudgetCategory}
                onChange={(e) => setNewBudgetCategory(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all cursor-pointer bg-white"
              >
                <option value="">Presupuesto General</option>
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {getSpanishCategoryName(cat.name)}
                    </option>
                  ))
                ) : (
                  <option disabled>Cargando categorías...</option>
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Alerta cuando alcances
              </label>
              <select
                value={alertPercentage}
                onChange={(e) => setAlertPercentage(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all cursor-pointer bg-white"
              >
                <option value="25">25% del límite</option>
                <option value="50">50% del límite</option>
                <option value="75">75% del límite</option>
                <option value="80">80% del límite</option>
                <option value="90">90% del límite</option>
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleCreateBudget}
                className="flex-1 px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors cursor-pointer shadow-md hover:shadow-lg"
              >
                Crear Presupuesto
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 px-5 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* Budgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {budgets && budgets.length > 0 ? (
          budgets.map((budget) => {
            const budgetProg = progress.find((p) => p.budgetId === budget.id);
            const spent = Number(budgetProg?.spent || 0);
            const limit = Number(budget.limit);
            const percentage = getProgressPercentage(spent, budget.limit);
            const progressColor = getProgressColor(
              percentage,
              budget.alertPercentage,
            );
            const isExceeded = percentage > 100;
            const isWarning =
              percentage >= Number(budget.alertPercentage) && percentage <= 100;

            return (
              <Card
                key={budget.id}
                className="p-6 border-none shadow-sm bg-white"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {budgetProg?.categoryName
                        ? getSpanishCategoryName(budgetProg.categoryName)
                        : "General"}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">Mensual</p>
                  </div>
                  <button
                    onClick={() =>
                      setDeleteDialog({ open: true, budgetId: budget.id })
                    }
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Gastado</span>
                    <span className="font-semibold text-gray-900">
                      ${spent.toFixed(2)} / ${limit.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all"
                      style={{
                        width: `${Math.min(percentage, 100)}%`,
                        backgroundColor: progressColor,
                      }}
                    />
                  </div>
                  <div className="text-right text-sm font-semibold">
                    {percentage.toFixed(1)}%
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-2">
                  {isExceeded ? (
                    <>
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium text-red-600">
                        Presupuesto excedido
                      </span>
                    </>
                  ) : isWarning ? (
                    <>
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span className="text-sm font-medium text-amber-600">
                        Próximo a límite
                      </span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-600">
                        En control
                      </span>
                    </>
                  )}
                </div>
              </Card>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No tienes presupuestos creados</p>
            <p className="text-sm">
              Crea uno para comenzar a controlar tus gastos
            </p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onOpenChange={(open) =>
          !open && setDeleteDialog({ open: false, budgetId: null })
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Eliminar presupuesto?</DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. El presupuesto será eliminado
              permanentemente.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              onClick={() => setDeleteDialog({ open: false, budgetId: null })}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={handleDeleteBudget}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Eliminar
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
