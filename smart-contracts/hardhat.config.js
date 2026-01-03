import "@nomicfoundation/hardhat-ethers";
import dotenv from "dotenv";
dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
export default {
    solidity: "0.8.19",
    networks: {

        polygon_amoy: {
            type: "http",
            url: process.env.POLYGON_RPC_URL || "https://rpc-amoy.polygon.technology/",
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
        },
        localhost: {
            url: "http://127.0.0.1:8545",
        },
    },
    paths: {
        artifacts: "../client/src/contracts/artifacts",
    }
};
