class Deplacement{
    
  constructor(carte){

    this.carte = carte;
}
effectuerDeplacementJoueur(carteCaseDirection, valeurDirectionDeplacementJoueur,joueurCible) {
   
      if ((this.carte.verifierCaseDeplacement(carteCaseDirection) === true) && (joueurCible.directionDeplacement === null || joueurCible.directionDeplacement === valeurDirectionDeplacementJoueur) && (joueurCible.compteurDeplacement !== 0) && this.carte.verifierCaseTraversable(carteCaseDirection) === true) {
       
        // SI AU DEPLACEMENT PRECEDENT LE JOUEUR A RECUPERE UNE ARME
        if (joueurCible.equipements.length !== 1) {
          this.carte.creerStockageEmplacementOrigine(joueurCible);
          this.carte.remplacerParCaseArme(joueurCible); // la case arme est créer a l'adresse du contenu de stockageCaseJoueur
          joueurCible.deposerArme(); // on supprime l'arme de l'equipements[]
        }

        // OCCURENCE CASE ARME
        else if (carteCaseDirection.typeCase !== "celluleVide") {
          this.carte.creerStockageEmplacementOrigine(joueurCible);
          joueurCible.recupererArme(carteCaseDirection);
          this.carte.remplacerParCelluleVide();
      }
        // OCCURENCE CELLULE VIDE
        else if (carteCaseDirection.typeCase === "celluleVide") {
          this.carte.creerStockageEmplacementOrigine(joueurCible);
          this.carte.remplacerParCelluleVide();
      }

        this.carte.remplacerParCaseJoueur(carteCaseDirection, joueurCible); /////////////////////////////////////////////////
        joueurCible.seDeplacer();
        this.carte.rafraichirTableHTML();
        this.carte.ajouterVisuelJoueurActif(joueurCible);
      }
      // OCCURENCE DEPLACEMENT VERS CASE INEXISTANTE OU OCCUPEE T0
      else if (this.carte.verifierCaseDeplacement(carteCaseDirection) !== true && joueurCible.compteurDeplacement === 3) {
        this.carte.ajouterVisuelDeplacementDisponibleOrigine(joueurCible);
      }
    }
  
  gererExceptionDeplacement(carteCaseDirection, valeurDirectionDeplacementJoueur, joueurCible) {
    // EXCEPTION PREMIER TOUR
    if (joueurCible.compteurDeplacement === 3) {
      if (this.carte.verifierCaseDeplacement(carteCaseDirection) === false) {
        console.log("cette case n'existe pas");
        joueurCible.directionDeplacement = null;
        this.carte.ajouterVisuelDeplacementDisponibleOrigine(joueurCible)
        this.carte.ajouterVisuelJoueurActif(joueurCible);
        return false
      }
      else if (carteCaseDirection.typeCase === "cellulegrise") {
        console.log("cette case n'est pas traversable");
        joueurCible.directionDeplacement = null;
        this.carte.ajouterVisuelDeplacementDisponibleOrigine(joueurCible)
        this.carte.ajouterVisuelJoueurActif(joueurCible);
      return false
      }
      
    }
    
    // OCCURENCE CHANGEMENT DE DIRECTION DURANT DEPLACEMENT
    else if (joueurCible.directionDeplacement !== null && joueurCible.directionDeplacement !== valeurDirectionDeplacementJoueur) {
      console.log("deplacement autorisé uniquement sur le même axe");
      this.carte.ajouterVisuelJoueurActif(joueurCible);
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
      return false;
    }
    // OCCURENCE PRESENCE D'UN JOUEUR SUR LA CASE DE DESTINATION
    else if (this.carte.verifierCaseDeplacement(carteCaseDirection) === true && this.carte.verifierCaseTraversable(carteCaseDirection) === false && carteCaseDirection.typeCase !== "cellulegrise") {
      console.log("Un joueur est present sur la case, debut phase de combat");
      joueurCible.directionDeplacement = null;
      joueurCible.compteurDeplacement = 0;
      this.carte.enleverVisuelJoueurActif(joueurCible);
      if(joueurCible.postureDefensive === false){
      this.combat.declencherCombat(carteCaseDirection); 
    }
    }
    // OCCURENCE OBSTACLE OU CASE INEXISTANTE 
    else if ((this.carte.verifierCaseDeplacement(carteCaseDirection) === false || this.carte.verifierCaseTraversable(carteCaseDirection) === false) && joueurCible.compteurDeplacement < 3) {
     joueurCible.compteurDeplacement = 0;
      this.carte.enleverVisuelJoueurActif(joueurCible);
      console.log("aucune case disponible au deplacement sur le même axe, fin du deplacement")
    }
  }
}