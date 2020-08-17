class BarreVie{
    constructor(listeJoueurs, systemeTours){
      this.listeJoueurs = listeJoueurs;     
      this.barreVie = this.creerBarreVie();   
      this.initialisation = this.initialiserBarreVie();
      this.tour = systemeTours
    }

     // BARRE DE VIE

  creerBarreVie() {
    for (let i = 0; i < this.listeJoueurs.length; i++) {
      // div bootstrap col-md-6
      var dimensionnerAcBootstrap = document.createElement("div");
      dimensionnerAcBootstrap.setAttribute("class", `col-md-4`)
      dimensionnerAcBootstrap.setAttribute("id", `dimmensionnementBootstrap${i}`)
      //nom joueur
      var nomJoueur = document.createElement("div");
      nomJoueur.setAttribute("class", " col-md-2 barre-etat");
      nomJoueur.setAttribute("id", `barre-etat-joueur${i}`)
      var txtZone = document.createElement("p");
      txtZone.setAttribute("id", `nomjoueur${i}`);
      txtZone.setAttribute("class", "col-md-2 nom-joueur")
      nomJoueur.appendChild(txtZone)
      var contenuTXT = document.createTextNode(`${this.listeJoueurs[i].nom}`);  
      txtZone.appendChild(contenuTXT)
      //espace sante
      var espaceSante = document.createElement("div");
      espaceSante.setAttribute("id", `espace-vie-joueur${i}`);
      espaceSante.setAttribute("class", "espace-sante")
      //barreRougeDegat
      var barreRougeDegat = document.createElement("div");
      barreRougeDegat.setAttribute("id", `barre-degat-joueur${i}`);
      barreRougeDegat.setAttribute("class", "barre-vie-degat");
      //barreVerteVie
      var barreVerteVie = document.createElement("div");
      barreVerteVie.setAttribute("id", `barre-vie-joueur${i}`);
      barreVerteVie.setAttribute("class", "barre-vie-sante");
      //txtBarreVie
      var txtBarreVie = document.createElement("div");
      txtBarreVie.setAttribute("id", `barre-vie-txt-joueur${i}`);
      txtBarreVie.setAttribute("class", "barre-vie-txt");

      document.getElementById(`affichagesante`).appendChild(dimensionnerAcBootstrap);
      document.getElementById(`affichagesante`).appendChild(nomJoueur);
      document.getElementById(`dimmensionnementBootstrap${i}`).appendChild(espaceSante);
      document.getElementById(`espace-vie-joueur${i}`).appendChild(barreRougeDegat);
      document.getElementById(`barre-degat-joueur${i}`).appendChild(barreVerteVie);
      document.getElementById(`barre-vie-joueur${i}`).appendChild(txtBarreVie);

    }
  }
  initialiserBarreVie() {
    for (let i = 0; i < this.listeJoueurs.length; i++) {
      $(`#nomJoueur${i}`).html(`${this.listeJoueurs[i].nom}`);
      $(`#barre-vie-txt-joueur${i}`).html(Math.round(`${this.listeJoueurs[i].sante}`) + "%");

      $(`#barre-vie-txt-joueur${i}`).html("100%");
      $(`#barre-vie-joueur${i}`).css({
        "width": "100%"
      });
    }
  }
/////////////////////////////////////////////////
  // IMPORTANT A VOIR COMMENT INTEGRER CA
  majBarreVie(joueurCible) {
    var a = joueurCible.sante * (100 / 100); // diviser par la santé max ici 100
    console.log(joueurCible);
    console.log(this.tour.fileAttentes)
    console.log(this.tour.fileAttentes.indexOf(joueurCible))
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
      document.getElementById(`barre-etat-joueur${this.tour.listeJoueurs.indexOf(joueurCible)}`).appendChild(iconePosture);
    }
    else if (joueurCible.postureDefensive === true){
      document.getElementById(`postureDefenseJoueur${this.tour.listeJoueurs.indexOf(joueurCible)}`).remove();
    }

  }
////////////////////////////////////////////////
}
