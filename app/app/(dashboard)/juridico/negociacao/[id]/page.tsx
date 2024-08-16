"use client";

import { AlertDestructive } from "@/components/AlertDestructive";
import { AlertSuccess } from "@/components/AlertSuccess";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/api";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { PlusIcon } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { boolean } from "zod";

export default function FormNegociacao({ params }: { params: { id: number } }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [negociacao, setNegociacao] = useState<any>({});
  const [isBusca, setIsBusca] = useState(true);

  useEffect(() => {
    if (params.id) {
      console.log(params.id);
      getNegociacao();
    }

    async function getNegociacao() {
      await api.get(`/juridico/negociacao/${params.id}`).then((response) => {
        console.log(response);
        setNegociacao(response.data);
      });
    }
  }, [params.id, setIsBusca]);

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
      <CardHeader>
        <CardTitle>Cadastro de Negociação</CardTitle>
        <CardDescription>Preencha os dados da negociação.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="processo">Número do Processo</Label>
            <Input
              id="processo"
              placeholder="Informe o número do processo"
              value={negociacao.processo ?? ""}
              onChange={(e) =>
                setNegociacao({ ...negociacao, processo: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contrato">Contrato</Label>
            <Input
              id="contrato"
              placeholder="Informe o contrato"
              value={negociacao.contrato ?? ""}
              onChange={(e) =>
                setNegociacao({ ...negociacao, contrato: e.target.value })
              }
            />
          </div>
        </div>
        <div className="space-y-2">
            <Label htmlFor="contrato">Executado</Label>
            <Input
              id="executado"
              placeholder="Informe o executado"
              value={negociacao.executado ?? ""}
              onChange={(e) =>
                setNegociacao({ ...negociacao, executado: e.target.value })
              }
            />
          </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="liquidado" />
          <label
            htmlFor="liquidado"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Liquidado
          </label>
          <Checkbox id="descumprido" 
            checked={negociacao.is_liquidado}
            onCheckedChange={(value: boolean) => {
             setNegociacao({ ...negociacao, is_liquidado: value })
            }}
          />
          <label
            htmlFor="descumprido"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Descumprido
          </label>
          <Checkbox id="retorno" />
          <label
            htmlFor="retorno"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Retorno a Execucao
          </label>
        </div>
        <div className="space-y-2">
            <div className="flex">
              <div className="space-y-2">
                <Label htmlFor="tipo-acordo">Tipo de Acordo</Label>
                <div className="flex items-center space-x-2">
                <Checkbox id="homologacao" />
                <label
                  htmlFor="homologacao"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Homologação de Acordo Extra Judicial
                </label>
                <Checkbox id="termo" />
                <label
                  htmlFor="termo"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Termo de Acordo Extra Judicial
                </label>
                </div>
              </div>
            </div>
          </div>
        <div className="space-y-2">
          <Label htmlFor="observacao">Observação</Label>
          <Textarea
           id="observacao"
           placeholder="Informe a observação"
           value={negociacao.obs_val_neg ?? ""}
            onChange={(e) =>
              setNegociacao({ ...negociacao, obs_val_neg: e.target.value })
            }
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="submit">Salvar</Button>
      </CardFooter>
    </Card>
  );
}
