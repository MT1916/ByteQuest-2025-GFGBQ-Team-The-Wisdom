import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    try {
        const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
        const network = await provider.getNetwork();
        console.log("Connected to network:", network.chainId);

        const signer = await provider.getSigner();
        console.log("Deploying with:", signer.address);

        // 1. Deploy ZakaatFund
        const zfPath = path.resolve(__dirname, "../../client/src/contracts/artifacts/contracts/ZakaatFund.sol/ZakaatFund.json");
        if (!fs.existsSync(zfPath)) throw new Error("ZakaatFund artifact not found at " + zfPath);

        const zfArtifact = JSON.parse(fs.readFileSync(zfPath, "utf8"));
        const ZF = new ethers.ContractFactory(zfArtifact.abi, zfArtifact.bytecode, signer);
        const zf = await ZF.deploy();
        await zf.waitForDeployment();
        const zfAddress = await zf.getAddress();
        console.log("ZakaatFund allocated at:", zfAddress);

        // 2. Deploy MilestoneValidator
        const mvPath = path.resolve(__dirname, "../../client/src/contracts/artifacts/contracts/MilestoneValidator.sol/MilestoneValidator.json");
        if (!fs.existsSync(mvPath)) throw new Error("MilestoneValidator artifact not found at " + mvPath);

        const mvArtifact = JSON.parse(fs.readFileSync(mvPath, "utf8"));
        const MV = new ethers.ContractFactory(mvArtifact.abi, mvArtifact.bytecode, signer);
        const mv = await MV.deploy(zfAddress);
        await mv.waitForDeployment();
        const mvAddress = await mv.getAddress();
        console.log("MilestoneValidator allocated at:", mvAddress);

        // 3. Link
        console.log("Linking...");
        const tx = await zf.setMilestoneValidator(mvAddress);
        await tx.wait();
        console.log("Linked.");

        // Output to file
        fs.writeFileSync("last_deployment.json", JSON.stringify({
            zakaatFund: zfAddress,
            milestoneValidator: mvAddress
        }, null, 2));

    } catch (e) {
        console.error("Manual Deploy Error:", e);
        fs.writeFileSync("deploy_error_manual.txt", e.stack);
    }
}
main();
