# Instaplate

## THE INSTACART RESTAURANT DELIVERY CLONE**

<img width="100%" src='instaplate.png'>

Have you ever wondered what it would look like if Instacart copied Uber Eats? Look no further, my friend.

Instaplate is a full-stack demo web app where you can:

- Browse, sort, search, and filter restaurants
- Browse and search dishes
- Add, remove, and adjust the quantity of dishes to your shopping cart
- Checkout using Stripe's test card credentials
- Register and login using email or your Google account

The front end is built with React and Typescript, and uses minimal libraries to achieve complicated CSS animations that interact with state, such as the menu/login/register drawer opening and closing behavior.

## Developing
### Install Locally Using Docker

- 1. Clone the repository.
- 2. Make sure you have Docker installed and that it is running in the background
- 3. Copy the .env.example file (remove the .example) and enter values for the private keys
- 4. Run ```docker build .```
- 5. Run the container after it is finished building

### Install Locally Using NPM

- 1. Clone the repository.
- 2. Make sure you are using Node 14 or 12. (Project may break on 16 or 17)
- 2. Run ```npm install``` to install dependencies.
- 3. After npm has finished installing, run ``npm run -p 3000`` to start the development server

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!