import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Menu = () => {
  const pathname = usePathname();
  const { user } = useAuth();

  const menuItems = [
    user
      ? { name: "Profile", path: "/dashboard" }
      : { name: "5mincode", path: "/" },
    { name: "About", path: "/about" },
    { name: "Rank", path: "/rank" },
    { name: "FAQs", path: "/support" },
  ];

  const isActive = (pathName: string) => {
    return pathname === pathName;
  };

  return (
    <div className="border-2 border-black p-8">
      {menuItems.map((item) => (
        <Link key={item.path} href={item.path}>
          <h1
            className={`text-6xl font-judson text-right m-4 ${
              isActive(item.path)
                ? "text-black hover:underline"
                : "text-gray-300 hover:text-black"
            }`}
          >
            {`${item.name} ${isActive(item.path) ? `•` : ``}`}
          </h1>
        </Link>
      ))}
    </div>
  );
};

export default Menu;
