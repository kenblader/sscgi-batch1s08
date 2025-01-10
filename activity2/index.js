// Grass strong on Electric, Weak on Fire
// Fire strong on Grass, Weak on Water
// Water strong on Fire, Weak on Electric
// Electric strong Water, Weak on Grass
// Normal is neither strong nor weak to other types
const initialHp = 50;
const trainerCount = 3;
// declare trainer names
let player1, player2, player3, player4, player5;
let players = [];
let pokemons = [];
let isLoserBracket = 0;
let top3 = [];

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
  console.log(
    `%c------------ ${nameTrainer} procceeded to next round ------------`,
    "color:rgb(0, 225, 255)"
  );
  console.log(``);
  console.log(`%c------ The pokemons are 💤 resting ------`, "color: #FFFF00");
}
// #endregion

class Pokemon {
  constructor(name, type, level, currentHp, maxHp, moves) {
    this.name = name;
    this.type = type;
    this.level = level;
    this.currentHp = currentHp;
    this.maxHp = maxHp;
    this.moves = moves;
  }
  attack(opponent) {
    console.log(`${this.name} attack ${opponent.name}!`);
  }
  recievedDamage(damage) {
    this.currentHp -= damage;
    console.log(`🩸 ${this.name} got damaged by 💥${damage}`);
    if (this.currentHp <= 0) {
      console.log(`💀🕊️✝ ${this.name} fainted`);
      this.currentHp = 0;
    } else
      console.log(`💪 ${this.name} still has 💔 ${this.currentHp} hp left`);
  }
  heal() {
    if (this.currentHp > 0) {
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
      if ((this.currentHp += potionAmount) > this.maxHp) {
        console.log(
          `%c❌ ${this.name} is already 💚 full hp, nothing happens`,
          "color:rgb(245, 117, 67)"
        );
        this.currentHp = this.maxHp;
        if (potion == 0) {
          this.currentHp += potionAmount - 10;
          console.log(
            `%c🛡️ 10 shield was added, New hp is 💕 ${this.currentHp}`,
            "color:rgb(67, 245, 97)"
          );
        }
        return;
      }
      this.currentHp += potionAmount;
      console.log(
        `%cAdded 🧪 ${potionAmount} hp! New hp is 💕 ${this.currentHp}`,
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
  computeNewLeveledHp() {
    // 20% of the max health will be added
    this.maxHp = this.maxHp * this.level * 0.2 + this.maxHp;
    console.log(this.currentHp);
  }
}

class WaterPokemon extends Pokemon {
  constructor(name, level, currentHp, maxHp, moves) {
    //calling the base class constructor
    super(name, "Water", level, currentHp, maxHp, moves);
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

    if (this.level != 1) {
      damage = damage * this.level * 0.2;
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

class FirePokemon extends Pokemon {
  constructor(name, level, currentHp, maxHp, moves) {
    //calling the base class constructor
    super(name, "Fire", level, currentHp, maxHp, moves);
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

    if (this.level != 1) {
      damage = damage * this.level * 0.2;
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

class ElectricPokemon extends Pokemon {
  constructor(name, level, currentHp, maxHp, moves) {
    //calling the base class constructor
    super(name, "Electric", level, currentHp, maxHp, moves);
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

    if (this.level != 1) {
      damage = damage * this.level * 0.2;
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
  constructor(name, level, currentHp, maxHp, moves) {
    //calling the base class constructor
    super(name, "Grass", level, currentHp, maxHp, moves);
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

    if (this.level != 1) {
      damage = damage * this.level * 0.2;
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
class NormalPokemon extends Pokemon {
  constructor(name, level, currentHp, maxHp, moves) {
    //calling the base class constructor
    super(name, "Normal", level, currentHp, maxHp, moves);
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

    if (this.level != 1) {
      damage = damage * this.level * 0.2;
    }

    if (addedDamage != 0) {
      damage += addedDamage;
    }

    useAttack(this.name, icon, this.moves[placeHolder], opponent);

    opponent.recievedDamage(damage);
  }
}

class Trainer {
  constructor(name, pokemon, level) {
    this.name = name;
    this.pokemon = pokemon;
    this.level = level;
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
      element.currentHp = element.maxHp;
    });
    // console.log(this.pokemon);
    opponent.pokemon.forEach((element) => {
      element.currentHp = element.maxHp;
    });
    // console.log(opponent.pokemon);
  }

  resetLevel() {
    this.level = 1;
    this.pokemon.forEach((element) => {
      element.level = 1;
      element.maxHp = initialHp;
      element.currentHp = element.maxHp;
    });
  }

  battleWinner() {
    console.log(
      `Since ${this.name} wins the bracket battle, he and each of his pokemon leveled up`
    );
    this.level++;
    console.log(`The pokemons of ${this.name} (${this.level}) are: `);
    let placeHolder = 0;

    this.pokemon.forEach((element) => {
      element.computeNewLeveledHp();
      placeHolder = element.level;
      element.level++;
      console.log(
        `${element.name}
        Current Hp: ${element.currentHp}
        Max Hp: ${element.maxHp}
        Leveled: ${placeHolder} >> ${element.level}
        `
      );
    });
  }
}

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
       ⚔️ Battle of ${this.trainer1.name}(lvl.${this.trainer1.level}) and ${this.trainer2.name}(lvl.${this.trainer2.level})  ⚔️
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

      if (pokemon2.currentHp > 0) {
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

      if (pokemon1.currentHp <= 0) {
        let placeHolder = "";
        for (let element of this.trainer1.pokemon) {
          if (element.currentHp > 0) {
            placeHolder = element;
            retreatPokemon(this.trainer1.name, pokemon1.name, element.name);
            break;
          }
        }
        if (placeHolder != "") {
          pokemon1 = placeHolder;
        }
      }

      if (pokemon2.currentHp <= 0) {
        let placeHolder = "";
        for (let element of this.trainer2.pokemon) {
          if (element.currentHp > 0) {
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
        if (element.currentHp <= 0) {
          count1++;
        }
      });
      this.trainer2.pokemon.forEach((element) => {
        if (element.currentHp <= 0) {
          count2++;
        }
      });

      if (count1 === this.trainer1.pokemon.length) {
        winsBattle(this.trainer2.name);
        this.trainer2.battleWinner();
        // this.trainer1.resetPokemonHp(this.trainer2);
        return [this.trainer2, this.trainer1]; // [wins, lose]
      }

      if (count2 === this.trainer2.pokemon.length) {
        winsBattle(this.trainer1.name);
        this.trainer1.battleWinner();
        // this.trainer2.resetPokemonHp(this.trainer1);
        return [this.trainer1, this.trainer2]; // [wins, lose]
      }
    }
  }
}

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

function definePlayer() {
  let i = 0;
  let flag = 1;

  while (i < trainerCount) {
    // let counter = Math.floor(Math.random() * 3) + 3;
    let playerName = prompt(
      "Welcome to Pokemon Battle Tournament\nPlease name a player: "
    );
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
      let updatedName =
        playerName.charAt(0).toUpperCase() + playerName.slice(1).toLowerCase();
      players.push(updatedName);
      i++;
    }

    flag = 1;
  }
}

function choosePokemon(index) {
  let pokemonList = [];
  while (pokemons.length < 5) {
    let input = prompt(
      `     Welcome ${players[index]}
      Instruction! Type one name only then hit enter/ click ok!
      You can only choose one pokemon name one time
      eg. ✔️(pichu then mudkip) ❌(carps then carps)

      Choose your Pokemon:
      Grass type: Chikorita, Bulbasaur
      Electric type: Pikachu, Pichu
      Fire type: Charmander, Torchic
      Water type: Squirtle, Mudkip
      Normal type: Carps, Snorlax`
    );

    // declare pokemons
    let pokemonName = input.toLowerCase();
    let alreadyHave = pokemonList.includes(pokemonName);
    if (alreadyHave) {
      alert(`You already pick this pokemon.`);
    } else {
      pokemonList.push(pokemonName);
      let pokemonPlaceholder;
      let isValid = 1;

      switch (pokemonName) {
        case "chikorita":
          pokemonPlaceholder = new GrassPokemon(
            "Chikorita",
            1,
            initialHp,
            initialHp,
            ["Tackle", "Hyperbeam"]
          );
          break;
        case "bulbasaur":
          pokemonPlaceholder = new GrassPokemon(
            "Bulbasaur",
            1,
            initialHp,
            initialHp,
            ["Tackle", "Hyperbeam"]
          );
          break;
        case "pikachu":
          pokemonPlaceholder = new ElectricPokemon(
            "Pikachu",
            1,
            initialHp,
            initialHp,
            ["Tackle", "Electro Shot"]
          );
          break;
        case "pichu":
          pokemonPlaceholder = new ElectricPokemon(
            "Pichu",
            1,
            initialHp,
            initialHp,
            ["Tackle", "Electro Shot"]
          );
          break;
        case "charmander":
          pokemonPlaceholder = new FirePokemon(
            "Charmander",
            1,
            initialHp,
            initialHp,
            ["Tackle", "Flamethrower"]
          );
          break;
        case "torchic":
          pokemonPlaceholder = new FirePokemon(
            "Torchic",
            1,
            initialHp,
            initialHp,
            ["Tackle", "Flamethrower"]
          );
          break;
        case "squirtle":
          pokemonPlaceholder = new WaterPokemon(
            "Squirtle",
            1,
            initialHp,
            initialHp,
            ["Tackle", "HydroCannon"]
          );
          break;
        case "mudkip":
          pokemonPlaceholder = new WaterPokemon(
            "Mudkip",
            1,
            initialHp,
            initialHp,
            ["Tackle", "HydroCannon"]
          );
          break;
        case "carps":
          pokemonPlaceholder = new NormalPokemon(
            "Carps",
            1,
            initialHp,
            initialHp,
            ["Tackle", "Headbutt"]
          );
          break;
        case "snorlax":
          pokemonPlaceholder = new NormalPokemon(
            "Snorlax",
            1,
            initialHp,
            initialHp,
            ["Tackle", "Headbutt"]
          );
          break;
        default:
          alert("Invalid input! Type only what is in the choices");
          isValid = 0;
      }

      if (isValid) pokemons.push(pokemonPlaceholder);
    }
  }

  let newPlayer = {
    name: players[index],
    pokemons: pokemons,
    level: 1,
  };

  players.splice(index, 1, newPlayer);
  // new Trainer(newPlayer.name, pokemons);
  pokemons = [];
  console.log(players); // need design
}
function declaringTrainers() {
  let i = 0;
  console.log(players.length);
  while (i < players.length) {
    if (i > 0) alert(`Changing Player, Hold on! ...`);
    choosePokemon(i);
    i++;
  }

  players.forEach((element, index) => {
    console.log(`Here ${element.name} and`);
    element.pokemons.forEach((item) => {
      console.log(`${item.name}`);
    });

    console.log(index);
    switch (index) {
      case 0:
        player1 = new Trainer(element.name, element.pokemons, element.level);
        break;
      case 1:
        player2 = new Trainer(element.name, element.pokemons, element.level);
        break;
      case 2:
        player3 = new Trainer(element.name, element.pokemons, element.level);
        break;
      case 3:
        player4 = new Trainer(element.name, element.pokemons, element.level);
        break;
      case 4:
        player5 = new Trainer(element.name, element.pokemons, element.level);
        break;
    }
  });
}

console.log(`Welcome to Pokemon Battle Tournament`);

definePlayer();
declaringTrainers();

// #region Bracketings
// battle returns 2 data [winner][loser]
// for 1st player on round robin
let firstBattle = new BattleGround(player1, player2);
let match1 = firstBattle.battle();
top3.push(match1[0]);

// for 2nd player on round robin
let secondBattle = new BattleGround(player3, player4);
let match2 = firstBattle.battle();
top3.push(match2[0]);

// Loser's Bracket
// reset pokemon's health for loser's bracket
match1[1].resetPokemonHp(match2[1]);
let thirdBattle = new BattleGround(match1[1], match2[1]);
let match3 = firstBattle.battle();

// for 3rd player on round robin
match3[0].resetPokemonHp(player5);
match3[0].resetLevel();
let fourthBattle = new BattleGround(match3[0], player5);
let match4 = firstBattle.battle();

// round robin

//#endregion
