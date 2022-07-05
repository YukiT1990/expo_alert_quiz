import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

export default function App() {
  const [score, setScore] = useState(-1);
  let trivia = [
    {
      "question": "A polar bear's hair is transparent, not white.",
      "answers": [
        "True",
        "False"
      ],
      "correct": 0
    },
    {
      "question": "What is Sweden's capital city?",
      "answers": [
        "Malmö",
        "Stockholm"
      ],
      "correct": 1
    }
  ]

  const startQuiz = (index, internalScore) => {
    // should we switch into scoreboard mode?
    if (index == 0) {
      setScore(0);
    }

    let ourQuestion = trivia[index];
    let buttons = [];
    for (let answer_index in ourQuestion.answers) {
      buttons.push(
        {
          text: ourQuestion.answers[answer_index],
          onPress: () => {
            if (answer_index == ourQuestion.correct) {
              console.log(`Set score, ${score}`);
              internalScore += 1;
              setScore(internalScore);
            }

            // move to next
            if (index < trivia.length - 1) {
              startQuiz(index + 1, internalScore);
            } else {
              Alert.alert(
                `Well done!`,
                `You scored ${internalScore}`,
                [
                  {
                    text: "Start again",
                    onPress: () => setScore(-1),
                    style: "cancel",
                  },
                ]
              );
            }
          }
        }
      )
    }

    Alert.alert(
      `Question ${index + 1}`,
      `${ourQuestion.question}`,
      buttons,
    );
  }

  if (score == -1) {
    // start game screen
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Trivia Quiz</Text>
        <Text>Are you ready for some trivia?</Text>
        <View
          style={styles.buttonContainer}>
          <Button
            title="I'm ready!"
            onPress={() => startQuiz(0, 0)}
          />
        </View>

        <StatusBar style="auto" />
      </View>
    );
  } else {
    // in game screen
    return (
      <View style={styles.bottomContainer}>
        <Text style={styles.scoreText}>Your score: {score}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 100
  },
  scoreText: {
    fontSize: 20
  },
  heading: {
    fontSize: 50,
    fontWeight: "bold"
  },
  buttonContainer: {
    marginTop: 30
  }
});
