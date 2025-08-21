const recipes = [
  {
    id: "1",
    title: "Tarte aux pommes",
    description: "Une tarte aux pommes fondante et délicieuse.",
    image: "/tarte.jpg",
    ingredients: ["4 pommes", "1 pâte brisée", "50 g de sucre", "30 g de beurre", "1 c. à café de cannelle"],
    steps: [
      { text: "Préchauffer le four à 180°C.", image: "/steps/tarte/step1.jpg" },
      { text: "Étaler la pâte dans un moule à tarte.", image: "/steps/tarte/step2.jpg" },
      { text: "Éplucher et couper les pommes en tranches.", image: "/steps/tarte/step3.jpg" },
      { text: "Disposer les pommes sur la pâte.", image: "/steps/tarte/step4.jpg" },
      { text: "Saupoudrer de sucre et de cannelle, ajouter des morceaux de beurre.", image: "/steps/tarte/step5.jpg" },
      { text: "Cuire 35 minutes jusqu'à ce que la tarte soit dorée.", image: "/steps/tarte/step6.jpg" },
    ],
    tips: [
      "Utilisez des pommes acidulées pour un meilleur équilibre des saveurs.",
      "Ajoutez une pincée de vanille pour rehausser le goût.",
    ],
  },
  {
    id: "2",
    title: "Spaghetti Carbonara",
    description: "Classique italien, crémeux et gourmand.",
    image: "/carbonara.jpg",
    ingredients: ["200 g de spaghetti", "100 g de pancetta", "2 œufs", "50 g de parmesan râpé", "Poivre noir"],
    steps: [
      { text: "Cuire les spaghetti al dente.", image: "/steps/carbonara/step1.jpg" },
      { text: "Faire revenir la pancetta jusqu'à ce qu'elle soit dorée.", image: "/steps/carbonara/step2.jpg" },
      { text: "Battre les œufs avec le parmesan.", image: "/steps/carbonara/step3.jpg" },
      { text: "Égoutter les pâtes et les mélanger avec la pancetta.", image: "/steps/carbonara/step4.jpg" },
      { text: "Ajouter le mélange œufs-parmesan hors du feu et mélanger rapidement.", image: "/steps/carbonara/step5.jpg" },
      { text: "Poivrer selon le goût et servir immédiatement.", image: "/steps/carbonara/step6.jpg" },
    ],
    tips: [
      "Ne pas ajouter de crème fraîche, ce n'est pas traditionnel !",
      "Servez immédiatement pour éviter que les pâtes ne collent.",
    ],
  },
  {
    id: "3",
    title: "Salade fraîcheur",
    description: "Salade saine et rafraîchissante pour l'été.",
    image: "/salade.jpg",
    ingredients: ["Laitue", "Tomates cerises", "Concombre", "Feta", "Olives noires", "Vinaigrette au citron"],
    steps: [
      { text: "Laver et couper la laitue, tomates et concombre.", image: "/steps/salade/step1.jpg" },
      { text: "Mélanger tous les légumes dans un saladier.", image: "/steps/salade/step2.jpg" },
      { text: "Ajouter la feta émiettée et les olives.", image: "/steps/salade/step3.jpg" },
      { text: "Assaisonner avec la vinaigrette au citron.", image: "/steps/salade/step4.jpg" },
      { text: "Mélanger délicatement et servir frais.", image: "/steps/salade/step5.jpg" },
    ],
    tips: [
      "Ajoutez des graines de tournesol pour un croquant supplémentaire.",
      "Utilisez des légumes bien frais pour un goût optimal.",
    ],
  },
  {
    id: "4",
    title: "Poulet rôti aux herbes",
    description: "Poulet tendre et juteux avec un parfum d'herbes.",
    image: "/poulet.jpg",
    ingredients: ["1 poulet entier", "3 c. à soupe d'huile d'olive", "Thym", "Romarin", "Sel et poivre"],
    steps: [
      { text: "Préchauffer le four à 200°C.", image: "/steps/poulet/step1.jpg" },
      { text: "Badigeonner le poulet d'huile d'olive et assaisonner avec sel, poivre, thym et romarin.", image: "/steps/poulet/step2.jpg" },
      { text: "Placer le poulet dans un plat et enfourner 1h à 1h15 selon le poids.", image: "/steps/poulet/step3.jpg" },
      { text: "Arroser régulièrement avec le jus de cuisson.", image: "/steps/poulet/step4.jpg" },
      { text: "Laisser reposer 10 minutes avant de découper et servir.", image: "/steps/poulet/step5.jpg" },
    ],
    tips: [
      "Laissez le poulet reposer après cuisson pour qu'il reste juteux.",
      "Ajoutez des légumes dans le plat pour un accompagnement savoureux.",
    ],
  },
  {
    id: "5",
    title: "Brownies chocolat",
    description: "Brownies fondants, parfaits pour les gourmands.",
    image: "/brownies.jpg",
    ingredients: ["200 g de chocolat noir", "150 g de beurre", "150 g de sucre", "3 œufs", "100 g de farine"],
    steps: [
      { text: "Préchauffer le four à 180°C.", image: "/steps/brownies/step1.jpg" },
      { text: "Faire fondre le chocolat avec le beurre.", image: "/steps/brownies/step2.jpg" },
      { text: "Battre les œufs avec le sucre, puis ajouter le mélange chocolat-beurre.", image: "/steps/brownies/step3.jpg" },
      { text: "Incorporer la farine et mélanger doucement.", image: "/steps/brownies/step4.jpg" },
      { text: "Verser dans un moule beurré et enfourner 20-25 minutes.", image: "/steps/brownies/step5.jpg" },
      { text: "Laisser refroidir avant de découper en carrés.", image: "/steps/brownies/step6.jpg" },
    ],
    tips: [
      "Ajoutez des noix ou des pépites de chocolat pour plus de gourmandise.",
      "Ne cuisez pas trop longtemps pour garder les brownies fondants.",
    ],
  },
];

export default recipes;