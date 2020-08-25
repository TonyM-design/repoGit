
// POO JOUEURS
// modele joueurs 
class Personnage {
  constructor() {
    this.nom = "";
    this.sante = 100;
    this.attaque = 20;
    this.defense = 15;
    this.equipements = [new EpeeSimple];
  }
}

class Joueur extends Personnage {
  constructor(numeroJoueur, positionX, positionY) {
    super();
    this.numeroJoueur = numeroJoueur;
    this.positionX = positionX;
    this.positionY = positionY;
    this.presenceValide = false;
    this.compteurDeplacement = 3;
    this.directionDeplacement = null;
    this.postureDefensive = false;
  }

  seDeplacerGauche(){
this.positionY--;
  }

  seDeplacerHaut(){
this.positionX--;
  }

  seDeplacerDroite(){
this.positionY++;
}
  
  seDeplacerBas(){
this.positionX++;
}

seDeplacer(){
  console.log(this.directionDeplacement);
  console.log(this.compteurDeplacement);
  if (this.directionDeplacement === "Gauche") {
   this.seDeplacerGauche();
   console.log("se deplacerGauche");
   this.compteurDeplacement--;
   this.directionDeplacement = "Gauche";
  }
  else if (this.directionDeplacement === "Haut") {
this.seDeplacerHaut();
console.log("se deplacerHaut");
this.compteurDeplacement--;
this.directionDeplacement = "Haut";
  }
  else if (this.directionDeplacement === "Droite") {
this.seDeplacerDroite();
console.log("se deplacerDroite");
this.compteurDeplacement--;
this.directionDeplacement = "Droite";
  }
  else if (this.directionDeplacement === "Bas") { 
this.seDeplacerBas();
console.log("se deplacerBas");
this.compteurDeplacement--;
this.directionDeplacement = "Bas";
  }
}

  recupererArme(caseAdjacenteChoixJoueurActif) {
    this.equipements.unshift(caseAdjacenteChoixJoueurActif.contenu);
  }

  deposerArme() {
    return this.equipements.pop()
  }

  changerPosture() {
    if (this.postureDefensive === false) {
      this.postureDefensive = true;
    }
    else if (this.postureDefensive === true) {
      this.postureDefensive = false;
    }
  }

  attaquer(cible) {
    if (this.postureDefensive === false) {
      if (cible.sante > 0) {
        const degats = this.attaque + this.equipements[0].bonusAttaque;
        alert(`${this.nom} attaque ${cible.nom} et lui inflige ${degats} points de dégâts`
        );
        if (cible.postureDefensive === true) {
          cible.sante = cible.sante - degats / 2;
          if (cible.sante <= 0) {
            cible.sante = 0;
            alert("vous avez vaincu un ennemi")
          }
        }
        else {
          if (degats - cible.equipements[0].bonusDefense > 0) {
            cible.sante = cible.sante - (degats - cible.equipements[0].bonusDefense); // redonne de la vie lorsque bonus de defense superieur au degats
            if (cible.sante <= 0) {
              cible.sante = 0;
              alert("vous avez vaincu un ennemi")
            }
          }
          else {
            alert("les degats ont été prévenus par le bonus de defense de la cible")
          }
        }
      }
    }
    else {
      alert("vous ne pouvez pas attaquer en posture defensive")
    }
    alert(`${cible.nom} a encore ${cible.sante} points de vie`)
  }

}




