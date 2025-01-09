// Grass strong on Electric, Weak on Fire
// Fire strong on Grass, Weak on Water
// Water strong on Fire, Weak on Electric
// Electric strong Water, Weak on Grass
// Normal is neither strong nor weak to other types
const initialHp = 50;
const trainerCount = 5;

// #region Consoles
function criticalHit(opponent, attackerType) {
  console.log(
    `✅ Critical Hit, ⚠️ ${opponent.type} is weak on ${attackerType}`
  );
}
function useAttack(nameAttacker, icon, attackAttacker, opponent) {
  console.log(
    `${nameAttacker} uses ${icon} ${attackAttacker} on ${opponent.name}`
  );
}
function feedPokemon(nameTrainer, namePokemon) {
  console.log(
    `${nameTrainer} feed 💊 ${namePokemon}, it temporarily ⬆️ boost the damage of an ⚔️ attack`
  );
}
function throwPokeball(nameTrainer, namePokemon) {
  console.log(
    `%c${nameTrainer} throw 🍚 pokeball and ${namePokemon} 🐾 comes out`,
    "color:rgb(248, 32, 122)"
  );
}
function turnPokemon(nameTrainer, namePokemon, flag) {
  if (flag == 1) {
    console.log(
      `%c--------- ${namePokemon} turn (${nameTrainer}) ------------`,
      "color:rgb(226, 95, 95)"
    );
  } else {
    console.log(
      `%c--------- ${namePokemon} turn (${nameTrainer}) ------------`,
      "color:rgb(80, 116, 235)"
    );
  }
}
function retreatPokemon(nameTrainer, namePokemon1, namePokemon2) {
  console.log(
    `%c${nameTrainer} 🍚🎇 retreat ${namePokemon1}. He throw pokeball and ${namePokemon2} 🐾 comes out`,
    "color:rgb(248, 32, 122)"
  );
}
function winsBattle(nameTrainer) {
  console.log(
    `%c------------ 👑 ${nameTrainer} wins the battle 👑 ------------`,
    "color:rgb(0, 225, 255)"
  );
  console.log(``);
  console.log(`%c------ The pokemons are 💤 resting ------`, "color: #FFFF00");
}
// #endregion

class Pokemon {
  constructor(name, type, level, hp, moves) {
    this.name = name;
    this.type = type;
    this.level = level;
    this.hp = hp;
    this.moves = moves;
  }
  attack(opponent) {
    console.log(`${this.name} attack ${opponent.name}!`);
    let damage = this.level * 2;
    console.log(`${this.name} leveled up ${damage}`);
  }
  recievedDamage(damage) {
    this.hp -= damage;
    console.log(`🩸 ${this.name} got damaged by 💥${damage}`);
    if (this.hp <= 0) {
      console.log(`💀🕊️✝ ${this.name} fainted`);
      this.hp = 0;
    } else console.log(`💪 ${this.name} still has 💔 ${this.hp} hp left`);
  }
  heal() {
    if (this.hp > 0) {
      let potionAmount = 0;
      let potion = Math.floor(Math.random() * 2);
      if (potion == 0) {
        potionAmount = 20; // defense boost
        console.log(
          `%c🧪 ${this.name} used  potion and temporarily gain 🛡️ 10 shield that will be added to hp`,
          "color:rgb(67, 245, 97)"
        );
      } else {
        potionAmount = 10;
        console.log(`%c🧪 ${this.name} used potion`, "color:rgb(67, 245, 97)");
      }
      // console.log(`${potionAmount} and ${this.hp}`);
      if ((this.hp += potionAmount) > initialHp) {
        console.log(
          `%c❌ ${this.name} is already 💚 full hp, nothing happens`,
          "color:rgb(245, 117, 67)"
        );
        this.hp = initialHp;
        if (potion == 0) {
          this.hp += potionAmount - 10;
          console.log(
            `%c🛡️ 10 shield was added, New hp is 💕 ${this.hp}`,
            "color:rgb(67, 245, 97)"
          );
        }
        return;
      }
      this.hp += potionAmount;
      console.log(
        `%cAdded 🧪 ${potionAmount} hp! New hp is 💕 ${this.hp}`,
        "color:rgb(67, 245, 97)"
      );
    }
  }
  powerUp() {
    let placeHolder = Math.floor(Math.random() * 2);
    let addedDamage = 0;

    if (placeHolder == 1) {
      addedDamage = 5;
    }

    return addedDamage;
  }
}

