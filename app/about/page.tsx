"use client";

import CustomButton from "@/components/CustomButton";
import Menu from "@/components/Menu";

// const menuItems = [
//   { name: "5mincode", path: "/home" },
//   { name: "About", path: "/about" },
//   { name: "Rank", path: "/rank" },
//   { name: "FAQs", path: "/support" },
// ];

const About = () => {
  return (
    <div className="h-screen flex justify-between">
      {/* Section 1 */}
      <div className="px-24 pt-24">
        {/* Heading  */}
        <header>
          <div className="w-14 h-14 bg-black mb-8"></div>
          <div className="font-kronaOne text-6xl leading-tight">About</div>
        </header>
        {/* Content  */}
        <div className="m-8 2xl:w-1/3 sm:min-w-min text-3xl font-judson">
          <p className="mb-8">
            Lorem ipsum dolor sit amet consectetur. Quisque lectus vitae
            faucibus varius.
          </p>
          <p className="mb-8">
            Amet ullamcorper eros bibendum nulla at. Luctus tincidunt montes in
            volutpat mi risus. Libero urna mattis lobortis pulvinar lectus.
          </p>
          <p>Libero urna mattis lobortis pulvinar lectus.</p>
        </div>
      </div>
      <div className="absolute right-24 top-24">
        <Menu />
      </div>
      <div className="flex flex-col min-w-max items-end justify-end py-24 pr-24">
        {/* <div className="border-2 border-black p-4">
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
        </div> */}
        <CustomButton name="Learn more" />
      </div>
    </div>
  );
};

export default About;
