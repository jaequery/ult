// you can import this from any of the apps
// eg; import { SomeInterface } from '@shared/interfaces';
import { Post, PostComment, PostReaction, Role, User, Category } from "@prisma/client";

export interface UserById extends User {
  roles?: Role[];
}

export enum UserStatus {
  active,
  inactive,
}

export enum Roles {
  Admin = "Admin",
  User = "User",
}

export interface PostCommentWithUser extends PostComment {
  user: User; // Add the user field of type User
}

export interface PostById extends Post {
  user: UserById;
  category: Category | null;
  postReactions: PostReaction[];
  postComments: PostCommentWithUser[];
}
