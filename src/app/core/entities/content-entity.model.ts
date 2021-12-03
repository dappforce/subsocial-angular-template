export interface ContentEntity {
  id: string;
  body: string;
  canonical: string;
  image: string;
  tags: Array<string>;
  title: string;
  summary: string;
  isShowMore: boolean;
  name: string;
  avatar: string;
  link?: string;
}
