import { createContext, useContext } from "react";
import useFirebaseAuth, { FormattedUser } from "../../hooks/useFirebaseAuth";

interface AuthUserContextDefaultValues {
  authUser: FormattedUser | undefined;
  loading: boolean;
  signOut: () => void;
}

const AuthUserContext = createContext<AuthUserContextDefaultValues>({
  authUser: undefined,
  loading: true,
  signOut: async () => {},
});

interface AuthUserProviderProps {
  children: React.ReactNode;
}

export function AuthUserProvider({ children }: AuthUserProviderProps) {
  const auth = useFirebaseAuth();

  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  );
}

// custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(AuthUserContext);
