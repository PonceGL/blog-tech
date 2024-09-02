import { Metadata } from "next";

export const LOGO =
  "https://res.cloudinary.com/duibtuerj/image/upload/v1672858514/PonceGL/brand/ydkxhruq2ixgoapnxca1.png";

export const initValues = {
  title: "PonceGL",
  domain: "https://poncegl.vercel.app/",
  image:
    "https://res.cloudinary.com/duibtuerj/image/upload/v1672861703/PonceGL/brand/bwaz7gaembwppfhdnwaj.jpg",
  descriptionGeneral:
    "Soy Ponce, un desarrollador con JavaScript, me gusta compartir lo que voy aprendiendo, me sirve como registro y tu puedes aprender.",
  descriptionAboutMe:
    "Soy Ponce desarrollo con JavaScript y en esta página te hablo mas sobre mi",
  descriptionBlog:
    "Aprende a crear sitios y aplicaciones modernas y atractivas con nuestras guías detalladas y tutoriales fáciles de seguir en la categoría especifica de tu interés.",
  descriptionCategory: (category: string) =>
    `¡Dominar ${category} nunca ha sido tan fácil! Descubre los mejores trucos, técnicas y recursos en nuestro blog especializado. Aprende a crear aplicaciones de vanguardia y sitios web interactivos con nuestros tutoriales fáciles de seguir en la categoría de ${category}.`,
};

export const metaDataInit: Metadata = {
  title: initValues.title,
  description: initValues.descriptionGeneral,
  authors: [{ name: "PonceGL", url: initValues.domain }],
  category: "Programming",

  twitter: {
    title: "@poncegl",
    card: "summary_large_image",
    description: initValues.descriptionGeneral,
    images: initValues.image,
    site: "poncegl",
    creator: "PonceGL",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    userScalable: false,
  },
  icons: {
    icon: "https://res.cloudinary.com/duibtuerj/image/upload/v1672705213/PonceGL/brand/s3j4fgiolnajjpsfagrc.ico",
    apple:
      '"https://res.cloudinary.com/duibtuerj/image/upload/v1672705213/PonceGL/brand/s3j4fgiolnajjpsfagrc.ico"',
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    title: initValues.title,
    description: initValues.descriptionGeneral,
    url: initValues.domain,
    siteName: initValues.title,
    images: [
      {
        url: initValues.image,
        width: 375,
        height: 281,
        alt: `${initValues.title} image`,
      },
      {
        url: initValues.image,
        width: 375,
        height: 281,
        alt: `${initValues.title} image`,
      },
    ],
    locale: "es",
    type: "website",
  },
};
