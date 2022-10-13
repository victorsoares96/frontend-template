export type Parent = {
  title: string;
  path: string;
  more: {
    title: string;
    path: string;
  };
  tags: string[];
  products: string[];
  children: {
    subheader: string;
    items: {
      title: string;
      path: string;
    }[];
  }[];
};
