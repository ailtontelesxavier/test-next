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
import { PlusIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { AlertSuccess } from "@/components/AlertSuccess";
import { AlertDestructive } from "@/components/AlertDestructive";

export default function FormRole({ id, setIsBusca }: { id: number, setIsBusca: Function }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectOption, setSelectOption] = useState("");
  const [perfil, setPerfil] = useState<any>({});
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
  }

  function handlePerfil(event: FormEvent) {
    event.preventDefault();

    if (perfil.name.length < 3) {
      setError("O nome deve ter pelo menos 3 caracteres");
      return;
    }

    if(id){
      updatePerfil();
      setIsBusca(true);
      setError("");
      return;
    }
    create();
    setIsBusca(true);
    setError("");
  }

  useEffect(() => {
    if (id) {
      getPerfil();
    }

    async function getPerfil() {
      await api.get(`/permissoes/role/${id}`).then((response) => {
        console.log(response);
        setPerfil(response.data);
      });
    }
  }, [id]);

  async function create() {
    try {
      await api
        .post("/permissoes/role/", {
          name: perfil.name,
        })
        .then((response: any) => {
          if (response.status === 201) {
            setSuccess("Cadastrado com sucesso");
          }
        })
        .catch((error) => setError("Error interno: " + error));
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.detail + "; " + error.message);
      }
    }
  }

  async function updatePerfil() {
    try {
      await api
        .put("/permissoes/role/"+id, {
          id: id,
          name: perfil.name,
        })
        .then((response: any) => {
          if (response.status === 200) {
            setSuccess("Atualizado com sucesso");
          }
        })
        .catch((error) => setError("Error interno: " + error));
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.detail + "; " + error.message);
      }
    }
  }

  return (
    <div className="flex gap-2">
      <Dialog open={modalIsOpen} onOpenChange={setModalIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant={"outline"}
            type="button"
            size={"sm"}
            title={id ? "editar" : "adicionar modulo"}
            onClick={() => setModalIsOpen(true)}
          >
            {id ? (
              <Pencil2Icon className="h-4 w-4" />
            ) : (
              <PlusIcon className="h-4 w-4" />
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cadastro de Perfil</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePerfil}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                {id > 0 && (
                  <>
                    <Label htmlFor="id" className="text-right">
                      Nome
                    </Label>
                    <Input
                      id="id"
                      type="text"
                      placeholder="id"
                      className="col-span-3"
                      disabled={true}
                      value={perfil.id ?? ""}
                    />
                  </>
                )}
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Nome"
                  className="col-span-3"
                  value={perfil.name ?? ""}
                  onChange={(e) =>
                    setPerfil({ ...perfil, name: e.target.value })
                  }
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
