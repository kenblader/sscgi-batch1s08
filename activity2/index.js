// Grass strong on Electric, Weak on Fire
// Fire strong on Grass, Weak on Water
// Water strong on Fire, Weak on Electric
// Electric strong Water, Weak on Grass
// Normal is neither strong nor weak to other types
const initialHp = 50;
const trainerCount = 5;
const maxRevive = 4; // pokemonCount - 1
// declare trainer names
let player1, player2, player3, player4, player5;
let players = [];
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
function winsBattle(nameTrainer, loserName, isRoundRobin) {
  console.log(
    `%c------------ 👑 ${nameTrainer} wins the battle 👑 ------------`,
    "color:rgb(0, 225, 255)"
  );
  if (isRoundRobin) {
    console.log(
      `%c------------ 🏳️ ${loserName} loses ------------`,
      "color:rgb(250, 94, 16)"
    );
  } else {
    console.log(
      `%c------------ ╰┈➤ ${nameTrainer} procceeded to next round ------------`,
      "color:rgb(0, 225, 255)"
    );
    console.log(
      `%c------------ 🏳️ ${loserName} loses and proceeds to loser's bracket ------------`,
      "color:rgb(250, 94, 16)"
    );
  }

  console.log(``);
  console.log(`%c------ The pokemons are 💤 resting ------`, "color: #FFFF00");
}
function revivePokemonConsole(nameTrainer, namePokemon, hp) {
  console.log(
    `%c${nameTrainer} uses 💉✨ Revive Potion to ${namePokemon}, ${namePokemon} back at full 💚 ${hp} hp `,
    "color:rgb(67, 245, 97)"
  );
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
    let addMaxHp = Math.floor(this.maxHp * this.level * 0.2);
    this.maxHp = addMaxHp + this.maxHp;
    let pokemonCurrentHp = this.currentHp;
    if (pokemonCurrentHp > 0) {
      if (pokemonCurrentHp + addMaxHp > this.maxHp) {
        this.currentHp = this.maxHp;
      } else {
        this.currentHp += addMaxHp;
      }
    }
    return;
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
  constructor(name, pokemon, level, reviveSkill) {
    this.name = name;
    this.pokemon = pokemon;
    this.level = level;
    this.reviveSkill = reviveSkill;
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
      `%cSince ${this.name} 🏅 wins the ⚔️ battle, he and each of his pokemon 🆙 leveled up`,
      "color:rgb(202, 40, 239)"
    );
    this.level++;
    console.log(
      `%cThe 🍚 pokemons of ${this.name}(${this.level}) are: `,
      "color:rgb(202, 40, 239)"
    );
    let placeHolder = 0;

    this.pokemon.forEach((element) => {
      element.computeNewLeveledHp();
      placeHolder = element.level;
      element.level++;
      console.log(
        `%c${element.name}
        ❤️ Current Hp: ${element.currentHp}
        💚 Max Hp: ${element.maxHp}
        🆙 Leveled: ${placeHolder} >> ${element.level}
        `,
        "color:rgb(202, 40, 239)"
      );
    });
  }

  pokemonRevive() {
    let i = 0;
    let revivePokemonCount = 0;
    this.reviveSkill = this.level <= 2 ? 2 : this.reviveSkill++;

    // this.pokemon.forEach(element => {
    //   console.log(`${element.name} has ${element.currentHp} hp`);
    // })

    console.log(
      `%cSince ${this.name} is level ${this.level}, he has ${this.reviveSkill} Revive Potion`,
      "color:rgb(67, 245, 97)"
    );

    let deadPokemons = this.pokemon.filter((pokemon) => pokemon.currentHp <= 0);

    while (revivePokemonCount < this.reviveSkill && i < deadPokemons.length) {
      deadPokemons[i].currentHp = deadPokemons[i].maxHp;
      revivePokemonConsole(
        this.name,
        deadPokemons[i].name,
        deadPokemons[i].currentHp
      );
      revivePokemonCount++;
      i++;
    }

    // console.log(`new pokemons health`);
    // this.pokemon.forEach(element => {
    //   console.log(`${element.name} has ${element.currentHp} hp`);
    // })
  }
}

