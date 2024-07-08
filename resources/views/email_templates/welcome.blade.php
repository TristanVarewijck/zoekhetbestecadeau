<!DOCTYPE html>
<html>

<head>
    <title>TE | Brief 1 - betalingsherinnering (stap 1 - {customer_order_value})</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        body {
            font-family: 'open sans', 'helvetica neue', helvetica, arial, sans-serif;
            font-size: 12px;
            min-width: 600px;
            width: 600px;
            margin: 0 auto;
            position: relative;
        }

        p {
            line-height: 1.8;
        }

        .header,
        .header-space {
            height: 120px;
        }

        .footer,
        .footer-space {
            font-size: 10px;
            height: 100px;
        }

        .header {
            width: 100%;
            position: fixed;
            top: 0;
            margin: 0 auto;
        }

        .footer {
            width: 100%;
            position: fixed;
            bottom: 0;
            margin: 0 auto;
        }
    </style>
</head>

<body>
    <table>
        <thead>
            <tr>
                <td>
                    <div class="header-space">&nbsp;</div>
                </td>


                <div class="absolute right-0 top-10">
                    <div class="flex flex-col">
                        <p><strong>{system_name_commercial}</strong></p>
                        <p>{system_domain}</p>
                        <p>{system_address_streetwithnumber}</p>
                        <p>{system_address_zipcode}</p>
                        <p>{system_address_city}</p>
                        <p>{system_address_country}</p>
                    </div>

                </div>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <div class="content">
                        <!-- body_container -->
                        <div class="flex flex-col gap-6">

                            <!-- sub-header-container -->
                            <div class="flex justify-between items-start">
                                <!-- customer -->
                                <div class="flex flex-col">
                                    <p>{customer_name_first} {customer_name_last}</p>
                                    <p>{customer_address_streetwithnumber}</p>
                                    <p>{customer_address_zipcode}</p>
                                    <p>{customer_address_city}</p>
                                    <p>{customer_address_country}</p>
                                </div>
                            </div>

                            <!-- salutation -->
                            <div class="flex flex-col gap-6">
                                <div class="flex items-center gap-4">
                                    <!-- labels -->
                                    <div>
                                        <p>Betref:</p>
                                        <p>Kenmerk:</p>
                                    </div>

                                    <!-- values -->
                                    <div>
                                        <p>Betalingsherinnering - herinneringskosten in rekening gebracht</p>
                                        <p>{mollieID}</p>
                                    </div>
                                </div>

                                <p>{system_address_city}, {date}</p>
                                <p>Geachte heer/mevrouw {customer_name_last},</p>
                                <p>
                                    Hierbij herinneren wij u aan een openstaand bedrag van
                                    {customer_payment_amount_open}.
                                    Dit bedrag betreft de kosten voor de
                                    {business_name_commercial}-opzegbrief die wij op uw
                                    verzoek op {customer_order_date} per post naar de betreffende organisatie
                                    hebben verzonden.
                                    In dit totaalbedrag zijn tevens {customer_additional_costs} aan
                                    herinneringskosten opgenomen,
                                    bovenop het oorspronkelijke bedrag van {customer_order_value}. Wij
                                    verzoeken u vriendelijk
                                    het volledige bedrag vóór {date_plus_7} te voldoen, om extra kosten te
                                    vermijden.
                                </p>
                            </div>

                            <!-- payment options -->
                            <div>
                                <p class="mb-2"><strong>Betalingsopties</strong></p>
                                <ul class="flex flex-col gap-1 list-disc">
                                    <li><strong>Directe betaling via iDEAL:</strong> Scan de QR-code onderaan deze brief
                                        met uw mobiele
                                        telefoon.</li>
                                    <li>
                                        <strong>Betaling via internetbankieren:</strong> Maak het verschuldigde bedrag
                                        van
                                        {customer_payment_amount_open} over op
                                        rekeningnummer {system_iban_number} ten name van
                                        {system_business_name_official}. Vermeld hierbij alstublieft uw
                                        factuurnummer:
                                        {mollieID}.
                                    </li>
                                </ul>
                            </div>

                            <!-- warning -->
                            <div>
                                <p class="mb-2"><strong>Betaal op tijd om extra kosten te vermijden</strong></p>
                                <p>Indien uw betaling te laat is, behouden wij ons het recht voor om incassokosten van
                                    {system_additional_costs_step_2} in rekening te brengen.
                                </p>
                            </div>

                            <!-- closing -->
                            <div class="flex flex-col gap-3">
                                <p>Heeft u nog vragen? Neem gerust contact op via
                                    <span>support@</span>{system_domain}. Wij
                                    streven
                                    ernaar om uw e-mail binnen drie werkdagen te beantwoorden.
                                </p>
                                <p>
                                    Met vriendelijke groet,
                                </p>
                                <div class="flex justify-between w-full items-start">
                                    <div>
                                        <p><strong style="font-size: 12px;">Termination Experts</strong></p>
                                        <p style="font-size: 12px;">Financiële Administratie</p>
                                    </div>

                                    <div class="flex flex-col items-center">
                                        <strong style="font-size: 12px;">Scan en betaal</strong>
                                        <img src='assets/test/qr-code.png' alt="QR Code"
                                            style="min-width: 80px; height: 80px;">
                                    </div>
                                </div>
                            </div>
                        </div>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td>
                    <div class="footer-space">&nbsp;</div>
                </td>
            </tr>
        </tfoot>
    </table>

    <!-- header -->
    <div class="header" style="width: 600px;">
        <div class="w-full flex justify-end">
            <img src="assets/test/termination-experts-logo.png" alt="logo">
        </div>
    </div>

    <!-- footer -->
    <div class="footer h-full flex flex-col justify-end" style="width: 600px;">
        <p style="font-size: 10px; border-top: 1px solid #f7f7f7; padding-top: 8px;">
            {system_business_name_official}
            tevens
            handelend onder de naam {system_name_commercial} en is gevestigd te {system_address_city} staat ingeschreven
            bij de Kamer van Koophandel onder nummer {system_kvk}. Betalingen van facturen kunnen worden voldaan op
            rekeningnummer {system_iban_number}. Op alle geleverde diensten zijn onze algemene voorwaarden van
            toepassing.</p>
    </div>
</body>

</html>