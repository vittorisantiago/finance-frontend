"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Loader2 } from "lucide-react";
import api from "@/lib/axios";
import { cn } from "@/lib/utils"; // Utilidad de Shadcn

interface Category {
  id: string;
  name: string;
  color: string;
  type: "income" | "expense";
}

// Props: Recibimos una función para recargar el dashboard cuando guardamos
export function AddTransactionModal({ onSuccess }: { onSuccess: () => void }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  // Estado del formulario
  const [type, setType] = useState<"income" | "expense">("expense");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // YYYY-MM-DD
  const [notes, setNotes] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    amount?: string;
    categoryId?: string;
  }>({});

  const setTransactionType = (nextType: "income" | "expense") => {
    setType(nextType);
    setCategoryId("");
    setFieldErrors((prev) => ({ ...prev, categoryId: undefined }));
  };

  // Cargar categorías al abrir el componente
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await api.get("/transactions/categories");
        setCategories(res.data);
      } catch (e) {
        console.error("Error categories", e);
      }
    };
    fetchCats();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const nextErrors: typeof fieldErrors = {};
    const amountValue = Number.parseFloat(amount);

    if (!amount || Number.isNaN(amountValue) || amountValue <= 0) {
      nextErrors.amount = "Ingresá un monto válido";
    }
    if (!categoryId) {
      nextErrors.categoryId = "Seleccioná una categoría";
    }
    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      setLoading(false);
      return;
    }

    try {
      // Combinar la fecha seleccionada con la hora actual
      const [year, month, day] = date.split("-").map(Number);
      const now = new Date();
      const dateTime = new Date(
        year,
        month - 1,
        day,
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
      );

      await api.post("/transactions", {
        amount: amountValue,
        categoryId,
        date: dateTime.toISOString(),
        notes,
        type,
      });

      setOpen(false); // Cerrar modal
      setAmount(""); // Limpiar form
      setCategoryId("");
      setNotes("");
      setFieldErrors({});
      onSuccess(); // Avisar al padre que recargue datos
    } catch (error) {
      console.error(error);
      alert("Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  // Filtrar categorías según si es gasto o ingreso
  const filteredCategories = categories.filter((c) => c.type === type);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          <Plus className="mr-2 h-4 w-4" /> Nuevo movimiento
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar movimiento</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          {/* Tabs tipo Toggle para Ingreso/Gasto */}
          <div className="grid grid-cols-2 gap-2 rounded-lg bg-gray-100 p-1">
            <button
              type="button"
              onClick={() => setTransactionType("expense")}
              aria-pressed={type === "expense"}
              className={cn(
                "flex cursor-pointer items-center justify-center rounded-md py-2.5 text-sm font-semibold transition-all outline-none focus-visible:ring-2 focus-visible:ring-black/10",
                type === "expense"
                  ? "bg-white text-red-600 shadow-sm"
                  : "text-gray-500 hover:bg-white/60 hover:text-gray-900",
              )}
            >
              Gastos
            </button>
            <button
              type="button"
              onClick={() => setTransactionType("income")}
              aria-pressed={type === "income"}
              className={cn(
                "flex cursor-pointer items-center justify-center rounded-md py-2.5 text-sm font-semibold transition-all outline-none focus-visible:ring-2 focus-visible:ring-black/10",
                type === "income"
                  ? "bg-white text-green-600 shadow-sm"
                  : "text-gray-500 hover:bg-white/60 hover:text-gray-900",
              )}
            >
              Ingresos
            </button>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="amount">Monto</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                className={cn(
                  "h-12 pl-8 pr-3 text-2xl font-semibold tracking-tight",
                  fieldErrors.amount &&
                    "border-red-500 focus-visible:ring-red-500/20",
                )}
                value={amount}
                onChange={(e) => {
                  setFieldErrors((prev) => ({ ...prev, amount: undefined }));
                  setAmount(e.target.value);
                }}
                aria-invalid={Boolean(fieldErrors.amount)}
              />
            </div>
            {fieldErrors.amount && (
              <p className="text-sm text-red-600">{fieldErrors.amount}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label>Categoría</Label>
            <Select
              value={categoryId || undefined}
              onValueChange={(val) => {
                setCategoryId(val);
                setFieldErrors((prev) => ({ ...prev, categoryId: undefined }));
              }}
            >
              <SelectTrigger
                className={cn(
                  "h-11 w-full text-base",
                  fieldErrors.categoryId &&
                    "border-red-500 focus:ring-red-500/20 focus-visible:ring-red-500/20",
                )}
                aria-invalid={Boolean(fieldErrors.categoryId)}
              >
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent position="popper" align="start">
                {filteredCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    <div className="flex items-center gap-2">
                      {/* Aquí podrías renderizar el ícono dinámicamente si querés */}
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      ></div>
                      {cat.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors.categoryId && (
              <p className="text-sm text-red-600">{fieldErrors.categoryId}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="date">Fecha</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notes">Notas (Opcional)</Label>
            <Input
              id="notes"
              placeholder="Ej: Cena con amigos"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-zinc-800"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Guardar transacción"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
