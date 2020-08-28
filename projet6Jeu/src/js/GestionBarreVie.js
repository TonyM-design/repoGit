class GestionBarreVie{
    constructor(systemeTours){
      this.tour = systemeTours;
      this.barreVies = [];
      for (let i = 0; i < this.tour.listeJoueurs.length; i++) {
        const barreVie = new BarreVie(this.tour.listeJoueurs, i)
        this.barreVies.push(barreVie);
      }
    }

    majBarreVie(joueurCible) {
    this.barreVies[this.tour.listeJoueurs.indexOf(joueurCible)].majBarreVie(joueurCible);
  }

}
