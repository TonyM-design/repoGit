class BarreVie{
    constructor(listeJoueurs, i){
      this.listeJoueurs = listeJoueurs;     
      this.nombreIteration = i;
        this.barreVie = this.creerBarreVie();
    }

     // BARRE DE VIE

  creerBarreVie() {
      const i = this.nombreIteration;
      console.log(i)

      // div bootstrap col-md-6
      var dimensionnerAcBootstrap = document.createElement("div");
      dimensionnerAcBootstrap.setAttribute("class", `col-md-4`)
      dimensionnerAcBootstrap.setAttribute("id", `dimmensionnementBootstrap${i}`)
      //nom joueur
      console.log(this.listeJoueur);
      var nomJoueur = document.createElement("div");
      nomJoueur.setAttribute("class", " col-md-2 barre-etat");
      nomJoueur.setAttribute("id", `barre-etat-joueur${i}`)
      var txtZone = document.createElement("p");
      txtZone.setAttribute("id", `nomjoueur${i}`);
      txtZone.setAttribute("class", "col-md-8 nom-joueur")
      nomJoueur.appendChild(txtZone)
      var contenuTXT = document.createTextNode(`${this.listeJoueurs[`${i}`].nom}`);  
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

      $(`#affichagesante`).append(dimensionnerAcBootstrap);
      $(`#affichagesante`).append(nomJoueur);
      $(`#dimmensionnementBootstrap${i}`).append(espaceSante);
      $(`#espace-vie-joueur${i}`).append(barreRougeDegat);
      $(`#barre-degat-joueur${i}`).append(barreVerteVie);
      $(`#barre-vie-joueur${i}`).append(txtBarreVie);
      


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

  majBarreVie(joueurCible) {
    var a = joueurCible.sante * (100 / 100); // diviser par la santé max ici 100
    $(`#barre-vie-txt-joueur${this.listeJoueurs.indexOf(joueurCible)}`).html(Math.round(a) + "%");
    $(`#barre-degat-joueur${this.listeJoueurs.indexOf(joueurCible)}`).animate({
      'width': a + "%"
    }, 1000);
    $(`#barre-vie-joueur${this.listeJoueurs.indexOf(joueurCible)}`).animate({
      'width': a + "%"
    }, 700);
  }

  
  creerIconePostureDefensive(joueurCible) {
    var iconePosture = document.createElement("div");
    iconePosture.setAttribute("class", "col-md-2 postureDefensive");
    iconePosture.setAttribute("id", `postureDefenseJoueur${this.listeJoueurs.indexOf(joueurCible)}`);
    if (joueurCible.postureDefensive === false){
      $(`#barre-etat-joueur${this.listeJoueurs.indexOf(joueurCible)}`).append(iconePosture);
    }
    else if (joueurCible.postureDefensive === true){
      $(`#postureDefenseJoueur${this.listeJoueurs.indexOf(joueurCible)}`).remove();
    }

  }
}