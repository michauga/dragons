async function main() {
    // Grab the contract factory 
    const Dragon = await ethers.getContractFactory("Dragon");
 
    // Start deployment, returning a promise that resolves to a contract object
    const dragon = await Dragon.deploy(); // Instance of the contract 
    console.log("Contract deployed to address:", dragon.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });