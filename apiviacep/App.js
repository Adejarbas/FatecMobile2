import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ActivityIndicator, TextInput } from 'react-native';

export default function App() {
  // const cepx = null;
  const [ cep, setCep ] = useState([]);
  const  [loading, setLoading] = useState(false);

    // API FETCH
    const BuscaCep=async(x)=> { 
      let url = `https://viacep.com.br/ws/${x}/json/`;
      setLoading(true);

      await fetch(url)
      .then(resp => resp.json())
      .then(data => {
        // console.log(data)
        setCep(data);
        // Navegando os elementos/indices do array
        // console.log("-" + cep.bairro);
      })
      .catch(error => console.log("tipo" + error))
    
      setLoading(false);
    }

  return (
    <View style={styles.container}>
      <Button title="FAZ O L" onPress={ () =>  BuscaCep('70070550')} />

      <TextInput
        value = {cep.logradouro}
        onChangeText={ text => setCep({...cep, logradouro: text})}
        style = {{ height: 40, borderColor: 'gray', borderWidth: 1}}
      />
      { loading && <ActivityIndicator size="large" color="#0000ff" /> }
      {
        cep != "" &&(
          <View>
            <Text>Rua: {cep.logradouro}</Text>
            <Text>Bairro: {cep.bairro}</Text>
            <Text>Cidade: {cep.localidade}</Text>
            <Text>Estado: {cep.uf}</Text>
          </View>
        )   
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
