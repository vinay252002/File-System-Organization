function helpfn(){
    console.log(`
    List all the commands-
        1) Tree command - node FO.js tree <dirname>
        2) Organize Command - node FO.js organize <dirname>
        3) Help command - node FO.js help
    `)
}
module.exports={
    helpKey :helpfn
}