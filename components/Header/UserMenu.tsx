// noinspection HtmlUnknownTarget

import Link from "next/link";
import { useAuth } from "../../contexts/AuthUser";

const Nav: React.FC = ({ children }) => <nav>{children}</nav>;

const UserMenu = () => {
  const { authUser, loading, signOut } = useAuth();

  if (loading) {
    return <Nav>...</Nav>;
  }

  return (
    <Nav>
      {authUser ? (
        <button type="button" onClick={signOut}>
          Sign Out
        </button>
      ) : (
        <>
          <Link href="/signin">Sign In</Link>
        </>
      )}
    </Nav>
  );
};

export default UserMenu;
