import { Metadata } from "next";
import { initValues } from "../constants/seo";

interface MetadataByPage {
  title?: string;
  description?: string;
  image?: string;
}

export function getMetadata(props: MetadataByPage = {}): Metadata {
  const {
    title = initValues.title,
    description = initValues.descriptionGeneral,
    image = initValues.image,
  } = props;

  const data = {
    title: title,
    description: description,
    authors: [{ name: "PonceGL", url: initValues.domain }],
    category: "Tegnología",

    twitter: {
      title: "@poncegl",
      card: "summary_large_image",
      description: description,
      images: image,
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
      title: title,
      description: description,
      url: initValues.domain,
      siteName: initValues.title,
      images: [
        {
          url: image,
          width: 375,
          height: 281,
          alt: `${title} image`,
        },
        {
          url: image,
          width: 375,
          height: 281,
          alt: `${title} image`,
        },
      ],
      locale: "es",
      type: "website",
    },
  };
  return data;
}
