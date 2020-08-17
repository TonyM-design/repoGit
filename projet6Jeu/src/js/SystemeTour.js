class SystemeTour {
    constructor(listeJoueurs){
        this.listeJoueurs = listeJoueurs;
        this.joueurActif = null;
        this.fileAttentes = [];
        this.creerFileAttente();
        this.choisirJoueurActifDepartAleatoire();
        this.actualiserOrdreFileAttente();
        this.determinerJoueurActif();
        
    }

      // GESTION JOUEURS

  determinerJoueurActif() {
    this.joueurActif = this.fileAttentes[0]; // le joueur actif est le premier element du tableau this.fileAttente
    return this.joueurActif;
  }
  changerJoueurActif() {
    const joueurActifSuivant = this.fileAttentes[1]; // on choisit le joueur ayant l'indice suivant du joueurActif donc 1
    this.fileAttentes.unshift(joueurActifSuivant); // on instance le joueur suivant et place en indice 0
    // on supprime instance initiale
    const cloneSupprimer = this.fileAttentes.indexOf(joueurActifSuivant, 1);
    this.fileAttentes.splice(this.fileAttentes.indexOf(cloneSupprimer, 2), 1);
  }

  actualiserOrdreFileAttente() {
    // on supprime instance initiale
    const cloneSupprimer = this.fileAttentes.indexOf(this.fileAttentes[0], 1);
    this.fileAttentes.splice(cloneSupprimer, 1);
    console.log(this.fileAttentes);
    return this.fileAttentes;
  }
  choisirJoueurActifDepartAleatoire() {
    const joueurActifDepartAleatoire = this.fileAttentes[genererAleatoire(0, this.fileAttentes.length)]; // on choisit un joueur aleatoire dans la liste
    const cloneJoueur = joueurActifDepartAleatoire; // on instance le joueur
    console.log(this.fileAttentes);
    this.fileAttentes.unshift(cloneJoueur);//  on place une instance du joueur suivant en Haut du tableau 
    console.log(this.fileAttentes);
    return this.fileAttentes;
  }

  creerFileAttente() {
    for (let k = 0; k < this.listeJoueurs.length; k++) {
      this.fileAttentes.push(this.listeJoueurs[k]);
    }

  }


}