"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle, Loader2 } from "lucide-react";

type Plan = "free" | "basic" | "premium";

type MeResponse = {
  user: {
    id: string;
    email: string;
    fullName?: string | null;
    role: string;
    plan: Plan | string;
    createdAt?: string;
  };
};

type ErrorResponse = {
  error: string;
};

const normalizePlan = (plan: string | undefined): Plan => {
  const raw = (plan || "free").toLowerCase();
  if (raw === "basic" || raw === "premium" || raw === "free") return raw;
  return "free";
};

export default function SettingsPage() {
  const [me, setMe] = useState<MeResponse["user"] | null>(null);
  const [loading, setLoading] = useState(true);

  const [fullName, setFullName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  const [cancelOpen, setCancelOpen] = useState(false);
  const [canceling, setCanceling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);

  const plan = useMemo(() => normalizePlan(me?.plan), [me?.plan]);
  const isFree = plan === "free";
  const isBasic = plan === "basic";
  const isPremium = plan === "premium";

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await api.get<MeResponse>("/auth/me");
        if (!mounted) return;
        setMe(res.data.user);
        setFullName(res.data.user.fullName || "");
      } catch (error) {
        console.error("Error cargando perfil", error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);
    setSaveSuccess(null);

    try {
      const res = await api.patch<MeResponse>("/auth/me", {
        fullName,
      });
      setMe(res.data.user);
      setSaveSuccess("Cambios guardados.");
    } catch (err: unknown) {
      const error = err as AxiosError;
      const message =
        (error.response?.data as ErrorResponse)?.error ||
        "No se pudo guardar. Intentalo de nuevo.";
      setSaveError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancelSubscription = async () => {
    setCanceling(true);
    setCancelError(null);
    try {
      const res = await api.post<MeResponse>("/auth/cancel-subscription");
      setMe(res.data.user);
      setCancelOpen(false);
      setSaveSuccess("Suscripción cancelada. Volviste al plan Free.");
    } catch (err: unknown) {
      const error = err as AxiosError;
      const message =
        (error.response?.data as ErrorResponse)?.error ||
        "No se pudo cancelar. Intentalo de nuevo.";
      setCancelError(message);
    } finally {
      setCanceling(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-56 rounded bg-slate-100" />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="h-60 rounded-xl bg-slate-100" />
          <div className="h-60 rounded-xl bg-slate-100" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Configuración
          </h1>
          <p className="text-slate-500">
            Gestioná tu perfil, tu plan y tu suscripción.
          </p>
        </div>
      </div>

      {(saveError || cancelError) && (
        <div className="flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm text-red-600">
          <AlertCircle className="h-4 w-4" />
          <span>{saveError || cancelError}</span>
        </div>
      )}

      {saveSuccess && (
        <div className="flex items-center gap-2 rounded-md bg-emerald-50 p-3 text-sm text-emerald-700">
          <AlertCircle className="h-4 w-4" />
          <span>{saveSuccess}</span>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
            <CardDescription>
              Actualizá tus datos para personalizar tu experiencia.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={me?.email || ""} disabled />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName">Nombre</Label>
                <Input
                  id="fullName"
                  placeholder="Tu nombre"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Rol</Label>
                <Input id="role" value={me?.role || "user"} disabled />
              </div>

              <Button
                type="submit"
                className="bg-black text-white hover:bg-zinc-800"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  "Guardar cambios"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card
          className={
            isPremium
              ? "border border-slate-800 bg-slate-900 text-white shadow-sm"
              : "border border-slate-200 bg-white shadow-sm"
          }
        >
          <CardHeader>
            <CardTitle className={isPremium ? "text-white" : ""}>
              Plan
            </CardTitle>
            <CardDescription className={isPremium ? "text-gray-400" : ""}>
              Mirá tu plan actual y gestioná tu suscripción.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className={isPremium ? "text-gray-300" : "text-slate-500"}>
                  Plan actual
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <div
                    className={
                      isPremium
                        ? "text-lg font-bold"
                        : "text-lg font-bold text-slate-900"
                    }
                  >
                    {plan === "free"
                      ? "Free"
                      : plan === "basic"
                        ? "Basic"
                        : "Premium"}
                  </div>
                  {isBasic && (
                    <span className="inline-flex items-center rounded-full bg-orange-500/15 px-2 py-0.5 text-[10px] font-semibold text-orange-700 ring-1 ring-inset ring-orange-500/25">
                      Más pro
                    </span>
                  )}
                  {isPremium && (
                    <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-200 ring-1 ring-inset ring-emerald-500/30">
                      Máximo nivel
                    </span>
                  )}
                </div>
              </div>
            </div>

            {isPremium ? (
              <div className="text-gray-300">
                Estás en el nivel más alto. Podés darte de baja cuando quieras.
              </div>
            ) : isBasic ? (
              <div className="text-slate-400">
                Tenés Basic. Podés pasar a Premium o darte de baja.
              </div>
            ) : (
              <div className="text-slate-500">
                Estás en Free. Podés pasar a Basic o Premium.
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3">
            {isFree && (
              <>
                <Link href="/subscribe?plan=basic" className="w-full">
                  <Button className="w-full border border-slate-200 bg-white text-slate-800 hover:bg-slate-50">
                    Pasar a Basic
                  </Button>
                </Link>
                <Link href="/subscribe?plan=premium" className="w-full">
                  <Button className="w-full bg-slate-900 text-white hover:bg-slate-800 border border-slate-800 shadow-lg shadow-slate-900/20">
                    Pasar a Premium
                  </Button>
                </Link>
              </>
            )}

            {isBasic && (
              <>
                <Link href="/subscribe?plan=premium" className="w-full">
                  <Button className="w-full bg-slate-900 text-white hover:bg-slate-800 border border-slate-800 shadow-lg shadow-slate-900/20">
                    Pasar a Premium
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={() => setCancelOpen(true)}
                >
                  Dar de baja
                </Button>
              </>
            )}

            {isPremium && (
              <Button
                variant="secondary"
                className="w-full bg-white text-slate-900 hover:bg-gray-100"
                onClick={() => setCancelOpen(true)}
              >
                Dar de baja
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>

      <Dialog open={cancelOpen} onOpenChange={setCancelOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancelar suscripción</DialogTitle>
            <DialogDescription>
              ¿Seguro que querés darte de baja? Vas a volver al plan Free.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCancelOpen(false)}
              disabled={canceling}
            >
              Volver
            </Button>
            <Button
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={handleCancelSubscription}
              disabled={canceling}
            >
              {canceling ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cancelando...
                </>
              ) : (
                "Confirmar baja"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
