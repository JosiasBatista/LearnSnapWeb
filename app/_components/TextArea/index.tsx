import { TextareaHTMLAttributes } from "react"

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelName?: string
  fieldRequired?: boolean,
  inputChange: (text: string) => void
}

export default function TextArea({labelName, fieldRequired, inputChange, ...props}: Readonly<TextAreaProps>) {
  return (
    <div className="mb-2 flex flex-col">
      {labelName && (
        <span className="font-[family-name:var(--font-cormorant)] font-semibold text-base mb-2">
          {labelName}
        </span>
      )}

      <textarea
        placeholder={props.placeholder}
        required={!!fieldRequired}
        onChange={(e) => inputChange(e.target.value)}
        className="bg-dark_gray rounded-lg w-64 p-2"
        {...props}
      />
    </div>
  )
}