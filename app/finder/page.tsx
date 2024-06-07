import SectionLayout from "@/components/custom/sectionLayout";
import SearchMerged from "@/blocks/searchMerged";

export default function Finder() {
  return (
    <main>
      <SectionLayout bgColor="white">
        <SearchMerged showResults={true} />
      </SectionLayout>
    </main>
  );
}
