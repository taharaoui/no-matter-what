export type MenuItem = {
  name: string;
  /** Not every item has one — only set where there's real copy to show. */
  desc?: string;
  /** Left unset for newly-announced items whose price hasn't been confirmed yet. */
  price?: string;
  /** Shown as a small mono note beside the price — second size, allergens, etc. */
  note?: string;
  /** Real product photo. Most items don't have one yet — MenuItemCard falls
   *  back to a plain card with the name set in Playfair Display rather than
   *  a generic "missing image" placeholder, so this is safe to leave unset. */
  image?: string;
  /** Small badges on the card — e.g. "signature", "végane", "sans gluten".
   *  Free-form rather than a fixed enum, but only ever set when true of the
   *  actual item; never used to imply a claim (allergen-free, etc.) that
   *  hasn't been confirmed. */
  tags?: string[];
};

export type MenuSection = {
  id: string;
  title: string;
  /** One line on why the section exists. Optional — not invented where none was given. */
  intro?: string;
  items: MenuItem[];
};

export const MENU: MenuSection[] = [
  {
    id: "cafe-chaud",
    title: "Café chaud",
    items: [
      {
        name: "Espresso",
        price: "2,85",
        // IA (Higgsfield, nano_banana_2) — génération pure texte, aucune
        // photo réelle d'espresso NMW en référence. Style/vaisselle
        // génériques, pas le produit tel que réellement servi.
        image: "/images/ai-espresso.png",
      },
      { name: "Double espresso", price: "3,95" },
      { name: "Café filtre", price: "2,75", note: "Grand — 2,95 $" },
      { name: "Américano", price: "4,00", note: "Grand — 4,95 $" },
      {
        name: "Cappuccino",
        price: "4,75",
        note: "Grand — 5,35 $",
        // IA (Higgsfield, nano_banana_2) — voir commentaire sur Espresso.
        image: "/images/ai-cappuccino.png",
        tags: ["potentiel best-seller"],
      },
      {
        name: "Latté",
        price: "4,95",
        note: "Grand — 5,35 $",
        // IA (Higgsfield, nano_banana_2) — voir commentaire sur Espresso.
        image: "/images/ai-latte.png",
      },
      { name: "Latté vanille", price: "5,25", note: "Grand — 6,95 $" },
      { name: "Latté chocolat", price: "4,75", note: "Grand — 6,95 $" },
      { name: "Caramel macchiato", price: "5,50", note: "Grand — 7,25 $" },
    ],
  },
  {
    id: "cafes-glaces",
    title: "Cafés glacés",
    items: [
      { name: "Café glacé", price: "4,75" },
      { name: "Latté glacé", price: "5,25" },
      {
        name: "Cappuccino glacé",
        desc: "Espresso sur glace, coiffé d'une mousse de lait froide.",
        image: "/images/menu-cappuccino-glace.jpg",
        tags: ["signature"],
      },
      {
        name: "Latté glacé vanille",
        desc: "Mousse froide à la vanille",
        price: "6,95",
        // IA (Higgsfield, marketing_studio_image) — cup/label réels comme
        // référence, contenu de la boisson généré. Pas une photo du produit
        // tel que réellement servi.
        image: "/images/ai-latte-glace-vanille.png",
        tags: ["potentiel best-seller"],
      },
      {
        name: "Caramel macchiato glacé",
        desc: "Mousse froide à la vanille",
        price: "7,25",
        // IA (Higgsfield, marketing_studio_image) — cup/label réels comme
        // référence, contenu de la boisson généré. Pas une photo du produit
        // tel que réellement servi.
        image: "/images/ai-caramel-macchiato-glace.png",
        tags: ["potentiel best-seller"],
      },
      {
        name: "Latté glacé brioché",
        desc: "Shaker cassonade, crème vanillée",
        price: "7,35",
      },
    ],
  },
  {
    id: "matcha",
    title: "Matcha",
    items: [
      {
        name: "Matcha Latte classique",
        // Prix provisoire — à confirmer.
        price: "6,95",
        // IA (Higgsfield, marketing_studio_image) — photo réelle du vrai
        // cup/label NMW comme référence, remise en scène studio. Remplace
        // menu-matcha-3.jpg (toujours sur disque, non utilisée).
        image: "/images/ai-matcha-classique.png",
      },
      {
        // Pas de photo confirmée pour cette saveur — rend en carte de repli.
        name: "Matcha Lavande",
        price: "6,95",
      },
      {
        // Couche fruitée rose — assortie à la photo la plus proche.
        name: "Matcha Fraise & Vanille",
        price: "6,95",
        // IA (Higgsfield, marketing_studio_image) — voir commentaire ci-dessus.
        // Remplace menu-matcha-1.jpg (toujours sur disque, non utilisée).
        image: "/images/ai-matcha-fraise-vanille.png",
      },
      {
        // Couche fruitée orange — assortie à la photo la plus proche.
        name: "Matcha Mangue & Fruit de la passion",
        price: "6,95",
        // IA (Higgsfield, marketing_studio_image) — voir commentaire plus haut.
        // Remplace menu-matcha-2.jpg (toujours sur disque, non utilisée).
        image: "/images/ai-matcha-mangue-passion.png",
      },
    ],
  },
  {
    id: "smoothies",
    title: "Smoothies",
    items: [
      {
        name: "Fraise banane",
        price: "7,25",
        // IA (Higgsfield, nano_banana_2) — génération pure texte, aucune
        // photo réelle en référence. Pas le produit tel que réellement servi.
        image: "/images/ai-smoothie-fraise-banane.png",
      },
      { name: "Mangue-pêche tropical", price: "7,25" },
      { name: "Énergie", desc: "Avocat, banane, mangue", price: "7,95" },
    ],
  },
  {
    id: "mocktails",
    title: "Mocktails",
    items: [
      {
        name: "Mojito pêche",
        desc: "Coulis de pêche maison, lime, menthe fraîche, soda",
        price: "7,25",
      },
      {
        name: "Fraise basilic spritz",
        desc: "Coulis de fraise maison, citron, basilic frais, soda",
        price: "7,25",
      },
      {
        name: "Mangue sunrise",
        desc: "Coulis de mangue maison, jus d'orange, soda",
        price: "7,25",
      },
    ],
  },
  {
    id: "brioches",
    title: "Brioches",
    items: [
      {
        name: "Brioche classique",
        price: "5,25",
        // IA (Higgsfield, nano_banana_2) — voir commentaire sur Fraise banane.
        image: "/images/ai-brioche-classique.png",
      },
      {
        name: "Brioche cheesecake",
        desc: "Glaçage cheesy, coulis de fraises maison, fraises fraîches",
        price: "7,95",
        // IA (Higgsfield, nano_banana_2) — voir commentaire sur Espresso.
        image: "/images/ai-brioche-cheesecake.png",
        tags: ["potentiel best-seller"],
      },
      {
        name: "Brioche biscoff caramel",
        desc: "Glaçage cheesy, coulis caramel, crumble Biscoff",
        price: "7,95",
      },
    ],
  },
  {
    id: "croissants",
    title: "Croissants",
    items: [
      {
        name: "Croissant classique",
        price: "3,50",
        // IA (Higgsfield, nano_banana_2) — voir commentaire sur Fraise banane.
        image: "/images/ai-croissant-classique.png",
      },
      {
        name: "Choco banane",
        desc: "Crème légère, coulis choco-banane",
        price: "7,95",
      },
      {
        name: "Fraise shortcake",
        desc: "Crème légère, fraises fraîches, coulis de fraise maison",
        price: "7,95",
      },
      {
        name: "Pêche mangue",
        desc: "Crème légère, pêche grillée, coulis de mangue maison, noix de coco grillée, lime",
        price: "7,95",
      },
    ],
  },
  {
    id: "croissants-sales",
    title: "Croissants salés",
    items: [
      {
        name: "Caprese",
        desc: "Crème salée maison, mélange tomates-basilic",
        price: "8,95",
      },
      {
        name: "Saumon fumé",
        desc: "Crème salée maison, saumon fumé, avocat, huile citronnée, aneth",
        price: "9,95",
      },
      {
        name: "Mortadelle",
        desc: "Crème salée maison, mortadelle, miel",
        price: "8,95",
      },
      { name: "Jambon-provolone", price: "9,95" },
    ],
  },
  {
    id: "crosti-croissants",
    title: "Crosti'Croissants",
    intro: "Le croissant, doré et grillé, refermé sur un cœur de fromage fondant.",
    items: [
      // Only one photo exists for this section so far, and it isn't tied to
      // a specific flavour — applied to the first item rather than repeated
      // across all four, which would read as four identical photos.
      { name: "Salami & provolone", image: "/images/menu-crosti-croissants.jpg" },
      { name: "Brie, pêches grillées & miel" },
      { name: "Brie & chips de prosciutto" },
      { name: "Provolone & cheddar fort" },
    ],
  },
  {
    id: "ptite-douceur",
    title: "P'tite douceur",
    items: [
      {
        name: "Dolce affogato",
        desc: "Gelato trois saveurs, coulis de chocolat, espresso, crème vanillée et doigts de dame",
        price: "10,95",
        // IA (Higgsfield, nano_banana_2) — voir commentaire sur Espresso.
        image: "/images/ai-affogato.png",
        tags: ["potentiel best-seller"],
      },
    ],
  },
  {
    id: "foccacias",
    title: "Foccacias",
    items: [
      { name: "Saumon fumé", price: "15,95" },
      {
        name: "Prosciutto & pêche",
        desc: "Stracciatella, prosciutto, pêches grillées, miel",
        price: "14,95",
      },
      {
        name: "Légumes grillés",
        desc: "Ricotta, légumes grillés, mélange de tomates & basilic, huile d'olive",
        price: "13,95",
      },
    ],
  },
  {
    id: "sandwichs",
    title: "Sandwichs",
    items: [
      {
        name: "L'Italien",
        desc: "Mortadelle, prosciutto, salami de Gênes, ricotta, roquette, piment grillé, mélange tomate-basilic, huile d'olive, citron, glaçage balsamique",
        price: "16,95",
      },
      {
        name: "La Bologna",
        desc: "Mortadelle, stracciatella, roquette, miel, huile d'olive, poivre noir",
        price: "15,95",
      },
      {
        name: "La Burrata",
        desc: "Burrata, prosciutto, pesto, mélange de tomates, glaçage balsamique",
        price: "18,95",
        // IA (Higgsfield, nano_banana_2) — voir commentaire sur Espresso.
        image: "/images/ai-burrata-sandwich.png",
        tags: ["potentiel best-seller"],
      },
      {
        name: "Poulet toscan",
        desc: "Poulet, pesto-basilic, roquette, citron, stracciatella, mélange tomates-basilic",
        price: "14,95",
      },
      {
        name: "Porchetta",
        desc: "Porc effiloché, mijoté aux herbes, croûte dorée — notre dernière arrivée en carte.",
        image: "/images/menu-porchetta.jpg",
        tags: ["signature"],
      },
    ],
  },
  {
    id: "salade",
    title: "Salade",
    items: [
      {
        name: "Panzanella à la burrata",
        desc: "Salade & roquette, mélange de tomates NMW, concombre, burrata, croûtons NMW",
        price: "15,95",
        // IA (Higgsfield, nano_banana_2) — voir commentaire sur Espresso.
        image: "/images/ai-panzanella-burrata.png",
        tags: ["potentiel best-seller"],
      },
    ],
  },
];
