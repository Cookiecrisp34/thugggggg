import { ReactNode } from "react"
import { ArrayPath, FieldValues } from "react-hook-form";
import { useFieldArray } from "../../hooks/useFieldArray";

type FieldArrayReturn<TFieldValues extends FieldValues> = ReturnType<typeof useFieldArray<TFieldValues>>

type FieldArrayProps<TFieldValues extends FieldValues> = {
  name: ArrayPath<TFieldValues>
  children: (args: FieldArrayReturn<TFieldValues>) => ReactNode
}

/**
 * @deprecated
 */
export const FieldArray = <TFieldValues extends FieldValues>({ name, children }: FieldArrayProps<TFieldValues>) => {
  const fieldArray  = useFieldArray<TFieldValues>(name)

  return children(fieldArray)
}