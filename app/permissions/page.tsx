'use client'

import { CardContent } from "@/components/CardContent";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import FormRole from "./_components/FormRole";
import api from "@/lib/api";
import { useEffect, useState } from "react";
import AcoesRole from "./_components/AcoesRole";

export default function PermissonView() {
  const [perfis, setPerfis] = useState<any>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState<number>(1);
  const [isSubmit, setIsSubmit] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    obterPerfis();
  }, [page])

  async function obterPerfis() {
    await api.get(`/permissoes/role/?page=${page}&page_size=10`).then((response) => {
      setPerfis(response.data.roles)
      setTotal(response.data.total_records)
    })
  }
  return (
    <div className="grid w-full">
      <PageTitle title="Gestao de Permissao" />
      <section className="mt-3 transition-all p-2 rounded-md w-1/2">
        <CardContent>
          <div className="flex flex-row justify-between">
            <h3>Perfil</h3>
            <div>
              <FormRole open={open} id={0} />
              <Button variant={"outline"} type="button" size={"sm"} title="adicionar modulo"
                onClick={()=>setOpen(true)}
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  ID
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  NOME
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {perfis.map((perfil: any, i: number) => (
                <>
                  {i % 2 === 0 ?
                    (<tr key={i} className="bg-white">
                      <td className="p-3 text-sm text-gray-700 hover:cursor-pointer whitespace-nowrap">
                        <span className="font-bold text-blue-500 ">
                          {perfil.id}
                        </span>
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {perfil.name}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <AcoesRole id={perfil.id} />
                      </td>
                    </tr>) :
                    (<tr key={i} className="bg-gray-50">
                      <td className="p-3 text-sm text-gray-700 hover:cursor-pointer whitespace-nowrap">
                        <span className="font-bold text-blue-500 hover:underline">
                          {perfil.id}
                        </span>
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {perfil.name}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <AcoesRole id={perfil.id} />
                      </td>
                    </tr>)
                  }
                </>
              ))}
            </tbody>
          </table>
        </CardContent>
      </section>
    </div>
  );
}
