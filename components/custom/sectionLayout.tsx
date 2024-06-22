interface SectionLayoutProps {
  children: React.ReactNode;
  bgColor: "white" | "gray";
  centered?: boolean;
  position?: number;
}

const SectionLayout = ({
  children,
  bgColor,
  centered,
  position,
}: SectionLayoutProps) => {
  const backgroundStyle = {
    backgroundImage: "radial-gradient(circle, #C4C4C4 2px, transparent 2px)",
    backgroundSize: "40px 40px",
  };

  return (
    <section
      className={`${
        bgColor === "white" ? "bg-white" : "bg-gray-100 bg-fixed"
      } w-full`}
      style={bgColor === "gray" ? backgroundStyle : {}}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 ${
          centered && `flex flex-col justify-center md:-translate-y-${position}`
        }`}
      >
        {children}
      </div>
    </section>
  );
};

export default SectionLayout;
