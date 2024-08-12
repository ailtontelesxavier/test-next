import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

// These two values should be a bit less than actual token lifetimes
const BACKEND_ACCESS_TOKEN_LIFETIME = 45 * 60;            // 45 minutes
const BACKEND_REFRESH_TOKEN_LIFETIME = 6 * 24 * 60 * 60;  // 6 days

const getCurrentEpochTime = () => {
  return Math.floor(new Date().getTime() / 1000);
};

export const dynamic = 'force-dynamic';

const SIGN_IN_HANDLERS = {
  "credentials": async (user, account, profile, email, credentials) => {
    return true;
  },
};
const SIGN_IN_PROVIDERS = Object.keys(SIGN_IN_HANDLERS);

const authOptions = {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: BACKEND_REFRESH_TOKEN_LIFETIME
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        domain: {
          label: "Domain",
          type: "text ",
          placeholder: "FOMENTO",
          value: "FOMENTO",
        },
        username: {label: "Username", type: "text"},
        password: {label: "Password", type: "password"},
        client_secret: {label: "OTP", type: "text"}
      },
      // The data returned from this function is passed forward as the
      // `user` variable to the signIn() and jwt() callback
      async authorize(credentials, req) {
        try {
          const response = await axios({
            url: process.env.NEXTAUTH_BACKEND_URL + "/auth/token",
            method: "post",
            data: credentials,
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          });
          const data = response.data;
          if (data){
            // Forcing generation of a new token on every login
            data.forceNewToken = true;
            return data;
          }
        } catch (error) {
          console.error(error);
        }
        return null;
      },
    })
  ],
  callbacks: {
    async signIn ({user, account, profile, email, credentials}) {
      if (!SIGN_IN_PROVIDERS.includes(account.provider)) return false;
      return SIGN_IN_HANDLERS[account.provider](
        user, account, profile, email, credentials
      );
    },
    /* async redirect(url) {
      if (process.env.NODE_ENV === 'production') {
        if (url.url.startsWith("http://localhost:3000")) {
          return url.url.replace(
            "http://localhost:3000",
            "http://app.fomento.to.gov.br" //"http://app.fomento.to.gov.br:3000"
          );
        }
      }
      return url.url || '/';
    }, */
    async jwt({user, token, account}) {
      // If `user` and `account` are set that means it is a login event
      if (user && account) {
        let backendResponse = account.provider === "credentials" ? user : account.meta;
        token["user"] = backendResponse.user;
        token["access_token"] = backendResponse.access;
        token["refresh_token"] = backendResponse.refresh;
        token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
        //adiciona no axios authorization
        //axios.defaults.headers.common['Authorization'] = "Bearer " + token["access_token"]
        return token;
      }
      // Refresh the backend token if necessary
      if (!token.forceNewToken && getCurrentEpochTime() > token["ref"]) {
        try {
          const response = await axios({
            method: "post",
            url: process.env.NEXTAUTH_BACKEND_URL + "/auth/refresh_token",
            data: {
              refresh: token["refresh_token"],
            },
          });
          token["access_token"] = response.data.access;
          token["refresh_token"] = response.data.refresh;
          token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
        } catch (error) {
          return null;
        }
      }
      // Resetting forceNewToken flag
      delete token.forceNewToken;
      return token;
    },
    // Since we're using Django as the backend we have to pass the JWT
    // token to the client instead of the `session`.
    async session({token}) {
      return token;
    }
  },
  pages: {
    signIn: "/authentication",//"/signin",
    //callbackUrl: '/authentication'
  }
  
};

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

