import chalk from 'chalk';
import read from 'readline-sync'



const tableauTapisRoulette : string[] = ['  0 ', ' 01 ' , ' 02 ', ' 03 ',' 04 ',' 05 ',' 06 ',' 07 ',' 08 ',' 09 ',' 10 ',' 11 ',' 12 ',' 13 ',' 14 ',' 15 ',' 16 ',' 17 ',' 18 ',' 19 ',' 20 ',' 21 ',
                                    ' 22 ',' 23 ',' 24 ',' 25 ',' 26 ',' 27 ',' 28 ',' 29 ',' 30 ',' 31 ',' 32 ',' 33 ',' 34 ',' 35 ',' 36 '];
const misesPossibles = ['Plein (36 fois la mise)', 'Cheval (17 fois la mise)', 'Transversal (11 fois la mise)', 'Carre (8 fois la mise)', 'Sixain (5 fois la mise)', 'Douzaine (3 fois la mise)' ,
                        'Douzaine a cheval (2 fois la mise)', 'Colonne (3 fois la mise)', 'Colonne a cheval (2 fois la mise)'];

// On met le tableau représentant le tapis dans une variable pour pouvoir le modifier
let tableauTapisRouletteModifiable : string[] = [...tableauTapisRoulette];
let numerosMises : number[] = [];

/**
 * Affiche dans la console le tapis de jeu
 * @param tableau 
 */
 const afficherTapis = (tableau : string[]) : void => {
    console.log(`${chalk.bgGreen(`    ${tableauTapisRouletteModifiable[0]}    `)}`);
    console.log(`${chalk.bgRed(`${tableauTapisRouletteModifiable[1]}`)}${chalk.bgGray(`${tableauTapisRouletteModifiable[2]}`)}${chalk.bgRed(`${tableauTapisRouletteModifiable[3]}`)}`);
    console.log(`${chalk.bgGray(`${tableauTapisRouletteModifiable[4]}`)}${chalk.bgRed(`${tableauTapisRouletteModifiable[5]}`)}${chalk.bgGray(`${tableauTapisRouletteModifiable[6]}`)}`);
    console.log(`${chalk.bgRed(`${tableauTapisRouletteModifiable[7]}`)}${chalk.bgGray(`${tableauTapisRouletteModifiable[8]}`)}${chalk.bgRed(`${tableauTapisRouletteModifiable[9]}`)}`);
    console.log(`${chalk.bgGray(`${tableauTapisRouletteModifiable[10]}`)}${chalk.bgRed(`${tableauTapisRouletteModifiable[11]}`)}${chalk.bgGray(`${tableauTapisRouletteModifiable[12]}`)}`);
    console.log(`${chalk.bgRed(`${tableauTapisRouletteModifiable[13]}`)}${chalk.bgGray(`${tableauTapisRouletteModifiable[14]}`)}${chalk.bgRed(`${tableauTapisRouletteModifiable[15]}`)}`);
    console.log(`${chalk.bgGray(`${tableauTapisRouletteModifiable[16]}`)}${chalk.bgRed(`${tableauTapisRouletteModifiable[17]}`)}${chalk.bgGray(`${tableauTapisRouletteModifiable[18]}`)}`);
    console.log(`${chalk.bgRed(`${tableauTapisRouletteModifiable[19]}`)}${chalk.bgGray(`${tableauTapisRouletteModifiable[20]}`)}${chalk.bgRed(`${tableauTapisRouletteModifiable[21]}`)}`);
    console.log(`${chalk.bgGray(`${tableauTapisRouletteModifiable[22]}`)}${chalk.bgRed(`${tableauTapisRouletteModifiable[23]}`)}${chalk.bgGray(`${tableauTapisRouletteModifiable[24]}`)}`);
    console.log(`${chalk.bgRed(`${tableauTapisRouletteModifiable[25]}`)}${chalk.bgGray(`${tableauTapisRouletteModifiable[26]}`)}${chalk.bgRed(`${tableauTapisRouletteModifiable[27]}`)}`);
    console.log(`${chalk.bgGray(`${tableauTapisRouletteModifiable[28]}`)}${chalk.bgRed(`${tableauTapisRouletteModifiable[29]}`)}${chalk.bgGray(`${tableauTapisRouletteModifiable[30]}`)}`);
    console.log(`${chalk.bgRed(`${tableauTapisRouletteModifiable[31]}`)}${chalk.bgGray(`${tableauTapisRouletteModifiable[32]}`)}${chalk.bgRed(`${tableauTapisRouletteModifiable[33]}`)}`);
    console.log(`${chalk.bgGray(`${tableauTapisRouletteModifiable[34]}`)}${chalk.bgRed(`${tableauTapisRouletteModifiable[35]}`)}${chalk.bgGray(`${tableauTapisRouletteModifiable[36]}`)}`);
}

