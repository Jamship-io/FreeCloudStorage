// import { string } from "zod";
// import TelegramAPI from "./api";
// import { signIn } from 'next-auth/react';

// async function getUser() {
//     try {
//       const user = await TelegramAPI.call('users.getFullUser', {
//         id: {
//           _: 'inputUserSelf',
//         },
//       });
  
//       return user;
//     } catch (error) {
//       return null;
//     }
//   }

//   function sendCode(phone: string) {
//     return TelegramAPI.call('auth.sendCode', {
//       phone_number: phone,
//       settings: {
//         _: 'codeSettings',
//       },
//     });
//   }



//   // Overload Signature
//   async function TelegramSignIn({ code, phone, phone_code_hash }: {
//     code: string;
//     phone: string;
//     phone_code_hash: string;
//   }): Promise<object | undefined>;
  
//       async function TelegramSignIn({ code, phone, phone_code_hash }: {
//     code: string;
//     phone: string;
//     phone_code_hash: string;
//   }): Promise<object | undefined> {
//     try {
//       const result = await TelegramAPI.call('auth.signIn', {
//         phone_code: code,
//         phone_number: phone,
//         phone_code_hash: phone_code_hash,
//       });
  
//       return result;
//     } catch (error) {
//       console.error('Error during sign-in:', error);
//       return undefined;
//     }
//   }
  
//   export default TelegramSignIn;
  