// Tu ABI aquí
const contractABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "ProjectRegistered",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_index",
                "type": "uint256"
            }
        ],
        "name": "getProject",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
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
        "name": "getProjectCount",
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
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "projects",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_description",
                "type": "string"
            }
        ],
        "name": "registerProject",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

// Dirección del contrato
const contractAddress = "0xf1dF832853B6174B05dc36344A5e418dA5216091";

// Conectar a Metamask (o cualquier otra wallet de Ethereum)
async function connectToBlockchain() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log("Conectado a la blockchain");
    } else {
        alert("Por favor, instala Metamask o usa una wallet compatible.");
    }
}

// Registrar el proyecto en blockchain
async function registerProject(projectName, projectDescription) {
    try {
        const accounts = await window.web3.eth.getAccounts();
        const contract = new window.web3.eth.Contract(contractABI, contractAddress);
        
        // Llama a la función de registro en tu contrato
        await contract.methods.registerProject(projectName, projectDescription).send({ from: accounts[0] });
        
        alert(`${projectName} registrado en la blockchain.`);
    } catch (error) {
        console.error("Error al registrar el proyecto:", error);
    }
}

// Eventos de los botones
document.addEventListener("DOMContentLoaded", () => {
    connectToBlockchain(); // Conectar a la blockchain al cargar la página

    const registerButtons = document.querySelectorAll('.register-btn');
    registerButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectName = button.getAttribute('data-project');
            const projectDescription = button.parentNode.querySelector('.card-text').innerText; // Obtén la descripción del proyecto
            registerProject(projectName, projectDescription);
        });
    });
});
