
  async function loadWeb3() {
      if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          window.ethereum.enable();
      }
  }

  async function loadContract() {
      return await new window.web3.eth.Contract(ABI, '0xC5533e4403D170d6860C00426048062Ce02DBdAE');
  }

  async function printCoolNumber() {
      updateStatus('fetching Cool Number...');
      const coolNumber = await window.contract.methods.coolNumber().call();
      updateStatus(`coolNumber: ${coolNumber}`);
  }

  async function getCurrentAccount() {
    const accounts = await window.web3.eth.getAccounts();
    return accounts[0];
  }

  async function changeCoolNumber() {
      const value = Math.floor(Math.random() * 100);
      updateStatus(`Updating coolNumber with ${value}`);
      const account = await getCurrentAccount();
      const coolNumber = await window.contract.methods.setCoolNumber(value).send({from: account});
      updateStatus('Updated!');
  }

  async function load() {
      await loadWeb3();
      window.contract = await loadContract();
      updateStatus('Ready!');
  }

  function updateStatus(status) {
      const statusEl = document.getElementById('status');
      statusEl.innerHTML = status;
      console.log(status);
  }

  load();
