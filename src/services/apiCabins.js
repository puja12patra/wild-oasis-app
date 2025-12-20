import supabase, { supabaseUrl } from "./supabase";

//SELECT OR GET THE DATA FROM supabase [We activated row level Security for read data]=>Enable read access for all users
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

// export async function createCabin(newCabin) {

//   //image url: https://ptblboatccgsccmniktl.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
//   const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
//     "/",
//     ""
//   );

//   //supabaseUrl: 'https://ptblboatccgsccmniktl.supabase.co'
//   //if already hasImagePath then use it Otherwise create new Image
//   const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

//   //1.Create

//    const { data, error } = await supabase
//    .from("cabins")
//    .insert([{ ...newCabin, image: imagePath }]);

//   if (error) {
//     console.log(error);
//     throw new Error("New Cabin could not be inserted");
//   }

//   //2.Upload image
//   const { error: storageError } = await supabase.storage
//     .from("cabin-images")
//     .upload(imageName, newCabin.image);

//   //3. Delete the cabin if there was error to uploading image
//   if (storageError) {
//     await supabase
//       .from("cabins")
//       .delete()
//       //selete the row we want to delete:: the "id" column which = whatever id we pass
//       .eq("id", data.id);

//     console.log(storageError);
//     throw new Error(
//       "cabin image could not be uploaded & Cabin was not created"
//     );
//   }

//   return data;
// }

//To create new Cabin rowwise in a table [We activated row level Security for insert data to check-> true]=>Enable insert access for all users

export async function createEditCabin(newCabin, id) {
  console.log(newCabin, id);

  //variable to check what kind of img this is
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  //image url: https://ptblboatccgsccmniktl.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  //supabaseUrl: 'https://ptblboatccgsccmniktl.supabase.co'
  //if already hasImagePath then use it Otherwise create new Image
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1.Create/Edit Cabin
  let query = supabase.from("cabins");

  //A) ONLY CREATE if there is no id Otherwise Edit
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //B) ONLY EDIT/UPDATE
  //selete the row we want to update:: the "id" column which = whatever id we pass
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query
    .select() //selete the row we want to edit
    .single();

  if (error) {
    console.log(error);
    throw new Error("New Cabin could not be inserted");
  }

  //2.Upload image
  //if hasImagepath exist then only return data
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3. Delete the cabin if there was error to uploading image
  if (storageError) {
    await supabase
      .from("cabins")
      .delete()
      //selete the row we want to delete:: the "id" column which = whatever id we pass
      .eq("id", data.id);

    console.log(storageError);
    throw new Error(
      "cabin image could not be uploaded & Cabin was not created"
    );
  }

  return data;
}

//Update cabin rowwise in table[We activated row level Security for update data to check-> true]=>Enable update access for all users
// export async function updateCabin(id)
// {
//   const { data, error } = await supabase
//   .from('cabins')
// .update({ other_column: 'otherValue' })
// //selete the row we want to update:: the "id" column which = whatever id we pass
// .eq("id", id)
//   .select()

//   if(error)
//    {
//     console.log(error);
//     throw new Error("Cabin could not be updated")
//    }

//    return data;
// }

//Delete the row of table [We activated row level Security for delete data]=>Enable delete access for all users
export async function deleteCabin(id) {
  const { data, error } = await supabase
    .from("cabins")
    .delete()
    //selete the row we want to delete:: the "id" column which = whatever id we pass
    .eq("id", id);

  // Debug: log the raw response objects
  console.log("supabase delete response:", { data, error });

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
