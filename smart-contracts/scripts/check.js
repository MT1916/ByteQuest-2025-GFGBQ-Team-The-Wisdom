import fs from "fs";
import hre from "hardhat";

async function main() {
    try {
        await fs.promises.writeFile("debug_out.txt", "Starting\n");
        const block = await hre.ethers.provider.getBlockNumber();
        await fs.promises.appendFile("debug_out.txt", "Block: " + block + "\n");
        const [deployer] = await hre.ethers.getSigners();
        await fs.promises.appendFile("debug_out.txt", "Deployer: " + deployer.address + "\n");
    } catch (e) {
        await fs.promises.appendFile("debug_out.txt", "Error: " + e.stack + "\n");
    }
}

main();
