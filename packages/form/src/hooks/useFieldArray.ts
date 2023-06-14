import type { ReactNode } from 'react'
import type {
  ArrayPath,
  FieldArray,
  FieldValues,
  Validate,
} from 'react-hook-form'
import { useFieldArray as useFieldArrayHookForm } from 'react-hook-form'

type Options<TFieldValues extends FieldValues> = {
  validate?: Validate<FieldArray<TFieldValues>[], TFieldValues>
  subscription?: Record<string, boolean>
}

/**
 * @deprecated
 * @todo rename to useFieldArrayDeprecated
 */
export const useFieldArray = <
  T,
  TFieldValues extends FieldValues = FieldValues,
>(
  name: ArrayPath<TFieldValues>,
  options?: Options<TFieldValues>,
) => {
  const { fields, append, remove, update, move } =
    useFieldArrayHookForm<TFieldValues>({
      name,
      rules: { validate: options?.validate },
    })

  return {
    fields: {
      push: append,
      value: fields as T[],
      remove,
      update,
      // map: (callback: Parameters<typeof fields.map>[0]) => fields.map(callback),
      // eslint-disable-next-line @typescript-eslint/unbound-method
      map: (callback: (name: string, index: number) => ReactNode) =>
        fields.map((_field, index) => callback(`${name}[${index}]`, index)),
      move,
      length: fields.length,
    },
  }
}
