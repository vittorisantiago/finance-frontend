"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function ConfirmDeleteDialog({
  title,
  description,
  confirmLabel = "Eliminar",
  triggerLabel = "Eliminar",
  onConfirm,
}: {
  title: string;
  description: string;
  confirmLabel?: string;
  triggerLabel?: string;
  onConfirm: () => Promise<void> | void;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="xs" className="cursor-pointer">
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            className="cursor-pointer"
            onClick={handleConfirm}
            disabled={loading}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
