import { Prisma } from '@prisma/client'

export const provisionCommunities: Prisma.CommunityCreateInput[] = [
  {
    id: 'pubkey',
    avatarUrl: 'https://avatars.githubusercontent.com/u/125477168?v=4',
    name: 'PubKey',
    homeServerId: '1083213946078625853',
    managers: { create: { userId: 'beeman.dev', admin: true } },
  },
  {
    id: 'islanddao',
    name: `IslandDAO`,
    homeServerId: '1187522687531233381',
    avatarUrl: 'https://avatars.githubusercontent.com/u/62788872?v=4',
    managers: { create: [{ userId: 'beeman.dev', admin: true }] },
  },
  {
    id: 'gibwork',
    name: `Gib Work`,
    avatarUrl: 'https://pbs.twimg.com/profile_images/1701414895613255680/xqejQpDn_400x400.jpg',
    managers: { create: { userId: 'beeman.dev', admin: true } },
  },
]
