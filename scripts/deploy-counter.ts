import "@nomiclabs/hardhat-ethers";

import { ethers } from "hardhat";

async function deploy() {
	const Counter = await ethers.getContractFactory("Counter");
	const counterContract = await Counter.deploy();
	await counterContract.deployed();
	console.log("Counter contract address", counterContract.address);

	return counterContract;
}

async function count(counter) {
	await counter.count();

	console.log("Counter", await counter.getCounter());
}

deploy().then(count).catch(console.error);
