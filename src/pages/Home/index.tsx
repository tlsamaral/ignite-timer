import { zodResolver } from "@hookform/resolvers/zod";
import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import * as zod from "zod";

import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";
import { Countdown } from "./components/Countdown";
import { NewCycleForm } from "./components/NewCycleForm";
import {
	HomeContainer,
	StartCountdownButton,
	StopCountdownButton,
} from "./styles";

// controlled / uncontrolled

/* function register(name: string) {
	return {
		onChange
		onBlur
		onFocus
	}
}
*/

/*
 * Prop drilling -> Quando temos MUITAS propriedades APENAS para a comunicação entre componentes
 * Context API -> Permite compartilhar informação entre VÁRIOS componentes
 */

const newCycleFormValidationSchema = zod.object({
	task: zod.string().min(1, "Informe a tarefa"),
	minutesAmount: zod.number().min(1).max(60),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;
export function Home() {
	const { createNewCycle, interruptCurrentCycle, activeCycle } =
		useContext(CyclesContext);
	const newCycleForm = useForm<NewCycleFormData>({
		resolver: zodResolver(newCycleFormValidationSchema),
		defaultValues: {
			task: "",
			minutesAmount: 0,
		},
	});

	const { handleSubmit, watch, reset } = newCycleForm;

	function handleCreateNewCycle(data: NewCycleFormData) {
		createNewCycle(data);
		reset();
	}

	const task = watch("task");
	const isSubmitDisabled = !task;

	return (
		<HomeContainer>
			<form onSubmit={handleSubmit(handleCreateNewCycle)}>
				<FormProvider {...newCycleForm}>
					<NewCycleForm />
				</FormProvider>
				<Countdown />
				{activeCycle ? (
					<StopCountdownButton type="button" onClick={interruptCurrentCycle}>
						<HandPalm size={24} />
						Interromper
					</StopCountdownButton>
				) : (
					<StartCountdownButton type="submit" disabled={isSubmitDisabled}>
						<Play size={24} />
						Comerçar
					</StartCountdownButton>
				)}
			</form>
		</HomeContainer>
	);
}
