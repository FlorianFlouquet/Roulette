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
let cagnotte = 0;
let bonNombre = 0;
let partieTerminee = false;
/**
 * Affiche dans la console le tapis de jeu
 * @param tableau
 */
const afficherTapis = (tableau) => {
    console.log(`   ${chalk_1.default.bgGreen(`    ${tableau[0]}    `)}`);
    console.log(`   ${chalk_1.default.bgRed(`${tableau[1]}`)}${chalk_1.default.bgGray(`${tableau[2]}`)}${chalk_1.default.bgRed(`${tableau[3]}`)}`);
    console.log(`   ${chalk_1.default.bgGray(`${tableau[4]}`)}${chalk_1.default.bgRed(`${tableau[5]}`)}${chalk_1.default.bgGray(`${tableau[6]}`)}`);
    console.log(`   ${chalk_1.default.bgRed(`${tableau[7]}`)}${chalk_1.default.bgGray(`${tableau[8]}`)}${chalk_1.default.bgRed(`${tableau[9]}`)}`);
    console.log(`   ${chalk_1.default.bgGray(`${tableau[10]}`)}${chalk_1.default.bgGray(`${tableau[11]}`)}${chalk_1.default.bgRed(`${tableau[12]}`)}`);
    console.log(`   ${chalk_1.default.bgGray(`${tableau[13]}`)}${chalk_1.default.bgRed(`${tableau[14]}`)}${chalk_1.default.bgGray(`${tableau[15]}`)}`);
    console.log(`   ${chalk_1.default.bgRed(`${tableau[16]}`)}${chalk_1.default.bgGray(`${tableau[17]}`)}${chalk_1.default.bgRed(`${tableau[18]}`)}`);
    console.log(`   ${chalk_1.default.bgRed(`${tableau[19]}`)}${chalk_1.default.bgGray(`${tableau[20]}`)}${chalk_1.default.bgRed(`${tableau[21]}`)}`);
    console.log(`   ${chalk_1.default.bgGray(`${tableau[22]}`)}${chalk_1.default.bgRed(`${tableau[23]}`)}${chalk_1.default.bgGray(`${tableau[24]}`)}`);
    console.log(`   ${chalk_1.default.bgRed(`${tableau[25]}`)}${chalk_1.default.bgGray(`${tableau[26]}`)}${chalk_1.default.bgRed(`${tableau[27]}`)}`);
    console.log(`   ${chalk_1.default.bgGray(`${tableau[28]}`)}${chalk_1.default.bgGray(`${tableau[29]}`)}${chalk_1.default.bgRed(`${tableau[30]}`)}`);
    console.log(`   ${chalk_1.default.bgGray(`${tableau[31]}`)}${chalk_1.default.bgRed(`${tableau[32]}`)}${chalk_1.default.bgGray(`${tableau[33]}`)}`);
    console.log(`   ${chalk_1.default.bgRed(`${tableau[34]}`)}${chalk_1.default.bgGray(`${tableau[35]}`)}${chalk_1.default.bgRed(`${tableau[36]}`)}`);
};
/**
 * Demande à l'utilisateur s'il est satisfait de ses choix.
 * Si oui renvoit true sinon renvoit false
 * @returns
 */
const satisfactionUtilisateur = () => {
    return readline_sync_1.default.keyInYN('Est-ce que cela vous convient ? (Y = Oui/ N = Non)');
};
const continuer = () => {
    let continueJeu = readline_sync_1.default.keyInYN('Voulez-vous continuer ?');
    console.clear();
    if (!continueJeu) {
        partieTerminee = true;
        console.log(`Vous sortez du casino avec ${cagnotte} jetons !`);
    }
};
/**
 * Fonction placer les jetons sur le tapis
 * @param tableau
 */
const placerJetons = (tableau) => {
    // Colorise en jaune sur le tapis les numéros choisis
    for (let element of tableau) {
        tableauTapisRouletteModifiable[element] = chalk_1.default.bgYellow(`    `);
    }
    console.log(numerosMises);
    // Affiche le tapis mis à jour
    afficherTapis(tableauTapisRouletteModifiable);
    // Demande à l'utilisateur si son choix lui convient et conserve sa réponse dans une variable
    let utilisateurSatisfait = satisfactionUtilisateur();
    if (!utilisateurSatisfait) {
        roulette();
    }
};
/**
 * Regarde si le nombre à trouver correspond aux nombres
 * choisis par l'utilisateur
 * @returns
 */
