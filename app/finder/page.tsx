import SectionLayout from "@/components/custom/sectionLayout";
import SearchMerged from "@/blocks/searchMerged";

export default function Finder() {
  return (
    <main>
      <SectionLayout bgColor="white" centered>
        <div className="mt-10 md:mt-0">
          <SearchMerged showResults={true} />
        </div>
      </SectionLayout>
    </main>
  );
}
