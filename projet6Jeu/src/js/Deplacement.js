class Deplacement{
    constructor(carte){
        this.joueurCible = null ; // valide 
        this.carte = carte;
    }
    effectuerDeplacementJoueur(carteCaseDirection, valeurDirectionDeplacementJoueur) {
        if (this.gererExceptionDeplacement(carteCaseDirection, valeurDirectionDeplacementJoueur) !== false) {
          if ((this.carte.verifierCaseDeplacement(carteCaseDirection) === true) && (this.joueurCible.directionDeplacement === null || this.joueurCible.directionDeplacement === valeurDirectionDeplacementJoueur) && (this.joueurCible.compteurDeplacement !== 0) && this.carte.verifierCaseTraversable(carteCaseDirection) === true) {
           
            // SI AU DEPLACEMENT PRECEDENT LE JOUEUR A RECUPERE UNE ARME
            if (this.joueurCible.equipements.length !== 1) {
              this.carte.creerStockageEmplacementOrigine(this.joueurCible);
              this.carte.remplacerParCaseArme(this.joueurCible); // la case arme est créer a l'adresse du contenu de stockageCaseJoueur
              this.joueurCible.deposerArme(); // on supprime l'arme de l'equipements[]
            }
    
            // OCCURENCE CASE ARME
            else if (carteCaseDirection.typeCase !== "celluleVide") {
              this.carte.creerStockageEmplacementOrigine(this.joueurCible);
              this.joueurCible.recupererArme(carteCaseDirection);
              this.carte.remplacerParCelluleVide();
          }
            // OCCURENCE CELLULE VIDE
            else if (carteCaseDirection.typeCase === "celluleVide") {
              this.carte.creerStockageEmplacementOrigine(this.joueurCible);
              this.carte.remplacerParCelluleVide();
          }
    
            this.carte.remplacerParCaseJoueur(carteCaseDirection, this.joueurCible); /////////////////////////////////////////////////
            this.joueurCible.seDeplacer();
            this.carte.rafraichirTableHTML();
            this.carte.ajouterVisuelJoueurActif(this.joueurCible);
          }
          // OCCURENCE DEPLACEMENT VERS CASE INEXISTANTE OU OCCUPEE T0
          else if (this.carte.verifierCaseDeplacement(carteCaseDirection) !== true && this.joueurCible.compteurDeplacement === 3) {
            this.carte.ajouterVisuelDeplacementDisponibleOrigine(this.joueurCible);
          }
        }
        else {
          console.log("test bug visuel changement direction meme axe");
        }
      }

      gererExceptionDeplacement(carteCaseDirection, valeurDirectionDeplacementJoueur) {
        // EXCEPTION PREMIER TOUR
        if (this.joueurCible.compteurDeplacement === 3) {
          if (this.carte.verifierCaseDeplacement(carteCaseDirection) === false) {
            console.log("cette case n'existe pas");
            this.joueurCible.directionDeplacement = null;
            this.carte.ajouterVisuelDeplacementDisponibleOrigine(this.joueurCible)
            this.carte.ajouterVisuelJoueurActif(this.joueurCible);
          }
          else if (carteCaseDirection.typeCase === "cellulegrise") {
            console.log("cette case n'est pas traversable");
            this.joueurCible.directionDeplacement = null;
            this.carte.ajouterVisuelDeplacementDisponibleOrigine(this.joueurCible)
            this.carte.ajouterVisuelJoueurActif(this.joueurCible);
          }
        }
        // FIN EXCEPTION PREMIER TOUR

        // OCCURENCE OBSTACLE OU CASE INEXISTANTE 
        else if ((this.carte.verifierCaseDeplacement(carteCaseDirection) === false || this.carte.verifierCaseTraversable(carteCaseDirection) === false) && this.joueurCible.compteurDeplacement < 3) {
          this.joueurCible.compteurDeplacement = 0;
          this.carte.enleverVisuelJoueurActif(this.joueurCible);
          console.log("aucune case disponible au deplacement sur le même axe, fin du deplacement")
        }
      }
}