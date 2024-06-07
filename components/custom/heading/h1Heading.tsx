import { HeadingProps } from "@/app/types";

const H1Heading = ({ title, subtitle, centered }: HeadingProps) => {
  return (
    <div>
      <h1
        className={`scroll-m-20 text-4xl md:text-5xl font-semibold tracking-tight leading-[125%]
          ${centered ? "text-center" : ""}`}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          className={`leading-7 [&:not(:first-child)]:mt-6 font-medium
        ${centered ? "text-center" : ""}    
      `}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default H1Heading;
