"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormEvent, useEffect, useState } from "react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { PlusIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { AlertSuccess } from "@/components/AlertSuccess";
import { AlertDestructive } from "@/components/AlertDestructive";

export default function FormRole({id, open}: {id: number, open: boolean}) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(open);
  const [selectOption, setSelectOption] = useState("");
  const [perfil, setPerfil] = useState<any>({});

  function hangleOnValueChange(value: string) {
    setSelectOption(value);
  }

  function openModal() {
    if (selectOption) {
      setModalIsOpen(true);
    }
  }

  function closeModal() {
    setModalIsOpen(false);
    limparForm();
  }

  function handlePerfil(event: FormEvent) {
    event.preventDefault();

    if (perfil.name.length < 3) {
      setError("O nome deve ter pelo menos 3 caracteres");
      return;
    }

    create();
    setError("");
  }

  useEffect(() =>{

  }, [modalIsOpen])

  async function create() {
    try {
      await api.post("/permissoes/role/", {
            name: perfil.name,
        }).then((response: any) => {
          if (response.status === 201) {
            setSuccess("Cadastrado com sucesso");
            limparForm();
          }
        })
        .catch((error) => setError("Error interno: " + error));
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.detail + "; " + error.message);
      }
    }
  }

  function limparForm() {
    setPerfil({});
  }
  return (
    <div className="flex gap-2">
      <Dialog open={modalIsOpen} onOpenChange={setModalIsOpen}>
        <DialogTrigger asChild>
            
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cadastro de Perfil</DialogTitle>
            <DialogDescription>
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePerfil}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Nome"
                  className="col-span-3"
                  value={perfil.name ?? ""}
                  onChange={(e) => setPerfil({ ...perfil, name: e.target.value })}
                  />
              </div>
            </div>
            <div className="flex items-end justify-end gap-2">
              <Button
                type="button"
                variant={"secondary"}
                onClick={() => closeModal()}
                >
                Cancelar
              </Button>
              <Button type="submit">Salvar</Button>
            </div>
          </form>
          <DialogFooter>
            <section className="w-full">
              {success && (
                  <AlertSuccess setSuccess={setSuccess}>{success}</AlertSuccess>
                )}
              {error && (
                  <AlertDestructive setError={setError}>{error}</AlertDestructive>
                )}
            </section>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
