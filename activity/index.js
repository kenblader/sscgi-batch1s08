// Grass strong on Electric, Weak on Fire
// Fire strong on Grass, Weak on Water
// Water strong on Fire, Weak on Electric
// Electric strong Water, Weak on Grass
// Normal is neither strong nor weak to other types

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
    console.log(`${this.name} got damaged by ${damage}`);
    if (this.hp <= 0) {
      console.log(`${this.name} fainted`);
      this.hp = 0;
    } else console.log(`${this.name} still has ${this.hp} left`);
  }
  heal() {
    let potionAmount = 0;
    let potion = Math.floor(Math.random() * 2);
    if (potion == 0) potionAmount = 20;
    else potionAmount = 10;

    this.hp += potionAmount;
    console.log(
      `${this.name} used potion and added ${potionAmount}! New hp is ${this.hp}`
    );
  }
}

class WaterPokemon extends Pokemon {
  constructor(name, level, hp, moves) {
    //calling the base class constructor
    super(name, "Water", level, hp, moves);
  }
  attack(opponent) {
    let placeHolder = Math.floor(Math.random() * 2);
    // console.log(placeHolder);
    let damage = 0;
    if (this.moves[placeHolder] == "Tackle") {
      damage = 10;
    } else {
      // add where pokemons are strong
      if (opponent.type == "Fire") damage = 25;
      else damage = 15;
    }
    console.log(
      `${this.name} uses ${this.moves[placeHolder]} on ${opponent.name}`
    );
    if (damage == 25) {
      console.log(`Critical Hit, ${opponent.type} is weak on ${this.type}`);
    }
    opponent.recievedDamage(damage);
  }
}

class FirePokemon extends Pokemon {
  constructor(name, level, hp, moves) {
    //calling the base class constructor
    super(name, "Fire", level, hp, moves);
  }
  attack(opponent) {
    let placeHolder = Math.floor(Math.random() * 1);
    let damage = 0;
    if (this.moves[placeHolder] == "Tackle") {
      damage = 10;
    } else {
      // add where pokemons are strong
      if (opponent.type == "Grass") damage = 25;
      else damage = 15;
    }
    console.log(
      `${this.name} uses ${this.moves[placeHolder]} on ${opponent.name}`
    );
    if (damage == 25) {
      console.log(`Critical Hit, ${opponent.type} is weak on ${this.type}`);
    }
    opponent.recievedDamage(damage);
  }
}

class ElectricPokemon extends Pokemon {
  constructor(name, level, hp, moves) {
    //calling the base class constructor
    super(name, "Electric", level, hp, moves);
  }
  attack(opponent) {
    let placeHolder = Math.floor(Math.random() * 2);
    let damage = 0;
    if (this.moves[placeHolder] == "Tackle") {
      damage = 10;
    } else {
      // add where pokemons are strong
      if (opponent.type == "Water") damage = 25;
      else damage = 15;
    }
    console.log(
      `${this.name} uses ${this.moves[placeHolder]} on ${opponent.name}`
    );
    if (damage == 25) {
      console.log(`Critical Hit, ${opponent.type} is weak on ${this.type}`);
    }
    opponent.recievedDamage(damage);
  }
}

