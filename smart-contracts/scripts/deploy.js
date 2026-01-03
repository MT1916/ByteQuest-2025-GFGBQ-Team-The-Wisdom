const hre = require("hardhat");

async function main() {
    const ZakaatFund = await hre.ethers.getContractFactory("ZakaatFund");
    const zakaatFund = await ZakaatFund.deploy();

    await zakaatFund.waitForDeployment();

    console.log("ZakaatFund deployed to:", zakaatFund.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
