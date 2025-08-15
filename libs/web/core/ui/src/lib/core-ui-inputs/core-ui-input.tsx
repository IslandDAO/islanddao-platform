import { TextInput, TextInputProps } from '@mantine/core'

export function CoreUiInput({ ...props }: TextInputProps) {
  return <TextInput styles={{ input: { border: 'none' } }} {...props} />
}
