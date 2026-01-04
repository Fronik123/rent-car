import { AuthError, Session, User } from "@supabase/supabase-js";

export interface IAuthResult {
  user: User | null;
  session: Session | null;
  error: AuthError | null;
}
