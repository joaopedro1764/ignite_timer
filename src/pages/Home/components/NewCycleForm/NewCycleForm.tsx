import { useContext } from "react";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useFormContext } from "react-hook-form";
import { CycleContext } from "../../../../contexts/CycleContext";

export function NewCycleForm() {
  const { activeCycle } = useContext(CycleContext);

  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        list="task-suggestion"
        placeholder="Dê o nome para o seu projeto"
        id="task"
        {...register("task")}
        disabled={!!activeCycle}
      />
      <datalist id="task-suggestion">
        <option>Projeto 1</option>
        <option>Projeto 2</option>
        <option>Projeto 3</option>
        <option>Projeto 4</option>
      </datalist>
      <label htmlFor="minutesAmount">Durante</label>
      <MinutesAmountInput
        type="number"
        placeholder="00"
        id="minutesAmount"
        min={5}
        max={60}
        step={5}
        disabled={!!activeCycle}
        {...register("minutesAmount", { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </FormContainer>
  );
}