class BattleGround {
  constructor(trainer1, trainer2) {
    this.trainer1 = trainer1;
    this.trainer2 = trainer2;
  }

  battle(isRoundRobin) {
    console.log(``);
    console.log(
      `%c======================================================
       ⚔️ Battle of ${this.trainer1.name}(lvl.${this.trainer1.level}) and ${this.trainer2.name}(lvl.${this.trainer2.level})  ⚔️
       ======================================================`,
      "color: #ff0000; font-size: 25px;"
    );
    console.log(``);

    // trainer use revives for their pokemons
    if (isRoundRobin) {
      this.trainer1.pokemonRevive();
      this.trainer2.pokemonRevive();
    }

    // Get alive Pokémon for both trainers
    let alivePokemon1 = this.trainer1.pokemon.filter(
      (pokemon) => pokemon.currentHp > 0
    );
    let alivePokemon2 = this.trainer2.pokemon.filter(
      (pokemon) => pokemon.currentHp > 0
    );

    // If no alive Pokémon are left for any trainer, handle the case gracefully
    if (alivePokemon1.length === 0 || alivePokemon2.length === 0) {
      console.log("One or both trainers have no alive Pokémon left to fight.");
      return;
    }

    let firstPokemon1 = Math.floor(
      Math.random() * this.trainer1.pokemon.length
    );
    let pokemon1 = this.trainer1.pokemon[firstPokemon1];

    let firstPokemon2 = Math.floor(
      Math.random() * this.trainer2.pokemon.length
    );
    let pokemon2 = this.trainer2.pokemon[firstPokemon2];

    throwPokeball(this.trainer1.name, pokemon1.name);
    throwPokeball(this.trainer2.name, pokemon2.name);

    let index = 0;
    let healDefined;
    while (true) {
      let count1 = 0;
      let count2 = 0;

      turnPokemon(this.trainer1.name, pokemon1.name, 1);

      let addedDamage1 = pokemon1.powerUp();
      if (addedDamage1 != 0) {
        feedPokemon(this.trainer1.name, pokemon1.name);
      }
      if (index != 0) {
        healDefined = Math.floor(Math.random() * 2);
        if (healDefined == 1) {
          pokemon1.heal();
          console.log(``);
        }
      }
      pokemon1.attack(pokemon2, addedDamage1);
      console.log(``);

      if (pokemon2.currentHp > 0) {
        turnPokemon(this.trainer2.name, pokemon2.name, 2);
        let addedDamage2 = pokemon2.powerUp();
        if (addedDamage1 != 0) {
          feedPokemon(this.trainer2.name, pokemon2.name);
        }
        if (index != 0) {
          healDefined = Math.floor(Math.random() * 2);
          if (healDefined == 1) {
            pokemon2.heal();
            console.log(``);
          }
        }
        pokemon2.attack(pokemon1, addedDamage2);
        console.log(``);
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

      // trainer 2 wins
      if (count1 === alivePokemon1.length) {
        winsBattle(this.trainer2.name, this.trainer1.name, isRoundRobin);
        this.trainer2.battleWinner();
        // this.trainer1.resetPokemonHp(this.trainer2);
        return [this.trainer2, this.trainer1]; // [wins, lose]
      }

      // trainer 1 wins
      if (count2 === alivePokemon2.length) {
        winsBattle(this.trainer1.name, this.trainer2.name, isRoundRobin);
        this.trainer1.battleWinner();
        // this.trainer2.resetPokemonHp(this.trainer1);
        return [this.trainer1, this.trainer2]; // [wins, lose]
      }
    }
  }
}

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
  let pokemons = [];
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
    console.log(
      `%c ${element.name} : `,
      "color:rgb(232, 249, 43); font-size: 15px"
    );
    element.pokemons.forEach((item) => {
      console.log(`%c${item.name}`, "color:rgb(232, 249, 43); font-size: 15px");
    });

