class GestionBarreVie{
    constructor(systemeTours){
      this.tour = systemeTours
    }

    majBarreVie(joueurCible) {
    var a = joueurCible.sante * (100 / 100); // diviser par la santé max ici 100
    $(`#barre-vie-txt-joueur${this.tour.listeJoueurs.indexOf(joueurCible)}`).html(Math.round(a) + "%");
    $(`#barre-degat-joueur${this.tour.listeJoueurs.indexOf(joueurCible)}`).animate({
      'width': a + "%"
    }, 1000);
    $(`#barre-vie-joueur${this.tour.listeJoueurs.indexOf(joueurCible)}`).animate({
      'width': a + "%"
    }, 700);
  }

  creerIconePostureDefensive(joueurCible) {
    var iconePosture = document.createElement("div");
    iconePosture.setAttribute("class", "col-md-2 postureDefensive");
    iconePosture.setAttribute("id", `postureDefenseJoueur${this.tour.listeJoueurs.indexOf(joueurCible)}`);
    if (joueurCible.postureDefensive === false){
      $(`#barre-etat-joueur${this.tour.listeJoueurs.indexOf(joueurCible)}`).append(iconePosture);
    }
    else if (joueurCible.postureDefensive === true){
      $(`#postureDefenseJoueur${this.tour.listeJoueurs.indexOf(joueurCible)}`).remove();
    }

  }
////////////////////////////////////////////////
}
