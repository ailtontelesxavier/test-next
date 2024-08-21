"use client";

import { AlertDestructive } from "@/components/AlertDestructive";
import { AlertSuccess } from "@/components/AlertSuccess";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
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
import { addMonths, format } from "date-fns";
import obterProximoDiaUtil from "@/lib/utils";
import InputDateForm from "@/components/input-data-form";
import InputDate from "@/components/input-data";
import { Separator } from "@/components/ui/separator";
import TableParcelamento from "../_components/tableParcelamento";
import { Icons } from "@/components/icons";

export default function FormNegociacao({ params }: { params: { id: number } }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [negociacao, setNegociacao] = useState<any>({});

  const [data_pri_parc_entr, setData_pri_parc_entr] = useState(
    negociacao?.data_pri_parc_entr
  );
  const [data_ult_parc_entr, setData_ult_parc_entr] = useState(
    negociacao?.data_ult_parc_entr
  );
  const [isBusca, setIsBusca] = useState(true);

  const router = useRouter();
  //console.log(negociacao?.data_pri_parc_entr)
  //console.log(negociacao?.data_ult_parc_entr)

  useEffect(() => {
    if (params.id > 0 && isBusca) {
      console.log(params.id);
      getNegociacao();
    }

    if (negociacao?.data_pri_parc_entr) {
      setData_ult_parc_entr(negociacao?.data_ult_parc_entr);
    }

    setIsBusca(false);

    async function getNegociacao() {
      try {
        setLoading(true);
        await api.get(`/juridico/negociacao/${params.id}`).then((response) => {
          console.log(response);
          setNegociacao(response.data);
          setData_pri_parc_entr(negociacao?.data_pri_parc_entr);
          setData_ult_parc_entr(negociacao?.data_ult_parc_entr);
        });
      } catch (error: any) {
        if (error.response) {
          setError(error.response.data.detail + "; " + error.message);
        }
      } finally {
        setLoading(false);
      }
    }
  }, [
    params.id,
    isBusca,
    negociacao?.data_pri_parc_entr,
    negociacao?.data_ult_parc_entr,
  ]);

  function handleNegociacao(event: FormEvent) {
    event.preventDefault();
    console.log(event)

    /* if (module.title.length < 3) {
      setError("O nome deve ter pelo menos 3 caracteres");
      return;
    }

    */
    if (params.id > 0) {
      updateNegociacao();
      setIsBusca(true);
      setError("");
      return;
    }
    createNegociacao();
    setIsBusca(true);
    setError("");
  }

  async function createNegociacao() {
    try {
      //delete negociacao.id
      console.log(negociacao)
      await api
        .post("/juridico/negociacao", {
          ...negociacao,
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

  async function updateNegociacao() {
    try {
      await api
        .put("/juridico/negociacao/" + params.id, {
          ...negociacao,
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
    <Card className="w-full min-w-1xl max-w-4xl">
      <CardHeader>
        <CardTitle>Cadastro de Negociação</CardTitle>
        <CardDescription>Preencha os dados da negociação.</CardDescription>
      </CardHeader>
      <form onSubmit={handleNegociacao}>
        <CardContent className="grid gap-4 min-w-full">
          {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="processo">Número do Processo</Label>
              <Input
                id="processo"
                placeholder="Informe o número do processo"
                name='processo'
                value={negociacao?.processo ?? ""}
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
                name="contrato"
                value={negociacao?.contrato ?? ""}
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
              name='executado'
              value={negociacao?.executado ?? ""}
              onChange={(e) =>
                setNegociacao({ ...negociacao, executado: e.target.value })
              }
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_liquidado"
              checked={negociacao?.is_liquidado}
              name="is_liquidado"
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
              name='is_descumprido'
              checked={negociacao?.is_descumprido}
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
              checked={negociacao?.is_retorno_execucao}
              name='is_retorno_execucao'
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
                    name='is_hom_ext_jud'
                    checked={negociacao?.is_hom_ext_jud}
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
                    checked={negociacao?.is_term_ex_jud}
                    name='is_term_ex_jud'
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
              name='obs_val_neg'
              value={negociacao?.obs_val_neg ?? ""}
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
                <div className="grid grid-flow-col m-2 justify-start items-start space-x-1">
                  <div className="space-y-2">
                    <Label htmlFor="val_devido">Valor Devido</Label>
                    <Input
                      id="val_devido"
                      type="number"
                      size={10}
                      step="0.01"
                      min="0"
                      name="val_devido"
                      value={negociacao?.val_devido ?? ""}
                      onChange={(e) =>
                        setNegociacao({
                          ...negociacao,
                          val_devido: e.target.value,
                        })
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
                      name='val_desconto'
                      value={negociacao?.val_desconto ?? ""}
                      onChange={(e) =>
                        setNegociacao({
                          ...negociacao,
                          val_desconto: e.target.value,
                        })
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
                      name='val_neg'
                      value={negociacao?.val_neg ?? ""}
                      onChange={(e) =>
                        setNegociacao({
                          ...negociacao,
                          val_neg: e.target.value,
                        })
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
                      name='qtd'
                      value={negociacao?.qtd ?? ""}
                      onChange={(e) =>
                        setNegociacao({ ...negociacao, qtd: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxa_mes">Taxa de Correção ao mês</Label>
                    <Input
                      id="taxa_mes"
                      placeholder="0"
                      type="number"
                      size={10}
                      step="0.01"
                      min="0"
                      name='taxa_mes'
                      value={negociacao?.taxa_mes ?? 0}
                      onChange={(val) => {
                        var valor = calculatePGTO(
                          parseFloat(negociacao.val_neg),
                          parseFloat(val.target.value),
                          negociacao.qtd
                        );
                        setNegociacao({ ...negociacao, val_parc: valor });
                        setNegociacao({
                          ...negociacao,
                          taxa_mes: parseFloat(val.target.value),
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-flow-col m-2 justify-start items-start space-x-1"></div>
                <div className="grid grid-flow-col m-2 gap-1 justify-start items-start">
                  <div className="space-y-2">
                    <Label htmlFor="val_entrada">Valor Entrada</Label>
                    <Input
                      className="w-36"
                      id="val_entrada"
                      placeholder="0"
                      type="number"
                      size={10}
                      step="0.01"
                      min="0"
                      required={false}
                      name="val_entrada"
                      value={negociacao?.val_entrada ?? 0}
                      onChange={(val) => {
                        setNegociacao({
                          ...negociacao,
                          val_entrada: parseInt(val.target.value),
                        });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="qtd_parc_ent">Qtd Parc. Entrada</Label>
                    <Input
                      id="qtd_parc_ent"
                      placeholder="0"
                      type="number"
                      size={2}
                      step="1"
                      min="0"
                      name='qtd_parc_ent'
                      required={false}
                      value={negociacao?.qtd_parc_ent ?? 0}
                      onChange={(val) => {
                        setNegociacao({
                          ...negociacao,
                          qtd_parc_ent: parseInt(val.target.value),
                        });
                      }}
                    />
                  </div>
                  <div className="space-y-2 w-44">
                    <Label htmlFor="data_pri_parc_entr">
                      Data inical Parc. Entrada
                    </Label>
                    <InputDateForm
                      className={"w-full"}
                      field={negociacao?.data_pri_parc_entr}
                      onClickDay={handleChangeDataIniciaEntrada}
                    />
                  </div>
                  <div className="space-y-2 flex flex-col m-1">
                    <Label>Data final Entrada</Label>
                    <InputDateForm
                      field={negociacao?.data_ult_parc_entr}
                      onClickDay={handleChangeDataFinalEntrada}
                    />
                  </div>
                </div>
                <div className="grid grid-flow-col gap-1 m-2 items-start justify-start">
                  <div className="flex flex-col items-start space-y-2 w-36">
                    <Label htmlFor="val_parc">Valor Parcela</Label>
                    <Input
                      id="val_parc"
                      type="number"
                      required
                      step="0.01"
                      min="0"
                      value={negociacao?.val_parc}
                    />
                  </div>
                  <div className="flex flex-col items-start space-y-2">
                    <Label htmlFor="data_pri_parc">
                      Primeira Parcela Acordo
                    </Label>
                    <InputDateForm
                      className={"w-full"}
                      id="data_pri_parc"
                      field={negociacao?.data_pri_parc}
                      onClickDay={hundleChengeDataPriParc}
                    />
                  </div>
                  <div className="flex flex-col items-start space-y-2">
                    <Label htmlFor="data_ult_parc">Última Parcela Acordo</Label>
                    <InputDateForm
                      id="data_ult_parc"
                      className={"w-full"}
                      field={negociacao?.data_ult_parc}
                      onClickDay={hundleChengeDataUltParc}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="w-full flex p-1  pl-2 bg-gray-400 backdrop-blur-sm rounded ">
                Parcelamento Entrada (quando houver)
              </AccordionTrigger>
              <AccordionContent>
                <TableParcelamento
                  type={2}
                  negociacao_id={negociacao?.id || 0}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="w-full flex p-1  pl-2 bg-gray-400 backdrop-blur-sm rounded ">
                Parcelamento Contrato
              </AccordionTrigger>
              <AccordionContent>
                <div>
                  <TableParcelamento
                    type={1}
                    negociacao_id={negociacao?.id || 0}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <section className="w-full">
            {success && (
              <AlertSuccess setSuccess={setSuccess}>{success}</AlertSuccess>
            )}
            {error && (
              <AlertDestructive setError={setError}>{error}</AlertDestructive>
            )}
          </section>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Button
            type="button"
            variant={"outline"}
            onClick={() => router.push("/app/juridico/negociacao")}
          >
            Cancelar
          </Button>
          <Button type="submit">
            {params.id > 0 ? "Salvar" : "Cadastrar"}
          </Button>
        </CardFooter>
      </form>
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

  function handleChangeDataFinalEntrada(value: any) {
    setNegociacao({
      ...negociacao,
      data_ult_parc_entr: value.toISOString().substring(0, 10),
    });
  }

  function handleChangeDataIniciaEntrada(value: any) {
    // Atualiza a data inicial da parcela de entrada
    setData_pri_parc_entr(value);

    if (negociacao?.qtd_parc_ent) {
      const dataComMesesAdicionados = addMonths(value, negociacao.qtd_parc_ent);

      var dataFinal = obterProximoDiaUtil(dataComMesesAdicionados);
      console.log(dataFinal.toISOString().substring(0, 10));

      // Atualiza a data final da parcela de entrada
      setData_ult_parc_entr(dataFinal);
      setNegociacao({
        ...negociacao,
        data_ult_parc_entr: dataFinal.toISOString().substring(0, 10),
        data_pri_parc_entr: value.toISOString().substring(0, 10),
      });
    } else {
      toast("Verifique a Qtd de Parcelas. ", {
        action: {
          label: "ok",
          onClick: () => {},
        },
      });
    }
  }

  function hundleChengeDataPriParc(value: any) {
    setNegociacao({
      ...negociacao,
      data_pri_parc: value.toISOString().substring(0, 10),
    });
  }

  function hundleChengeDataUltParc(value: any) {
    setNegociacao({
      ...negociacao,
      data_ult_parc: value.toISOString().substring(0, 10),
    });
  }
}
