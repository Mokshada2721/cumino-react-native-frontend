import React, { useEffect, useState, useCallback } from "react";
import { Alert, Pressable, StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, View} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import database from "../../utils/Sqlite";

export const List = ({ navigation }) => {
    const [todos, setTodos] = useState([]);

    const fetchData = () => {
        database.db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM tasks",
                [],
                (tx, results) => {
                    const len = results.rows.length;
                    const tasks = [];
                    for (let i = 0; i < len; i++) {
                        tasks.push(results.rows.item(i));
                    }
                    setTodos(tasks);
                },
                (error) => {
                    console.error("Error fetching tasks from SQLite:", error);
                    Alert.alert("Error", "An error occurred while fetching tasks");
                }
            );
        });
    }

    const deleteTask = (id) => {
        database.db.transaction((tx) => {
            tx.executeSql(
                "DELETE FROM tasks WHERE ID = ?",
                [id],
                (tx, results) => {
                    if (results.rowsAffected > 0) {
                        console.log("Task deleted successfully.");
                        fetchData(); // Refresh task list
                    } else {
                        console.log("No task found with ID:", id);
                    }
                },
                (error) => {
                    console.error("Error deleting task:", error);
                }
            );
        });
    };

    // Fetch data on initial screen load and when the screen focuses
    useEffect(() => {
        fetchData();
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {todos.map((todo, index) => {
                    return (
                        <View style={styles.taskContainer} key={index}>
                            <Text style={styles.text}>{todo.task}</Text>
                            <Pressable
                                style={styles.deleteButton}
                                onPress={() => deleteTask(todo.ID)}
                            >
                                <Text style={styles.deleteButtonText}>Delete</Text>
                            </Pressable>
                        </View>
                    );
                })}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Pressable
                    style={styles.buttonStyle}
                    onPress={() => {
                        navigation.navigate("Personal Goals");
                    }}
                >
                    <Text style={styles.buttonText}>Add More Tasks</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        backgroundColor: '#A5A294'
    },
    scrollView: {
        paddingHorizontal: 20, 
    },
    taskContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#f0f0f0",
        borderRadius: 10, 
        borderWidth: 1,
        borderColor: "#ccc",
        marginVertical: 10, 
        padding: 15, 
    },
    text: {
        fontSize: 18, // Decrease font size for better fit
        flex: 1,
    },
    deleteButton: {
        backgroundColor: "#97B1DF",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginLeft: 10, 
    },
    deleteButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16, 
    },
    buttonContainer: {
        alignItems: "center",
        marginTop: 20, 
    },
    buttonStyle: {
        backgroundColor: "#97B1DF",
        paddingVertical: 15, 
        paddingHorizontal: 20, 
        borderRadius: 10,
        paddingBottom: 10,
        padding: 10
    },
    buttonText: {
        fontSize: 16, 
        fontWeight: "bold",
        textAlign: "center",
        color: "#fff", 
    },
});

export default List;
