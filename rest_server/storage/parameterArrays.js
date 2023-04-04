'use strict';

const toInsertArray = moped=>[
    +moped.mopedid, moped.name, +moped.itemsInStock, 
    +moped.topSpeed, +moped.modelYear
];

const toUpdateArray = moped => [
    moped.name, +moped.itemsInStock, +moped.topSpeed,
    +moped.modelYear, +moped.mopedid
];

module.exports={toInsertArray, toUpdateArray}