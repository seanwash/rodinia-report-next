import Link from "next/link";
import useUser from "../../hooks/useUser";
import useSignOut from "../../hooks/useLogout";
import { useRouter } from "next/router";

const Nav: React.FC = ({ children }) => <nav>{children}</nav>;

const UserMenu = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const mutation = useSignOut();

  const handleLogout = async () => {
    await mutation.mutate();
    await router.push("/");
  };

  if (isLoading) {
    return <Nav>...</Nav>;
  }

  return (
    <Nav>
      {user.isLoggedIn ? (
        <button
          disabled={mutation.isLoading}
          type="button"
          onClick={handleLogout}
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
