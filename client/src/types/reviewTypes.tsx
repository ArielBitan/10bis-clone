export interface IReview {
  _id?: string;
  user_id: {
    _id: string;
    full_name: string;
  };
  restaurant_id: string;
  rating: number;
  comment: string;
  createdAt?: Date;
}