const satisfactionUtilisateur = () : string | boolean => {
    return read.keyInYN('Est-ce que cela vous convient ? (Y = Oui/ N = Non');
}

// Fonction placer les jetons sur le tapis 'chalk.bgYellow('    ')'
const placerJetons = (tableau : number[]) => {
    // Colorise en jaune sur le tapis les numéros choisis
    for (let element of numerosMises) {
        tableauTapisRouletteModifiable[element] = chalk.bgYellow('    ');
    }
    
    // Affiche le tapis mis à jour
    afficherTapis(tableauTapisRouletteModifiable);
    // Demande à l'utilisateur si son choix lui convient et conserve sa réponse dans une variable
    let utilisateurSatisfait : string | boolean = satisfactionUtilisateur();
    if (!utilisateurSatisfait) {
        roulette();
    }
    else {
        console.log('On continue');
        
    }
}

// Fonction pour miser un numéro seulement PLEIN x36
const misePlein = () => {
    // On demande à l'utilisateur le numéro qu'il veut miser 
    let nombre = read.questionInt('Sur quel numero voulez-vous parier ?');
    // On place le numéro dans le tableau 'numerosMises'
    numerosMises.push(nombre);
    // On appelle placerJetons
    placerJetons(numerosMises);
}

// Fonction pour miser deux numéros côte à côte CHEVAL x17
const miseCheval = () => {
    // On demande à l'utilisateur les numéros qu'il veut miser 
    let nombre1 = read.questionInt('Sur quel numero voulez-vous parier en premier ?'); 
    let nombre2 = read.questionInt('Sur quel numero voulez-vous parier en deuxieme ?');
    // On place les numéros dans le tableau 'numerosMises'
    numerosMises.push(nombre1);
    numerosMises.push(nombre2);
    // On appelle placerJetons
    placerJetons(numerosMises);
}

// Fonction pour miser trois numéros transversaux TRANSVERSAL x11
const miseTransversal = () => {
    // On demande à l'utilisateur les numéros qu'il veut miser 
    let nombre1 = read.questionInt('Sur quel numero voulez-vous parier en premier ?'); 
    let nombre2 = read.questionInt('Sur quel numero voulez-vous parier en deuxieme ?');
    // On place les numéros dans le tableau 'numerosMises'
    numerosMises.push(nombre1);
    numerosMises.push(nombre2);
    // On appelle placerJetons
    placerJetons(numerosMises);
}
// Fonction pour miser quatre numéros en carré CARRE x8
// Fonction pour miser six numéros (2lignes de 3) SIXAIN x5
// Fonction pour miser 12 numéros (1 des 3 grandes zones) DOUZAINE x3
// Fonction pour miser 24 numéros (2 des 3 grandes zones) DOUZAINE A CHEVAL x2
// Fonction pour miser une colonne (12 numéros) COLONNE x3
// Fonction pour miser deux colonnes (24 numéros) COLONNE A CHEVAL x2
 
/**
 * Demande à l'utilisateur quel type de mise il veut faire
 * @returns 
 */
const demanderMise = () : void => {
    let choixMise : number = read.keyInSelect(misesPossibles, "Quel type de mise voulez vous choisir ?");
    if (choixMise == 0) {
        misePlein();
    }
    else if (choixMise == 1) {
        miseCheval();
    }
    else if (choixMise == 2) {
        miseTransversal();
    }
    // else if (choixMise == 3) {
    //     miseCarre();
    // }
    // else if (choixMise == 4) {
    //     miseSixian();
    // }
    // else if (choixMise == 5) {
    //     miseDouzaine();
    // }
    // else if (choixMise == 6) {
    //     miseDouzaineCheval();
    // }
    // else if (choixMise == 7) {
    //     miseColonne();
    // }
    // else {
    //     miseColonneCheval();
    // }
    // return choixMise;
}

/**
 * Fonction qui permet de jouer à la roulette à travers la console
 */
const roulette = () : void => {
    tableauTapisRouletteModifiable = [...tableauTapisRoulette];
    numerosMises = [];
    // On affiche le tapis dans sa version par défaut
    afficherTapis(tableauTapisRouletteModifiable);
    // On demande à l'utilisateur la mise qu'il veut faire
    demanderMise();
}

roulette();

