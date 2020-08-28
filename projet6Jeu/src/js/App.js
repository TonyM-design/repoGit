class App {
    constructor() {
        // création d'une configuration de base
        this.configuration = new Configuration();
        // recuperation des entrées utilisateurs pour configuration personnalisé
        this.parametreUtilisateurs = new ParametreUtilisateurs(this.configuration);
        // implantation entrées utilisateurs dans la configuration
        const taillePlateau = this.parametreUtilisateurs.parametrerPlateau();
        // pourquoi la verificaion nombre case ne s'effectue pas ? 
        this.configuration.nombreColonne = taillePlateau.nombreColonne;
        this.configuration.nombreCellule = taillePlateau.nombreCellule;
        // génération de la carte vierge avec dimension définie par la configuration
        this.carte = new Carte(this.configuration.nombreColonne, this.configuration.nombreCellule, this.configuration.nombreArmes, this.configuration.nombreCellulesGrises, this.configuration.nombreJoueur,);
        // génération du jeu associé à la carte
        this.jeu = new Jeu(this.parametreUtilisateurs.nomJoueurs, this.carte);
        // génération de la carte personnalisé au jeu
        this.carte.placerCasesSpeciales(this.jeu.listeJoueurs);
        // génération du systeme de deroulement du jeu
        this.jeu.creerBoucleJeu()
    }
    
}
const nouvellePartie = new App ;
