class Jeu {
  constructor(listeNomJoueur, carte) {
    this.listeNomJoueur = listeNomJoueur
    this.nombreJoueurAttendu = this.listeNomJoueur.length;
    this.listeJoueurs = [];
    this.barreVies = [];
    this.carte = carte;
    this.ajouterJoueur(this.nombreJoueurAttendu);
    this.systemeTours = new SystemeTour(this.listeJoueurs);
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
      const joueurCible = this.systemeTours.joueurActif; // attribut le joueurCible a Deplacement.js // A MODIFIER 
      this.carte.rafraichirTableHTML();      
      this.carte.ajouterVisuelJoueurActif(joueurCible);



      if (event.which == 37) {// fleche Gauche code ascii 37
        event.preventDefault();        
        if (this.deplacement.gererExceptionDeplacement(this.carte.caseGauche(joueurCible), "Gauche",joueurCible) !== false) {
          joueurCible.directionDeplacement = "Gauche";
          this.deplacement.effectuerDeplacementJoueur(this.carte.caseGauche(joueurCible), "Gauche", joueurCible);
          this.carte.ajouterVisuelDeplacementDirection(joueurCible, this.carte.caseGauche(joueurCible));
          this.changerAutomatiquementJoueurActif();
        }
      }
     
      if (event.which == 38) {      // fleche Haut  code ascii 38
        event.preventDefault();
        if (this.deplacement.gererExceptionDeplacement(this.carte.caseHaut(joueurCible), "Haut",joueurCible) !== false) {
          joueurCible.directionDeplacement = "Haut";
          this.deplacement.effectuerDeplacementJoueur(this.carte.caseHaut(joueurCible), "Haut", joueurCible);
          this.carte.ajouterVisuelDeplacementDirection(joueurCible, this.carte.caseHaut(joueurCible));
          this.changerAutomatiquementJoueurActif();
        }
      }
      if (event.which == 39) { // fleche Droite  code ascii 39
        event.preventDefault();
        if (this.deplacement.gererExceptionDeplacement(this.carte.caseDroite(joueurCible), "Droite",joueurCible) !== false) {
          joueurCible.directionDeplacement = "Droite";
          this.deplacement.effectuerDeplacementJoueur(this.carte.caseDroite(joueurCible), "Droite", joueurCible);
          this.carte.ajouterVisuelDeplacementDirection(joueurCible, this.carte.caseDroite(joueurCible));
          this.changerAutomatiquementJoueurActif();
        }
      }
      if (event.which == 40) { // fleche Bas  code ascii 40
        event.preventDefault();
        if (this.deplacement.gererExceptionDeplacement(this.carte.caseBas(joueurCible), "Bas",joueurCible) !== false) {
          joueurCible.directionDeplacement = "Bas";
          this.deplacement.effectuerDeplacementJoueur(this.carte.caseBas(joueurCible), "Bas", joueurCible);
          this.carte.ajouterVisuelDeplacementDirection(joueurCible, this.carte.caseBas(joueurCible));
          this.changerAutomatiquementJoueurActif();
        }
      }
      if (event.which == 32) { // espace fin de deplacement, declenchement phase de combat si possible
        event.preventDefault();
        joueurCible.compteurDeplacement = 0;
        if (joueurCible.postureDefensive === false) {
          this.declencherCombatCasesAdjacentes();
        }
        this.changerAutomatiquementJoueurActif();
      }
      if (event.which == 96) { // pav num 0 permet au joueur de changer de posture // compteurdeplacement = 0 car le changement de posture est une partie du combat
        event.preventDefault();
        joueurCible.compteurDeplacement = 0;

        this.gestionBarreVie.barreVies[this.systemeTours.listeJoueurs.indexOf(joueurCible)].creerIconePostureDefensive(joueurCible) // a remettre dans gestion
        joueurCible.changerPosture();
        this.changerAutomatiquementJoueurActif();
      }
      else {
        if (joueurCible.compteurDeplacement === 3) {
          this.carte.ajouterVisuelDeplacementDisponibleOrigine(joueurCible);
        }
        else {
          if (joueurCible.directionDeplacement === "Gauche") {
            this.carte.ajouterVisuelDeplacement(joueurCible, this.carte.caseGauche(joueurCible));
          }
          else if (joueurCible.directionDeplacement === "Haut") {
            this.carte.ajouterVisuelDeplacementDirection(joueurCible, this.carte.caseHaut(joueurCible));
          }
          else if (joueurCible.directionDeplacement === "Droite") {
            this.carte.ajouterVisuelDeplacementDirection(joueurCible, this.carte.caseDroite(joueurCible));
          }
          else if (joueurCible.directionDeplacement === "Bas") {
            this.carte.ajouterVisuelDeplacementDirection(joueurCible, this.carte.caseBas(joueurCible));
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

      this.systemeTours.joueurActif.compteurDeplacement = 3;
      this.systemeTours.joueurActif.directionDeplacement = null;
      this.carte.rafraichirTableHTML();
            this.carte.ajouterVisuelJoueurActif(this.systemeTours.joueurActif)
            this.carte.ajouterVisuelDeplacementDisponibleOrigine(this.systemeTours.joueurActif);

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


















