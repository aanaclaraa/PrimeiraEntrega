import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';

export default function Busca() {
    const [usuario, setUsuario] = useState([]);
    const [error, setError] = useState(false);
    const [edicao, setEdicao] = useState(false);
    const [userId, setUserId ] = useState(0);
    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [deleteResposta, setResposta] = useState(false);

    async function getUsuarios() {
        try {
          const response = await fetch('http://10.139.75.28:5251/api/Users/GetAllUsers', {
            method: 'GET',
            headers: {
              'content-type': 'application/json; charset=UTF-8'
            },
          });
          if (!response.ok) {
            throw new Error('Erro ao buscar usuários');
          }
          const data = await response.json();
          setUsuario(data);
        } catch (error) {
          console.error(error);
          setError(true);
        }
      }

      async function getUsuario(id) {
        await fetch( 'http://10.139.75.28:5251/api/Users/GetUsersId' + id, {
           method:'GET',
           headers: {
             'content-type': 'application/json; chaset=UTF-8'
           },
        })
        .then((response) => response.json())
        .then(json => {
             setUserId(json.userId);
             setNome(json.userName);
             setEmail(json.userEmail);
             setSenha(json.usePassword);
        });
     }

     async function editUser() {
        await fetch('http://10.139.75.28:5251/api/Users/UpdateUser'+ userId, {
          method: ' PUT',
          headers: {
            'content-type': 'application/json; chaset=UTF-8',
          },
          body: JSON.stringify({
            userId: userId,
            userEmail: email,
            userPasswor: senha,
            userName: nome
          })
        })
          .then((response) => response.json())
          .catch(err => console.log(err));
          getUsuarios();
          setEdicao(false);
      }

      function showAlert(id, userName){
        Alert.alert(
            '',
            'Deseja realmente excluir esse usuário?',
            [
                { text: 'SIM', onPress: () => deleteUsuario(id, userName )},
                { text: 'NÃO', onPress: () =>('')},
            ],
            { cancelable: false }
        );
      } 

      async function deleteUsuario(id, userName){
        await fetch( 'http://10.139.75.28:5251/api/Users/DeleteUsers/' + id, {
            method:'DELETE',
            headers: {
              'content-type': 'application/json; chaset=UTF-8'
            },
         })
         .then(res => res.json())
         .then(json => setResposta(json))
         .catch(err => setError(true))
    
         if(deleteResposta == true)
          {
            Alert.alert(
              '',
              'USUÁRIO' + userName + 'EXCLUÍDO COM SUCESSO',
              [
                { text: '', onPress: () => ('')},
                { text: 'OK', onPress: () => ('')},
              ],
              { cancelable: false }
            );
            getUsuarios();
          }
          else{
            Alert.alert(
              '',
              'USUÁRIO' + userName + 'NÃO FOI EXCLUÍDO',
              [
                { text: '', onPress: () => ('')},
                { text: 'OK', onPress: () => ('')},
              ],
              { cancelable: false }
            );
            getUsuarios();
          }
      }

      useEffect(() => {
        getUsuarios();
      }, []);
    
      useFocusEffect(
        React.useCallback(() => {
          getUsuario();
        }, [])
      );    

      return ( 
        <View style={styles.container}>
                {edicao == false ?
                <FlatList 
                style={styles.flat}
                data={usuario}
                keyExtractor={(item) => item.UserId}
                renderItem={({ item }) => (
                  <View style={styles.itemContainer}>
                    <Text style={styles.text}>
                        {item.UserName}
                    </Text>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity style={styles.btnEdit} onPress={() => {setEdicao(true); getUsuario(item.UserId) }}>
                          <Text style={styles.btnText}>EDITAR</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.btnDelete} onPress={()=> showAlert(item.userId, item.userName)}>
                          <Text style={styles.btnText}>EXCLUIR</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                />
                :
                <View>
                    <TextInput 
                    inputMode="text"
                    style={styles.input}
                    value={nome}
                    onChangeText={(digitado) => setNome(digitado)}
                    placeholderTextColor="white"
                    />
                    <TextInput 
                    inputMode="email"
                    style={styles.input}
                    value={email}
                    onChangeText={(digitado) => setEmail(digitado)}
                    placeholderTextColor="white"
                    />
                    <TextInput 
                    inputMode="text"
                    style={styles.input}
                    value={senha}
                    onChangeText={(digitado) => setSenha(digitado)}
                    placeholderTextColor="white"
                    />
                    <TouchableOpacity style={styles.btnCreate} onPress={() => editUser()}>
                      <Text style={styles.btnLoginText}>SALVAR</Text>
                    </TouchableOpacity>
                </View>
                }
            </View>
    )}
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'pink',
        },
        flat: {
          width: '100%',
          paddingHorizontal: 10,
          paddingVertical: 45,
        },
        itemContainer: {
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 15,
          marginVertical: 5,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 2,
        },
        text: {
          color: 'black',
          fontSize: 16,
          marginBottom: 10,
        },
        buttonContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        btnEdit: {
          backgroundColor: 'red',
          padding: 10,
          borderRadius: 5,
        },
        btnDelete: {
          backgroundColor: 'black',
          padding: 10,
          borderRadius: 5,
        },
        btnText: {
          color: 'white',
          fontSize: 14,
          textAlign: 'center',
        },
      });