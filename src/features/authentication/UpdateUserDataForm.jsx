import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const { updateUser, isUpdating } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);//One for uploaded file,
  const [randomImageUrl, setRandomImageUrl] = useState("");//one for random image URL

  //Random image generator function
  function generateRandomImage() {
    return `https://i.pravatar.cc/48?u=${crypto.randomUUID()}`;
  }




  function handleSubmit(e) {
    e.preventDefault();

    if (!fullName) return;

    //---------NORMAL FILE UPLOAD IMG-------//
    // updateUser({ fullName, avatar }, {
    //   onSuccess: () => {
    //     setAvatar(null);
    //     e.target.reset();
    //   }
    // });

    updateUser(
      {
        fullName,
        avatar: avatar ?? randomImageUrl, // ✅ FIX
      },
      {
        onSuccess: () => {
          setAvatar(null);
          setRandomImageUrl("");
          e.target.reset();
        },
      }
    );
  }


  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

 

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>

      {/* <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdating}
        />
      </FormRow> */}

     {/* ✅ Step 3: Layout both buttons  Upload Image & RandomImage */}
      <FormRow label="Avatar image">
        <div  style={{display: "flex",alignItems: "center",gap: "12px",}}>
          <FileInput
            id="avatar"
            accept="image/*"
            onChange={(e) => {
              setAvatar(e.target.files[0]);
              setRandomImageUrl(""); // clear random image if file selected
            }}
            disabled={isUpdating}
          />

          <Button
            type="button"
            onClick={() => {
              setRandomImageUrl(generateRandomImage());
              setAvatar(null); // clear file if random selected
            }}
            disabled={isUpdating}
          >
            🎲 Random Image
          </Button>

       

        </div>
      </FormRow>

      <FormRow>
        <Button type="reset" variation="secondary" disabled={isUpdating} onClick={handleCancel}>
          Cancel
        </Button>
        <Button disabled={isUpdating} >Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
