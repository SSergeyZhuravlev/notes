import { FC } from "react";

interface IErrorProps {
    message?: string,
}

export const Error: FC<IErrorProps> = ( { message } ) => {
    return (
        <div>
            <span className="form-field__error-text">{message}</span>
        </div>
    )
}