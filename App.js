import React,{useState} from 'react';
import uuid from 'uuid/v1'
import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';

export default function App() {
  const [todos,setTodos] = useState([
    {todo:'Type in the textbox to add items..',key:'1'},
    {todo:'Tap on an item to remove it from the list',key:'2'}
    ])
  
  const [ntd,setNtd] = useState('')
  
  const touchHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todos => todos.key != key)
    })
  }

  const textHandler = (val) => {
    setNtd(val)
  }

  const buttonHandler = () => {
    if(ntd.length >= 3){
      setTodos([...todos,{todo:ntd, key:uuid()}])
      setNtd('')
    }else{
      Alert.alert("Oops!!","Todos must be more than 2 characters long")
    }
  }
  
  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss()
    }}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome to the To-Do App</Text>
      </View>
      <View style={styles.header}>
        <FlatList
          data={todos}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => touchHandler(item.key)}>
              <Text style={styles.listitem}>{item.todo}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.header}>
        <TextInput style={styles.input} value={ntd} placeholder="Add items.." onChangeText={textHandler}/>
      </View>
      <View style={styles.header}>
        <Button title="Add" onPress={buttonHandler}/>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#555'
  },
  text: {
    color: '#fff'
  },
  header:{
    flex: 0.2,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText:{
    color: '#000',
    backgroundColor: '#555',
    fontStyle: 'normal',
    fontSize: 20
  },
  listitem:{
    color:'#fff',
    backgroundColor:"#555",
    padding: 10,
    marginBottom:5,
  },
  input:{
    borderWidth: 1,
    borderColor: '#555',
    width: 200,
    height: 50,
    color:'#fff'
  }
});
