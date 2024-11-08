import { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelName?: string
  fieldRequired?: boolean,
  inputChange: (text: string) => void
}

export default function Input({labelName, fieldRequired, inputChange, ...props}: Readonly<InputProps>) {
  return (
    <div className="mb-2 flex flex-col">
      {labelName && (
        <span className="font-[family-name:var(--font-cormorant)] font-semibold text-base mb-2">
          {labelName}
        </span>
      )}

      <input
        placeholder={props.placeholder}
        required={!!fieldRequired}
        onChange={(e) => inputChange(e.target.value)}
        className="bg-dark_gray rounded-lg h-11 w-64 p-2"
        {...props}
      />
    </div>
  )
}