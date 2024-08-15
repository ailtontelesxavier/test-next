'use client';
import api from "@/lib/api";
import { useState, useEffect } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { Icons } from "@/components/icons";
import AlertDialogComp from "@/components/AlertDialog";
import { PaginationActionsApi } from "@/components/paginationActionsApi";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

export default function NegociacaoView() {
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState(false);
    const [negociacaoList, setNegociacaoList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isBusca, setIsBusca] = useState(true);

    useEffect(() => {
        if(isBusca) getNegociacoes();
        setIsBusca(false);
        
        async function getNegociacoes() {
            try {
                setLoading(true);
                await api
                    .get(`/juridico/negociacao?searchTerm=${searchTerm}&page=${page}&page_size=10`)
                    .then((response) => {
                        console.log(response.data.rows);
                        setNegociacaoList(response.data.rows);
                        setTotal(response.data.total_records)
                    }).catch((error) => {
                        console.error("error interno", error);
                    });
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        }
    }, [page, isBusca, searchTerm])

    function handleInputChange(e: any) {
        setSearchTerm(e.target.value);   
    }


    async function deleteNegociacao(obj: any) {
        /* try {
          console.log(perfil.id)
          console.log(obj.id)
          await api
            .delete(`/users/user-role/?user_role_id=${obj.id}`)
            .then((response: any) => {
              if (response.status === 200) {
                setSuccess("Excluido com sucesso");
                getPerfis();
              }
            })
            .catch((error) => setError("Error interno: " + error));
        } catch (error: any) {
          if (error.response) {
            setError(error.response.data.detail + "; " + error.message);
          }
        } */
    }

    function filtrar() {
        setIsBusca(true);
        setPage(1);
    }
    function setPagina(valor: number) {
        setPage(valor);
        setIsBusca(true);
    }
    return (
        <Card className="w-full max-w-4xl">
            <CardHeader>
                <CardTitle>Gerenciar Negociação</CardTitle>
                <CardDescription>
                    {loading && (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                />
                <Button onClick={() => filtrar()} variant={"outline"} title="busca">
                    <SearchIcon className="h-4 w-4"/>
                </Button>
                <Separator className="my-6" />
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Processo</TableHead>
                            <TableHead>Executado</TableHead>
                            <TableHead>Contrato</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {negociacaoList?.map((negociacao) => (
                            <TableRow key={negociacao.id}>
                                <TableCell className="font-medium">{negociacao.id}</TableCell>
                                <TableCell className="font-medium">
                                    {negociacao.processo}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {negociacao.executado}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {negociacao.contrato}
                                </TableCell>
                                <TableCell className="text-right">
                                    <AlertDialogComp
                                        title="Tem certeza que deseja excluir?"
                                        description=""
                                        param={negociacao}
                                        acao={deleteNegociacao}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <section>
                    <PaginationActionsApi
                        itensPerPage={10}
                        count={total}
                        setPageIndex={setPagina}
                        pageIndex={page}
                    />
                </section>
            </CardContent>
        </Card>
    )
}