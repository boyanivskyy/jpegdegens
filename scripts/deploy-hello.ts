import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

async function foo() {
	const HelloWorld = await ethers.getContractFactory("HelloWorld");
	const hello = await HelloWorld.deploy();
	await hello.deployed();
	console.log("HelloWorld deployed to:", hello.address);

	return hello;
}

async function deploy() {
	const hello = await foo();
	return hello;
}

// @ts-ignore
async function sayHello(helloContaract) {
	console.log("HelloWorld says:", await helloContaract.hello());
}

deploy().then(sayHello).catch(console.error);
