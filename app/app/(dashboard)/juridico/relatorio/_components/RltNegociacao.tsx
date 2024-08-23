"use client";

import { Icons } from "@/components/icons";
import generatePDF from "./generator-pdf-negociacao";
import generatePdfParcelamento from "./generator-pdf-parcelamento";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import React, { FormEvent, useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import InputDateForm from "@/components/input-data-form";
import { useSession } from "next-auth/react";
import api from "@/lib/api";
import { AlertSuccess } from "@/components/AlertSuccess";
import { AlertDestructive } from "@/components/AlertDestructive";
import { Label } from "@/components/ui/label";

const FormSchema = z.object({
    data_inicial: z.date({
        required_error: "Data inicial requerida.",
    }),
    data_final: z.date({
        required_error: "Data final requerida.",
    }),
    data_temp: z.date({
        required_error: "Data temp requerida.",
    }).optional(),
    tipo: z.string(),
});

export default function RltNegociacao() {
    const { data: session, status } = useSession();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [data_inicial, setData_inicial] = useState('');
    const [data_final, setData_final] = useState('');

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    async function onSubmit(event: FormEvent) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        if (!(formData.get('processo') as String).trim()) {
          setError("O Campo Número do Processo obrigatório");
          return;
        }
        var _session: any = session;
        console.log(_session)
        setLoading(true);
        const response = await rltNegociacao(data);
        switch (data.tipo) {
            case '1':
                generatePDF(response, _session?.user.username);
                break;
            case '2':
                generatePdfParcelamento(response, _session?.user.username);
                break;
        }
        setLoading(false);
    }

    return (
        <div>
            <h1>{">>"}Negociação</h1>
            <div className="flex gap-2 mt-2">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex flex-row items-center justify-center gap-4 mt-4">
                        <div className="">
                            <FormField
                                control={form.control}
                                name="tipo"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col -mt-2">
                                        <FormLabel>Tipo Relatorio</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione o relatorio" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="text-black">
                                                <SelectItem value="1">
                                                    Negociação Por Período
                                                </SelectItem>
                                                <SelectItem value="2">
                                                    Parcelas Por Período
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2 w-44">
                            <Label htmlFor="data_pri_parc_entr">
                                Data Inicial
                            </Label>
                            <InputDateForm
                                className={"w-full"}
                                field={data_inicial}
                                onClickDay={handleChangeDataInicial}
                            />
                            <input hidden={true} name="data_pri_parc_entr" value={data_inicial ?? null} />
                        </div>
                        <div className="space-y-2 w-44">
                            <Label htmlFor="data_pri_parc_entr">
                                Data Inicial
                            </Label>
                            <InputDateForm
                                className={"w-full"}
                                field={data_final}
                                onClickDay={handleChangeDataFinal}
                            />
                            <input hidden={true} name="data_pri_parc_entr" value={data_final ?? null} />
                        </div>
                    </div>
                    <div className="col-span-12">
                        {success && (
                            <AlertSuccess setSuccess={setSuccess}>{success}</AlertSuccess>
                        )}
                        {error && (
                            <AlertDestructive setError={setError}>{error}</AlertDestructive>
                        )}
                    </div>

                    <div className="col-span-12 flex justify-end">
                        <Button
                            className=""
                            type="submit"
                            onClick={form.handleSubmit(onSubmit)}
                        >
                            {loading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Gerar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );

    async function rltNegociacao(formData: any) {
        const stringFormatada = Object.entries(formData)
            .map(([key, value]) => `&${key}=${encodeURIComponent("" + value)}`)
            .join("");
        try {
            setLoading(true);
            await api
                .get(`/negociacao/relatorio/?${stringFormatada}`)
                .then((response) => {
                    return response.data;
                }).catch((error) => {
                    const responseObject = JSON.parse(error.request.response)
                    var errors = ''
                    responseObject.detail.forEach((val: any) => {
                        errors += (`(Campo: ${val.loc[1]} Erro: ${val.msg}) `)
                    });
                });
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.detail + "; " + error.message);
            }
        } finally {
            setLoading(false);
        }


    }

    function handleChangeDataInicial(value: any) {
        setData_inicial(value.toISOString().substring(0, 10));
    }
    function handleChangeDataFinal(value: any) {
        setData_final(value.toISOString().substring(0, 10));
    }
}
