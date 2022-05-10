export interface TheNavItem {
  label: string,
  href: string,
}

export interface TheNavBar {
  photoURL: string,
  title?: string,
  navItems: TheNavItem[]
}

export interface NavBarProps {
  props: TheNavBar
}

const theNavItems:TheNavItem[] = [
    {
      label: 'My NFTs',
      href: '/'
    },
    {
      label: 'Create NFT',
      href: '/createNFT',
    },
    {
      label: 'List of NFTs',
      href: '/nftList',
    },
  ];

  const theNavItemsES:TheNavItem[] = [
    {
      label: 'Crea tu NFT',
      href: '/es/createNFT',
    },
    {
      label: 'Lista de NFTs',
      href: '/es/listaNFTs',
    }
  ];

  export const theNavBar:TheNavBar = {
    photoURL: 'https://i.ibb.co/3kmQ59f/memoji-guino.webp',
    title: '',
    navItems: theNavItems,
  }; // Usamos esta para la pagina en ingles.

  export const theNavBarES:TheNavBar = {
    photoURL: 'https://i.ibb.co/3kmQ59f/memoji-guino.webp',
    title: '',
    navItems: theNavItemsES,
  }; // Usamos esta para la pagina en español.