class WaterPokemon extends Pokemon {
  constructor(name, level, hp, moves) {
    //calling the base class constructor
    super(name, "Water", level, hp, moves);
  }
  attack(opponent, addedDamage) {
    let placeHolder = Math.floor(Math.random() * 2);
    // console.log(placeHolder);
    let damage = 0;
    let icon = "";
    if (this.moves[placeHolder] == "Tackle") {
      damage = 10;
      icon = "💥";
    } else {
      // add where pokemons are strong
      if (opponent.type == "Fire") damage = 25;
      else damage = 15;
      icon = "🌊";
    }
    if (addedDamage != 0) {
      damage += addedDamage;
    }
    // console.log(
    //   `${this.name} uses ${icon} ${this.moves[placeHolder]} on ${opponent.name}`
    // );
    useAttack(this.name, icon, this.moves[placeHolder], opponent);
    if (damage == 25) {
      criticalHit(opponent, this.type);
    }
    opponent.recievedDamage(damage);
  }
}

class FirePokemon extends Pokemon {
  constructor(name, level, hp, moves) {
    //calling the base class constructor
    super(name, "Fire", level, hp, moves);
  }
  attack(opponent, addedDamage) {
    let placeHolder = Math.floor(Math.random() * 1);
    let damage = 0;
    let icon = "";
    if (this.moves[placeHolder] == "Tackle") {
      damage = 10;
      icon = "💥";
    } else {
      // add where pokemons are strong
      if (opponent.type == "Grass") damage = 25;
      else damage = 15;
      icon = "🔥";
    }
    if (addedDamage != 0) {
      damage += addedDamage;
    }
    // console.log(
    //   `${this.name} uses ${icon} ${this.moves[placeHolder]} on ${opponent.name}`
    // );
    useAttack(this.name, icon, this.moves[placeHolder], opponent);
    if (damage == 25) {
      criticalHit(opponent, this.type);
    }
    opponent.recievedDamage(damage);
  }
}

class ElectricPokemon extends Pokemon {
  constructor(name, level, hp, moves) {
    //calling the base class constructor
    super(name, "Electric", level, hp, moves);
  }
  attack(opponent, addedDamage) {
    let placeHolder = Math.floor(Math.random() * 2);
    let damage = 0;
    addedDamage = 0;
    let icon = "";
    if (this.moves[placeHolder] == "Tackle") {
      damage = 10;
      icon = "💥";
    } else {
      // add where pokemons are strong
      if (opponent.type == "Water") damage = 25;
      else damage = 15;
      icon = "⚡";
    }
    if (addedDamage != 0) {
      damage += addedDamage;
    }
    useAttack(this.name, icon, this.moves[placeHolder], opponent);
    if (damage == 25) {
      criticalHit(opponent, this.type);
    }

    opponent.recievedDamage(damage);
  }
}

