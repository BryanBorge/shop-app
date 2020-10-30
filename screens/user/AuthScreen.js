import React, { useState, useReducer, useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import Colors from "../../constants/Colors";
import * as authActions from "../../store/actions/auth";

const FORM_UPDATE = "FORM_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = props => {
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const authHandler = () => {
    let action;
    if (isSignUp) {
      action = authActions.signUp(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }

    dispatch(action);
  };

  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id='email'
              label='E-mail'
              keyboardType='email-address'
              required
              minLength={5}
              autoCapitalzize='none'
              errorText='Enter a valid email'
              initialValue=''
              onInputChange={inputChangeHandler}
              email
            />
            <Input
              id='password'
              label='Password'
              keyboardType='email-address'
              secureTextEntry
              required
              autoCapitalzize='none'
              errorText='Enter a valid password'
              initialValue=''
              onInputChange={inputChangeHandler}
            />
            <View style={styles.buttonContainer}>
              <Button
                title={isSignUp ? "Sign Up" : "Login"}
                color={Colors.primary}
                onPress={authHandler}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignUp ? "Login" : "Sign Up"} `}
                color={Colors.accent}
                onPress={() => {
                  setIsSignUp(prevState => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Authenticate",
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  authContainer: { width: "80%", maxWidth: 400, maxHeight: 400, padding: 15 },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
