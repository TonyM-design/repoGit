class Combat {
    constructor(carte,barreVie,systemeTours){
        this.joueurActif = null;
        this.carte = carte;
        this.barreVie = barreVie;
        this.tour = systemeTours
        
    }
    declencherCombat(carteCaseDirection) {
        const joueurActif = this.tour.determinerJoueurActif();
        this.joueurActif = joueurActif;
        this.joueurActif.attaquer(carteCaseDirection.contenu);
        // this.ajouterVisuelDegat()
        this.barreVie.majBarreVie(carteCaseDirection.contenu)
        this.joueurActif.compteurDeplacement = 0;
    
      }
      declencherCombatCasesAdjacentes() {
        const joueurActif = this.tour.determinerJoueurActif();
        this.joueurActif = joueurActif;
        if (this.carte.determinerPositionAdversaireCasesAdjacentes(this.joueurActif) !== false) {
          this.joueurActif.attaquer(this.carte.determinerPositionAdversaireCasesAdjacentes(this.joueurActif).contenu);
          this.barreVie.majBarreVie(this.carte.determinerPositionAdversaireCasesAdjacentes(this.joueurActif).contenu);
        }
      }
}