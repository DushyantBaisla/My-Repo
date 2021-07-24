let input = process.argv.slice(2);

let input = input[0];

switch (cmd){
    case: "view":
        console.log("view command implemented");
        break;
    case: "organize":
        console.log("organize command implemented");
        break;
    case: "help":
        console.log(`List of all the commands
        1. node mycli.js view <dirname> flat
        2. node mycli.js view <dirname> tree
        3. node mycli.js organize <dirname>
        4. node mycli.js help
         `);
        break;

    default:
        console.log("wrong command, type help to see list of commands");
}