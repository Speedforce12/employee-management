import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "../../../database/conn";
import Users from "../../../model/user";
import { compare } from "bcryptjs";


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        connectMongo().catch(err => {
          err:"Credentials Failed"
        })

        const result = await Users.findOne({email: credentials.email})
     
        if (!result) {
       throw new Error("No user Found with that email, Please Register")
        }
        
        const checkPassword = await compare(credentials.password, result.password)
       
      //  check password uniqueness
        if (!checkPassword || result.email !== credentials.email) {
                  throw new Error("Password or Username mismatch")
        }
        
        return result

      }
    })
  ],

  secret:"T%TTFrDxe5rd32I*&ygf5erfd3w64s3wxs3e!E#$W21#hge"
};

export default NextAuth(authOptions);
