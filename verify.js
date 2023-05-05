let addresses = require(`/Users/zandent/Files/conflux_proj/swappi-v2/swappi-deploy/contractAddressPublicTestnet.json`);
async function main() {
    console.log(`Verifying contract on Etherscan...`);
    try {
        await hre.run(`verify:verify`, {
            address: addresses.UniswapV3Factory,
            constructorArguments: [],
    });
    } catch (error) {}
    console.log(`Done for UniswapV3Factory`);
    for (const token of ["WCFX", "ETH", "BTC", "PPI", "VST"]) {
        const market = addresses.Markets[token];
        for (const feeTier of ['500', '3000', '10000']){
            try {
                await hre.run(`verify:verify`, {
                    address: market["poolWithUSDT"+feeTier],
                    constructorArguments: [],
            });
            } catch (error) {}
            console.log(`👉 Done for ${token}/USDT fee tier ${feeTier}`);
        }
      }    
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});