    switch (index) {
      case 0:
        player1 = new Trainer(element.name, element.pokemons, element.level, 0);
        console.log(`player1 = ${player1.name}`);
        break;
      case 1:
        player2 = new Trainer(element.name, element.pokemons, element.level, 0);
        console.log(`player2 = ${player2.name}`);
        break;
      case 2:
        player3 = new Trainer(element.name, element.pokemons, element.level, 0);
        console.log(`player3 = ${player3.name}`);
        break;
      case 3:
        player4 = new Trainer(element.name, element.pokemons, element.level, 0);
        console.log(`player4 = ${player4.name}`);
        break;
      case 4:
        player5 = new Trainer(element.name, element.pokemons, element.level, 0);
        console.log(`player5 = ${player5.name}`);
        break;
    }
  });
}

definePlayer();
declaringTrainers();

// #region TestData
// const pokemonTest = [
//   new GrassPokemon("Chikorita", 1, initialHp, initialHp, [
//     "Tackle",
//     "Hyperbeam",
//   ]),
//   new GrassPokemon("Bulbasaur", 1, initialHp, initialHp, [
//     "Tackle",
//     "Hyperbeam",
//   ]),
//   new GrassPokemon("Turtwig", 1, initialHp, initialHp, ["Tackle", "Hyperbeam"]),
//   new GrassPokemon("Snivy", 1, initialHp, initialHp, ["Tackle", "Hyperbeam"]),
//   new GrassPokemon("Treecko", 1, initialHp, initialHp, ["Tackle", "Hyperbeam"]),
// ];
// const pokemonTest1 = [
//   new FirePokemon("Charmander", 1, initialHp, initialHp, [
//     "Tackle",
//     "Flamethrower",
//   ]),
//   new FirePokemon("Charmeleon", 1, initialHp, initialHp, [
//     "Tackle",
//     "Flamethrower",
//   ]),
//   new FirePokemon("Charizard", 1, initialHp, initialHp, [
//     "Tackle",
//     "Flamethrower",
//   ]),
//   new FirePokemon("Cyndaquill", 1, initialHp, initialHp, [
//     "Tackle",
//     "Flamethrower",
//   ]),
//   new FirePokemon("Torchic", 1, initialHp, initialHp, [
//     "Tackle",
//     "Flamethrower",
//   ]),
// ];

// // Use a cloning function
// function clonePokemonArray(pokemonArray) {
//   return pokemonArray.map(
//     (pokemonTesting) =>
//       new pokemonTesting.constructor(
//         pokemonTesting.name,
//         pokemonTesting.level,
//         pokemonTesting.currentHp,
//         pokemonTesting.maxHp,
//         pokemonTesting.moves
//       )
//   );
// }

// player1 = new Trainer("Ken", clonePokemonArray(pokemonTest), 1, 0);
// player2 = new Trainer("Jc", clonePokemonArray(pokemonTest1), 1, 0);
// player3 = new Trainer("Ikoy", clonePokemonArray(pokemonTest), 1, 0);
// player4 = new Trainer("Ejay", clonePokemonArray(pokemonTest1), 1, 0);
// player5 = new Trainer("Travis", clonePokemonArray(pokemonTest), 1, 0);

// console.log(`test1 : ${player1.name}`);
// console.log(`test2 : ${player2.name}`);
// console.log(`test3 : ${player3.name}`);
// console.log(`test4 : ${player4.name}`);
// console.log(`test5 : ${player5.name}`);
//#endregion

// #region Bracketings
// battle returns 2 data [winner][loser]
// for 1st player on round robin
let firstBattle = new BattleGround(player1, player2);
let match1 = firstBattle.battle(0);
top3.push(match1[0]);

