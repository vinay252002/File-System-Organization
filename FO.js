const fs = require('fs')
const path = require('path') 
let command = process.argv.slice(2)
//Node[0] FO.js[1] tree[2] folder[3]
const help = require('./command/help')
const  organize = require('./command/organize')
const tree = require('./command/tree')

let input = command[0]
switch(input){
    case 'tree':
        tree.treeKey(command[1])
        break

    case 'organize':
        organize.organizeKey(command[1])
        break

    case 'help':
        help.helpKey()
        break

    default:
        console.log("Invalid")
        break
}


