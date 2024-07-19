import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "5mincode", path: "/home" },
  { name: "About", path: "/about" },
  { name: "Leaderboard", path: "/leaderboard" },
  { name: "FAQs", path: "/support" },
];

const Menu = () => {
  const isActive = (pathName: string) => usePathname() === pathName;

  return (
    <div className="border-2 border-black p-4">
      {menuItems.map((item) => (
        <Link href={item.path}>
          <h1
            key={item.path}
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
