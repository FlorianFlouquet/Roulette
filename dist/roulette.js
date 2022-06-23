"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const readline_sync_1 = __importDefault(require("readline-sync"));
const tableauTapisRoulette = ['  0 ', ' 01 ', ' 02 ', ' 03 ', ' 04 ', ' 05 ', ' 06 ', ' 07 ', ' 08 ', ' 09 ', ' 10 ', ' 11 ', ' 12 ', ' 13 ', ' 14 ', ' 15 ', ' 16 ', ' 17 ', ' 18 ', ' 19 ', ' 20 ', ' 21 ',
    ' 22 ', ' 23 ', ' 24 ', ' 25 ', ' 26 ', ' 27 ', ' 28 ', ' 29 ', ' 30 ', ' 31 ', ' 32 ', ' 33 ', ' 34 ', ' 35 ', ' 36 '];
const misesPossibles = ['Plein (36 fois la mise)', 'Cheval (17 fois la mise)', 'Transversal (11 fois la mise)', 'Carre (8 fois la mise)', 'Sixain (5 fois la mise)', 'Douzaine (3 fois la mise)',
    'Douzaine a cheval (2 fois la mise)', 'Colonne (3 fois la mise)', 'Colonne a cheval (2 fois la mise)'];
// On met le tableau représentant le tapis dans une variable pour pouvoir le modifier
let tableauTapisRouletteModifiable = [...tableauTapisRoulette];
let numerosMises = [];
/**
 * Affiche dans la console le tapis de jeu
 * @param tableau
 */
const afficherTapis = (tableau) => {
    console.log(`${chalk_1.default.bgGreen(`    ${tableau[0]}    `)}`);
    console.log(`${chalk_1.default.bgRed(`${tableau[1]}`)}${chalk_1.default.bgGray(`${tableau[2]}`)}${chalk_1.default.bgRed(`${tableau[3]}`)}`);
    console.log(`${chalk_1.default.bgGray(`${tableau[4]}`)}${chalk_1.default.bgRed(`${tableau[5]}`)}${chalk_1.default.bgGray(`${tableau[6]}`)}`);
    console.log(`${chalk_1.default.bgRed(`${tableau[7]}`)}${chalk_1.default.bgGray(`${tableau[8]}`)}${chalk_1.default.bgRed(`${tableau[9]}`)}`);
    console.log(`${chalk_1.default.bgGray(`${tableau[10]}`)}${chalk_1.default.bgRed(`${tableau[11]}`)}${chalk_1.default.bgGray(`${tableau[12]}`)}`);
    console.log(`${chalk_1.default.bgRed(`${tableau[13]}`)}${chalk_1.default.bgGray(`${tableau[14]}`)}${chalk_1.default.bgRed(`${tableau[15]}`)}`);
    console.log(`${chalk_1.default.bgGray(`${tableau[16]}`)}${chalk_1.default.bgRed(`${tableau[17]}`)}${chalk_1.default.bgGray(`${tableau[18]}`)}`);
    console.log(`${chalk_1.default.bgRed(`${tableau[19]}`)}${chalk_1.default.bgGray(`${tableau[20]}`)}${chalk_1.default.bgRed(`${tableau[21]}`)}`);
    console.log(`${chalk_1.default.bgGray(`${tableau[22]}`)}${chalk_1.default.bgRed(`${tableau[23]}`)}${chalk_1.default.bgGray(`${tableau[24]}`)}`);
    console.log(`${chalk_1.default.bgRed(`${tableau[25]}`)}${chalk_1.default.bgGray(`${tableau[26]}`)}${chalk_1.default.bgRed(`${tableau[27]}`)}`);
    console.log(`${chalk_1.default.bgGray(`${tableau[28]}`)}${chalk_1.default.bgRed(`${tableau[29]}`)}${chalk_1.default.bgGray(`${tableau[30]}`)}`);
    console.log(`${chalk_1.default.bgRed(`${tableau[31]}`)}${chalk_1.default.bgGray(`${tableau[32]}`)}${chalk_1.default.bgRed(`${tableau[33]}`)}`);
    console.log(`${chalk_1.default.bgGray(`${tableau[34]}`)}${chalk_1.default.bgRed(`${tableau[35]}`)}${chalk_1.default.bgGray(`${tableau[36]}`)}`);
};
/**
 * Demande à l'utilisateur s'il est satisfait de ses choix.
 * Si oui renvoit true sinon renvoit false
 * @returns
 */
const satisfactionUtilisateur = () => {
    return readline_sync_1.default.keyInYN('Est-ce que cela vous convient ? (Y = Oui/ N = Non)');
};
/**
 * Fonction placer les jetons sur le tapis
 * @param tableau
 */
