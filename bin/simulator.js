var units = require('./data/units');
var utils = require('./utils');
var _ = require('lodash');

module.exports = {
    data: {

    },

    simulate: function (input) {
        this.input = _.cloneDeep(input);
        this.data = _.cloneDeep(input);

        this.computeRamsStartAtk();

        do {
            this.round();
        } while (utils.sum(this.data.atk.units) >= 1 && utils.sum(this.data.def.units) >= 1);

        this.computeRamsEndAtk();

        return this.data;
    },

    round: function() {
        var atk = this.getAtk();
        var def = this.getDef();

        var atk_food;

        var copy = _.cloneDeep(this.data.def.units);
        var distributions = this.getDistributions();

        _.forEach(atk, function(attack, type) {
            if(attack !== 0) {
                var distribution = distributions[type];
                var defense = def[type];

                // Calcul du résultat de l'attaque pour le type courant
                var r = Math.pow(attack / defense, 3/2);
                if(r < 1) {
                    // Calcul des pertes défensives
                    _.forEach(units, function(unit, name) {
                        this.data.def.units[name] -= copy[name] * r * distribution;
                    }.bind(this));

                    // Calcul des pertes offensives
                    _.forEach(units, function(unit, name) {
                        if(unit.type === type) {
                            this.data.atk.units[name] = 0;
                        }
                    }.bind(this));
                }
                else {
                    // Calcul des pertes défensives
                    _.forEach(units, function(unit, name) {
                        this.data.def.units[name] -= copy[name] * distribution;
                    }.bind(this));

                    // Calcul des pertes offensives
                    _.forEach(units, function(unit, name) {
                        if(unit.type === type) {
                            this.data.atk.units[name] *= (1 - 1 / r);
                        }
                    }.bind(this));
                }
            }
        }.bind(this));
    },

    computeRamsStartAtk: function() {
        var rams_atk = this.data.atk.units.ram * this.getRamModifier();
        var max_wall_loss = this.data.def.wall / 2;
        this.data.def.wall -= Math.min(max_wall_loss, rams_atk / this.getWallRamDef());
    },

    computeRamsEndAtk: function() {
        if(this.data.atk.units.ram !== 0 && this.data.def.wall !== 0) {
            var ram_atk = units.ram.attack * this.getRamModifier();
            rams_atk = (this.data.atk.units.ram + this.input.atk.units.ram) / 2 * ram_atk;
            this.data.def.wall -= Math.round(rams_atk / this.getWallRamDef());
        }
    },

    getWallDef: function() {
        if(this.data.def.wall === 0) {
            return 0;
        }
        else {
            return Math.round(Math.pow(1.25, this.data.def.wall) * 20);
        }
    },

    getFaithBonus: function() {
        return (this.data.atk.chapel ? 0.5 : 1) * (this.data.def.chapel ? 2 : 1);
    },

    getWallRamDef: function() {
        return 4 * Math.pow(1.09, this.data.def.wall);
    },

    getWallBonus: function() {
        return 1 + this.data.def.wall * 0.05;
    },

    getRamModifier: function() {
        return this.getFaithBonus();
    },

    getAtkModifier: function() {
        return this.data.atk.moral * (1 + this.data.atk.luck) * this.getFaithBonus();
    },

    getAtkFood: function() {
        var food = {
            inf: 0,
            cav: 0,
            arc: 0
        };

        _.forEach(units, function(unit, name) {
            food[unit.type] += unit.food * this.data.atk.units[name];
        }.bind(this));

        return food;
    },

    getAtk: function() {
        // Initialisation
        var atk = {
            inf: 0,
            cav: 0,
            arc: 0
        };

        // Somme des attaques de chaques unités présentes
        _.forEach(units, function(unit, name) {
            atk[unit.type] += unit.attack * this.data.atk.units[name];
        }.bind(this));

        // Prise en compte du ratio d'efficacité de l'attaque
        _.forEach(atk, function(value, type) {
            atk[type] *= this.getAtkModifier();
        }.bind(this));

        return atk;
    },

    getDistribution: function(type) {
        var atk_food = this.getAtkFood();
        return atk_food[type] / utils.sum(atk_food);
    },

    getDistributions: function() {
        return {
            inf: this.getDistribution('inf'),
            cav: this.getDistribution('cav'),
            arc: this.getDistribution('arc')
        };
    },

    getDef: function() {
        // Initialisation
        var def = {
            inf: 0,
            cav: 0,
            arc: 0
        };

        // Somme des défenses de chaques unités présentes
        _.forEach(def, function(value, type) {
            var distribution = this.getDistribution(type);
            _.forEach(units, function(unit, name) {
                def[type] += unit.defense[type] * this.data.def.units[name];
            }.bind(this));
        }.bind(this));

        // Application de l'éventuel bonus de nuit
        if(this.data.night_bonus) {
            _.forEach(def, function(value, type) {
                def[type] *= 2;
            });
        }

        // Prise en compte de la défense du mur
        _.forEach(def, function(value, type) {
            def[type] = value * this.getWallBonus() + this.getWallDef();
        }.bind(this));

        // Prise en compte de la distribution attaquante
        _.forEach(def, function(value, type) {
            var distribution = this.getDistribution(type);
            def[type] *= distribution;
        }.bind(this));

        return def;
    }
}
