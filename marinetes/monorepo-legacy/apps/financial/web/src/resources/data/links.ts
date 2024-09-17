import type { IconType } from 'react-icons';
import { FiHome, FiUsers } from 'react-icons/fi';
import { GiBroom } from 'react-icons/gi';
import { IoLogoBuffer } from 'react-icons/io';
import { MdRoomService } from 'react-icons/md';

export interface LinkType {
  href: string;
  title: string;
  employee?: true;
}

export interface LinkWithIconType extends LinkType {
  href: string;
  title: string;
  icon: IconType;
}

export const drawerLinks: LinkWithIconType[] = [
  {
    title: 'INÍCIO',
    href: '/app',
    icon: FiHome,
  },
  {
    title: 'DIARISTAS',
    href: '/diarists',
    icon: GiBroom,
    employee: true,
  },
  {
    title: 'USUÁRIOS',
    href: '/customers',
    icon: FiUsers,
    employee: true,
  },
  {
    title: 'LISTA DE SERVIÇOS',
    href: '/services',
    icon: MdRoomService,
    employee: true,
  },
  // {
  //   title: 'Financeiro',
  //   href: '/financial',
  //   icon: MdAttachMoney,
  //   employee: true,
  // },
  // {
  //   title: 'Usuários',
  //   href: '/employees',
  //   icon: FiUsers,
  //   employee: true,
  // },
  {
    title: 'LOGS',
    href: '/logs',
    icon: IoLogoBuffer,
    employee: true,
  },
];
