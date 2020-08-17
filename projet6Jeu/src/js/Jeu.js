class Jeu {
  constructor(listeNomJoueur, carte) {
    this.listeNomJoueur = listeNomJoueur
    this.nombreJoueurAttendu = this.listeNomJoueur.length;
    this.listeJoueurs = [];
    this.carte = carte;
    this.ajouterJoueur(this.nombreJoueurAttendu);
    this.fileAttentes = [];
        this.systemeTours = new SystemeTour(this.listeJoueurs); 
    this.barreVie = new BarreVie(this.listeJoueurs, this.systemeTours); 

    this.combat = new Combat(this.carte,this.barreVie, this.systemeTours);
    this.deplacement = new Deplacement(this.systemeTours, this.carte, this.combat); 

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
      this.carte.ajouterVisuelJoueurActif(this.systemeTours.joueurActif);
      this.carte.rafraichirTableHTML();
      if (event.which == 37) {// fleche Gauche code ascii 37
        event.preventDefault();
        this.deplacement.effectuerDeplacementJoueur(this.carte.caseGauche(this.systemeTours.joueurActif), "Gauche")
        if (this.deplacement.gererExceptionDeplacement(this.carte.caseGauche(this.systemeTours.joueurActif), "Gauche") !== false) {
          this.carte.ajouterVisuelDeplacementDirection(this.systemeTours.joueurActif, this.carte.caseGauche(this.systemeTours.joueurActif))
          this.changerAutomatiquementJoueurActif();
        }
      }
      if (event.which == 38) {      // fleche Haut  code ascii 38
        event.preventDefault();
        this.deplacement.effectuerDeplacementJoueur(this.carte.caseHaut(this.systemeTours.joueurActif), "Haut")
        if (this.deplacement.gererExceptionDeplacement(this.carte.caseHaut(this.systemeTours.joueurActif), "Haut") !== false) {
          this.carte.ajouterVisuelDeplacementDirection(this.systemeTours.joueurActif, this.carte.caseHaut(this.systemeTours.joueurActif))
          this.changerAutomatiquementJoueurActif();
        }
      }
      if (event.which == 39) { // fleche Droite  code ascii 39
        event.preventDefault();
        this.deplacement.effectuerDeplacementJoueur(this.carte.caseDroite(this.systemeTours.joueurActif), "Droite");
        if (this.deplacement.gererExceptionDeplacement(this.carte.caseDroite(this.systemeTours.joueurActif), "Droite") !== false) {
          this.carte.ajouterVisuelDeplacementDirection(this.systemeTours.joueurActif, this.carte.caseDroite(this.systemeTours.joueurActif))
          this.changerAutomatiquementJoueurActif();
        }
      }
      if (event.which == 40) { // fleche Bas  code ascii 40
        event.preventDefault();
        this.deplacement.effectuerDeplacementJoueur(this.carte.caseBas(this.systemeTours.joueurActif), "Bas");
        if (this.deplacement.gererExceptionDeplacement(this.carte.caseBas(this.systemeTours.joueurActif), "Bas") !== false) {
          this.carte.ajouterVisuelDeplacementDirection(this.systemeTours.joueurActif, this.carte.caseBas(this.systemeTours.joueurActif))
          this.changerAutomatiquementJoueurActif();
        }
      }
      if (event.which == 32) { // espace fin de deplacement, declenchement phase de combat si possible
        event.preventDefault();
        this.systemeTours.joueurActif.compteurDeplacement = 0;
        this.combat.declencherCombatCasesAdjacentes();
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

  changerAutomatiquementJoueurActif(){
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


















