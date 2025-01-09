import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Cycle, cyclesReducer } from "../reducers/Cycle/reducer";
import {
  ActionTypes,
  addNewCycleAction,
  interruptCycleAsFinishedAction,
  markCurrentCycleAsFinishedAction,
} from "../reducers/Cycle/action";

interface NewCycleData {
  task: string;
  minutesAmount: number;
}

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinish: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCyclce: (data: NewCycleData) => void;
  interruptCurrentCycle: () => void;
}

interface CyclesContextProvidersProps {
  children: ReactNode;
}

export const CycleContext = createContext({} as CyclesContextType);

export function CycleContextProvider({
  children,
}: CyclesContextProvidersProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedStateAsJson = localStorage.getItem(
        "@ignite-timer:cycles-state-1.0.0"
      );

      if (storedStateAsJson) {
        return JSON.parse(storedStateAsJson);
      }
    }
  );

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);

    localStorage.setItem("@ignite-timer:cycles-state-1.0.0", stateJSON);
  }, [cyclesState]);

  const [amountSecondsPassed, setAmountSecondPassed] = useState(0);

  function setSecondsPassed(seconds: number) {
    setAmountSecondPassed(seconds);
  }

  function markCurrentCycleAsFinish() {
    dispatch(markCurrentCycleAsFinishedAction());
  }

  function interruptCurrentCycle() {
    dispatch(interruptCycleAsFinishedAction());
  }

  function createNewCyclce(data: NewCycleData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    dispatch(addNewCycleAction(newCycle));
    setAmountSecondPassed(0);
  }

  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrentCycleAsFinish,
        setSecondsPassed,
        createNewCyclce,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
}
