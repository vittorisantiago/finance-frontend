"use client";

import { useEffect, useMemo, useState } from "react";
import { AxiosError } from "axios";
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
import { Loader2, Pencil } from "lucide-react";
import api from "@/lib/axios";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  color: string;
  type: "income" | "expense";
}

export interface EditableTransaction {
  id: string;
  type: "expense" | "income";
  notes?: string;
  date: string;
  amount: number;
  category?: {
    id: string | number;
    name: string;
  };
  categoryId?: string;
}

const toDateInputValue = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export function EditTransactionModal({
  transaction,
  onSuccess,
}: {
  transaction: EditableTransaction;
  onSuccess: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const [type, setType] = useState<"income" | "expense">("expense");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    amount?: string;
    categoryId?: string;
  }>({});

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

  useEffect(() => {
    if (!open) return;
    setType(transaction.type);
    setAmount(String(Number(transaction.amount || 0)));
    setNotes(transaction.notes || "");
    setDate(toDateInputValue(transaction.date));

    const incomingCategoryId =
      transaction.categoryId ||
      (transaction.category?.id ? String(transaction.category.id) : "");
    setCategoryId(incomingCategoryId || "");
    setFieldErrors({});
  }, [open, transaction]);

  const filteredCategories = useMemo(
    () => categories.filter((c) => c.type === type),
    [categories, type],
  );

  useEffect(() => {
    if (!open) return;
    if (!categoryId) return;
    const stillValid = filteredCategories.some((c) => c.id === categoryId);
    if (!stillValid) {
      setCategoryId("");
    }
  }, [filteredCategories, categoryId, open]);

  const setTransactionType = (nextType: "income" | "expense") => {
    setType(nextType);
    setCategoryId("");
    setFieldErrors((prev) => ({ ...prev, categoryId: undefined }));
  };

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

      await api.put(`/transactions/${transaction.id}`, {
        amount: amountValue,
        categoryId,
        date: dateTime.toISOString(),
        notes,
        type,
      });

      setOpen(false);
      onSuccess();
    } catch (error: AxiosError<{ error: string }> | unknown) {
      const message =
        (error as AxiosError<{ error: string }>)?.response?.data?.error ||
        "Error al actualizar la transacción";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="xs" className="gap-1">
          <Pencil className="h-3 w-3" /> Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar movimiento</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
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
            <Label htmlFor={`amount-${transaction.id}`}>Monto</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <Input
                id={`amount-${transaction.id}`}
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
            <Label htmlFor={`date-${transaction.id}`}>Fecha</Label>
            <Input
              id={`date-${transaction.id}`}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor={`notes-${transaction.id}`}>Notas (Opcional)</Label>
            <Input
              id={`notes-${transaction.id}`}
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
              "Guardar cambios"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