const placerJetons = (tableau) => {
    // Colorise en jaune sur le tapis les numéros choisis
    for (let element of tableau) {
        tableauTapisRouletteModifiable[element] = chalk_1.default.bgYellow('    ');
    }
    // Affiche le tapis mis à jour
    afficherTapis(tableauTapisRouletteModifiable);
    // Demande à l'utilisateur si son choix lui convient et conserve sa réponse dans une variable
    let utilisateurSatisfait = satisfactionUtilisateur();
    if (!utilisateurSatisfait) {
        roulette();
    }
    else {
        console.log('On continue');
    }
};
/**
 * Permet de créer des question à choix multiples en rentrant
 * un tableau string, contenant les choix de réponses, et une question
 * @param tableau
 * @param question
 * @returns
 */
const questionKeySelect = (tableau, question) => {
    let answer = readline_sync_1.default.keyInSelect(tableau, question);
    answer = parseInt(tableau[answer]);
    return answer;
};
/**
 * Fonction pour miser un numéro seulement PLEIN x36
 */
const misePlein = () => {
    // On demande à l'utilisateur le numéro qu'il veut miser 
    let nombre = readline_sync_1.default.questionInt('Sur quel numero voulez-vous parier ?');
    // On place le numéro dans le tableau 'numerosMises'
    numerosMises.push(nombre);
    // On appelle placerJetons
    placerJetons(numerosMises);
};
// Fonction pour miser deux numéros côte à côte CHEVAL x17
const miseCheval = () => {
    // On créé un tableau de string car la méthode keyInSelect le nécessite
    const premierNombrePossible = ['2', '5', '8', '11', '14', '17', '20', '23', '26', '29', '32', '35'];
    // On demande à l'utilisateur les numéros qu'il veut miser 
    let nombre1 = questionKeySelect(premierNombrePossible, 'Sur quel numero voulez-vous parier en premier ?');
    let deuxiemeNombrePossible = [`${tableauTapisRoulette[nombre1 - 1]}`, `${tableauTapisRoulette[nombre1 + 1]}`];
    let nombre2 = questionKeySelect(deuxiemeNombrePossible, 'Sur quel numero voulez-vous parier en deuxieme ?');
    // On place les numéros dans le tableau 'numerosMises'
    numerosMises.push(nombre1);
    numerosMises.push(nombre2);
    // On appelle placerJetons
    placerJetons(numerosMises);
};
// Fonction pour miser trois numéros transversaux TRANSVERSAL x11
const miseTransversal = () => {
    const premierNombrePossible = ['1', '4', '7', '10', '13', '16', '19', '22', '25', '28', '31', '34'];
    // On demande à l'utilisateur les numéros qu'il veut miser 
    let nombre = questionKeySelect(premierNombrePossible, 'Sur quelle rangée de numéros voulez-vous parier ?');
    // On place les numéros dans le tableau 'numerosMises'
    numerosMises.push(nombre);
    numerosMises.push(nombre + 1);
    numerosMises.push(nombre + 2);
    // On appelle placerJetons
    placerJetons(numerosMises);
};
// Fonction pour miser quatre numéros en carré CARRE x8
const miseCarre = () => {
    const premierNombrePossible = ['2', '5', '8', '11', '14', '17', '20', '23', '26', '29', '32', '35'];
    // On demande à l'utilisateur le numéro qu'il veut miser 
    let nombre1 = questionKeySelect(premierNombrePossible, 'Sur quel numero voulez-vous parier en premier ?');
    let secondNombrePossible = [];
    if (nombre1 == 2) {
        secondNombrePossible = ['4', '6'];
    }
    else if (nombre1 == 35) {
        secondNombrePossible = ['31, 33'];
    }
    else {
        for (let i = -4; i < 5; i++) {
            if (i != 0) {
                secondNombrePossible.push((nombre1 + i).toString());
            }
        }
    }
};
// Fonction pour miser six numéros (2lignes de 3) SIXAIN x5
// Fonction pour miser 12 numéros (1 des 3 grandes zones) DOUZAINE x3
// Fonction pour miser 24 numéros (2 des 3 grandes zones) DOUZAINE A CHEVAL x2
// Fonction pour miser une colonne (12 numéros) COLONNE x3
// Fonction pour miser deux colonnes (24 numéros) COLONNE A CHEVAL x2
/**
 * Demande à l'utilisateur quel type de mise il veut faire
 * @returns
 */
const demanderMise = () => {
    let choixMise = readline_sync_1.default.keyInSelect(misesPossibles, "Quel type de mise voulez vous choisir ?");
    if (choixMise == 0) {
        misePlein();
    }
    else if (choixMise == 1) {
        miseCheval();
    }
    else if (choixMise == 2) {
        miseTransversal();
    }
    else if (choixMise == 3) {
        miseCarre();
    }
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
};
/**
 * Fonction qui permet de jouer à la roulette à travers la console
 */
const roulette = () => {
    tableauTapisRouletteModifiable = [...tableauTapisRoulette];
    numerosMises = [];
    // On affiche le tapis dans sa version par défaut
    afficherTapis(tableauTapisRouletteModifiable);
    // On demande à l'utilisateur la mise qu'il veut faire
    demanderMise();
};
roulette();
