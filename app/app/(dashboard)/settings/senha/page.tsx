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
import api from "@/lib/api";
import { AlertSuccess } from "@/components/AlertSuccess";
import { AlertDestructive } from "@/components/AlertDestructive";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Page() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");


    return (
        <Card className="w-full max-w-4xl">
            <CardHeader>
                <CardTitle>Gerenciar Senha</CardTitle>
                <CardDescription>
                    Altera senha de usuario logado
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="profile">Selecione um Perfil</Label>
                    </div>
                    <div>
                        <Label htmlFor="search">Adicionar Permissão</Label>
                        <div className="flex gap-2">

                        </div>
                    </div>
                </div>

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
        </Card>);

}