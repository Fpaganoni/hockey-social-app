export interface Story {
  id: string;
  userId: string;
  imageUrl: string;
  text: string;
  createdAt: string;
  viewsCount: number;
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
}