class GrassPokemon extends Pokemon {
  constructor(name, level, hp, moves) {
    //calling the base class constructor
    super(name, "Grass", level, hp, moves);
  }
  attack(opponent) {
    let placeHolder = Math.floor(Math.random() * 2);
    let damage = 0;
    if (this.moves[placeHolder] == "Tackle") {
      damage = 10;
    } else {
      // add where pokemons are strong
      if (opponent.type == "Electric") damage = 25;
      else damage = 15;
    }
    console.log(
      `${this.name} uses ${this.moves[placeHolder]} on ${opponent.name}`
    );
    if (damage == 25) {
      console.log(`Critical Hit, ${opponent.type} is weak on ${this.type}`);
    }
    opponent.recievedDamage(damage);
  }
}
class NormalPokemon extends Pokemon {
  constructor(name, level, hp, moves) {
    //calling the base class constructor
    super(name, "Fighting", level, hp, moves);
  }
  attack(opponent) {
    let placeHolder = Math.floor(Math.random() * 2);
    let damage = 0;
    if (this.moves[placeHolder] == "Tackle") {
      damage = 10;
    } else {
      // add where pokemons are strong
      damage = 20;
    }
    console.log(
      `${this.name} uses ${this.moves[placeHolder]} on ${opponent.name}`
    );

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
}

// declare pokemons
let pikachu = new ElectricPokemon("Pikachu", 5, 50, ["Tackle", "Electro Shot"]);
let charmander = new FirePokemon("Charmander", 5, 50, [
  "Tackle",
  "Flamethrower",
]);
let bulbasaur = new GrassPokemon("Bulbasaur", 5, 50, ["Tackle", "Psychic"]);
let squirtle = new WaterPokemon("Squirtle", 5, 50, ["Tackle", "HydroCannon"]);
let carps = new NormalPokemon("Carps", 5, 50, ["Tackle", "Karate Chop"]);

// declare Trainers
const jedd = new Trainer("Jedd", [carps, squirtle]);
const ken = new Trainer("Ken", [bulbasaur, squirtle]);
const joeshua = new Trainer("Joeshua", [carps, pikachu]);
const junjun = new Trainer("Junjun", [pikachu, charmander]);
const jonas = new Trainer("Jonas", [squirtle, bulbasaur]);

class BattleGround {
  constructor(trainer1, trainer2) {
    this.trainer1 = trainer1;
    this.trainer2 = trainer2;
  }

  battle() {
    // first pokemon battle
    let firstPokemon1 = Math.floor(Math.random() * 1);
    let pokemon1 = this.trainer1.pokemon[firstPokemon1];
    // console.log(pokemon1);

    let firstPokemon2 = Math.floor(Math.random() * 1);
    let pokemon2 = this.trainer2.pokemon[firstPokemon2];
    // console.log(pokemon2);

    console.log(
      `=================================== ` +
        `Battle of ${this.trainer1.name} and ${this.trainer2.name} ` +
        `===================================`
    );

    let index = 0;

    while (true) {
      let count1 = 0;
      let count2 = 0;
      console.log(`--------- ${pokemon1.name} turn ------------`);
      pokemon1.attack(pokemon2);
      console.log(``);

      if (pokemon2.hp > 0) {
        console.log(`--------- ${pokemon2.name} turn ------------`);
        pokemon2.attack(pokemon1);
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
        let placeHolder;
        this.trainer1.pokemon.forEach((element) => {
          if (element.hp > 0) placeHolder = element;
        });
        pokemon1 = placeHolder;
      }

      if (pokemon2.hp <= 0) {
        let placeHolder;
        this.trainer2.pokemon.forEach((element) => {
          if (element.hp > 0) {
            placeHolder = element;
          }
        });
        pokemon2 = placeHolder;
      }

      this.trainer1.pokemon.forEach((element) => {
        if (element.hp <= 0) count1++;
      });
      this.trainer2.pokemon.forEach((element) => {
        if (element.hp <= 0) count2++;
      });

      if (count1 == 2) {
        console.log(`${this.trainer1.name} wins`);
        console.log(``);
        break;
      } else if (count2 == 2) {
        console.log(`${this.trainer2.name} wins`);
        console.log(``);
        break;
      } else {
        continue;
      }
    }
  }
}

const firstBattle = new BattleGround(jedd, ken);
firstBattle.battle();

const secondBattle = new BattleGround(joeshua, junjun);
secondBattle.battle();

const thirdBattle = new BattleGround(jonas, jedd);
thirdBattle.battle();

const fourthBattle = new BattleGround(ken, joeshua);
fourthBattle.battle();

const fifthBattle = new BattleGround(junjun, jonas);
fifthBattle.battle();
