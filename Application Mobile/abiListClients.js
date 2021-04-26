export const ABIListClients = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_wallet",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_contract",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_nom",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_adressePostale",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_codePostal",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ville",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_tel",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_mail",
				"type": "string"
			}
		],
		"name": "addClient",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_wallet",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_contract",
				"type": "address"
			}
		],
		"name": "addClientWallet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "_wallets",
				"type": "address[]"
			},
			{
				"internalType": "address",
				"name": "_contract",
				"type": "address"
			}
		],
		"name": "addClientWallets",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "arrayClients",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "clients",
		"outputs": [
			{
				"internalType": "string",
				"name": "nom",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "adressePostale",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "codePostal",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ville",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "tel",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "mail",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "clientsWallets",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getClientsAddresses",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getClientsWallets",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_contract",
				"type": "address"
			}
		],
		"name": "removeClient",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_contract",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_nom",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_adressePostale",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_codePostal",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ville",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_tel",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_mail",
				"type": "string"
			}
		],
		"name": "updateClient",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "updateTechniciansWLAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "walletToContract",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];