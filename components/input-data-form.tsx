import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Button } from "./ui/button";
import React from "react";

export default function InputDateForm({
  field,
  onClickDay,
}: {
  field: any;
  onClickDay: any | undefined;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[160px] pl-3 text-left font-normal",
            !field.value && "text-muted-foreground"
          )}
        >
          {field.value ? (
            format(field.value, "dd-MM-yyyy")
          ) : (
            <span>dd-MM-yyyy</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        {onClickDay ? (
          <Calendar
            onChange={field.onChange}
            onClickDay={onClickDay}
            value={field.value}
            locale="pt-BR"
            className={"shadow-2xl"}
          />
        ) : (
          <Calendar
            onChange={field.onChange}
            value={field.value}
            locale="pt-BR"
            className={"shadow-2xl"}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
