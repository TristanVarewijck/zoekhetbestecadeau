import H1Heading from "@/components/custom/heading/h1Heading";
import H2Heading from "@/components/custom/heading/h2Heading";
import SectionLayout from "@/components/custom/sectionLayout";

import { ProductProps } from "./types";
import PopularProducts from "@/blocks/popularProducts";
import Usps from "@/blocks/usps";
import SearchMerged from "@/blocks/searchMerged";

// example products
const fakeTestProductsArray: ProductProps[] = [
  {
    id: "1",
    url: "https://www.amazon.com",
    image: "https://via.placeholder.com/300x200",
    title: "Amazon Echo",
    description: "A smart speaker with Alexa",
    price: 99.99,
  },
  {
    id: "2",
    url: "https://www.amazon.com",
    image: "https://via.placeholder.com/300x200",
    title: "Amazon Echo",
    description: "A smart speaker with Alexa",
    price: 99.99,
  },
  {
    id: "3",
    url: "https://www.amazon.com",
    image: "https://via.placeholder.com/300x200",
    title: "Amazon Echo",
    description: "A smart speaker with Alexa",
    price: 99.99,
  },
  {
    id: "4",
    url: "https://www.amazon.com",
    image: "https://via.placeholder.com/300x200",
    title: "Amazon Echo",
    description: "A smart speaker with Alexa",
    price: 99.99,
  },
  {
    id: "5",
    url: "https://www.amazon.com",
    image: "https://via.placeholder.com/300x250",
    title: "Amazon Echo",
    description: "A smart speaker with Alexa",
    price: 99.99,
  },
  {
    id: "6",
    url: "https://www.amazon.com",
    image: "https://via.placeholder.com/300x250",
    title: "Amazon Echo",
    description: "A smart speaker with Alexa",
    price: 99.99,
  },
  {
    id: "7",
    url: "https://www.amazon.com",
    image: "https://via.placeholder.com/300x250",
    title: "Amazon Echo",
    description: "A smart speaker with Alexa",
    price: 99.99,
  },
];

export default function Home() {
  return (
    <main>
      <SectionLayout bgColor="gray" centered>
        <div className="mt-10 md:mt-0">
          <H1Heading
            title="Zoek het beste cadeau in een paar klikken."
            subtitle="Wij zoeken elke dag opnieuw naar nieuwe cadeau ideeën! 🔎"
            centered
          />
          {/* <SearchCta /> */}
          <SearchMerged showResults={false} />
          <Usps />
        </div>
      </SectionLayout>

      <SectionLayout bgColor="white">
        <H2Heading title="Populaire cadeaus" centered />
        <div className="space-y-8 mt-6">
          <PopularProducts productsArray={fakeTestProductsArray} />
          <PopularProducts productsArray={fakeTestProductsArray} />
        </div>
      </SectionLayout>
    </main>
  );
}
