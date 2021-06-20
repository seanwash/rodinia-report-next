import Link from "next/link";
import useUser from "../../hooks/useUser";
import useSignOut from "../../hooks/useLogout";

const Nav: React.FC = ({ children }) => <nav>{children}</nav>;

const UserMenu = () => {
  const { user, isLoading } = useUser();
  const mutation = useSignOut();

  if (isLoading) {
    return <Nav>...</Nav>;
  }

  return (
    <Nav>
      {user.isLoggedIn ? (
        <button
          disabled={mutation.isLoading}
          type="button"
          onClick={() => mutation.mutate()}
        >
          Sign Out
        </button>
      ) : (
        <>
          <Link href="/login">Log In</Link> /{" "}
          <Link href="/signup">Sign Up</Link>
        </>
      )}
    </Nav>
  );
};

export default UserMenu;