// for 2nd player on round robin
let secondBattle = new BattleGround(player3, player4);
let match2 = secondBattle.battle(0);
top3.push(match2[0]);

// Loser's Bracket
// reset Pokemon's health for loser's bracket
match1[1].resetPokemonHp(match2[1]);
let thirdBattle = new BattleGround(match1[1], match2[1]);
let match3 = thirdBattle.battle(0);

// for 3rd player on round robin
match3[0].resetPokemonHp(player5);
match3[0].resetLevel();
let fourthBattle = new BattleGround(match3[0], player5);
let match4 = fourthBattle.battle(0);
top3.push(match4[0]);
//#endregion

// #region Round Robin
let roundRobinPlayers = top3.map((element) => {
  let newRoundRobin = {
    trainer: element,
    winCount: 0,
  };
  return newRoundRobin;
});
console.log(roundRobinPlayers);
console.log(roundRobinPlayers[0].trainer);

// Function to calculate the average health of a trainer's Pokémon
function calculateAverageHealth(trainer) {
  let totalHealth = 0;
  let numPokemons = trainer.pokemon.length;
  trainer.pokemon.forEach((pokemon) => {
    totalHealth += pokemon.currentHp;
  });
  return totalHealth / numPokemons;
}

// Function to run the round robin matches
function runRoundRobin(players) {
  let numPlayers = players.length;

  // Loop through each pair of players for round robin battles
  for (let i = 0; i < numPlayers; i++) {
    for (let j = i + 1; j < numPlayers; j++) {
      // Create the battle ground and start the battle
      let roundRobinBattle = new BattleGround(
        players[i].trainer,
        players[j].trainer
      );
      let roundRobinMatch = roundRobinBattle.battle(1); // 1 indicates isRoundRobin

      // Determine the winner based on the battle result
      if (roundRobinMatch[0] === players[i].trainer) {
        players[i].winCount += 1; // Player i wins
      } else {
        players[j].winCount += 1; // Player j wins
      }
    }
  }

  // Log final win counts and determine the overall winner
  console.log("%c\nFinal Results:", "color:rgb(109, 233, 81)");
  players.forEach((player) => {
    console.log(
      `%c${player.trainer.name} has ${player.winCount} wins.`,
      "color:rgb(109, 233, 81)"
    );
  });

  // Find the player with the maximum wins
  let maxWins = Math.max(...players.map((player) => player.winCount));
  let potentialWinners = players.filter(
    (player) => player.winCount === maxWins
  );

  // If there's more than one player with the maximum win count, use the average health tie-breaker
  if (potentialWinners.length > 1) {
    console.log(
      "%c\nTie in wins! Using average health to determine the winner...",
      "color:rgb(48, 197, 243)"
    );

    potentialWinners.forEach((player) => {
      player.averageHealth = calculateAverageHealth(player.trainer);
      console.log(
        `%c${player.trainer.name} has a Pokemon average health of ${player.averageHealth}`,
        "color:rgb(48, 197, 243)"
      );
    });

    // Find the player with the highest average health
    let winner = potentialWinners.reduce((max, player) => {
      return player.averageHealth > max.averageHealth ? player : max;
    });

    console.log(
      `%c\nWinner of the Round Robin Tournament: ${winner.trainer.name}`,
      "color:rgb(109, 233, 81)"
    );
    return winner;
  }

  // If no tie, the player with the most wins is the winner
  let winner = players.reduce((max, player) => {
    return player.winCount > max.winCount ? player : max;
  });

  // console.log(`%cWinner of the Round Robin Tournament: ${winner.trainer.name}`, "color:rgb(109, 233, 81)");
  console.log(
    `%c\n--------- 🏆 ${winner.trainer.name} wins the tournament 🏆 ---------\n`,
    "color:rgb(109, 233, 81); font-size: 25px;"
  );
  return winner;
}

// Run the round robin tournament
let tournamentWinner = runRoundRobin(roundRobinPlayers);

//#endregion
