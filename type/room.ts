import { User } from "./user";

export interface UserInfo {
  user: User;
  is_completed?: boolean; // Optional, default to false
  score?: number; // Optional, default to 10
  // completed_at?: string | null; // Uncommented this to match the commented line in Pydantic model
}

export interface RoomInfo {
  user_info: UserInfo[];
  owner_id: string;
  is_started?: boolean; // Optional, default to false
  start_time?: string; // Optional, default to empty string
  is_custom_question?: boolean; // Optional, default to false
  question_ids: string[];
  points?: number; // Optional, default to 10
  duration_in_seconds?: number; // Optional, default to 500
  room_name: string;
  description: string;
  // created_at?: string; // Uncommented this to match the commented line in Pydantic model
  is_ended?: boolean; // Optional, default to false
}
