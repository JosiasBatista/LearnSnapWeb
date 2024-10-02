import { Dispatch, InputHTMLAttributes, SetStateAction } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelName?: string
  fieldRequired?: boolean,
  inputChange: (text: string) => void
}

export default function Input({labelName, fieldRequired, inputChange, ...props}: Readonly<InputProps>) {
  return (
    <div className="mb-2">
      {labelName && (
        <span className="text-lg font-[family-name:var(--font-cormorant)
        mb-2">
          {labelName + fieldRequired && '*'}
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