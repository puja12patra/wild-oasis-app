//Sign Up Form:: Not everyboday create a new account, not sign up for this app,
//Only employees of the Hotel or App should sign up, that is admin of App
//these users can only be created inside the App, NewUsers immediately verified by the existing hotel staff
//Only that staff create new user




import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";



function SignupForm() {

  //USING CUSTOM HOOK
  const { signup, isLoading } = useSignup();

  //npm i react-hook-form@7:: 1st register all inputField, to handle react hook form
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  //Display error message on screen side to it using formState object
  const { errors } = formState;


  function onSubmit({ fullName, email, password }) {
    //console.log(data);
    // email: "jonas@example.com"
    // fullName: "Jonas Gill"
    // password: "12345678"
    // passwordConfirm: "12345678"

    signup(
      { fullName, email, password },

      {
        onSettled: () => reset(),
      },
    );
  }


  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input type="text"
          disabled={isLoading}
          id="fullName"  {...register("fullName", { required: "This field is required" })}

        />
      </FormRow>

      {/* To validate Email regex: /\S+@\S+\.\S+/ */}
      <FormRow label="Email address" error={errors?.email?.message}>
        <Input type="email"
          disabled={isLoading}
          id="email"
          {...register("email", {
            required: "This field is required", pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email",
            }
          })
          }

        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input type="password" id="password"  disabled={isLoading} {...register("password", {
          required: "This field is required",
          minLength: {
            value: 8,
            message: "Password needs a minimum of 8 characters",
          },
        })} />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input type="password"
          disabled={isLoading}
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) => value === getValues().password || "Password needs to match"
          })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button  disabled={isLoading} >Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;

//Authentication----->URL Configuration
//Site URL : http://localhost:5173/dashboard
//Redirect URLs : http://localhost:5173


//Temp email -------> Accessing fake email all time
//Here click confirm mail then only be create account



// 🔥 Option 1 (BEST with Supabase): Use Supabase Email Verification

// Since you’re already using Supabase Auth 👇
// Supabase already sends verification emails

// What you should do instead
// 1️⃣ Enable email confirmation in Supabase

// Supabase Dashboard → Auth → Settings → Email confirmations ✅

// 2️⃣ Customize email template (Supabase UI)

// Supabase → Auth → email-> Templates → Confirm signup

// Paste HTML generated from React Email.-->Subject::Confirm Your Signup

// <!DOCTYPE html>
// <html>
//   <body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
//     <table width="100%" cellpadding="0" cellspacing="0">
//       <tr>
//         <td align="center">
//           <table width="500" style="background:#ffffff; padding:30px; border-radius:8px;">
//             <tr>
//               <td align="center">
//                 <h2 style="color:#333;">Welcome to Wild Oasis 👋</h2>
//                 <p style="color:#555; font-size:14px;">
//                   Please confirm your email address to activate your account.
//                 </p>

//                 <a href="{{ .ConfirmationURL }}"
//                    style="
//                      display:inline-block;
//                      margin-top:20px;
//                      padding:12px 24px;
//                      background:#4f46e5;
//                      color:#ffffff;
//                      text-decoration:none;
//                      border-radius:6px;
//                      font-weight:bold;
//                    ">
//                   Confirm Email
//                 </a>

//                 <p style="margin-top:30px; font-size:12px; color:#999;">
//                   If you didn’t create this account, you can safely ignore this email.
//                 </p>
//               </td>
//             </tr>
//           </table>
//         </td>
//       </tr>
//     </table>
//   </body>
// </html>




// You can generate HTML like this:    npx react-email export
// Supabase will handle:

// OTP

// Token

// Expiry

// Security

// Resend


