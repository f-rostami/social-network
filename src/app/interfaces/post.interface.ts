import { IComment } from "./comment.interface";

export interface IPost {
  id?: number,
  username?: string,
  imageUrl: string,
  text: string,
  likes: any[],
  comments: IComment[]
}
