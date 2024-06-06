"use client";

import DownloadPdf from "@/components/custom/downloadPdf";
import H1Heading from "@/components/custom/heading/h1Heading";
import H3Heading from "@/components/custom/heading/h3Heading";
import SectionLayout from "@/components/custom/sectionLayout";
import Link from "next/link";

export default function Conditions() {
  return (
    <SectionLayout bgColor="white">
      <div className="md:mt-0 w-full flex flex-col justify-center max-w-[700px] mx-auto">
        <H1Heading
          title="Algemene voorwaarden"
          subtitle="Laatst bijgewerkt: 5 juni 2024"
        />

        <div className="mt-1 lg:mt-2">
          <DownloadPdf
            buttonText={"Download de algemene voorwaarden"}
            folderRoute={"legal/pdf"}
            fileName={"ALGEMENE_VOORWAARDEN_ZOEKHETBESTECADEAU"}
          />
        </div>
        <div className="flex justify-center w-full mt-10">
          <div className="max-w-[700px] w-full flex flex-col gap-4">
            <H3Heading title="Artikel 1: Definities" />
            <p>
              <b>1.1 Website:</b> Zoekhetbestecadeau, bereikbaar via{" "}
              <Link href="https://www.zoekhetbestecadeau.nl/" target="_blank">
                https://www.zoekhetbestecadeau.nl/
              </Link>
              .
            </p>
            <p>
              <b>1.2 Gebruiker:</b> Iedere bezoeker van de website.
            </p>
            <p>
              <b>1.3 Diensten:</b> Het aanbieden van cadeau-adviezen en
              doorverwijzen naar derde partijen voor aankoop.
            </p>
            <p>
              <b>1.4 Derde partijen:</b> Externe websites zoals bol.com en
              coolblue, waarnaar de gebruiker wordt doorverwezen voor de aankoop
              van cadeaus.
            </p>

            <H3Heading title="Artikel 2: Toepasselijkheid" />
            <p>
              <b>2.1</b> Deze algemene voorwaarden zijn van toepassing op ieder
              gebruik van de website Zoekhetbestecadeau.
            </p>
            <p>
              <b>2.2</b> Door gebruik te maken van de website, accepteert de
              gebruiker deze algemene voorwaarden.
            </p>

            <H3Heading title="Artikel 3: Diensten" />
            <p>
              <b>3.1</b> Zoekhetbestecadeau biedt een platform aan waar
              gebruikers cadeau-adviezen kunnen krijgen op basis van antwoorden
              op specifieke vragen.
            </p>
            <p>
              <b>3.2</b> De daadwerkelijke aankoop van cadeaus vindt plaats op
              websites van derde partijen, waarnaar de gebruiker wordt
              doorverwezen.
            </p>
            <p>
              <b>3.3</b> Zoekhetbestecadeau ontvangt een commissie voor aankopen
              die via affiliate links worden gedaan.
            </p>

            <H3Heading title="Artikel 4: Aansprakelijkheid" />
            <p>
              <b>4.1</b> Zoekhetbestecadeau is niet verantwoordelijk voor de
              juistheid, volledigheid of actualiteit van de aangeboden
              informatie.
            </p>
            <p>
              <b>4.2</b> Zoekhetbestecadeau aanvaardt geen aansprakelijkheid
              voor schade die voortvloeit uit het gebruik van de website of
              doorverwijzingen naar derde partijen.
            </p>
            <p>
              <b>4.3</b> Zoekhetbestecadeau is niet verantwoordelijk voor de
              inhoud van websites van derde partijen.
            </p>

            <H3Heading title="Artikel 5: Links naar Derde Partijen" />
            <p>
              <b>5.1</b> De website bevat links naar websites van derde
              partijen. Zoekhetbestecadeau heeft geen invloed op de inhoud van
              deze websites en aanvaardt geen aansprakelijkheid voor deze
              inhoud.
            </p>
            <p>
              <b>5.2</b> Het feit dat een link naar een derde partij wordt
              geplaatst, impliceert geen goedkeuring of aanbeveling van de
              producten of diensten van die derde partij.
            </p>

            <H3Heading title="Artikel 6: Intellectueel Eigendom" />
            <p>
              <b>6.1</b> Alle intellectuele eigendomsrechten met betrekking tot
              de website en de aangeboden diensten behoren toe aan
              Zoekhetbestecadeau.
            </p>
            <p>
              <b>6.2</b> Het is niet toegestaan om informatie van de website te
              kopiëren, distribueren of anderszins te gebruiken zonder
              voorafgaande schriftelijke toestemming van Zoekhetbestecadeau.
            </p>

            <H3Heading title="Artikel 7: Privacy" />
            <p>
              <b>7.1</b> Zoekhetbestecadeau respecteert de privacy van alle
              gebruikers en behandelt persoonlijke informatie vertrouwelijk.
            </p>
            <p>
              <b>7.2</b> Persoonlijke gegevens die worden verstrekt door
              gebruikers worden alleen gebruikt voor het verbeteren van de
              dienstverlening en worden niet gedeeld met derden, behalve zoals
              vereist voor de uitvoering van de diensten.
            </p>

            <H3Heading title="Artikel 8: Cookies" />
            <p>
              <b>8.1</b> Zoekhetbestecadeau maakt gebruik van cookies om de
              gebruikerservaring te verbeteren en om affiliate commissies bij te
              houden.
            </p>
            <p>
              <b>8.2</b> Gebruikers kunnen hun browserinstellingen aanpassen om
              cookies te weigeren of te verwijderen, maar dit kan invloed hebben
              op de functionaliteit van de website.
            </p>

            <H3Heading title="Artikel 9: Wijzigingen" />
            <p>
              <b>9.1</b> Zoekhetbestecadeau behoudt zich het recht voor deze
              algemene voorwaarden te allen tijde te wijzigen. De meest actuele
              versie van de algemene voorwaarden is beschikbaar op de website.
            </p>
            <p>
              <b>9.2</b> Door gebruik te maken van de website na wijzigingen,
              accepteert de gebruiker de gewijzigde algemene voorwaarden.
            </p>

            <H3Heading title="Artikel 10: Toepasselijk Recht en Geschillen" />
            <p>
              <b>10.1</b> Op deze algemene voorwaarden is Nederlands recht van
              toepassing.
            </p>
            <p>
              <b>10.2</b> Geschillen voortvloeiend uit of verband houdend met
              deze algemene voorwaarden zullen worden voorgelegd aan de bevoegde
              rechter in Nederland.
            </p>

            <H3Heading title="Contact" />
            <p>
              Voor vragen over deze algemene voorwaarden kunt u contact met ons
              opnemen via:{" "}
              <Link href="mailto:zoekhetbestecadeau@gmail.com">
                zoekhetbestecadeau@gmail.com
              </Link>
            </p>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}