const leJoueurAGagne = () => {
    let victoire = false;
    for (let i = 0; i < numerosMises[i]; i++) {
        if (numerosMises[i] == bonNombre) {
            victoire = true;
        }
    }
    console.log(bonNombre);
    return victoire;
};
/**
 * Actualise le montant de la cagnotte après une victoire
 * @param ratio
 */
const jetonsGagnes = (tableau) => {
    cagnotte += tableau[0] * tableau[1];
    console.log(`Votre cagnotte est de ${cagnotte}`);
    continuer();
};
const jeterDuCasino = () => {
    console.log(`Votre cagnotte est de ${cagnotte} jetons`);
    if (cagnotte <= 0) {
        console.log('DEGAGEZ DE MON ETABLISSEMENT !');
        partieTerminee = true;
    }
    else {
        continuer();
    }
};
/**
 * Génére un nombre entre 0 et 36 et le retourne
 * @returns
 */
const genererUnNombreAleatoire = () => {
    bonNombre = Math.trunc(Math.random() * 37);
    while (bonNombre == 37) {
        bonNombre = Math.trunc(Math.random() * 37);
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
    let nombre = questionKeySelect(premierNombrePossible, 'Sur quelle rangee de numeros voulez-vous parier ?');
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
        secondNombrePossible = ['1', '3'];
        let nombre2 = questionKeySelect(secondNombrePossible, 'Choisissez le second nombre');
        numerosMises.push(nombre1);
        numerosMises.push(nombre2);
        numerosMises.push(nombre1 + 3);
        numerosMises.push(nombre2 + 3);
        placerJetons(numerosMises);
    }
    else if (nombre1 == 35) {
        secondNombrePossible = ['34, 36'];
        let nombre2 = questionKeySelect(secondNombrePossible, 'Choisissez le second nombre');
        numerosMises.push(nombre1);
        numerosMises.push(nombre2);
        numerosMises.push(nombre1 - 3);
        numerosMises.push(nombre2 - 3);
        placerJetons(numerosMises);
    }
    else {
        secondNombrePossible = [`${nombre1 - 3}`, `${nombre1 + 3}`];
        let nombre2 = questionKeySelect(secondNombrePossible, 'Choisissez le second nombre');
        let dernierNombres = [`${nombre1 - 1}`, `${nombre1 + 1}`];
        let nombre3 = questionKeySelect(dernierNombres, 'Choisissez les derniers nombres');
        let nombre4 = 0;
        if (nombre1 > nombre2) {
            nombre4 = nombre3 - 3;
        }
        else {
            nombre4 = nombre3 + 3;
        }
        numerosMises.push(nombre1);
        numerosMises.push(nombre2);
        numerosMises.push(nombre3);
        numerosMises.push(nombre4);
        placerJetons(numerosMises);
    }
};
// Fonction pour miser six numéros (2lignes de 3) SIXAIN x5
const miseSixain = () => {
    const premierNombrePossible = ['1', '4', '7', '10', '13', '16', '19', '22', '25', '28', '31', '34'];
    let ligne1 = questionKeySelect(premierNombrePossible, 'Choisissez une première ligne');
    numerosMises.push(ligne1);
    numerosMises.push(ligne1 + 1);
    numerosMises.push(ligne1 + 2);
    if (ligne1 == 1) {
        numerosMises.push(ligne1 + 3);
        numerosMises.push(ligne1 + 4);
        numerosMises.push(ligne1 + 5);
    }
    else if (ligne1 == 34) {
        numerosMises.push(ligne1 - 3);
        numerosMises.push(ligne1 - 2);
        numerosMises.push(ligne1 - 1);
    }
    else {
        let ligne2 = questionKeySelect([`${ligne1 - 3}`, `${ligne1 + 3}`], 'Choisissez la deuxieme ligne');
        numerosMises.push(ligne2);
        numerosMises.push(ligne2 + 1);
        numerosMises.push(ligne2 + 2);
    }
    placerJetons(numerosMises);
};
// Fonction pour miser 12 numéros (1 des 3 grandes zones) DOUZAINE x3
const miseDouzaine = () => {
    const troisZonesPossibles = ['1 - 12', '13 - 24', '25 - 36'];
    let zoneChoisie = questionKeySelect(troisZonesPossibles, 'Choisissez la zone sur laquelle parier');
    if (zoneChoisie == 1) {
        for (let i = 1; i < 13; i++) {
            numerosMises.push(i);
        }
    }
    else if (zoneChoisie == 13) {
        for (let i = 13; i < 25; i++) {
            numerosMises.push(i);
        }
    }
    else {
        for (let i = 25; i < 37; i++) {
            numerosMises.push(i);
        }
    }
    placerJetons(numerosMises);
};
// Fonction pour miser 24 numéros (2 des 3 grandes zones) DOUZAINE A CHEVAL x2
const miseDouzaineCheval = () => {
    let zoneChoisie = questionKeySelect(['1 - 24', '13 - 36'], 'Quelle zone voulez-vous choisir');
    if (zoneChoisie == 1) {
        for (let i = 1; i < 25; i++) {
            numerosMises.push(i);
        }
    }
    else {
        for (let i = 13; i < 37; i++) {
            numerosMises.push(i);
        }
    }
    placerJetons(numerosMises);
};
// Fonction pour miser une colonne (12 numéros) COLONNE x3
const miseColonne = () => {
    let colonneChoisie = questionKeySelect(['1', '2', '3'], 'Quelle colonne voulez-vous choisir');
    for (let i = 0; i < 37; i += 3) {
        numerosMises.push(colonneChoisie + i);
    }
    placerJetons(numerosMises);
};
// Fonction pour miser deux colonnes (24 numéros) COLONNE A CHEVAL x2
const miseColonneCheval = () => {
    let partieChoisie = questionKeySelect(['1 (Colonnes 1 et 2)', '2 (Colonnes 2 et 3)'], 'Quelle partie voulez-vous choisir');
    for (let i = 0; i < 37; i += 3) {
        numerosMises.push(partieChoisie + i);
    }
    for (let i = 1; i < 37; i += 3) {
        numerosMises.push(partieChoisie + i);
    }
    placerJetons(numerosMises);
};
/**
 * Demande le montant de la mise et le retourne
 */
