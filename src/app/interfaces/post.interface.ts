import { IComment } from "./comment.interface";

export interface IPost {
  username?: string,
  imageUrl: string,
  text: string,
  likes: [],
  comments: IComment[]
}
