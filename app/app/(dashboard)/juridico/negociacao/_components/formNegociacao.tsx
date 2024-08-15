import { AlertDestructive } from "@/components/AlertDestructive";
import { AlertSuccess } from "@/components/AlertSuccess";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import api from "@/lib/api";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { PlusIcon } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

export default function FormNegociacao({
  id,
  setIsBusca,
}: {
  id: number;
  setIsBusca: Function;
}) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [negociacao, setNegociacao] = useState<any>({});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (!modalIsOpen) {
      // busca perfils ao fechar modal
      setIsBusca(true);
      return;
    }

    if (id) {
      getNegociacao();
    }

    async function getNegociacao() {
      await api.get(`/permissoes/module/${id}`).then((response) => {
        console.log(response);
        setNegociacao(response.data);
      });
    }
  }, [id, modalIsOpen, setIsBusca]);

  function closeModal() {
    setModalIsOpen(false);
  }

  function setOpenChange(open: boolean) {
    setModalIsOpen(open)
  }

  function handleModule(event: FormEvent) {
    event.preventDefault();

    /* if (module.title.length < 3) {
      setError("O nome deve ter pelo menos 3 caracteres");
      return;
    }

    if(id){
      updateModule();
      setIsBusca(true);
      setError("");
      return;
    }
    create();
    setIsBusca(true);
    setError(""); */
  }
  return (
    <Card className="w-full max-w-2xl">
      <Dialog open={modalIsOpen} onOpenChange={setOpenChange}>
        <DialogTrigger asChild>
          <Button
            variant={"outline"}
            type="button"
            size={"sm"}
            title={id ? "editar" : "adicionar negociacao"}
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
            <DialogTitle>Cadastro de Negociacao</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <form onSubmit={handleModule}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                {id > 0 && (
                  <>
                    <Label htmlFor="id" className="text-right">
                      ID
                    </Label>
                    <Input
                      id="id"
                      type="text"
                      placeholder="id"
                      className="col-span-3"
                      disabled={true}
                      value={module.id ?? ""}
                    />
                  </>
                )}
                <Label htmlFor="title" className="text-right">
                  Nome
                </Label>
                
              </div>
              <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="processo">Número do Processo</Label>
            <Input id="processo" placeholder="Informe o número do processo" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contrato">Contrato</Label>
            <Input id="contrato" placeholder="Informe o contrato" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="executado">Executado</Label>
            <Checkbox id="executado" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tipo-acordo">Tipo de Acordo</Label>
            <Select id="tipo-acordo">
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de acordo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="homologacao">Homologação</SelectItem>
                <SelectItem value="termo-acordo">Termo de Acordo</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
    </Card>
  );
}
