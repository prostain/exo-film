'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
const date1 = new Date(2009, 8, 19);
const date2 = new Date(1994, 10, 5);
const date3 = new Date(2003, 12, 17);

    await queryInterface.bulkInsert('Films', [{
      name: "INGLOURIOUS BASTERDS",
      description:"Dans la France occupée de 1940, Shosanna Dreyfus assiste à l\'exécution de sa famille tombée entre les mains du colonel nazi Hans Landa. Shosanna s\'échappe de justesse et s\'enfuit à Paris où elle se construit une nouvelle identité en devenant exploitante d\'une salle de cinéma.Quelque part ailleurs en Europe, le lieutenant Aldo Raine forme un groupe de soldats juifs américains pour mener des actions punitives particulièrement sanglantes contre les nazis. \"Les bâtards\", nom sous lequel leurs ennemis vont apprendre à les connaître, se joignent à l\'actrice allemande et agent secret Bridget von Hammersmark pour tenter d\'éliminer les hauts dignitaires du Troisième Reich. Leurs destins vont se jouer à l\'entrée du cinéma où Shosanna est décidée à mettre à exécution une vengeance très personnelle...",
      date:date1,
      note:4,
      duration:153,
      url:"",
      createdAt: new Date(),
      updatedAt: new Date()
  }, {
    name: "FORREST GUMP",
    description:"Quelques décennies d'histoire américaine, des années 1940 à la fin du XXème siècle, à travers le regard et l'étrange odyssée d'un homme simple et pur, Forrest Gump.",
    date:date2,
    note:5,
    duration:140,
    url:"",
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    name: "LE SEIGNEUR DES ANNEAUX : LE RETOUR DU ROI",
    description:"Les armées de Sauron ont attaqué Minas Tirith, la capitale de Gondor. Jamais ce royaume autrefois puissant n'a eu autant besoin de son roi. Mais Aragorn trouvera-t-il en lui la volonté d'accomplir sa destinée ? Tandis que Gandalf s'efforce de soutenir les forces brisées de Gondor, Théoden exhorte les guerriers de Rohan à se joindre au combat. Mais malgré leur courage et leur loyauté, les forces des Hommes ne sont pas de taille à lutter contre les innombrables légions d'ennemis qui s'abattent sur le royaume...",
    date:date3,
    note:4,
    duration:201,
    url:"",
    createdAt: new Date(),
    updatedAt: new Date()
  }]);

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Films', null, {});

  }
};
