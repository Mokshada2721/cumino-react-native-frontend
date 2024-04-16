import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import database from "../../utils/Sqlite"; 
import axios from "axios"; 

const BASE_URL = "http://192.168.180.166:5000/api"; 

const TodoScreen = ({ navigation }) => {
    const [task, setTask] = useState("");
    const [status, setStatus] = useState("pending");

    useEffect(() => {
        database.initDatabase(); 
    }, []);

    function saveTaskHandle() {
        if (task.length === 0) {
            Alert.alert("Error", "Please enter a task", [{ text: "Okay" }]);
        } else {
            const mongoId = ''; 
            database.db.transaction((tx) => {
                tx.executeSql(
                    "INSERT INTO tasks (task, status, mongoId, synced) VALUES (?, ?, ?, ?)",
                    [task, status, mongoId, 0],
                    (tx, results) => {
                        if (results.rowsAffected > 0) {
                            Alert.alert(
                                "Task Saved",
                                "Your task has been saved successfully.",
                                [{ text: "Okay" }]
                            );
                            console.log("Task saved successfully.");
                            navigation.navigate("List");
                        } else {
                            Alert.alert(
                                "Task Saving Failed",
                                "There was an error saving the task.",
                                [{ text: "Okay" }]
                            );
                            console.log("Failed to save task.");
                        }
                    },
                    (error) => {
                        console.error("Error saving task:", error);
                    }
                );
            });
        }
    }

  const [user, setUser] = useState("");
  
  useEffect(() => {
    retrieveUser();
  }, []);

  const retrieveUser = async () => {
    try {
      const username = await AsyncStorage.getItem("username");
      if (username !== null) {
        setUser(username);
      }
    } catch (error) {
      console.error("Error retrieving current user:", error);
    } 
  };

  async function syncDataWithMongo(user) {
      database.db.transaction((tx) => {
          tx.executeSql(
              "SELECT * FROM tasks WHERE synced = 0",
              [],
              async (tx, results) => {
                  const len = results.rows.length;
                  const tasks = [];
                  for (let i = 0; i < len; i++) {
                      const task = results.rows.item(i);
                      tasks.push(task);
                  }
                  try {
                      const response = await axios.put(`${BASE_URL}/todos/sync`, tasks);
                      console.log('Synced with MongoDB:', response.data);

                      database.db.transaction((tx) => {
                          tasks.forEach((task) => {
                              tx.executeSql(
                                  "UPDATE tasks SET synced = 1 WHERE ID = ?",
                                  [task.ID]
                              );
                          });
                      });
                    } catch (error) {
                      console.error('Error syncing with MongoDB:', error);
                  }
              },
              (error) => {
                  console.error("Error fetching tasks from SQLite:", error);
              }
          );
      });
  }

  return (
      <View style={styles.container}>
          <Text style={styles.headingText}>Add Task</Text>
          <TextInput
              style={styles.textInput}
              placeholder="Enter task"
              multiline={true}
              numberOfLines={3}
              onChangeText={(text) => {
                  setTask(text);
              }}
           />
          <Pressable style={styles.buttonStyle} onPress={saveTaskHandler}>
              <Text style={styles.buttonText}>Save</Text>
          </Pressable>
          <Pressable style={styles.buttonStyle} onPress={syncDataWithMongo}>
              <Text style={styles.buttonText}>Sync with MongoDB</Text>
          </Pressable>
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: '#A5A294'
    },
    headingText: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 20,
        color: "#fff"
    },
    textInput: {
        width: "80%",
        height: 80,
        borderWidth: 1,
        borderColor: "#ccc",
        color: "#fff",
        borderRadius: 5,
        paddingHorizontal: 10
    },
    buttonText: {
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center",
        color: "#fff"
    },
    buttonStyle: {
        backgroundColor: "#97B1DF",
        marginTop: 10,
        padding: 10,
        width: "80%",
        borderRadius: 10
    },
});

export default TodoScreen;