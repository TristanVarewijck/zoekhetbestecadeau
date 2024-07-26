<?php



return [
    'wonen' => [
        'serial_number' => 'product ID',
        'name' => 'name',
        'description' => 'description',
        'price' => 'price',
        'affiliate_link' => 'productURL',
        'currency' => 'currency',
        'brand' => 'brand',
        'delimiter' => ';',

        // Extra fields (nullable)
        'delivery_time' => 'deliveryTime',
        'sub_category' => 'subcategories',
        'sub_sub_category' => 'subsubcategories',
        'stock' => 'stock',
        'image_url' => 'imageURL',
        'material' => 'material',
        'reviews' => '',
        'rating' => '',
        'size' => '',
    ],
    'tech' => [
        'serial_number' => 'sku',
        'name' => 'product_name',
        'description' => 'product_summary',
        'price' => 'price',
        'affiliate_link' => 'product_url',
        'currency' => 'currency',
        'brand' => 'brand',
        'delimiter' => ',',

        // Extra fields (nullable)
        'delivery_time' => 'delivery_time',
        'sub_category' => 'product_type',
        'sub_sub_category' => 'subproducttypename',
        'stock' => 'product_availability_state_id',
        'image_url' => 'image_url',
        'material' => '',
        'reviews' => 'reviewscount',
        'rating' => 'reviewsaveragescore',
        'size' => '',
    ],
    'lezen' => [
        'serial_number' => 'product ID',
        'name' => 'name',
        'description' => 'description',
        'price' => 'price',
        'affiliate_link' => 'productURL',
        'currency' => 'currency',
        'brand' => 'brand',
        'delimiter' => ';',

        // Extra fields (nullable)
        'delivery_time' => '',
        'sub_category' => '',
        'sub_sub_category' => '',
        'stock' => '',
        'image_url' => 'imageURL',
        'material' => '',
        'reviews' => '',
        'rating' => '',
        'size' => '',
    ],
    'sport' => [
        'serial_number' => 'product ID',
        'name' => 'name',
        'description' => 'description',
        'price' => 'price',
        'affiliate_link' => 'productURL',
        'currency' => 'currency',
        'brand' => 'brand',
        'delimiter' => ';',

        // Extra fields (nullable)
        'delivery_time' => 'deliveryTime',
        'sub_category' => 'categories',
        'sub_sub_category' => '',
        'stock' => 'stock',
        'image_url' => 'imageURL',
        'material' => '',
        'reviews' => '',
        'rating' => '',
        'size' => 'size',
    ]
];
