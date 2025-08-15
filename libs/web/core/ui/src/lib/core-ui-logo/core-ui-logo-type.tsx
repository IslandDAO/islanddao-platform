import { Image } from '@mantine/core'
import { HTMLAttributes } from 'react'

export interface CoreUiLogoTypeProps extends HTMLAttributes<HTMLImageElement> {
  height?: number
  src?: string
}
export function CoreUiLogoType({ height, src = '/assets/logo-light.png', ...props }: CoreUiLogoTypeProps = {}) {
  return <Image src={src} h={height} {...props} />
}
