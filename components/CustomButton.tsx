import { ButtonProps } from "@/type/button";

const CustomButton = ({
  name,
  onClick,
  showLoading,
  customClass,
}: ButtonProps) => {
  return (
    <button
      className={`py-4 px-16 border-2
        border-black shadow-custom 
        hover:shadow-hover hover:translate-x-0.5 hover:translate-y-0.5 
        font-kronaOne text-2xl ${customClass}`}
      onClick={onClick}
      disabled={showLoading}
    >
      {!showLoading ? (
        name
      ) : (
        <svg className="h-12 w-12 animate-spin" viewBox="0 0 100 100">
          <circle
            fill="none"
            stroke-width="10"
            className="stroke-current opacity-5"
            cx="50"
            cy="50"
            r="40"
          />
          <circle
            fill="none"
            stroke-width="10"
            className="stroke-current"
            stroke-dasharray="250"
            stroke-dashoffset="210"
            cx="50"
            cy="50"
            r="40"
          />
        </svg>
      )}
    </button>
  );
};

export default CustomButton;
