//We’re using Supabase Auth 👉 Supabase already uses JWT internally, you just don’t touch it.

import supabase, { supabaseUrl } from "./supabase";

//User Sign Up
export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  console.log(data);
  return data;
}

//Login Page
export async function login({ email, password }) {
  //User  signInWithPassword::validate existing credentials.
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  //console.log(data); //email: "jonas@example.com"  id: "4e888afb-2ce3-421c-a54d-80e87daae768" "authenticated"
  return data;
}

//authenticated user
//NEED THIS FUNCTION TO LOAD DATA FROM SUPABASE AGAIN BECAUSE :: USER MIGHT WANT TO ACCESS THE PAGE LATER , FEW TIMES AFTER LOGIN. NORMALLY FOR WEB APP , WHEN LOGIN A DAY AGO, IF THEN RELOAD THE PAGE, YOU STILL WANT TO BE LOGGED IN.SO AFTER A DAY LATER USER WILL NEED TO BE REFETCHED FROM SUPABASE API
export async function getCurrentUser() {
  //1. check wheather there is active session
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  //2. if active session then get the data from supabase
  const { data, error } = await supabase.auth.getUser();

  //console.log(data);

  if (error) throw new Error(error.message);

  return data?.user;
}

//LOG OUT BUTTON
export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

//Update CurrentUser
export async function updateCurrentUser({ password, fullName, avatar }) {
  //1. Update fullName  Or password
  let updateData;

  if (fullName) updateData = { data: { fullName } };
  if (password) updateData = { password };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  //2. Upload the avatar image
  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars") //supabase avatars
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  //3.Update avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);

  return updatedUser;
}
//New Policy---> For Full Customization -->Adding new policy to avatars
//Allowed operation

// SELECT
// INSERT
// UPDATE
// DELETE

//Target roles:: authenticated

//Policy name:: Allow access for all users
