import { Anchor, DrawerProps, Group, Stack, Text } from '@mantine/core'
import cx from 'clsx'
import { ComponentType, ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CoreUiDivider } from '../core-ui-content'
import { CoreUiLogoType } from '../core-ui-logo'

import classes from './core-ui-navbar.module.css'

export interface CoreUiNavbarProps {
  base?: string
  drawerProps?: DrawerProps
  logo?: ReactNode
  logoSmall?: ReactNode
  linksTop?: CoreUiNavbarLink[]
  linksMiddle?: CoreUiNavbarLink[]
  linksBottom?: CoreUiNavbarLink[]
  opened?: boolean
  toggle?: () => void
}

export interface CoreUiNavbarLink {
  link: string
  label: string
  icon: ComponentType<{ size?: number; stroke?: number }>
}

export function CoreUiNavbar(props: CoreUiNavbarProps) {
  const opened = props.opened

  function close() {
    if (!opened || !props.toggle) return
    props.toggle()
  }

  return (
    <Stack gap="lg">
      <Group justify="center" py="md">
        <Anchor component={Link} to={props.base ?? '/'} display="flex">
          <CoreUiLogoType height={64} />
        </Anchor>
      </Group>
      {props.linksTop?.map(({ link, label, icon: Icon }) => (
        <CoreUiNavbarItem key={label} link={link} label={label} icon={Icon} close={close} />
      ))}
      {props.linksMiddle?.length ? <CoreUiDivider /> : null}
      {props.linksMiddle?.map(({ link, label, icon: Icon }) => (
        <CoreUiNavbarItem key={label} link={link} label={label} icon={Icon} close={close} />
      ))}
      {props.linksBottom?.length ? <CoreUiDivider /> : null}
      {props.linksBottom?.map(({ link, label, icon: Icon }) => (
        <CoreUiNavbarItem key={label} link={link} label={label} icon={Icon} close={close} />
      ))}
    </Stack>
  )
}

function CoreUiNavbarItem({ close, link, label, icon: Icon }: CoreUiNavbarLink & { close: () => void }) {
  const { pathname } = useLocation()
  return (
    <Anchor
      component={Link}
      key={label}
      to={link}
      size="xl"
      fw={500}
      className={cx(classes.link, { [classes.linkActive]: pathname.startsWith(link) })}
      onClick={close}
    >
      <Group>
        <Icon size={24} stroke={1.5} />
        <Text span c={pathname.startsWith(link) ? 'brand' : undefined}>
          {label}
        </Text>
      </Group>
    </Anchor>
  )
}
