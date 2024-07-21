import { HeadingProps } from "@/types/types";

const H1Heading = ({ title, subtitle, centered }: HeadingProps) => {
    return (
        <div className="mt-8 lg:mt-10">
            <h1
                className={`scroll-m-20 text-4xl md:text-5xl font-bold tracking-tight leading-[125%] font-display
          ${centered ? "text-center" : ""}`}
            >
                {title}
            </h1>
            {subtitle && (
                <p
                    className={`leading-7 [&:not(:first-child)]:mt-3 lg:[&:not(:first-child)]:mt-4 text-lg font-semibold 
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
