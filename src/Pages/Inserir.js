import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Inserir() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cidade, setCidade] = useState('');
  const [rua, setRua] = useState('');
  const [senha, setSenha] = useState('');
  const [cep, setCep] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [erro, setErro] = useState(false);

  const Cadastro = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          username: usuario,
          password: senha,
          name: {
            firstname: nome,
            lastname: sobrenome
          },
          address: {
            city: cidade,
            street: rua,
            number: 3,
            zipcode: cep,
            geolocation: {
              lat: '-37.3159',
              long: '81.1496'
            }
          },
          phone: telefone
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar usuário');
      }

      // Navega para a página de busca após o cadastro bem-sucedido
      navigation.navigate('Busca');
    } catch (error) {
      console.error(error);
      setErro(true);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <>
        <Text style={styles.title}>Cadastro</Text>

        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          onChangeText={setNome}
          value={nome}
        />

        <Text style={styles.label}>Sobrenome:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu sobrenome"
          onChangeText={setSobrenome}
          value={sobrenome}
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Telefone:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu telefone"
          onChangeText={setTelefone}
          value={telefone}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>CEP:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu CEP"
          onChangeText={setCep}
          value={cep}
        />

        <Text style={styles.label}>Rua:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua rua"
          onChangeText={setRua}
          value={rua}
        />

        <Text style={styles.label}>Cidade:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua cidade"
          onChangeText={setCidade}
          value={cidade}
        />

        <Text style={styles.label}>Data de Nascimento:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua data de nascimento"
          onChangeText={setDataNascimento}
          value={dataNascimento}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          onChangeText={setSenha}
          value={senha}
          secureTextEntry
        />

        <TouchableOpacity style={styles.btnCadastrar} onPress={Cadastro}>
          <Text style={styles.CadastrarText}>CADASTRAR</Text>
        </TouchableOpacity>

        {erro && <Text style={styles.errorText}>Revise os campos cuidadosamente e tente novamente.</Text>}
      </>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  btnCadastrar: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  CadastrarText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});
