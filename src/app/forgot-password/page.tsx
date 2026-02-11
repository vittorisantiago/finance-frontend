"use client"; // Porque usa estados y hooks

import { useState } from "react";
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
import { AlertCircle, Loader2 } from "lucide-react";

interface ErrorResponse {
  error: string;
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Llamada al Backend
      await api.post("/auth/forgot-password", {
        email,
      });

      console.log("Email de recuperación enviado");
      setSuccess(true);
      setEmail("");
    } catch (err: unknown) {
      const error = err as AxiosError;
      console.error(error);
      if (error.response) {
        setError(
          (error.response.data as ErrorResponse).error || "Ocurrió un error.",
        );
      } else {
        setError("No se pudo conectar con el servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Recuperar Contraseña
          </CardTitle>
          <CardDescription className="text-center">
            Ingresá tu email para recibir las instrucciones de recuperación
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Mensaje de Error */}
            {error && (
              <div className="flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            {/* Mensaje de Éxito */}
            {success && (
              <div className="flex items-center gap-2 rounded-md bg-green-50 p-3 text-sm text-green-600">
                <AlertCircle className="h-4 w-4" />
                <span>Revisá tu correo</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nombre@ejemplo.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar Instrucciones"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            <Link
              href="/login"
              className="text-orange-600 font-semibold hover:underline"
            >
              Volver al Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