class GrassPokemon extends Pokemon {
  constructor(name, level, hp, moves) {
    //calling the base class constructor
    super(name, "Grass", level, hp, moves);
  }
  attack(opponent, addedDamage) {
    let placeHolder = Math.floor(Math.random() * 2);
    let damage = 0;
    let icon = "";
    if (this.moves[placeHolder] == "Tackle") {
      damage = 10;
      icon = "💥";
    } else {
      // add where pokemons are strong
      if (opponent.type == "Electric") damage = 25;
      else damage = 15;
      icon = "🍃";
    }
    if (addedDamage != 0) {
      damage += addedDamage;
    }
    // console.log(
    //   `${this.name} uses ${this.moves[placeHolder]} on ${opponent.name}`
    // );
    useAttack(this.name, icon, this.moves[placeHolder], opponent);
    if (damage == 25) {
      criticalHit(opponent, this.type);
    }
    opponent.recievedDamage(damage);
  }
}
class NormalPokemon extends Pokemon {
  constructor(name, level, hp, moves) {
    //calling the base class constructor
    super(name, "Fighting", level, hp, moves);
  }
  attack(opponent, addedDamage) {
    let placeHolder = Math.floor(Math.random() * 2);
    let damage = 0;
    let icon = "";
    if (this.moves[placeHolder] == "Tackle") {
      damage = 10;
      icon = "💥";
    } else {
      // add where pokemons are strong
      damage = 20;
      icon = "🤕";
    }
    if (addedDamage != 0) {
      damage += addedDamage;
    }
    useAttack(this.name, icon, this.moves[placeHolder], opponent);
    criticalHit(opponent, this.type);

    opponent.recievedDamage(damage);
  }
}

class Trainer {
  constructor(name, pokemon) {
    this.name = name;
    this.pokemon = pokemon;
  }

  introduce() {
    let text = "";
    let placeholder;
    this.pokemon.forEach((element, index) => {
      if (index == this.pokemon.length - 1) placeholder = ".";
      else placeholder = ", ";
      text += element.name + placeholder;
    });
    console.log(`${this.name} has ${text}`);
  }

  resetPokemonHp(opponent) {
    //reset Hp per battle (assume that there is rest after each battle)
    this.pokemon.forEach((element) => {
      element.hp = initialHp;
    });
    // console.log(this.pokemon);
    opponent.pokemon.forEach((element) => {
      element.hp = initialHp;
    });
    // console.log(opponent.pokemon);
  }
}

// declare pokemons
//#endregion
// #region Eletric type
let pikachu = new ElectricPokemon("Pikachu", 5, initialHp, [
  "Tackle",
  "Electro Shot",
]);
let pichu = new ElectricPokemon("Pichu", 5, initialHp, [
  "Tackle",
  "Electro Shot",
]);
//#endregion
// #region Fire type
let charmander = new FirePokemon("Charmander", 5, initialHp, [
  "Tackle",
  "Flamethrower",
]);
let torchic = new FirePokemon("Torchic", 5, initialHp, [
  "Tackle",
  "Flamethrower",
]);
//#endregion
// #region Water type
let squirtle = new WaterPokemon("Squirtle", 5, initialHp, [
  "Tackle",
  "HydroCannon",
]);
let mudkip = new WaterPokemon("Mudkip", 5, initialHp, [
  "Tackle",
  "HydroCannon",
]);
//#endregion
// #region Normal type
let carps = new NormalPokemon("Carps", 5, initialHp, ["Tackle", "Karate Chop"]);
let snorlax = new NormalPokemon("Snorlax", 5, initialHp, [
  "Tackle",
  "Karate Chop",
]);
//#endregion

class BattleGround {
  constructor(trainer1, trainer2) {
    this.trainer1 = trainer1;
    this.trainer2 = trainer2;
  }

