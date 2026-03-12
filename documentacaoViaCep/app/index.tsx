import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { TextInput, Button, ActivityIndicator } from 'react-native-paper';

export default function HomeScreen() {
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [loading, setLoading] = useState(false);

  // Lista de estados para o formulário
  const estadosBrasileiros = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 
    'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 
    'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  // Função para buscar o CEP e preencher os campos do formulário
  const buscarCep = async () => {
    if (cep.length !== 8) {
      Alert.alert('Aviso', 'O CEP deve ter 8 números.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const json = await response.json();

      if (json.erro) {
        Alert.alert('Erro', 'CEP não encontrado.');
      } else {
        setLogradouro(json.logradouro || '');
        setBairro(json.bairro || '');
        setCidade(json.localidade || '');
        setEstado(json.uf || '');
        setComplemento(json.complemento || '');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao buscar CEP.');
    } finally {
      setLoading(false);
    }
  };

  const temaInput = {
    colors: {
      onSurfaceVariant: '#000',
      primary: '#000',
      text: '#000',
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.row}>
        <TextInput
          label="CEP"
          value={cep}
          onChangeText={setCep}
          keyboardType="numeric"
          maxLength={8}
          mode="flat"
          style={styles.inputCep}
          theme={temaInput}
          textColor="#000"
        />
        <Button mode="contained" onPress={buscarCep} style={styles.btnBusca}>
          BUSCAR
        </Button>
      </View>

      {loading && <ActivityIndicator animating={true} style={styles.loader} color="#000" />}

      <TextInput
        label="Logradouro"
        value={logradouro}
        onChangeText={setLogradouro}
        mode="flat"
        style={styles.input}
        theme={temaInput}
        textColor="#000"
      />

      <View style={styles.row}>
        <TextInput
          label="Número"
          value={numero}
          onChangeText={setNumero}
          mode="flat"
          style={[styles.input, { flex: 1, marginRight: 10 }]}
          theme={temaInput}
          textColor="#000"
        />
        <TextInput
          label="Complemento"
          value={complemento}
          onChangeText={setComplemento}
          mode="flat"
          style={[styles.input, { flex: 2 }]}
          theme={temaInput}
          textColor="#000"
        />
      </View>

      <TextInput
        label="Bairro"
        value={bairro}
        onChangeText={setBairro}
        mode="flat"
        style={styles.input}
        theme={temaInput}
        textColor="#000"
      />

      <View style={styles.row}>
        <TextInput
          label="Cidade"
          value={cidade}
          onChangeText={setCidade}
          mode="flat"
          style={[styles.input, { flex: 2, marginRight: 10 }]}
          theme={temaInput}
          textColor="#000"
        />
        
        {/* Usando um TextInput com menu simples para emular combo box sem complicar muito para iniciante */}
        <TextInput
          label="UF"
          value={estado}
          mode="flat"
          style={[styles.input, { flex: 1 }]}
          theme={temaInput}
          editable={true}
          onChangeText={(text) => setEstado(text.toUpperCase().substring(0, 2))}
          textColor="#000"
        />
      </View>

      <Button 
        mode="contained" 
        onPress={() => Alert.alert('Sucesso', 'Cadastro realizado!')} 
        style={styles.btnCadastro}
      >
        CADASTRAR
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    paddingTop: 50,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputCep: {
    flex: 1,
    marginRight: 10,
    backgroundColor: 'transparent',
  },
  btnBusca: {
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  input: {
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  loader: {
    marginVertical: 10,
  },
  btnCadastro: {
    marginTop: 20,
    paddingVertical: 5,
    backgroundColor: '#2e7d32',
  },
});
