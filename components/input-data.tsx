import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import Calendar, { OnClickFunc } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { UseFormSetValue } from "react-hook-form";
/**
 * exemplo
 *  <InputDate name="data_temp" setValue={form.setValue} />
 * @param param0 
 * @returns 
 */
export default function InputDate({
  name,
  model,
  setValue,
  onClickDay
}: {
  name: string;
  model: any;
  setValue: any;
  onClickDay: OnClickFunc | undefined;
}) {
  //console.log(model)
  //console.log(model[name])
  const [field, setField] = useState(model && model[name] || '');
  const [objeto, setObjeto] = useState(model)
 useEffect(()=>{
    console.log(model);
    if(model && model[name]) {
      console.log(field)
      /* if(field){
        console.log(field);
        setObjeto({ ...model});
        setValue({...objeto});
      } */
      //setField(model[name])
    }
    //setValue(...model)
  }, [field])
  return (
    <Popover>
      <div className="flex gap-2">
        <PopoverTrigger asChild>
          <CalendarIcon className="ml-2 mt-2 h-6 w-6 opacity-50 hover:cursor-pointer" />
        </PopoverTrigger>
        <Input
          name={name}
          value={field && format(''+field, "dd-MM-yyyy")}
          size={8}
          placeholder="dd-mm-yyyy"
          onChange={(val) => {
            if (val.target.value?.length <= 10) {
              setField('');
              //setValue({ ...model, name: undefined })
              return;
            }
            if (val.target.value?.length === 0) {
              setField('');
              //setValue({ ...model, name: undefined })
              return;
            }
            setValue({ ...model, name: val });
          }}
          className={cn(
            "w-[110px] pl-3 text-left font-normal",
            !field && "text-muted-foreground",
          )}
        />
      </div>
      <PopoverContent className="w-auto p-0" align="start">
        {onClickDay ? (
          <Calendar
            onChange={(val) => {
              setField(''+val);
              //setValue({ ...model, name: val })
            }}
            onClickDay={onClickDay}
            value={field}
            locale="pt-BR"
            className={"shadow-2xl"}
          />
        ) : (
          <Calendar
            onChange={(val) => {
              console.log('aqui')
              setField(''+val);
              //setValue({ ...model, name: val })
            }}
            value={field}
            locale="pt-BR"
            className={"shadow-2xl"}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
