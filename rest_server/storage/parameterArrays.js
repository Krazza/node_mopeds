'use strict';

const toInsertArray=computer=>[
    +computer.id, computer.name, computer.type, 
    computer.processor, +computer.amount
];

const toUpdateArray = computer => [
    computer.name, computer.type, computer.processor,
    +computer.amount, +computer.id
];

module.exports={toInsertArray, toUpdateArray}