const demanderLeMontant = () => {
    console.log(`Votre cagnotte: ${cagnotte} jetons`);
    let mise = readline_sync_1.default.questionInt('Combien voulez-vous miser ?');
    while (mise > cagnotte) {
        mise = readline_sync_1.default.questionInt('Combien voulez-vous miser ?');
    }
    cagnotte -= mise;
    genererUnNombreAleatoire();
    return mise;
};
/**
 * Demande à l'utilisateur quel type de mise il veut faire
 * @returns
 */
const demanderMise = () => {
    let choixMise = readline_sync_1.default.keyInSelect(misesPossibles, "Quel type de mise voulez vous choisir ?");
    let ratio = 0;
    if (choixMise == 0) {
        misePlein();
        ratio = 36;
    }
    else if (choixMise == 1) {
        miseCheval();
        ratio = 17;
    }
    else if (choixMise == 2) {
        miseTransversal();
        ratio = 11;
    }
    else if (choixMise == 3) {
        miseCarre();
        ratio = 8;
    }
    else if (choixMise == 4) {
        miseSixain();
        ratio = 5;
    }
    else if (choixMise == 5) {
        miseDouzaine();
        ratio = 3;
    }
    else if (choixMise == 6) {
        miseDouzaineCheval();
        ratio = 2;
    }
    else if (choixMise == 7) {
        miseColonne();
        ratio = 3;
    }
    else {
        miseColonneCheval();
        ratio = 2;
    }
    let mise = demanderLeMontant();
    return [ratio, mise];
};
/**
 * Fonction qui permet de jouer à la roulette à travers la console
 */
const roulette = () => {
    while (!partieTerminee) {
        tableauTapisRouletteModifiable = [...tableauTapisRoulette];
        numerosMises = [];
        // On affiche le tapis dans sa version par défaut
        afficherTapis(tableauTapisRouletteModifiable);
        console.log(`Votre cagnotte est de ${cagnotte}`);
        // On demande à l'utilisateur la mise qu'il veut faire
        let ratioEtMise = demanderMise();
        let trouve = leJoueurAGagne();
        if (trouve) {
            console.log('Gagne !');
            jetonsGagnes(ratioEtMise);
        }
        else {
            console.log('Perdu !');
            jeterDuCasino();
        }
    }
};
/**
 * Demande le montant de jeton de l'utilisateur
 */
const initier = () => {
    cagnotte = readline_sync_1.default.questionInt('Combien de jetons voulez-vous ?');
    roulette();
};
initier();
