import * as CheckBox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const availableWeekDays = [
  "Domingo",
  "Segunda-Feira",
  "Terça-Feira",
  "Quarta-Feira",
  "Quinta-Feira",
  "Sexta-Feira",
  "Sábado",
];

export function NewHabitForm() {
  const [ title, setTitle] = useState('')
  const [ weekDays, setWeekDays] = useState<number[]>([])

  async function createNewHabit(event: FormEvent) {
      event.preventDefault();
      console.log(title, weekDays)

      if(!title || weekDays.length === 0) { return }

      await api.post('habits', {
        title,
        weekDays,
      })

      setTitle('')
      setWeekDays([])

      alert('Hábito criado com sucesso!!')
  }

  function handleToggleWeekDay(weekday: number) {
    if(weekDays.includes(weekday)) {
      const weekDaysWithRemovedOne = weekDays.filter(day => day !== weekday)
      
      setWeekDays(weekDaysWithRemovedOne)
    } else {
      const weekDaysWithAddedOne = [...weekDays, weekday]

      setWeekDays(weekDaysWithAddedOne)
    }
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>
      <input
        type="text"
        id="title"
        placeholder="Ex.: Excercícios, Dormir bem, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400
                    focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
        autoFocus
        value={title}
        onChange={event => setTitle(event.target.value)}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a Recorrência?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {availableWeekDays.map((weekday, index) => {
          return (
            <CheckBox.Root 
              key={weekday} 
              className="flex items-center gap-3 group focus:outline-none"
              checked={weekDays.includes(index)}
              onCheckedChange={() => {
                handleToggleWeekDay(index);
              }}
            >
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 
                            group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-all
                            group-focus:outline-none group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-zinc-900">
                <CheckBox.Indicator>
                  <Check size={20} className="text-white font-semibold " />
                </CheckBox.Indicator>
              </div>

              <span className="text-white leading-tight">{weekday}</span>
            </CheckBox.Root>
          );
        })}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 gap-3 flex items-center justify-center font-semibold bg-green-600 hover:bg-green-500 transition-colors
                    focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
}
