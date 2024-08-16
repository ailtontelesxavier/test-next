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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/api";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { PlusIcon } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { boolean } from "zod";
import { toast } from "sonner";
import { addMonths } from "date-fns";
import obterProximoDiaUtil from "@/lib/utils";
import InputDateForm from "@/components/input-data-form";
import InputDate from "@/components/input-data";

export default function FormNegociacao({ params }: { params: { id: number } }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [negociacao, setNegociacao] = useState<any>({});
  const [isBusca, setIsBusca] = useState(true);
  console.log(negociacao)
  const dataRef = useRef(negociacao.data_pri_parc_entr);

  useEffect(() => {
    if (params.id > 0) {
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
          <Checkbox
            id="is_liquidado"
            checked={negociacao.is_liquidado}
            onCheckedChange={(value: boolean) => {
              setNegociacao({ ...negociacao, is_liquidado: value });
            }}
          />
          <label
            htmlFor="is_liquidado"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Liquidado
          </label>
          <Checkbox
            id="is_descumprido"
            checked={negociacao.is_descumprido}
            onCheckedChange={(value: boolean) => {
              setNegociacao({ ...negociacao, is_descumprido: value });
            }}
          />
          <label
            htmlFor="is_descumprido"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Descumprido
          </label>
          <Checkbox
            id="is_retorno_execucao"
            checked={negociacao.is_retorno_execucao}
            onCheckedChange={(value: boolean) => {
              setNegociacao({ ...negociacao, is_retorno_execucao: value });
            }}
          />
          <label
            htmlFor="is_retorno_execucao"
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
                <Checkbox
                  id="is_hom_ext_jud"
                  checked={negociacao.is_hom_ext_jud}
                  onCheckedChange={(value: boolean) => {
                    setNegociacao({ ...negociacao, is_hom_ext_jud: value });
                  }}
                />
                <label
                  htmlFor="is_hom_ext_jud"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Homologação de Acordo Extra Judicial
                </label>
                <Checkbox
                  id="is_term_ex_jud"
                  checked={negociacao.is_term_ex_jud}
                  onCheckedChange={(value: boolean) => {
                    setNegociacao({ ...negociacao, is_term_ex_jud: value });
                  }}
                />
                <label
                  htmlFor="is_term_ex_jud"
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
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="w-full flex p-1  pl-2 bg-gray-400 backdrop-blur-sm rounded ">
              Dados Financeiros do Acordo
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-flow-col justify-start items-start space-x-1">
                <div className="space-y-2">
                  <Label htmlFor="val_devido">Valor Devido</Label>
                  <Input
                    id="val_devido"
                    type="number"
                    size={10}
                    step="0.01"
                    min="0"
                    value={negociacao.val_devido ?? ""}
                    onChange={(e) =>
                      setNegociacao({ ...negociacao, val_devido: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="val_desconto">Valor de Desconto</Label>
                  <Input
                    id="val_desconto"
                    placeholder="0"
                    type="number"
                    size={10}
                    step="0.01"
                    min="0"
                    required={false}
                    value={negociacao.val_desconto ?? ""}
                    onChange={(e) =>
                      setNegociacao({ ...negociacao, val_desconto: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="val_neg">Valor Negociado</Label>
                  <Input
                    id="val_neg"
                    placeholder="0"
                    type="number"
                    size={10}
                    step="0.01"
                    min="0"
                    value={negociacao.val_neg ?? ""}
                    onChange={(e) =>
                      setNegociacao({ ...negociacao, val_neg: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qtd">Qtd de Parcelas</Label>
                  <Input
                    id="qtd"
                    placeholder="0"
                    type="number"
                    size={10}
                    step="1"
                    min="0"
                    value={negociacao.qtd ?? ""}
                    onChange={(e) =>
                      setNegociacao({ ...negociacao, qtd: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-flow-col justify-start items-start space-x-1">
                <div className="space-y-2">
                  <Label htmlFor="taxa_mes">Taxa de Correção ao mês</Label>
                  <Input
                    id="taxa_mes"
                    placeholder="0"
                    type="number"
                    size={10}
                    step="0.01"
                    min="0"
                    value={negociacao.taxa_mes ?? 0}
                    onChange={(val) => {
                      var valor = calculatePGTO(
                        parseFloat(negociacao.val_neg),
                        parseFloat(val.target.value),
                        negociacao.qtd
                      );
                      setNegociacao({ ...negociacao, val_parc: valor })
                      setNegociacao({ ...negociacao, taxa_mes: parseFloat(val.target.value) })
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-flow-col justify-start items-start space-x-1">
                <div className="space-y-2">
                  <Label htmlFor="val_entrada">Valor Entrada</Label>
                  <Input
                    id="val_entrada"
                    placeholder="0"
                    type="number"
                    size={10}
                    step="0.01"
                    min="0"
                    required={false}
                    value={negociacao.val_entrada ?? 0}
                    onChange={(val) => {setNegociacao({ ...negociacao, val_entrada: parseInt(val.target.value) })}}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qtd_parc_ent">Qtd de Parc. Entrada</Label>
                  <Input
                    id="qtd_parc_ent"
                    placeholder="0"
                    type="number"
                    size={2}
                    step="1"
                    min="0"
                    required={false}
                    value={negociacao.qtd_parc_ent ?? 0}
                    onChange={(val) => {setNegociacao({ ...negociacao, qtd_parc_ent: parseInt(val.target.value) })}}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="data_pri_parc_entr">Data inical Parc. Entrada</Label>
                  <InputDate
                    name={'data_pri_parc_entr'}
                    model={negociacao}
                    setValue={setNegociacao}
                    onClickDay={handleChangeDataIniciaEntrada}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="data_ult_parc_entr">Data final Entrada</Label>
                  <InputDate
                    name={'data_ult_parc_entr'}
                    model={negociacao}
                    setValue={setNegociacao}
                    onClickDay={undefined}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="w-full flex p-1  pl-2 bg-gray-400 backdrop-blur-sm rounded ">
              Parcelamento Entrada (quando houver)
            </AccordionTrigger>
            <AccordionContent></AccordionContent>
          </AccordionItem>
        <AccordionItem value="item-3">
            <AccordionTrigger className="w-full flex p-1  pl-2 bg-gray-400 backdrop-blur-sm rounded ">
            Parcelamento Contrato
            </AccordionTrigger>
            <AccordionContent></AccordionContent>
          </AccordionItem>
        </Accordion>

      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="submit">{params.id > 0 ? "Salvar" : "Cadastrar"}</Button>
      </CardFooter>
    </Card>
  );

  // Função para calcular o pagamento mensal
  function calculatePGTO(
    valor_emprestimo: number,
    taxa_juros: number,
    numero_parcelas: number
  ) {
    taxa_juros = taxa_juros / 100;
    var valor_parcela =
      (valor_emprestimo * (taxa_juros * (1 + taxa_juros) ** numero_parcelas)) /
      ((1 + taxa_juros) ** numero_parcelas - 1);

    return valor_parcela.toFixed(2);
  }
  function handleChangeDataIniciaEntrada(value: Date, event: MouseEvent) {
    console.log(value)
    // Atualiza a data inicial da parcela de entrada
    setNegociacao((prev:any) => ({
      ...prev,
      data_pri_parc_entr: value,
    }));

    if (negociacao.qtd_parc_ent) {
      console.log('arq')
      const dataComMesesAdicionados = addMonths(
        value,
        negociacao.qtd_parc_ent
      );
      console.log(obterProximoDiaUtil(dataComMesesAdicionados))
      //const dataComMesesAdicionados = addMonths(value, negociacao.qtd_parc_ent - 1);
      //setNegociacao({ ...negociacao, data_ult_parc_entr: obterProximoDiaUtil(dataComMesesAdicionados) });
      const dataFinal = obterProximoDiaUtil(dataComMesesAdicionados);

      // Atualiza a data final da parcela de entrada
      setNegociacao((prev:any) => ({
        ...prev,
        data_ult_parc_entr: dataFinal,
      }));
    } else {
      toast("Verifique a Qtd de Parcelas. ", {
        action: {
          label: "ok",
          onClick: () => {},
        },
      });
    }
  }
}
