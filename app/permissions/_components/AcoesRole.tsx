import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function AcoesRole({ id }: { id: number }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectOption, setSelectOption] = useState("");
    const [user, setUser] = useState<any>({});

    function hangleOnValueChange(value: string) {
        setSelectOption(value);
    }

    function openModal() {
        if (selectOption) {
            setModalIsOpen(true);
        }
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    return (
        <>
            <Select onValueChange={(value) => hangleOnValueChange(value)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="ações" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Acoes</SelectLabel>
                        <SelectItem value="1">Editar</SelectItem>
                        <SelectItem value="2">Excluir</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    )
}