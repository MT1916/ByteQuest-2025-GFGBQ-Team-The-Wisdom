require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.19",
    networks: {
        hardhat: {},
        polygon_amoy: {
            url: process.env.POLYGON_RPC_URL || "https://rpc-amoy.polygon.technology/",
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
        },
        // Mumbai is deprecated, using Amoy as replacement or generic placeholder
    },
    paths: {
        artifacts: "../client/src/contracts/artifacts", // Auto-export to client
    }
};
