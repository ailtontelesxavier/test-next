"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import ComboboxPerfil from "../_components/ComboboxPerfil";
import ComboboxPermission from "../_components/ComboboxPermission";
import { FastForward } from "lucide-react";
import { AlertSuccess } from "@/components/AlertSuccess";
import { AlertDestructive } from "@/components/AlertDestructive";
import api from "@/lib/api";
import AlertDialogComp from "@/components/AlertDialog";

export default function GestaoPermissaoUser() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [perfil, setPerfil] = useState({ id: 0, name: "", permissions: [] });
  const [permission, setPermission] = useState({ id: 0 });

  useEffect(() => {
    console.log(perfil);
    setPerfil(perfil);
  }, [perfil]);

  async function addPermission() {
    console.log(permission);
    console.log(perfil);
    try {
      setLoading(true);
      await api
        .post("/permissoes/role-permission", {
          role_id: perfil.id,
          permission_id: permission.id,
        })
        .then((response: any) => {
          if (response.status === 201) {
            setSuccess("Cadastrado com sucesso");
            getPerfil();
          }
        })
        .catch((error) => setError("Error interno: " + error));
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.detail + "; " + error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function getPerfil() {
    try {
      setLoading(true);
      console.log(perfil.id)
      await api
        .get(`/permissoes/role/full/` + perfil.id)
        .then((response) => {
          console.log(response.data);
          setPerfil(response.data);
        }).catch((error) => {
          console.error("error interno", error);
        });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }
  async function deleteRolePermission(permissao: any) {
    try {
      console.log(perfil.id)
      console.log(permissao.id)
      await api
        .delete(`/permissoes/role-permission/role_by_permission/?role_id=${perfil.id}&permission_id=${permissao.id}`)
        .then((response: any) => {
          if (response.status === 200) {
            setSuccess("Excluido com sucesso");
            getPerfil();
          }
        })
        .catch((error) => setError("Error interno: " + error));
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.detail + "; " + error.message);
      }
    }
  }

  function limpar() {
    setPerfil({ id: 0, name: "", permissions: [] });
    setPermission({ id: 0 });
  }

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Gerenciar Perfil por Usuario</CardTitle>
        <CardDescription>
          Configura perfis por usuario.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="profile">Selecione um Perfil</Label>
            <ComboboxPerfil setObjet={setPerfil} objeto={perfil} />
          </div>
          <div>
            <Label htmlFor="search">Adicionar Permissão</Label>
            <div className="flex gap-2">
              <ComboboxPermission
                setObjet={setPermission}
                objeto={permission}
              />
              <Button
                title="Adicionar Permissão"
                disabled={perfil.id <= 0 || permission.length <= 0}
                onClick={() => addPermission()}
              >
                <FastForward className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <Separator className="my-6" />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Modulo</TableHead>
              <TableHead>Permissao</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {perfil?.permissions.map((permission) => (
              <TableRow key={permission.id}>
                <TableCell className="font-medium">{permission.id}</TableCell>
                <TableCell className="font-medium">
                  {permission.module.title}
                </TableCell>
                <TableCell>{permission.name}</TableCell>
                <TableCell className="text-right">
                  <AlertDialogComp
                        title="Tem certeza que deseja excluir?"
                        description=""
                        param={permission}
                        acao={deleteRolePermission}
                      />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-end justify-end">
          <Button type="button" variant={"secondary"} onClick={() => limpar()}>
            Limpar
          </Button>
        </div>
        <section className="w-full">
          {success && (
            <AlertSuccess setSuccess={setSuccess}>{success}</AlertSuccess>
          )}
          {error && (
            <AlertDestructive setError={setError}>{error}</AlertDestructive>
          )}
        </section>
      </CardFooter>
    </Card>
  );
}
