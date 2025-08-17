// data/recipesViande.ts
const recipesViande = [
  {
    id: "v1",
    title: "Bœuf bourguignon",
    description: "Un grand classique de la cuisine française.",
    image: "/viande/boeuf-bourguignon.jpg",
    ingredients: [
      "800 g de bœuf",
      "150 g de lardons",
      "1 bouteille de vin rouge",
      "2 carottes",
      "2 oignons",
      "Thym, laurier, sel, poivre"
    ],
    steps: [
      { text: "Couper la viande en morceaux et les faire revenir.", image: "/steps/boeuf/step1.jpg" },
      { text: "Ajouter les lardons, les carottes et les oignons.", image: "/steps/boeuf/step2.jpg" },
      { text: "Verser le vin rouge et ajouter les herbes.", image: "/steps/boeuf/step3.jpg" },
      { text: "Laisser mijoter à feu doux pendant 2 à 3 heures.", image: "/steps/boeuf/step4.jpg" },
      { text: "Rectifier l’assaisonnement et servir chaud.", image: "/steps/boeuf/step5.jpg" },
    ]
  },
  {
    id: "v2",
    title: "Côtelettes d'agneau grillées",
    description: "Savoureuses et rapides à préparer.",
    image: "/viande/agneau.jpg",
    ingredients: [
      "6 côtelettes d’agneau",
      "2 gousses d’ail",
      "2 c. à soupe d’huile d’olive",
      "Romarin, sel, poivre"
    ],
    steps: [
      { text: "Badigeonner les côtelettes d’huile d’olive, ail et romarin.", image: "/steps/agneau/step1.jpg" },
      { text: "Chauffer une poêle ou un grill bien chaud.", image: "/steps/agneau/step2.jpg" },
      { text: "Faire griller les côtelettes 3-4 minutes de chaque côté.", image: "/steps/agneau/step3.jpg" },
      { text: "Assaisonner et servir avec une salade ou légumes grillés.", image: "/steps/agneau/step4.jpg" },
    ]
  },
  {
    id: "v3",
    title: "Chili con carne",
    description: "Un plat épicé et convivial venu du Mexique.",
    image: "/viande/chili.jpg",
    ingredients: [
      "500 g de bœuf haché",
      "400 g de haricots rouges",
      "1 poivron rouge",
      "2 tomates",
      "1 oignon",
      "Épices chili, cumin"
    ],
    steps: [
      { text: "Faire revenir l’oignon et le poivron.", image: "/steps/chili/step1.jpg" },
      { text: "Ajouter la viande hachée et faire dorer.", image: "/steps/chili/step2.jpg" },
      { text: "Incorporer les tomates et les haricots rouges.", image: "/steps/chili/step3.jpg" },
      { text: "Ajouter les épices et laisser mijoter 30 minutes.", image: "/steps/chili/step4.jpg" },
      { text: "Servir chaud avec du riz ou des tortillas.", image: "/steps/chili/step5.jpg" },
    ]
  },
  {
    id: "v4",
    title: "Filet mignon de porc à la moutarde",
    description: "Un plat tendre et parfumé.",
    image: "/viande/filet-mignon.jpg",
    ingredients: [
      "1 filet mignon de porc",
      "2 c. à soupe de moutarde",
      "20 cl de crème fraîche",
      "Sel, poivre"
    ],
    steps: [
      { text: "Faire revenir le filet mignon dans une poêle.", image: "/steps/filet/step1.jpg" },
      { text: "Ajouter la moutarde et laisser caraméliser légèrement.", image: "/steps/filet/step2.jpg" },
      { text: "Verser la crème et laisser mijoter 20 minutes.", image: "/steps/filet/step3.jpg" },
      { text: "Rectifier l’assaisonnement et servir avec du riz.", image: "/steps/filet/step4.jpg" },
    ]
  },
  {
    id: "v5",
    title: "Curry de poulet",
    description: "Un plat exotique et parfumé aux épices.",
    image: "/viande/curry-poulet.jpg",
    ingredients: [
      "500 g de poulet",
      "2 oignons",
      "200 ml de lait de coco",
      "2 c. à soupe de pâte de curry",
      "Coriandre fraîche"
    ],
    steps: [
      { text: "Faire revenir les oignons hachés.", image: "/steps/curry/step1.jpg" },
      { text: "Ajouter les morceaux de poulet et les faire dorer.", image: "/steps/curry/step2.jpg" },
      { text: "Incorporer la pâte de curry et bien mélanger.", image: "/steps/curry/step3.jpg" },
      { text: "Verser le lait de coco et laisser mijoter 25 minutes.", image: "/steps/curry/step4.jpg" },
      { text: "Parsemer de coriandre fraîche avant de servir.", image: "/steps/curry/step5.jpg" },
    ]
  },
  {
    id: "v6",
    title: "Boulettes de viande sauce tomate",
    description: "Un plat familial et gourmand.",
    image: "/viande/boulettes.jpg",
    ingredients: [
      "400 g de bœuf haché",
      "1 œuf",
      "50 g de chapelure",
      "1 boîte de tomates concassées",
      "1 oignon",
      "Herbes italiennes"
    ],
    steps: [
      { text: "Mélanger la viande avec l’œuf et la chapelure.", image: "/steps/boulettes/step1.jpg" },
      { text: "Former des boulettes et les faire revenir.", image: "/steps/boulettes/step2.jpg" },
      { text: "Préparer une sauce tomate avec oignon et herbes.", image: "/steps/boulettes/step3.jpg" },
      { text: "Ajouter les boulettes dans la sauce et cuire 20 minutes.", image: "/steps/boulettes/step4.jpg" },
      { text: "Servir avec des pâtes ou du riz.", image: "/steps/boulettes/step5.jpg" },
    ]
  },
];

export default recipesViande;