  battle() {
    // first pokemon battle
    // console.log(this.trainer1.pokemon.length);
    let firstPokemon1 = Math.floor(
      Math.random() * this.trainer1.pokemon.length
    );
    let pokemon1 = this.trainer1.pokemon[firstPokemon1];
    // console.log(pokemon1);

    let firstPokemon2 = Math.floor(
      Math.random() * this.trainer2.pokemon.length
    );
    let pokemon2 = this.trainer2.pokemon[firstPokemon2];
    // console.log(pokemon2.name);

    console.log(``);
    console.log(
      `%c======================================================
       ⚔️ Battle of ${this.trainer1.name} and ${this.trainer2.name} ⚔️
       ======================================================`,
      "color: #ff0000; font-size: 25px;"
    );
    console.log(``);

    throwPokeball(this.trainer1.name, pokemon1.name);
    throwPokeball(this.trainer2.name, pokemon2.name);

    let index = 0;
    while (true) {
      let count1 = 0;
      let count2 = 0;

      turnPokemon(this.trainer1.name, pokemon1.name, 1);

      let addedDamage1 = pokemon1.powerUp();
      if (addedDamage1 != 0) {
        feedPokemon(this.trainer1.name, pokemon1.name);
      }
      pokemon1.attack(pokemon2, addedDamage1);
      console.log(``);

      if (pokemon2.hp > 0) {
        turnPokemon(this.trainer2.name, pokemon2.name, 2);
        let addedDamage2 = pokemon2.powerUp();
        if (addedDamage1 != 0) {
          feedPokemon(this.trainer2.name, pokemon2.name);
        }
        pokemon2.attack(pokemon1, addedDamage2);
        console.log(``);
      }

      if (index != 0) {
        let healDefined1 = Math.floor(Math.random() * 2);
        let healDefined2 = Math.floor(Math.random() * 2);

        if (healDefined1 == 1) {
          pokemon1.heal();
          console.log(``);
        }
        if (healDefined2 == 1) {
          pokemon2.heal();
          console.log(``);
        }
      }
      index++;

      if (pokemon1.hp <= 0) {
        let placeHolder = "";
        for (let element of this.trainer1.pokemon) {
          if (element.hp > 0) {
            placeHolder = element;
            retreatPokemon(this.trainer1.name, pokemon1.name, element.name);
            break;
          }
        }
        if (placeHolder != "") {
          pokemon1 = placeHolder;
        }
      }

      if (pokemon2.hp <= 0) {
        let placeHolder = "";
        for (let element of this.trainer2.pokemon) {
          if (element.hp > 0) {
            placeHolder = element;
            retreatPokemon(this.trainer2.name, pokemon2.name, element.name);
            break;
          }
        }
        if (placeHolder != "") {
          pokemon2 = placeHolder;
          console.log(``);
          turnPokemon(this.trainer2.name, pokemon2.name, 2);
          let addedDamage2 = pokemon2.powerUp();
          if (addedDamage1 != 0) {
            feedPokemon(this.trainer2.name, pokemon2.name);
          }
          pokemon2.attack(pokemon1, addedDamage2);
          console.log(``);
        }
      }

      this.trainer1.pokemon.forEach((element) => {
        if (element.hp <= 0) {
          count1++;
        }
      });
      this.trainer2.pokemon.forEach((element) => {
        if (element.hp <= 0) {
          count2++;
        }
      });

      if (count1 === this.trainer1.pokemon.length) {
        winsBattle(this.trainer1.name);
        this.trainer1.resetPokemonHp(this.trainer2);
        return [this.trainer1, this.trainer2]; // [wins, lose]
      }

      if (count2 === this.trainer2.pokemon.length) {
        winsBattle(this.trainer2.name);
        this.trainer2.resetPokemonHp(this.trainer1);
        return [this.trainer2, this.trainer1]; // [wins, lose]
      }
    }
  }
}

// let trainers = [
//   [jedd, 0],
//   [ken, 0],
//   [joeshua, 0],
//   [junjun, 0],
//   [jonas, 0],
// ];

function declaringPlayers() {
  let placeHolder = [];
  do {
    let counter = Math.floor(Math.random() * 5) + 1;

    if (!placeHolder.includes(counter)) {
      placeHolder.push(counter);
    }
  } while (placeHolder.length < trainers.length);

  trainers.forEach((element, index) => {
    element[1] = placeHolder[index];
  });

  let index = 0;
  let flag = 1;
  while (players.length < trainers.length) {
    if (flag == trainers[index][1]) {
      players.push(trainers[index]);
      index = 0;
      flag++;
    } else {
      index++;
    }
    if (flag == 6) break;
  }
  // console.log(players);
}

