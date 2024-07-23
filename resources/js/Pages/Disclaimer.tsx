import DownloadPdf from "@/Components/custom/downloadPdf";
import H1Heading from "@/Components/custom/heading/h1Heading";
import H3Heading from "@/Components/custom/heading/h3Heading";
import SectionLayout from "@/Components/custom/sectionLayout";
import { Head } from "@inertiajs/react";

export default function Disclaimer() {
    return (
        <SectionLayout bgColor="white">
            <Head title="Disclaimer" />
            <div className="md:mt-0 w-full flex flex-col justify-center max-w-[700px] mx-auto">
                <H1Heading
                    title="Disclaimer"
                    subtitle="Laatst bijgewerkt: 5 juni 2024"
                />

                <div className="mt-1 lg:mt-2">
                    <DownloadPdf
                        buttonText={"Download de disclaimer"}
                        folderRoute={"legal/pdf"}
                        fileName={"DISCLAIMER_ZOEKHETBESTECADEAU"}
                    />
                </div>
                <div className="flex justify-center w-full mt-10">
                    <div className="max-w-[700px] w-full flex flex-col gap-4">
                        <p>
                            Zoekhetbestecadeau is de samensteller en uitgever
                            van de informatie op deze website. Wij zijn ons
                            volledig bewust van onze taken en besteden de
                            grootst mogelijke zorg aan de betrouwbaarheid en
                            actualiteit van de informatie. Niettemin kan deze
                            website onjuiste en/of onvolledige informatie
                            bevatten.
                        </p>

                        <H3Heading title="Aansprakelijkheid" />
                        <p>
                            Zoekhetbestecadeau kan geen aansprakelijkheid
                            aanvaarden voor schade die verband houdt met het
                            gebruik van deze website, of met de tijdelijke
                            onmogelijkheid deze website te kunnen raadplegen.
                            Ook zijn wij niet aansprakelijk voor schade ontstaan
                            door het gebruik van informatie aangeboden op deze
                            website of door onvolledigheid op welke manier dan
                            ook.
                        </p>

                        <H3Heading title="Links van en naar de Zoekhetbestecadeau website" />
                        <p>
                            Zoekhetbestecadeau is niet verantwoordelijk voor de
                            inhoud van websites waarnaar wordt verwezen of die
                            verwijzen naar deze website. Iedere
                            aansprakelijkheid voor schade, geleden na een bezoek
                            aan een andere website via een link op deze website
                            of anderszins, wordt uitgesloten. Het feit dat een
                            link wordt gecreëerd naar een website van een derde
                            of dat wordt toegelaten dat een website van een
                            derde een link bevat naar deze website, betekent
                            niet dat Zoekhetbestecadeau de producten of diensten
                            op de website van een derde goedkeurt of aanbeveelt.
                        </p>

                        <H3Heading title="Affiliate Links" />
                        <p>
                            Zoekhetbestecadeau maakt gebruik van affiliate links
                            om gebruikers door te verwijzen naar producten en
                            diensten op websites van derde partijen, zoals
                            bol.com en coolblue. Wij ontvangen een commissie
                            voor aankopen die via deze links worden gedaan. Deze
                            commissies beïnvloeden op geen enkele wijze de
                            objectiviteit van onze cadeau-adviezen.
                        </p>

                        <H3Heading title="Informatie gebruiken" />
                        <p>
                            Zoekhetbestecadeau behoudt zich alle intellectuele
                            eigendomsrechten en andere rechten voor met
                            betrekking tot deze website en de via deze website
                            te leveren producten en diensten. Het is toegestaan
                            om de geboden informatie te downloaden en te printen
                            voor eigen persoonlijk niet-commercieel gebruik. Het
                            is niet toegestaan de inhoud van deze website over
                            te nemen, te vermenigvuldigen of op welke wijze dan
                            ook te distribueren of openbaar te maken zonder
                            voorafgaande schriftelijke toestemming van
                            Zoekhetbestecadeau.
                        </p>

                        <H3Heading title="Wijzigingen" />
                        <p>
                            Zoekhetbestecadeau behoudt zich het recht voor om de
                            inhoud van deze disclaimer te allen tijde te
                            wijzigen. De meest actuele versie van de disclaimer
                            is beschikbaar op de website. Door gebruik te maken
                            van de website na wijzigingen, accepteert de
                            gebruiker de gewijzigde disclaimer.
                        </p>

                        <H3Heading title="Contact" />
                        <p>
                            Voor vragen over deze disclaimer kunt u contact met
                            ons opnemen via:{" "}
                            <a href={`mailto:${import.meta.env.VITE_MAIL}`}>
                                zoekhetbestecadeau@gmail.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </SectionLayout>
    );
}
