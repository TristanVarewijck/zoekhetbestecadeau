const uspsContent = [
  {
    icon: "👣",
    title: "Vind je cadeau in 5 stappen.",
  },
  {
    icon: "🔍",
    title: "Zoek gericht naar cadeaus.",
  },
  {
    icon: "🎯",
    title: "Geef altijd een origineel cadeau.",
  },
];

const Usps = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-5 w-full justify-center">
      {uspsContent.map((usps) => (
        <div key={usps.title} className="flex items-center flex-col gap-2">
          <span className="text-4xl mr-4">{usps.icon}</span>
          <p className=" text-center">{usps.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Usps;
