"use client";

import CustomButton from "@/component/CustomButton";
import Menu from "@/component/Menu";

const Support = () => {
  return (
    <div className="h-screen flex justify-between">
      {/* Section 1 */}
      <div className="px-24 pt-24">
        {/* Heading  */}
        <header>
          <div className="w-14 h-14 bg-black mb-8"></div>
          <div className="font-kronaOne text-6xl leading-tight">FAQs</div>
        </header>
        {/* Content  */}
        <div className="m-8 2xl:w-1/2 sm:min-w-min text-3xl font-judson">
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
      <div className="flex flex-col justify-between py-24 pr-24">
        <Menu />
        <CustomButton name="Feedback" />
      </div>
    </div>
  );
};

export default Support;
