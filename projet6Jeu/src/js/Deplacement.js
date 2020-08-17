class Deplacement{
    constructor(systemeTours, carte, combat){
        this.joueurActif = null ; 
        this.tour = systemeTours
        this.carte = carte; 
        this.combat = combat;
        
    }

    majProprietesDeplacementJoueurActif() {
      if (event.which == 37) {
        this.tour.joueurActif.positionY--;
        this.tour.joueurActif.compteurDeplacement--;
        this.tour.joueurActif.directionDeplacement = "Gauche";
      }
      else if (event.which == 38) {
        this.tour.joueurActif.positionX--
        this.tour.joueurActif.compteurDeplacement--;
        this.tour.joueurActif.directionDeplacement = "Haut";
      }
      else if (event.which == 39) {
        this.tour.joueurActif.positionY++
        this.tour.joueurActif.compteurDeplacement--;
        this.tour.joueurActif.directionDeplacement = "Droite";
      }
      else if (event.which == 40) {
        this.tour.joueurActif.positionX++
        this.tour.joueurActif.compteurDeplacement--;
        this.tour.joueurActif.directionDeplacement = "Bas";
      }
    }

    
    effectuerDeplacementJoueur(carteCaseDirection, valeurDirectionDeplacementJoueur) {
        this.joueurActif =this.tour.determinerJoueurActif();
        if (this.gererExceptionDeplacement(carteCaseDirection, valeurDirectionDeplacementJoueur) !== false) {
          if ((this.carte.verifierCaseDeplacement(carteCaseDirection) === true) && (this.joueurActif.directionDeplacement === null || this.joueurActif.directionDeplacement === valeurDirectionDeplacementJoueur) && (this.joueurActif.compteurDeplacement !== 0) && this.carte.verifierCaseTraversable(carteCaseDirection) === true) {
            // SI AU DEPLACEMENT PRECEDENT LE JOUEUR A RECUPERE UNE ARME
            if (this.joueurActif.equipements.length !== 1) {
              this.carte.creerStockageEmplacementOrigine(this.joueurActif);
              this.carte.remplacerParCaseArme(this.joueurActif); // la case arme est créer a l'adresse du contenu de stockageCaseJoueur
              this.joueurActif.deposerArme(); // on supprime l'arme de l'equipements[]
    
            }
    
            // OCCURENCE CASE ARME
            else if (carteCaseDirection.typeCase !== "celluleVide") {
              this.carte.creerStockageEmplacementOrigine(this.joueurActif);
              this.joueurActif.recupererArme(carteCaseDirection);
              this.carte.remplacerParCelluleVide();
            }
            // OCCURENCE CELLULE VIDE
            else if (carteCaseDirection.typeCase === "celluleVide") {
              this.carte.creerStockageEmplacementOrigine(this.joueurActif);
              this.carte.remplacerParCelluleVide();
            }
    
            this.carte.remplacerParCaseJoueur(carteCaseDirection, this.joueurActif);
            this.majProprietesDeplacementJoueurActif();
            this.carte.rafraichirTableHTML();
            this.carte.ajouterVisuelJoueurActif(this.joueurActif);
    
          }
          // OCCURENCE DEPLACEMENT VERS CASE INEXISTANTE OU OCCUPEE T0
          else if (this.carte.verifierCaseDeplacement(carteCaseDirection) !== true && this.joueurActif.compteurDeplacement === 3) {
            console.log("cette case n'existe pas 27/07 1200")
            this.carte.ajouterVisuelDeplacementDisponibleOrigine(this.joueurActif);
          }
        }
        else {
          console.log("test bug visuel changement direction meme axe");
        }
      }

      gererExceptionDeplacement(carteCaseDirection, valeurDirectionDeplacementJoueur) {
        this.joueurActif = this.tour.determinerJoueurActif();
        // EXCEPTION PREMIER TOUR
        if (this.joueurActif.compteurDeplacement === 3) {
          if (this.carte.verifierCaseDeplacement(carteCaseDirection) === false) {
            console.log("cette case n'existe pas");
            this.joueurActif.directionDeplacement = null;
            this.carte.ajouterVisuelDeplacementDisponibleOrigine(this.joueurActif)
            this.carte.ajouterVisuelJoueurActif(this.joueurActif);
          }
          else if (carteCaseDirection.typeCase === "cellulegrise") {
            console.log("cette case n'est pas traversable");
            this.joueurActif.directionDeplacement = null;
            this.carte.ajouterVisuelDeplacementDisponibleOrigine(this.joueurActif)
            this.carte.ajouterVisuelJoueurActif(this.joueurActif);
          }
        }
        // FIN EXCEPTION PREMIER TOUR
        // OCCURENCE CHANGEMENT DE DIRECTION DURANT DEPLACEMENT
        else if (this.joueurActif.directionDeplacement !== null && this.joueurActif.directionDeplacement !== valeurDirectionDeplacementJoueur) {
          console.log("deplacement autorisé uniquement sur le même axe");
          this.carte.ajouterVisuelJoueurActif(this.joueurActif);
          if (this.joueurActif.directionDeplacement === "Gauche") {
            this.carte.ajouterVisuelDeplacement(this.joueurActif, this.carte.caseGauche(this.joueurActif));
          }
          else if (this.joueurActif.directionDeplacement === "Haut") {
            this.carte.ajouterVisuelDeplacementDirection(this.joueurActif, this.carte.caseHaut(this.joueurActif));
          }
          else if (this.joueurActif.directionDeplacement === "Droite") {
            this.carte.ajouterVisuelDeplacementDirection(this.joueurActif, this.carte.caseDroite(this.joueurActif));
          }
          else if (this.joueurActif.directionDeplacement === "Bas") {
            this.carte.ajouterVisuelDeplacementDirection(this.joueurActif, this.carte.caseBas(this.joueurActif));
          }
          return false;
        }
        // OCCURENCE PRESENCE D'UN JOUEUR SUR LA CASE DE DESTINATION
        else if (this.carte.verifierCaseDeplacement(carteCaseDirection) === true && this.carte.verifierCaseTraversable(carteCaseDirection) === false && carteCaseDirection.typeCase !== "cellulegrise") {
          console.log("Un joueur est present sur la case, debut phase de combat");
          this.joueurActif.directionDeplacement = null;
          this.joueurActif.compteurDeplacement = 0;
          this.carte.enleverVisuelJoueurActif(this.joueurActif);
          if(this.joueurActif.postureDefensive === false){
          this.combat.declencherCombat(carteCaseDirection); /////////////////////////////// a modifier bug combat !
        }
        }
        // OCCURENCE OBSTACLE OU CASE INEXISTANTE 
        else if ((this.carte.verifierCaseDeplacement(carteCaseDirection) === false || this.carte.verifierCaseTraversable(carteCaseDirection) === false) && this.joueurActif.compteurDeplacement < 3) {
          this.joueurActif.compteurDeplacement = 0;
          this.carte.enleverVisuelJoueurActif(this.joueurActif);
          console.log("aucune case disponible au deplacement sur le même axe, fin du deplacement")
        }
      }
}