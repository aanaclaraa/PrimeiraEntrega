import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';

export default function Inserir(){
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
    const [sucesso, setSucesso] = useState(false);
    const [erro, setErro] = useState(false);

    async function Cadastro() {
        await fetch('https://fakestoreapi.com/users', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          }, 
          body:JSON.stringify({
            email:email,
            username: usuario,
            password: senha,
            name:{
                firstname: nome,
                lastname: sobrenome
            },
            address:{
                city: cidade,
                street: rua,
                number:3,
                zipcode: cep,
                geolocation:{
                    lat:'-37.3159',
                    long:'81.1496'
                }
            },
            phone:'1-570-236-7033'
            })
          })      
          .then(res => (res.ok == true) ? res.json() : false)
          .then(json => console.log(json))
          .catch(err => setErro(true))
      }

      return (
        <ScrollView style={styles.container}>
            {sucesso ?
            <Text style={styles.text}>Obrigado por se Cadastar. Seu cadastro foi realizado com sucesso!</Text>
            :
            <>
            
          <Text style={styles.title}>Cadastro</Text>

          <Text style={styles.label}>Nome:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            onChangeText={text => setNome(text)}
            value={nome}
          />

          <Text style={styles.label}>Sobrenome:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu sobrenome"
            onChangeText={text => setSobrenome(text)}
            value={sobrenome}
          />

          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            onChangeText={text => setEmail(text)}
            value={email}
            keyboardType="email-address"
          />

          <Text style={styles.label}>Telefone:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu telefone"
            onChangeText={text => setTelefone(text)}
            value={telefone}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>CEP:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu endereço"
            onChangeText={text => setCep(text)}
            value={cep}
          />

          <Text style={styles.label}>Rua:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu endereço"
            onChangeText={text => setRua(text)}
            value={rua}
          />

          <Text style={styles.label}>Cidade:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua cidade"
            onChangeText={text => setCidade(text)}
            value={cidade}
          />

          <Text style={styles.label}>Data de Nascimento:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua data de nascimento"
            onChangeText={text => setDataNascimento(text)}
            value={dataNascimento}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Senha:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            onChangeText={text => setSenha(text)}
            value={senha}
            secureTextEntry={true}
          />

          <TouchableOpacity style={styles.btnCadastrar} onPress={Cadastro}>
            <Text style={styles.CadastrarText}>CADASTRAR</Text>
          </TouchableOpacity>
          {erro && <Text>Revise os campos cuidadosamente. Tente Novamente</Text>}
        </>
        }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: 'pink',
      color: 'black'
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: 'black'
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
      color: 'black'
    },
    input: {
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 5,
      padding: 10,
      marginBottom: 15,
      color: 'black'
    },
    btnCadastrar: {
      backgroundColor: 'black',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    cadastrarText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white'
    },
    errorText: {
      color: 'white',
      marginTop: 10,
    },
  });