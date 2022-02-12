import { gql } from "@apollo/client";

export const GET_DISHES = gql`
  query GetDishes {
    dishes { 
      id
      name
      description
      price
      image {
        url
      }
      dietary_options {
        id
      }
      restaurant {
        id
        name
        deliveryFee
        deliveryTime
        image {
          url
        }
      }
    }
  }
`;

export const GET_RESTAURANT_CATEGORIES = gql`
  query GetCategories {
    types {
      id 
      title
      image {
        url
      }
    }
  }
`;

export const GET_RESTAURANTS = gql`
  query GetRestaurants {
    restaurants { 
      id
      name
      description
      price
      recentOrders
      rating
      deliveryTime
      deliveryFee
      image {
        url
      }
      types {
        id
      }
      dietary_options {
        id
      }
    }
  }
`;

export const GET_ORDERS = gql`
  query GetOrders($email: String) {
    orders(where: {
      user: {
        email: $email
      }
    }) {
      id
      createdAt
      user {
        email
      }
      amount
      dishes
    }
  }
`

export const GET_RESTAURANT = gql`
  query GetRestaurant($id: ID!) {
    restaurant(id: $id) { 
      id
      name
      description
      deliveryTime
      deliveryFee
      rating
      price
      image {
        url
      }
      types {
        id
        title
      }
      menus {
        id
        name
        menuStart
        menuEnd
        mon
        tue
        wed
        thu
        fri
        sat
        sun
        menu_categories {
          id
          name
          description
          dishes {
            id
            name
            description
            price
            image {
              url
            }
            restaurant {
              id
              name
              deliveryFee
              deliveryTime
              image {
                url
              }
            }
          }
        }
      }
    }
  }
`;