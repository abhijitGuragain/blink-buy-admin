export interface IAuthState {
  token: string | null;
  role: "admin" | "seller" | null;
  isAuthenticated: boolean;
}
