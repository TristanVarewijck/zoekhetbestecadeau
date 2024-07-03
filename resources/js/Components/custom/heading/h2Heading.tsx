import { HeadingProps } from "@/types/types";

const H2Heading = ({ title, subtitle, centered }: HeadingProps) => {
    return (
        <div>
            <h2
                className={`scroll-m-20 text-3xl md:text-4xl font-bold tracking-tight transition-colors first:mt-0 leading-[120%] font-display ${
                    centered ? "text-center" : ""
                }`}
            >
                {title}
            </h2>

            {subtitle && (
                <p
                    className={`leading-7 [&:not(:first-child)]:mt-2 lg:[&:not(:first-child)]:mt-3 ${
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
