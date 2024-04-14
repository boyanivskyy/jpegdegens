import { ethers } from "ethers";
import Counter from "../artifacts/contracts/Counter.sol/Counter.json";

function getEth() {
	// @ts-ignore
	const eth = window.ethereum;

	if (!eth) {
		throw new Error("get metamask and a posivite attitude");
	}

	return eth;
}

async function hasAccounts() {
	const eth = getEth();

	const accounts = (await eth.request({
		method: "eth_accounts",
	})) as string[];

	return accounts && accounts.length;
}

async function requestAccounts() {
	const eth = getEth();

	const accounts = (await eth.request({
		method: "eth_requestAccounts",
	})) as string[];

	return accounts && accounts.length;
}

async function run() {
	if (!(await hasAccounts()) && !(await requestAccounts())) {
		throw new Error("Please let me take your money :)");
	}
	// npx hardhat run scripts/deploy-hello.ts --network localhost
	// and then check To address
	// const address = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
	const address = process.env.CONTRACT_ADDRESS;

	const counter = new ethers.Contract(
		address,
		Counter.abi,
		new ethers.providers.Web3Provider(getEth()).getSigner()
	);

	const viewEl = document.createElement("div");

	async function setCounter(count?) {
		viewEl.innerHTML = count || (await counter.getCounter());
	}
	setCounter();

	const buttonEl = document.createElement("button");
	buttonEl.innerText = "increment";

	buttonEl.onclick = async function () {
		await counter.count();
	};

	counter.on(counter.filters.CounterInc(), function (count) {
		setCounter(count);
	});

	document.body.appendChild(viewEl);
	document.body.appendChild(buttonEl);
}

run();
