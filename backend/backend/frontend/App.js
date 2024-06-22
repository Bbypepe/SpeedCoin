import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Web3 from 'web3';
import SpeedCoinABI from './SpeedCoinABI.json'; // ABI of the SpeedCoin contract

const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'); // Replace with your Infura Project ID
const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract address
const SpeedCoinContract = new web3.eth.Contract(SpeedCoinABI, contractAddress);

export default function App() {
  const [points, setPoints] = useState(0);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    async function load() {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    }
    load();
  }, []);

  const handleMine = () => {
    setPoints(points + 1);
  };

  const handleConvert = async () => {
    if (points >= 5000 && account) {
      const spdAmount = web3.utils.toWei('1', 'ether'); // 1 SPD token

      try {
        await SpeedCoinContract.methods.mint(account, spdAmount).send({ from: '0x9e181e214612fe18a1f6a0927a69fdd8770db35c' });
        alert(`Converted ${points} points to 1 SPD`);
        setPoints(0);
      } catch (error) {
        console.error(error);
        alert('Conversion failed');
      }
    } else {
      alert('You need at least 5000 points to convert');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.points}>{points} Points</Text>
      <Button title="Mine SpeedCoin" onPress={handleMine} />
      <Button title="Convert to SPD" onPress={handleConvert} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  points: {
    fontSize: 24,
    margin: 10,
  },
});
