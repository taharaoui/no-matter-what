/**
 * The long-form version of the three-generation story.
 *
 * PLACEHOLDER NARRATIVE. The shape, voice and structure are real; the
 * specifics are not. Dates, the ice-storm scene and every concrete detail
 * are stand-ins written to the right length and register so the layout can
 * be judged honestly — they are meant to be replaced with the family's
 * actual account, not shipped. No names are invented: the family is
 * referred to by role throughout, so nothing here has to be walked back.
 */

export type Chapter = {
  id: string;
  years: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  /** One line lifted out of the chapter and set large. Optional. */
  pull?: string;
  /** A real photo tied to this chapter. Optional — most chapters predate
      any photography that's actually been digitized. */
  photo?: string;
};

export const PROLOGUE =
  "Il n'y a pas de plan d'affaires au commencement de cette histoire. Il y a un homme, un comptoir de six pieds, une théière, et l'idée qu'on ne sert pas un inconnu autrement qu'on servirait son frère. Tout ce qui suit — trois générations, une galerie, une boutique — est une conséquence de ce refus de faire autrement.";

export const CHAPTERS: Chapter[] = [
  {
    id: "premiere",
    years: "1968 – 1993",
    eyebrow: "Première génération",
    title: "Un comptoir, une théière, un quartier",
    paragraphs: [
      "Il est arrivé à Montréal avec l'hiver, ce qui n'est jamais la bonne saison pour arriver quelque part. Le local qu'il a trouvé faisait vingt-deux pieds de long et donnait sur une rue que personne ne remontait sans raison. Le loyer était bas parce que l'endroit n'avait rien pour lui.",
      "Il a installé un comptoir, une théière, et six tabourets qu'il a rachetés d'un restaurant qui fermait. La première semaine, il a servi onze personnes. La plupart étaient des ouvriers du chantier d'en face qui venaient parce que c'était le seul endroit ouvert à six heures du matin.",
      "Il les a servis comme s'ils étaient attendus. C'est la seule chose qu'il savait faire vraiment bien, et il s'est avéré que c'était suffisant. Au bout de deux ans, il fallait arriver avant sept heures pour avoir un tabouret.",
      "Il n'a jamais agrandi. On lui a proposé le local d'à côté trois fois ; il a refusé trois fois. Sa raison était toujours la même : il voulait pouvoir voir tout le monde depuis derrière le comptoir.",
    ],
    pull: "Il voulait pouvoir voir tout le monde depuis derrière le comptoir.",
  },
  {
    id: "deuxieme",
    years: "1994 – 2018",
    eyebrow: "Deuxième génération",
    title: "Faire grandir sans perdre l'essentiel",
    paragraphs: [
      "La deuxième génération a hérité d'un commerce qui marchait et d'une question qui ne se laissait pas contourner : est-ce qu'on peut faire grandir un endroit sans en diluer exactement ce qui le rendait tenable ?",
      "La réponse a pris vingt ans à se formuler, et elle est devenue une discipline plutôt qu'une stratégie. Chaque décision — un fournisseur, une machine, une deuxième adresse envisagée puis abandonnée — passait par une seule mesure : est-ce que le geste d'origine survit à ce changement ?",
      "Beaucoup de choses ont échoué à ce test. Un contrat de distribution en épicerie, signé puis résilié après huit mois parce que le café arrivait sur les tablettes cinq semaines après la torréfaction. Une carte élargie à trente items, ramenée à douze en une saison.",
      "Ce qui a survécu au test a tenu. La torréfaction est passée en interne en 2003 et n'en est jamais ressortie. Le comptoir d'origine, poncé quatre fois, est toujours le comptoir.",
    ],
    pull: "Est-ce que le geste d'origine survit à ce changement ?",
  },
  {
    id: "nom",
    years: "Janvier 1998",
    eyebrow: "D'où vient le nom",
    title: "La semaine où la ville a éteint",
    paragraphs: [
      "Le verglas a pris la ville un mardi. Pendant cinq jours, une partie de Montréal est restée sans électricité, sans chauffage, et pour beaucoup de gens, sans endroit où aller le matin.",
      "Le local n'avait pas de courant non plus. Le grand-père, qui avait alors soixante-huit ans et n'était plus censé travailler, est venu chaque matin avec un réchaud de camping et a fait du café sur le trottoir pour qui en voulait. Il n'a rien facturé de la semaine.",
      "Quand sa fille lui a demandé pourquoi il ne restait pas chez lui au chaud comme tout le monde, il a répondu quelque chose qui est resté dans la famille et qui, vingt ans plus tard, est devenu le nom de l'endroit : peu importe. On ouvre.",
      "Ce n'est pas un slogan. C'est une description de ce qui s'est passé cette semaine-là, et de ce qu'on attend de nous depuis.",
    ],
  },
  {
    id: "troisieme",
    years: "Depuis 2019",
    eyebrow: "Troisième génération",
    title: "Café, galerie, boutique — un même fil",
    paragraphs: [
      "La troisième génération a fait la seule chose que les deux premières n'avaient pas faite : elle a laissé entrer autre chose que du café.",
      "Les murs, restés nus pendant cinquante ans, accrochent maintenant le travail d'artistes montréalais, en rotation toutes les huit semaines. Une boutique s'est ajoutée — de la céramique, des cafetières, des objets choisis selon un critère unique et hérité : est-ce que ça va durer plus longtemps que la mode qui l'a rendu désirable ?",
      "C'est une extension, pas un virage. Un artiste accroché ici est traité comme un producteur de café l'est depuis 2003 : nommé, payé correctement, et présenté avec ses conditions de travail écrites sur la fiche à côté de l'œuvre.",
      "Le comptoir n'a pas bougé. On voit encore tout le monde depuis derrière.",
    ],
    pull: "Une extension, pas un virage.",
    photo: "/images/famille-trois-generations.jpg",
  },
];
