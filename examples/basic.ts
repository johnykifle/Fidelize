import { toFidel, toLatin } from "fidelize";

console.log(toFidel("ab tHti 'arat"));
console.log(toFidel("selam"));
console.log(toFidel("Hawi may"));

console.log(toFidel("ab tahti arat", { mode: "casual" }));

console.log(toLatin("ኣብ ትሕቲ ዓራት"));
console.log(toLatin("ሰላም"));
