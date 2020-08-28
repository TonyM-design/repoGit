  class ParametreUtilisateurs{
      constructor(configuration){
          this.configuration = configuration;
          this.nomJoueurs = this.parametrerNomJoueurs();
      
        }

      parametrerNombreColonnes() {
        let nombreColonne = null;
        let nombreColonneTraduit = null;
        do {
          nombreColonne = prompt("entrez le nombre de colonne du plateau de jeu (entrez un chiffre) :");
          nombreColonneTraduit = Number.parseInt(nombreColonne, 10);
          if (nombreColonneTraduit <= 0 || isNaN(nombreColonneTraduit)) {
            alert("entrez un chiffre ;) ");
          }
        } while (nombreColonneTraduit <= 0 || isNaN(nombreColonneTraduit));
        return nombreColonneTraduit;
      }
    
      parametrerNombreCellules() {
        let nombreCellule = null;
        let nombreCelluleTraduit = null;
        do {
           nombreCellule = prompt("entrez le nombre de cellule par colonne du plateau de jeu (entrez un chiffre) :");
           nombreCelluleTraduit = Number.parseInt(nombreCellule, 10);
          if (nombreCelluleTraduit <= 0 || isNaN(nombreCelluleTraduit)) {
            alert("entrez un chiffre ;) ");
          }
        } while (nombreCelluleTraduit <= 0 || isNaN(nombreCelluleTraduit));
        return nombreCelluleTraduit;
      }
    
      parametrerPlateau() { ////////////////// probleme nombre case si inferieur a arme + joueur + cellue grise
        let nombreColonne = null;
        let nombreCellule = null; 
        do {
          nombreColonne = this.parametrerNombreColonnes();
          nombreCellule = this.parametrerNombreCellules();
          
          if (this.configuration.nombreJoueur + this.configuration.nombreArmes + this.configuration.nombreCellulesGrises > nombreColonne * nombreCellule) {
            alert("Pas assez de cases disponible sur le plateau de jeu, veuillez entrez de nouveaux paramètres");
          }
        } while (this.configuration.nombreJoueur + this.configuration.nombreArmes + this.configuration.nombreCellulesGrises > nombreColonne * nombreCellule);
        return {nombreColonne, nombreCellule}
      }


      parametrerNomJoueurs(){
        const noms = [];
        for (let k = 0; k < this.configuration.nombreJoueur; k++) {
        noms.push(prompt("entrez le nom de votre personnage:"));
      }
      return noms;
    }
      


  }
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  