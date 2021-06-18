import Link from "next/link";
import UserMenu from "./UserMenu";

const Header = () => (
  <div className="container mx-auto p-4">
    <div className="pb-4 border-b border-el-paso flex items-center justify-between">
      <h1 className="font-bold">
        <Link href="/">Rodinia Report</Link>
      </h1>

      <UserMenu />
    </div>
  </div>
);

export default Header;
