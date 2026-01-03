import fs from "fs";
import hre from "hardhat";

async function main() {
    try {
        await fs.promises.writeFile("hre_keys.txt", "Keys: " + JSON.stringify(Object.keys(hre), null, 2));
        if (hre.ethers) {
            await fs.promises.appendFile("hre_keys.txt", "\nhre.ethers exists");
        } else {
            await fs.promises.appendFile("hre_keys.txt", "\nhre.ethers MISSING");
        }
    } catch (e) {
        await fs.promises.writeFile("hre_keys.txt", "Error: " + e.message);
    }
}
main();
