export interface User {
  id: string;
  user_name: string | null;
  display_picture: string | null;
  total_coins: number;
  current_streak: number;
  // joined_on: Date | null; TODO: add this back
}
