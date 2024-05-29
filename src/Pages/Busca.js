import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function Busca() {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(false);
  const [edicao, setEdicao] = useState(false);
  const [userId, setUserId] = useState(0);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [deleteResposta, setDeleteResposta] = useState(false);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch('http://10.139.75.28:5251/api/Users/GetAllUsers');
      if (!response.ok) {
        throw new Error('Erro ao buscar usuários');
      }
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  }

  const getUsuario = async (id) => {
    try {
      const response = await fetch(`http://10.139.75.28:5251/api/Users/GetUsersId/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar usuário');
      }
      const json = await response.json();
      setUserId(json.userId);
      setNome(json.userName);
      setEmail(json.userEmail);
      setSenha(json.userPassword);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  }

  const editUser = async () => {
    try {
      const response = await fetch(`http://10.139.75.28:5251/api/Users/UpdateUser/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          userId: userId,
          userEmail: email,
          userPassword: senha,
          userName: nome,
        }),
      });
      if (!response.ok) {
        throw new Error('Erro ao editar usuário');
      }
      fetchUsuarios(); // Atualiza a lista após edição
      setEdicao(false);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  }

  function showAlert(id, userName) {
    Alert.alert(
      '',
      'Deseja realmente excluir esse Cliente?',
      [
        { text: 'Sim', onPress: () => deleteUsuario(id, userName) },
        { text: 'Não', onPress: () => {} },
      ],
      { cancelable: false }
    );
  }

  const deleteUsuario = async (id, userName) => {
    try {
      const response = await fetch(`http://10.139.75.28:5251/api/Users/DeleteUsers/${id}`, {
        method: 'DELETE', // Corrigido para 'DELETE'
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
      if (!response.ok) {
        throw new Error('Erro ao excluir cliente');
      }
      setDeleteResposta(true);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  }

  useEffect(() => {
    fetchUsuarios();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchUsuarios(); // Atualiza a lista ao focar na tela
    }, [])
  );

  return (
    <View style={styles.container}>
      {edicao === false ? (
        <FlatList
          style={styles.flat}
          data={usuarios}
          keyExtractor={(item) => item.userId.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.text}>{item.userName}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.btnEdit}
                  onPress={() => {
                    setEdicao(true);
                    getUsuario(item.userId);
                  }}
                >
                  <Text style={styles.btnText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnDelete}
                  onPress={() => showAlert(item.userId, item.userName)}
                >
                  <Text style={styles.btnText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        <View>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={(digitado) => setNome(digitado)}
            placeholder="Nome"
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(digitado) => setEmail(digitado)}
            placeholder="Email"
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={styles.input}
            value={senha}
            onChangeText={(digitado) => setSenha(digitado)}
            placeholder="Senha"
            placeholderTextColor="#aaa"
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.btnCreate} onPress={() => editUser()}>
            <Text style={styles.btnLoginText}>SALVAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 15,
  },
  flat: {
    marginTop: 55,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    paddingVertical: 10,
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  btnEdit: {
    marginRight: 10,
    padding: 5,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  btnDelete: {
    padding: 5,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  btnText: {
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  btnCreate: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  btnLoginText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

//Ele define um componente chamado Busca que é exportado 
//como o componente padrão. Este componente é escrito usando 
//o React Native, uma estrutura para construção de aplicativos  
//móveis com JavaScript.

//O componente Busca possui um estado interno que mantém informações  
//sobre usuários, erros, status de edição, IDs de usuário, nome, email, 
//senha e uma resposta de exclusão.

//Há uma função assíncrona chamada fetchUsuarios que busca todos 
//os usuários de uma API usando o método fetch. Se a resposta não 
//for bem-sucedida, ela lança um erro. Caso contrário, atualiza o 
//estado interno usuarios com os dados obtidos.

//A função fetchUsuario é semelhante à anterior, mas busca um usuário 
//específico com base em um ID fornecido.

//A função editUser é outra função assíncrona que atualiza um usuário 
//existente na API com os novos dados fornecidos. Se a resposta não for 
//bem-sucedida, ela lança um erro. Depois de editar o usuário com sucesso, 
//chama fetchUsuarios para atualizar a lista de usuários e redefine o estado 
//de edição para falso.

//Há uma função chamada showAlert que exibe um alerta ao usuário, 
//perguntando se ele realmente deseja excluir um usuário. Esta função 
//é chamada quando o usuário clica no botão de exclusão de um usuário 
//na interface.

//A função deleteUsuario é uma função assíncrona que exclui um usuário 
//da API com base em um ID fornecido. Se a resposta não for bem-sucedida, 
//ela lança um erro. Depois de excluir o usuário com sucesso, define o 
//estado deleteResposta como verdadeiro.

//O componente usa os hooks useEffect e useFocusEffect para executar 
//a busca de usuários ao montar o componente e sempre que o componente 
//estiver em foco, respectivamente.

//A renderização condicional é usada para exibir ou não a lista de 
//usuários e o formulário de edição, com base no estado de edicao.

//Em resumo, este componente permite buscar, editar e excluir usuários 
//de uma API em um aplicativo React Native.
