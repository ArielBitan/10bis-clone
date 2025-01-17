export interface IReview {
  _id?: string;
  user_id: string;
  restaurant_id: string;
  rating: number;
  comment: string;
  createdAt?:Date;
}
