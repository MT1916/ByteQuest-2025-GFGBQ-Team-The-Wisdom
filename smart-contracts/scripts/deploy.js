import hre from "hardhat";

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // 1. Deploy ZakaatFund
    const ZakaatFund = await hre.ethers.getContractFactory("ZakaatFund");
    const zakaatFund = await ZakaatFund.deploy();
    await zakaatFund.waitForDeployment();
    const zakaatFundAddress = await zakaatFund.getAddress();
    console.log("ZakaatFund deployed to:", zakaatFundAddress);

    // 2. Deploy MilestoneValidator
    const MilestoneValidator = await hre.ethers.getContractFactory("MilestoneValidator");
    const milestoneValidator = await MilestoneValidator.deploy(zakaatFundAddress);
    await milestoneValidator.waitForDeployment();
    const milestoneValidatorAddress = await milestoneValidator.getAddress();
    console.log("MilestoneValidator deployed to:", milestoneValidatorAddress);

    // 3. Link them: Set Validator in ZakaatFund
    console.log("Linking contracts...");
    const tx = await zakaatFund.setMilestoneValidator(milestoneValidatorAddress);
    await tx.wait();
    console.log("ZakaatFund: setMilestoneValidator executed.");

    console.log("\n--- Deployment Complete ---");
    console.log("ZakaatFund:", zakaatFundAddress);
    console.log("MilestoneValidator:", milestoneValidatorAddress);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("DEPLOYMENT ERROR:", error);
        process.exit(1);
    });
