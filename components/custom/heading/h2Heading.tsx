import { HeadingProps } from "@/app/types";

const H2Heading = ({ title, subtitle, centered }: HeadingProps) => {
  return (
    <div>
      <h2
        className={`scroll-m-20 text-3xl md:text-4xl font-semibold tracking-tight transition-colors first:mt-0 leading-[120%] ${
          centered ? "text-center" : ""
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`leading-7 [&:not(:first-child)]:mt-3 ${
            centered ? "text-center" : ""
          } `}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default H2Heading;
