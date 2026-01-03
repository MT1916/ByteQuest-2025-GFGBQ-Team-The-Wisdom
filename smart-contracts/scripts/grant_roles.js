import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    try {
        const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
        const signer = await provider.getSigner();

        const deployData = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../last_deployment.json"), "utf8"));
        const zakaatFundAddress = deployData.zakaatFund;

        // Load ABI
        const artifactPath = path.resolve(__dirname, "../../client/src/contracts/artifacts/contracts/ZakaatFund.sol/ZakaatFund.json");
        const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

        const zakaatFund = new ethers.Contract(zakaatFundAddress, artifact.abi, signer);

        const ROLE_NGO = ethers.keccak256(ethers.toUtf8Bytes("ROLE_NGO"));
        const ROLE_VALIDATOR = ethers.keccak256(ethers.toUtf8Bytes("ROLE_VALIDATOR"));

        console.log("Granting ROLE_NGO to:", signer.address);
        let tx = await zakaatFund.grantRole(ROLE_NGO, signer.address);
        await tx.wait();
        console.log("Granted ROLE_NGO");

        console.log("Granting ROLE_VALIDATOR to:", signer.address);
        tx = await zakaatFund.grantRole(ROLE_VALIDATOR, signer.address);
        await tx.wait();
        console.log("Granted ROLE_VALIDATOR");

    } catch (e) {
        console.error(e);
    }
}
main();
