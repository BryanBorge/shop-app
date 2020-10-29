import React from "react";
import { FlatList, Button, StyleSheet, Platform } from "react-native";
import ProductItem from "../../components/shop/ProductItem";
import { useSelector, useDispatch } from "react-redux";
import HeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Colors from "../../constants/Colors";
import * as productActions from "../../store/actions/products";
const UserProductsScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();
  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageURL}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {}}
        >
          <Button color={Colors.primary} title='Edit' onPress={() => {}} />
          <Button
            color={Colors.primary}
            title='Delete'
            onPress={() => {
              dispatch(productActions.deleteProduct(itemData.item.id));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = navData => {
  return {
    headerTitle: "Your Products",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default UserProductsScreen;
