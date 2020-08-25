class Jeu {
  constructor(listeNomJoueur, carte) {
    this.listeNomJoueur = listeNomJoueur
    this.nombreJoueurAttendu = this.listeNomJoueur.length;
    this.listeJoueurs = [];
    this.barreVies = [];
    this.carte = carte;
    this.ajouterJoueur(this.nombreJoueurAttendu);
    this.systemeTours = new SystemeTour(this.listeJoueurs);
    for (let i = 0; i < this.listeJoueurs.length; i++) {
      const barreVie = new BarreVie(this.listeJoueurs, i)
      this.barreVies.push(barreVie);
    }
    this.gestionBarreVie = new GestionBarreVie(this.systemeTours);
    this.deplacement = new Deplacement(this.carte);

  }

  ajouterJoueur() {
    for (let k = 0; k < this.nombreJoueurAttendu; k++) {
      const ajoutJoueur = new Joueur;
      this.listeJoueurs.push(ajoutJoueur);
      ajoutJoueur.numeroJoueur = k;
      ajoutJoueur.nom = this.listeNomJoueur[k]
    }
  }




  // SYSTEME DE JEU 

  creerBoucleJeu() {
    // initialisation effet visuel premier tour
    this.carte.ajouterVisuelJoueurActif(this.systemeTours.joueurActif);
    this.carte.ajouterVisuelDeplacementDisponibleOrigine(this.systemeTours.joueurActif);
    // reaction aux touches
    $(document).keydown((event) => {
      this.deplacement.joueurCible = this.systemeTours.joueurActif;
      this.carte.ajouterVisuelJoueurActif(this.systemeTours.joueurActif);
      this.carte.rafraichirTableHTML();
      if (event.which == 37) {// fleche Gauche code ascii 37
        event.preventDefault();
        if (this.deplacement.joueurCible.directionDeplacement === null || this.deplacement.joueurCible.directionDeplacement === "Gauche") {
          this.deplacement.joueurCible.directionDeplacement = "Gauche";
          this.deplacement.effectuerDeplacementJoueur(this.carte.caseGauche(this.systemeTours.joueurActif), "Gauche")
          this.carte.ajouterVisuelDeplacementDirection(this.systemeTours.joueurActif, this.carte.caseGauche(this.systemeTours.joueurActif))
          this.declencherCombat(this.carte.caseGauche(this.systemeTours.joueurActif));
          this.changerAutomatiquementJoueurActif();
        }
      }
      if (event.which == 38) {      // fleche Haut  code ascii 38
        event.preventDefault();
        if (this.deplacement.joueurCible.directionDeplacement === null || this.deplacement.joueurCible.directionDeplacement === "Haut") {
          this.deplacement.joueurCible.directionDeplacement = "Haut";
          this.deplacement.effectuerDeplacementJoueur(this.carte.caseHaut(this.systemeTours.joueurActif), "Haut")
          this.carte.ajouterVisuelDeplacementDirection(this.systemeTours.joueurActif, this.carte.caseHaut(this.systemeTours.joueurActif))
          this.declencherCombat(this.carte.caseHaut(this.systemeTours.joueurActif));
          this.changerAutomatiquementJoueurActif();
        }
      }
      if (event.which == 39) { // fleche Droite  code ascii 39
        event.preventDefault();
        if (this.deplacement.joueurCible.directionDeplacement === null || this.deplacement.joueurCible.directionDeplacement === "Droite") {
          this.deplacement.joueurCible.directionDeplacement = "Droite";
          this.deplacement.effectuerDeplacementJoueur(this.carte.caseDroite(this.systemeTours.joueurActif), "Droite");
          this.carte.ajouterVisuelDeplacementDirection(this.systemeTours.joueurActif, this.carte.caseDroite(this.systemeTours.joueurActif))
          this.declencherCombat(this.carte.caseDroite(this.systemeTours.joueurActif));
          this.changerAutomatiquementJoueurActif();
        }
      }
      if (event.which == 40) { // fleche Bas  code ascii 40
        event.preventDefault();
        if (this.deplacement.joueurCible.directionDeplacement === null || this.deplacement.joueurCible.directionDeplacement === "Bas") {
          this.deplacement.joueurCible.directionDeplacement = "Bas";
          this.deplacement.effectuerDeplacementJoueur(this.carte.caseBas(this.systemeTours.joueurActif), "Bas");
          this.carte.ajouterVisuelDeplacementDirection(this.systemeTours.joueurActif, this.carte.caseBas(this.systemeTours.joueurActif))
          this.declencherCombat(this.carte.caseBas(this.systemeTours.joueurActif));
          this.changerAutomatiquementJoueurActif();
        }
      }
      if (event.which == 32) { // espace fin de deplacement, declenchement phase de combat si possible
        event.preventDefault();
        this.systemeTours.joueurActif.compteurDeplacement = 0;
        if (this.systemeTours.joueurActif.postureDefensive === false) {
          this.declencherCombatCasesAdjacentes();
        }
        this.changerAutomatiquementJoueurActif();
      }
      if (event.which == 96) { // pav num 0 permet au joueur de changer de posture // compteurdeplacement = 0 car le changement de posture est une partie du combat
        event.preventDefault();
        this.systemeTours.joueurActif.compteurDeplacement = 0;

        this.barreVie.creerIconePostureDefensive(this.systemeTours.joueurActif)
        this.systemeTours.joueurActif.changerPosture();
        this.changerAutomatiquementJoueurActif();
      }
      else {
        if (this.systemeTours.joueurActif.compteurDeplacement === 3) {
          this.carte.ajouterVisuelDeplacementDisponibleOrigine(this.systemeTours.joueurActif);
        }
        else {
          if (this.systemeTours.joueurActif.directionDeplacement === "Gauche") {
            this.carte.ajouterVisuelDeplacement(this.systemeTours.joueurActif, this.carte.caseGauche(this.systemeTours.joueurActif));
          }
          else if (this.systemeTours.joueurActif.directionDeplacement === "Haut") {
            this.carte.ajouterVisuelDeplacementDirection(this.systemeTours.joueurActif, this.carte.caseHaut(this.systemeTours.joueurActif));
          }
          else if (this.systemeTours.joueurActif.directionDeplacement === "Droite") {
            this.carte.ajouterVisuelDeplacementDirection(this.systemeTours.joueurActif, this.carte.caseDroite(this.systemeTours.joueurActif));
          }
          else if (this.systemeTours.joueurActif.directionDeplacement === "Bas") {
            this.carte.ajouterVisuelDeplacementDirection(this.systemeTours.joueurActif, this.carte.caseBas(this.systemeTours.joueurActif));
          }

        }
      }
      this.verifierSanteJoueurs();

    }
    );

  }

  changerAutomatiquementJoueurActif() {
    if (this.systemeTours.joueurActif.compteurDeplacement === 0) {
      this.carte.enleverVisuelJoueurActif(this.systemeTours.joueurActif);
      this.systemeTours.changerJoueurActif();
      this.systemeTours.determinerJoueurActif();
      this.carte.ajouterVisuelJoueurActif(this.systemeTours.joueurActif)
      this.systemeTours.joueurActif.compteurDeplacement = 3;
      this.systemeTours.joueurActif.directionDeplacement = null;
      this.carte.rafraichirTableHTML();
    }
  }


  // declenchement du combat lorsque le joueur se deplace sur une case ayant deja un joueur
  declencherCombat(carteCaseDirection) {
    const joueurActif = this.systemeTours.determinerJoueurActif();
    this.joueurActif = joueurActif;
    if (this.carte.verifierCaseDeplacement(carteCaseDirection) === true && this.carte.verifierCaseTraversable(carteCaseDirection) === false && carteCaseDirection.typeCase !== "cellulegrise" && this.joueurActif.postureDefensive === false) {
    this.joueurActif.attaquer(carteCaseDirection.contenu);
    this.gestionBarreVie.majBarreVie(carteCaseDirection.contenu);
    this.joueurActif.compteurDeplacement = 0;
    }
  }
  // declenchement combat lorsque joueur present sur case adj
  declencherCombatCasesAdjacentes() {
    const joueurActif = this.systemeTours.determinerJoueurActif();
    this.joueurActif = joueurActif;
    if (this.carte.determinerPositionAdversaireCasesAdjacentes(this.joueurActif) !== false) {
      this.joueurActif.attaquer(this.carte.determinerPositionAdversaireCasesAdjacentes(this.joueurActif).contenu);
      this.gestionBarreVie.majBarreVie(this.carte.determinerPositionAdversaireCasesAdjacentes(this.joueurActif).contenu);
    }
  }

  verifierSanteJoueurs() {
    for (let i = 0; i < this.listeJoueurs.length; i++) {
      if (this.listeJoueurs[i].sante === 0) {
        this.carte.tableauColonnes[this.listeJoueurs[i].positionX][this.listeJoueurs[i].positionY].typeCase = "celluleVide";
        this.listeJoueurs.splice(this.listeJoueurs.indexOf(this.listeJoueurs[i]), 1);
        this.carte.rafraichirTableHTML();
        alert("FIN DE LA PARTIE, POUR RELANCER LE JEU, RAFRAICHISSEZ LA PAGE")
      }
    }
  }
  supprimerJoueur() {
    listeJoueurs.forEach(listeJoueur => {
      if (listeJoueur.sante === 0) {
        this.listeJoueurs.splice(this.listeJoueurs.indexOf(listeJoueur), 1); // supprime 1 élément à la position pos
      }

    });
    return this.listeJoueurs;
  }
}
// EXECUTION


















