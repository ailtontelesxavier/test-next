import { AlertDestructive } from "@/components/AlertDestructive";
import { AlertSuccess } from "@/components/AlertSuccess";
import InputDateForm from "@/components/input-data-form";
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

export default function FormParcela({
  id,
  negociacao_id,
  setIsBusca,
}: {
  id: number;
  negociacao_id: number;
  setIsBusca: Function;
}) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [parcela, setParcela] = useState<any>({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [type, setType] = useState('1');

  useEffect(() => {
    if (!modalIsOpen) {
      // busca perfils ao fechar modal
      setIsBusca(true);
      return;
    }

    if (id) {
      getParcela();
      setType('' + parcela?.type);
    }

    async function getParcela() {
      await api.get(`/juridico/parcelamento/${id}`).then((response) => {
        console.log(response);
        setParcela(response.data);
        console.log(parcela?.data)
      });
    }
  }, [id, modalIsOpen, setIsBusca, parcela?.type]);

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
  function handleForm(event: FormEvent) {
    event.preventDefault();
  }
  return (
    <>
      <div className="w-full flex justify-end">

        <Card>
          <Dialog open={modalIsOpen} onOpenChange={setOpenChange}>
            <DialogTrigger asChild>
              <Button
                variant={"outline"}
                type="button"
                size={"sm"}
                title={id ? "editar" : "adicionar parcela"}
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
                <DialogTitle>Cadastro de Parcela</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <form onSubmit={handleModule}>
                <div className="grid gap-4 py-2">
                  <div className="grid grid-flow-col gap-2 justify-start items-start space-x-1">
                    {id > 0 && (
                      <div className="flex flex-col w-36 justify-start items-start space-y-2">
                        <Label className="text-right">
                          ID:
                        </Label>
                        <Input disabled value={parcela.id ?? ""} />
                      </div>
                    )}
                    <div className="flex flex-col w-36 justify-start items-start space-y-2">
                      <Label htmlFor="tipo-acordo">Tipo</Label>
                      <Select value={'' + type} onValueChange={(value) => {
                        setType(value)
                        setParcela({
                          ...parcela,
                          type: parseInt(value),
                        });
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Contrato</SelectItem>
                          <SelectItem value="2">Entrada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-flow-col m-2 justify-start items-start space-x-1">
                    <div className="flex flex-col space-y-2">
                      <Label>Data</Label>
                      <InputDateForm
                        field={parcela?.data}
                        onClickDay={handleChangeData}
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Label>Data Pagamento</Label>
                      <InputDateForm
                        field={parcela?.data_pgto}
                        onClickDay={handleChangeDataPgto}
                      />
                    </div>
                  </div>
                  <div className="grid grid-flow-col gap-1 m-2 items-start justify-start">
                    <div className="flex flex-col items-start space-y-2 w-36">
                      <Label htmlFor='val_parcela'>Valor Parcela</Label>
                      <Input
                        id="val_parcela"
                        type="number"
                        required
                        step="0.01"
                        min="0"
                        value={parcela?.val_parcela}
                        onChange={(e) => {
                          setParcela({
                            ...parcela,
                            val_parcela: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="flex flex-col items-start space-y-2">
                      <Label htmlFor='val_pago'>Primeira Parcela Acordo</Label>
                      <Input
                        id="val_pago"
                        type="number"
                        required
                        step="0.01"
                        min="0"
                        value={parcela?.val_pago}
                        onChange={(e) => {
                          setParcela({
                            ...parcela,
                            val_pago: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 gap-2">
                      <Checkbox id="jurus" />
                      <Label htmlFor="jurus">Juros</Label>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 gap-2">
                      <Label htmlFor="jurus">Obs.</Label>
                      <Textarea className="w-full" />
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
              <DialogFooter className="w-full">
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
      </div>
    </>
  );

  function handleChangeData(value: any) {
    setParcela({
      ...parcela,
      data: value,
    });
  }
  function handleChangeDataPgto(value: any) {
    console.log(typeof value)
    setParcela({
      ...parcela,
      data: parcela.data,
      data_pgto: value,
    });
  }
}
