"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import ComboboxPerfil from "../_components/ComboboxPerfil"
import ComboboxPermission from "../_components/ComboboxPermission"
import { FastForward } from "lucide-react"

export default function Component() {
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [perfil, setPerfil] = useState({id:0, name:'', permissions:[]})
  const [permissions, setPermissions] = useState([])


  useEffect(() => {
    console.log(perfil)
    setPerfil(perfil)
  },[perfil])

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Gerenciar Permissão por Perfil</CardTitle>
        <CardDescription>Configura permissão buscando por perfil.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="profile">Selecione um Perfil</Label>
            <ComboboxPerfil setObjet={setPerfil} objeto={perfil}/>
          </div>
          <div>
            <Label htmlFor="search">Adicionar Permissão</Label>
            <div className="flex gap-2">
              <ComboboxPermission setObjet={setPermissions} objeto={permissions} />
              <Button title="Adicionar Permissão">
                <FastForward className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <Separator className="my-6" />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Modulo</TableHead>
              <TableHead>Permissao</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {perfil?.permissions.map((permission) => (
              <TableRow key={permission.id}>
                <TableCell className="font-medium">{permission.module.title}</TableCell>
                <TableCell>{permission.name}</TableCell>
                <TableCell className="text-right">
                  
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  )
}