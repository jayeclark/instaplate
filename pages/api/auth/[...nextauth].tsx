import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

type Partial<SessionOptions> = {
  jwt: boolean
}

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: async ({ session, token, user })=> {
      session.token = token;
      return session;
    },
    jwt: async (initialData) => {
      const { token, user, account } = initialData;
      const isSignIn = user ? true : false;
      if (isSignIn) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/${account.provider}/callback?access_token=${account?.access_token}`
        );
        const data = await response.json();
        token.id = data.user.id;
        token.jwt = data.jwt;
      }
      return Promise.resolve(token);
    },
  },
})