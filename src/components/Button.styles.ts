import styled from "styled-components";

export type ButtonVariants = "primary" | "secondary" | "danger" | "sucess";
interface ButtonContainerProps {
	variant: ButtonVariants;
}
export const ButtonContainer = styled.button<ButtonContainerProps>`
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 0.25rem;
    border: none;

    background-color: ${(props) => props.theme["green-500"]};
    color: ${(props) => props.theme.white};
`;
