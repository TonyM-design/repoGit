class Carte {
  constructor(nombreColonne, nombreCellule, nombreArmes, nombreCelluleGrise, nombreJoueur) {
    this.nombreColonne = nombreColonne;
    this.nombreCellule = nombreCellule;
    this.nombreArmes = nombreArmes;
    this.nombreJoueur = nombreJoueur;
    this.nombreCelluleGrise = nombreCelluleGrise;
    this.nombreArmesPresentes = 0;
    this.nombreCelluleGrisePresente = 0;
    this.tableauColonnes = [];
    this.nombreJoueurPresent = 0;
    this.stockageEmplacementOrigine = null;
    this.genererCarteVierge();
    this.joueurActif = null;
  }


  genererCarteVierge() {
    // CREATION TABLEAU DEUX DIMENSIONS STOCKAGE OBJ celluleVide 
    this.tableauColonnes = new Array(this.nombreColonne);
    for (let i = 0; i < this.nombreColonne; i++) {
      this.tableauColonnes[i] = new Array(this.nombreCellule);
      for (let j = 0; j < this.nombreCellule; j++) {
        this.tableauColonnes[i][j] = new Cellule(i, j, "celluleVide", null, true);
      }
    }
  }

 placerCasesSpeciales(listeJoueurs) {
    this.ajouterJoueurCarte(listeJoueurs);
    this.ajouterArmeCarte();
    this.ajouterBlocGrisCarte();
    this.placerTableHTML()
  }




  selectionCelluleAleatoire() {
    const positionX = genererAleatoire(0, this.nombreColonne);
    const positionY = genererAleatoire(0, this.nombreCellule);
    return this.tableauColonnes[positionX][positionY];


  }

  // SECTION DEPLACEMENT 

  verifierCaseDeplacement(caseDirection) {
    if (caseDirection === undefined) {
      return false;
    }

    else { return true }

  }

  verifierCaseTraversable(caseDirection) {
    if (this.verifierCaseDeplacement(caseDirection) === true) {
      if (this.tableauColonnes[caseDirection.positionX][caseDirection.positionY].traversable === false) {
        return false;
      }
      else { return true }
    }


  }

  caseGauche(joueurActif) {
    return this.tableauColonnes[joueurActif.positionX][joueurActif.positionY - 1];
  }

  caseHaut(joueurActif) {
    if (this.tableauColonnes[joueurActif.positionX - 1] === undefined) {
    }
    else {
      return this.tableauColonnes[joueurActif.positionX - 1][joueurActif.positionY];
    }
  }

  caseDroite(joueurActif) {
    return this.tableauColonnes[joueurActif.positionX][joueurActif.positionY + 1];
  }

  caseBas(joueurActif) {
    if (this.tableauColonnes[joueurActif.positionX + 1] === undefined) {
    }
    else {
      return this.tableauColonnes[joueurActif.positionX + 1][joueurActif.positionY];
    }
  }

  // VERIFICATION CASE APPARITION JOUEUR
  verifierCasesAdjacentes(caseJoueur) {
    if (this.tableauColonnes[caseJoueur.positionX - 1] !== undefined && this.tableauColonnes[caseJoueur.positionX - 1][caseJoueur.positionY].typeCase !== "celluleVide") {
      return false;
    } else if (this.tableauColonnes[caseJoueur.positionX][caseJoueur.positionY + 1] !== undefined && this.tableauColonnes[caseJoueur.positionX][caseJoueur.positionY + 1].typeCase !== "celluleVide") {
      return false;
    } else if (this.tableauColonnes[caseJoueur.positionX + 1] !== undefined && this.tableauColonnes[caseJoueur.positionX + 1][caseJoueur.positionY].typeCase !== "celluleVide") {
      return false;
    } else if (this.tableauColonnes[caseJoueur.positionX][caseJoueur.positionY - 1] !== undefined && this.tableauColonnes[caseJoueur.positionX][caseJoueur.positionY - 1].typeCase !== "celluleVide") {
      return false;
    }
    return true;
  }


  detecterAdversaire(carteCaseDirection) {
    if (carteCaseDirection !== undefined && carteCaseDirection.traversable === false && carteCaseDirection.typeCase !== "cellulegrise") {
      return true
    }
  }

  determinerPositionAdversaireCasesAdjacentes(joueurActif) {
    if (this.detecterAdversaire(this.caseGauche(joueurActif)) === true) {
      return this.caseGauche(joueurActif);
    }

    else if (this.detecterAdversaire(this.caseHaut(joueurActif)) === true) {
      return this.caseHaut(joueurActif);
    }

    else if (this.detecterAdversaire(this.caseDroite(joueurActif)) === true) {
      return this.caseDroite(joueurActif);
    }

    else if (this.detecterAdversaire(this.caseBas(joueurActif)) === true) {
      return this.caseBas(joueurActif);
    }
    else {
      return false;
    }
  }

  // PLACEMENT DES CASES SPECIALES
  ajouterJoueurCarte(listeJoueurs) {
    for (var i = 0; i < listeJoueurs.length; i++) {
      while (listeJoueurs[i].presenceValide == false) {
        const caseJoueur = this.selectionCelluleAleatoire()
        if (caseJoueur.typeCase == "celluleVide" && this.verifierCasesAdjacentes(caseJoueur) === true) { // probleme this.verifierCase
          caseJoueur.typeCase = `joueur${listeJoueurs[i].numeroJoueur}`;
          caseJoueur.contenu = listeJoueurs[i];
          listeJoueurs[i].positionX = caseJoueur.positionX;
          listeJoueurs[i].positionY = caseJoueur.positionY;
          listeJoueurs[i].presenceValide = true;
          caseJoueur.traversable = false;
        }
      };
    }
  }

  ajouterArmeCarte() {
    const mapTypeArmes = new Map([
    [1, 'AnneauEpique'],
    [2, 'BouclierSimple'],
    [3, 'BouclierEpique'],
    [4, 'AnneauSimple'],
    [5, 'EpeeEpique'],
    [6, 'CasqueSimple'],
    [7, 'CasqueEpique'],

    ])
    while (this.nombreArmesPresentes < this.nombreArmes) {
      const caseArme = this.selectionCelluleAleatoire();
      if (caseArme.typeCase == "celluleVide") {
        caseArme.typeCase = mapTypeArmes.get(genererAleatoire(1, 7));
        switch (caseArme.typeCase) {
          case 'AnneauSimple':
            // créer l'objet AnneauSImple
            caseArme.contenu = new AnneauSimple();
            break;
          case 'AnneauEpique':
            // créer l'objet AnneauEpique
            caseArme.contenu = new AnneauEpique();
            break;
          case 'BouclierSimple':
            // créer l'objet BouclierSimple
            caseArme.contenu = new BouclierSimple();
            break;
          // créer l'objet BouclierEpique
          case 'BouclierEpique':
            caseArme.contenu = new BouclierEpique();
            break;
          case 'EpeeSimple':
            // créer l'objet EpeeSimple
            caseArme.contenu = new EpeeSimple();
            break;
          case 'EpeeEpique':
            // créer l'objet EpeeEpique
            caseArme.contenu = new EpeeEpique();
            break;
          case 'CasqueSimple':
            // créer l'objet CasqueSimple
            caseArme.contenu = new CasqueSimple();
            break;
          case 'CasqueEpique':
            // créer l'objet CasqueEpique
            caseArme.contenu = new CasqueEpique();
            break;

        }

        this.nombreArmesPresentes++;

      }
    }
  }



  ajouterBlocGrisCarte() {
    while (this.nombreCelluleGrisePresente < this.nombreCelluleGrise) {
      const caseBlocGris = this.selectionCelluleAleatoire();
      if (caseBlocGris.typeCase === "celluleVide") {
        caseBlocGris.typeCase = 'cellulegrise';
        caseBlocGris.traversable = false;
        this.nombreCelluleGrisePresente++;
      }
    }
  }



  //PLACEMENT DES CELLULES DANS LE TABLE HTML

  placerTableHTML() {
    for (let i = 0; i < this.nombreColonne; i++) {
      $('#plateaudejeu').append(`<tr class="rangeetablejeu" id="rangee${i}"></tr>`);
      for (let j = 0; j < this.nombreCellule; j++) {
        $('#rangee' + i).append(`<td class="${this.tableauColonnes[i][j].typeCase}" id="cellule${i}${j}"></td>`);

      }
    }
  }

  rafraichirTableHTML() {

    $($('#plateaudejeu tr td')).remove('td');
    for (let i = 0; i < this.nombreColonne; i++) {
      $('#plateaudejeu').append(`<tr class="rangeetablejeu" id="rangee${i}"></tr>`);
      for (let j = 0; j < this.nombreCellule; j++) {
        $('#rangee' + i).append(`<td class="${this.tableauColonnes[i][j].typeCase}" id="cellule${i}${j}"></td>`);

      }
    }
  }


  ajouterVisuelJoueurActif(auJoueurActif) {
    $(`.joueur${auJoueurActif.numeroJoueur}`).addClass("visuelVibration");
    $(`.joueur${auJoueurActif.numeroJoueur}`).addClass("actif");

  }

  enleverVisuelJoueurActif(auJoueurActif) {
    $(`.joueur${auJoueurActif.numeroJoueur}`).removeClass("actif");

  }

  /* NOUVEAU TEST AJOUT VISUEL 30/07 14h*/
  ajouterVisuelDeplacement(joueurActif, caseDirection) {
    if (joueurActif.compteurDeplacement < 3) {
      this.ajouterVisuelDeplacementDirection(joueurActif, caseDirection);
    }
    else {
      this.ajouterVisuelDeplacementDisponibleOrigine(joueurActif)
    }
  }


  ajouterVisuelDeplacementDirection(joueurActif, caseDirection) { // valide

    for (let k = 0; k < joueurActif.compteurDeplacement; k++) {
      if ( caseDirection !== undefined){
      if (caseDirection.traversable === true ) {
        if (joueurActif.directionDeplacement === "Gauche") {
          $(`#cellule${caseDirection.positionX}${caseDirection.positionY - k}`).addClass("visuelVibration");
        }
        else if (joueurActif.directionDeplacement === "Haut") {
          $(`#cellule${caseDirection.positionX - k}${caseDirection.positionY}`).addClass("visuelVibration");
        }
        else if (joueurActif.directionDeplacement === "Droite") {
          $(`#cellule${caseDirection.positionX}${caseDirection.positionY + k}`).addClass("visuelVibration");
        }
        else if (joueurActif.directionDeplacement === "Bas") {
          $(`#cellule${caseDirection.positionX + k}${caseDirection.positionY}`).addClass("visuelVibration");
        }
      }
      else { break }
    }
  }
  }


  ajouterVisuelDeplacementDisponibleOrigine(joueurActif) {

    for (let k = 0; k < joueurActif.compteurDeplacement + 1; k++) {
      if (this.tableauColonnes[joueurActif.positionX][joueurActif.positionY - k] !== undefined) {
        if (this.tableauColonnes[joueurActif.positionX][joueurActif.positionY - k].typeCase === 'cellulegrise') {
          break;
        }
        else {
          $(`#cellule${joueurActif.positionX}${joueurActif.positionY - k}`).addClass("visuelVibration");
        }
      }
      else { break }
    }
    for (let k = 0; k < joueurActif.compteurDeplacement + 1; k++) {
      if (this.tableauColonnes[joueurActif.positionX - k] !== undefined) {
        if (this.tableauColonnes[joueurActif.positionX - k][joueurActif.positionY].typeCase === 'cellulegrise') {
          break;
        }
        else {
          $(`#cellule${joueurActif.positionX - k}${joueurActif.positionY}`).addClass("visuelVibration");
        }
      }
      else { break }
    }
    for (let k = 0; k < joueurActif.compteurDeplacement + 1; k++) {
      if (this.tableauColonnes[joueurActif.positionX][joueurActif.positionY + k] !== undefined) {
        if (this.tableauColonnes[joueurActif.positionX][joueurActif.positionY + k].typeCase === 'cellulegrise') {
          break;
        }
        else {
          $(`#cellule${joueurActif.positionX}${joueurActif.positionY + k}`).addClass("visuelVibration");
        }
      }
      else { break }
    }

    for (let k = 0; k < joueurActif.compteurDeplacement + 1; k++) {
      if (this.tableauColonnes[joueurActif.positionX + k] !== undefined) {
        if (this.tableauColonnes[joueurActif.positionX + k][joueurActif.positionY].typeCase === 'cellulegrise') {
          break;
        }
        else {
          $(`#cellule${joueurActif.positionX + k}${joueurActif.positionY}`).addClass("visuelVibration");
        }
      }
      else { break }
    }

  }



  creerStockageEmplacementOrigine(joueurActif) {
    this.stockageEmplacementOrigine = this.tableauColonnes[joueurActif.positionX][joueurActif.positionY];
    return this.stockageEmplacementOrigine;
  }

  remplacerParCaseArme(joueurActif) {
    this.stockageEmplacementOrigine.contenu = joueurActif.equipements[1];
    this.stockageEmplacementOrigine.typeCase = `${joueurActif.equipements[1].nom}`;
    this.stockageEmplacementOrigine.traversable = true;
  }

  testremplacerParCaseArme(joueurActif) {
    this.stockageEmplacementOrigine.contenu = joueurActif.deposerArme();
    this.stockageEmplacementOrigine.typeCase = `${this.stockageEmplacementOrigine.nom}`;
    this.stockageEmplacementOrigine.traversable = true;
  }


  // REMPLACER ANCIENNE CASE PAR CELLULE VIDE
  remplacerParCelluleVide() {
    this.stockageEmplacementOrigine.contenu = null;
    this.stockageEmplacementOrigine.typeCase = `celluleVide`;
    this.stockageEmplacementOrigine.traversable = true;
  }

  remplacerParCaseJoueur(caseSuivante, joueurActif) { 
    // CREER LA NOUVELLE CASE JOUEUR
    caseSuivante.contenu = joueurActif;
    caseSuivante.typeCase = `joueur${joueurActif.numeroJoueur}`;
    caseSuivante.traversable = false;
  }

}
