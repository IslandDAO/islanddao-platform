import { DateInput, DateInputProps } from '@mantine/dates'
import { IconCalendarMonth } from '@tabler/icons-react'
import { useRef } from 'react'

export function CoreUiDateInput({ ...props }: DateInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <DateInput
      ref={inputRef}
      styles={{ input: { border: 'none' } }}
      rightSection={<IconCalendarMonth onClick={() => inputRef.current?.focus()} style={{ cursor: 'pointer' }} />}
      {...props}
    />
  )
}
