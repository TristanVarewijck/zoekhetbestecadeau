import { HeadingProps } from "@/app/types";

const H3Heading = ({ title, subtitle, centered }: HeadingProps) => {
  return (
    <div>
      <h3
        className={`scroll-m-20 text-2xl font-semibold tracking-tight
        ${centered ? "text-center" : ""}
      `}
      >
        {title}
      </h3>

      {subtitle && (
        <p
          className={`leading-7 text-sm md:text-base [&:not(:first-child)]:mt-3
          ${centered ? "text-center" : ""}
        `}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default H3Heading;
