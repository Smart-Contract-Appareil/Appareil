let ABIAppareil =[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "field",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "oldvalue",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "newvalue",
				"type": "string"
			}
		],
		"name": "changeInfoEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "int256",
				"name": "newStatus",
				"type": "int256"
			}
		],
		"name": "changeOfStatusEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "work_or_reason",
				"type": "string"
			}
		],
		"name": "interventionEvent",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "a_type",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "askIntervention",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "brand",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "categorie",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
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
		"name": "dataPJ",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "type_doc",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "date",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "intervenant",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "prix_tot",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "cat",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ap_type",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "marque",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ref",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "nb_serie",
				"type": "string"
			}
		],
		"name": "editAppareil",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "identifiant",
				"type": "uint256"
			}
		],
		"name": "getProductPJ",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
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
		"name": "list",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "contratsClientAddr",
				"type": "address"
			},
			{
				"internalType": "int256",
				"name": "newStatus",
				"type": "int256"
			},
			{
				"internalType": "string[]",
				"name": "work_or_reason",
				"type": "string[]"
			}
		],
		"name": "logIntervention",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"inputs": [],
		"name": "pjCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "refer",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "serial_n",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "contratsClientAddr",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "cat",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ap_type",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "marque",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ref",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "nb_serie",
				"type": "string"
			}
		],
		"name": "setAppareil",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "type_doc",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "intervenant",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "prix_tot",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "products",
				"type": "string[]"
			}
		],
		"name": "setPJ",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "statut",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
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
	}
];