// declaringPlayers();
// #region Bracketings
// // Winner's Bracket
// console.log(
//   `%cANNOUNCEMENT: Since ${players[4][0].name} is the 5th player, He automatically goes to 2nd round`,
//   "color:rgb(78, 240, 99); font-size: 20px;"
// );
// // battle returns 2 data [winner][loser]
// // 1st Round
// let firstBattle = new BattleGround(players[0][0], players[1][0]);
// let match1 = firstBattle.battle();

// let secondBattle = new BattleGround(players[2][0], players[3][0]);
// let match2 = secondBattle.battle();

// // 2nd Round
// let thirdBattle = new BattleGround(players[4][0], match1[0]);
// let match3 = thirdBattle.battle();

// let fourthBattle = new BattleGround(match2[0], match3[0]);
// let match4 = fourthBattle.battle();

// // Loser's Bracket
// // 1st Round
// let fifthBattle = new BattleGround(match1[1], match2[1]);
// let match5 = fifthBattle.battle();

// // 2nd Round
// let sixthBattle = new BattleGround(match3[1], match5[1]);
// let match6 = sixthBattle.battle();

// // 3rd Round : Loser's Finals
// let seventhBattle = new BattleGround(match6[1], match4[1]);
// let match7 = seventhBattle.battle();

// // ============ GRAND FINALS ============
// // winner of match 4 vs winner of Loser's Bracket
// let eightBattle = new BattleGround(match4[0], match7[1]);
// let match8 = eightBattle.battle();

// console.log(``);
// console.log(
//   `%c--------- 🏆 ${match8[0].name} wins the tournament 🏆 ---------`,
//   "color:rgb(212, 133, 243); font-size: 25px;"
// );
// console.log(``);
//#endregion

let players = [];
console.log(`Welcome to Pokemon Battle Tournament`);
function definePlayer() {
  let i = 0;
  let flag = 1;

  while (i < trainerCount) {
    // let counter = Math.floor(Math.random() * 3) + 3;
    let playerName = prompt("Please name a player: ");
    let count = playerName.length;
    if (count > 10) {
      alert("Maximum character length reached! (max: 10)");
      flag = 0;
    }

    if (!/^[a-zA-Z]+$/.test(playerName)) {
      alert("Invalid input. Please enter letters only.");
      flag = 0;
    }

    if (flag === 1) {
      players.push(playerName);
      i++;
    }

    flag = 1;
  }
}

definePlayer();
console.log(players);
function choosePokemon() {
  let input = prompt(
    "Instruction! Type one name only then hit enter/ click ok!\n" +
      "You can only choose one pokemon one time\n eg. ✔️(pichu, mudkip) ❌(carps, carps)\n" +
      "Choose your Pokemon:\n" +
      "Grass type: chikorita, bulbasaur\n" +
      "Electric type: pikachu, pichu\n" +
      "Fire type: charmander, torchic\n" +
      "Water type: squirtle, mudkip\n" +
      "Normal type: carps, snorlax\n"
  );
  let pokemonName = input.toLowerCase();
  switch (pokemonName) {
    case "carps":
      new NormalPokemon("Carps", 1, initialHp, ["Tackle", "Karate Chop"]);
      break;
    case "chikorita":
      new GrassPokemon("Chikorita", 5, initialHp, ["Tackle", "Hyperbeam"]);
      break;
    case "bulbasaur":
      new GrassPokemon("Bulbasaur", 5, initialHp, ["Tackle", "Hyperbeam"]);
      break;
    case "pikachu": new ElectricPokemon("Pikachu", 5, initialHp, ["Tackle", "Electro Shot"]); break;
  }
}
let bulbasaur = choosePokemon();
