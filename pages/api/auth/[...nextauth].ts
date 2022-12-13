import NextAuth, { NextAuthOptions } from 'next-auth';
import OktaProvider from 'next-auth/providers/okta';

const options: NextAuthOptions = {
  providers: [
    // https://github.com/nextauthjs/next-auth/blob/main/packages/next-auth/src/providers/okta.ts
    OktaProvider({
      clientId: process.env.OKTA_CLIENT_ID ?? '',
      clientSecret: process.env.OKTA_CLIENT_SECRET ?? '',
      issuer: process.env.OKTA_ISSUER
    })
  ],
  // https://next-auth.js.org/configuration/options#secret
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token }) {
      return token
    }
  }
};

export default NextAuth(options);
