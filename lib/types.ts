export type BlogItemType = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
  location: string;
  isProfile?: boolean;
};

export type UserItemType = {
  id: string;
  name: string;
  email: string;
  blogs: BlogItemType[];
  _count: { blogs: number };
  message: string;
};
