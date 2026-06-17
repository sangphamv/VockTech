import marioImage from "../assets/authors/mario.webp";

export interface Props {
  name: string;
  slug: string;
  image: string | ImageMetadata;
  bio: string;
}

export type Author = Props;

export const authors: Props[] = [
  {
    name: "Sang Pham",
    slug: "sang-pham",
    image: marioImage,
    bio: "Sang Phạm là một kỹ sư phần mềm có nhiều kinh nghiệm trong việc phát triển web.",
  },
];
