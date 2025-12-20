

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";



import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";



function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {

  const { id: editId, ...editValues } = cabinToEdit;

  const isEditSession = Boolean(editId);


  ////also after submiting the edited data we want to reset the form
  //npm i react-hook-form@7:: 1st register all inputField, to handle react hook form
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  //Display error message on screen side to it using formState object
  const { errors } = formState;
  console.log(errors);


  //MAKE THE EDIT BUTTON WORK FOR EDIT EACH ROW 
  //const queryClient = useQueryClient();

  //1. ONLY FOR CREATING
  // const { mutate: createCabin, isLoading: isCreating } = useMutation({
  //   mutationFn: createEditCabin,
  //   //when mutation successful then ReactQuery provide onSuccess
  //   onSuccess: () => {
  //     toast.success('New Cabin successfully created')
  //     queryClient.invalidateQueries({
  //       queryKey: ["cabins"],
  //     });

  //     //Reset the form 
  //     reset();

  //   },
  //   onError: (err) => {
  //     toast.error(err.message)
  //   }

  // })
  //-----------NOW USE CUSTOM HOOK useCreateCabin FOR CREATE CABIN-------------//
  const { isCreating, createCabin } = useCreateCabin();



  //2.ONLY FOR EDITING
  // const { mutate: editCabin, isLoading: isEditing } = useMutation({
  //   //
  //   mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
  //   //when mutation successful then ReactQuery provide onSuccess
  //   onSuccess: () => {
  //     toast.success('Cabin successfully Edited')
  //     queryClient.invalidateQueries({
  //       queryKey: ["cabins"],
  //     });

  //     //Reset the form 
  //     reset();

  //   },
  //   onError: (err) => {
  //     toast.error(err.message)
  //   }

  // })
  //------------NOW USE CUSTOM HOOK useEditCabin FOR EDIT CABIN-----------------//
  const { editCabin, isEditing } = useEditCabin();




  const isWorking = isCreating || isEditing



  //creating all data then submit needs to mutate the data
  function onSubmit(data) {
    //console.log(data);

    //const image = typeof data.image === "string" ? data.image : data.image[0];
    //mutate({...data, image: data.image[0]});
    //IF EDITsESSION THEN ONLY EDIT OTHERWISE CREATE
    //if (isEditSession) editCabin({ newCabinData: { ...data, image }, id: { editId } });
    //else createCabin({ ...data, image: image });


    //CHECK WHAT IMG WE PASS INTO EDIT CABIN 
    const image = typeof data.image === "string" ? data.image : data.image[0];

    // remove id from data
    const { id, ...rest } = data;

    if (isEditSession) {
      const idVal = Number(editId);
      editCabin(
        { newCabinData: { ...rest, image }, id: idVal },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          }
        }
      );
    } else {
      createCabin(
        { ...rest, image },
        {
          onSuccess: (data) => {

            reset();
            onCloseModal?.()

          },

        }
      );
    }


  }






  function onError(errors) {
    console.log(errors);
  }


  return (
    // props.type !== "modal" 

    // Form.defaultProps = {
    //   type: "regular",
    // }

    
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal' : "regular"} >
      {/*       
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        //Form validation::  {required: "This field is required"}//
        <Input type="text" id="name"   
        {...register("name" , 
          {required: "This field is required"}
        )} 
        />

        {errors?.name?.message && <Error>{errors.name.message}</Error>}

      </FormRow> 
      */}

      <FormRow label="cabin name" error={errors?.name?.message}>

        <Input type="text" id="name" disabled={isWorking}
          {...register("name",
            { required: "This field is required" }
          )}
        />

      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message} >
        {/* <Label htmlFor="maxCapacity">Maximum capacity</Label> */}
        <Input type="number" id="maxCapacity" disabled={isWorking}
          {...register("maxCapacity",
            {
              required: "This field is required",
              min: {
                value: 1,
                message: 'Capacity should be atleast 1'
              }
            })
          } />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message} >
        {/* <Label htmlFor="regularPrice">Regular price</Label> */}
        <Input type="number" id="regularPrice" disabled={isWorking}
          {...register("regularPrice",
            {
              required: "This field is required",
              min: {
                value: 1,
                message: 'Price should be atleast 1'
              }
            })} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message} >
        {/* <Label htmlFor="discount">Discount</Label> */}
        <Input type="number" id="discount" defaultValue={0} disabled={isWorking}
          {...register("discount",
            {
              required: "This field is required",
              validate: (value) => Number(value) < Number(getValues().regularPrice) || "Discount must be less than regulatPrice"
            })} />
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        {/* <Label htmlFor="description">Description for website</Label> */}
        <Textarea type="number" id="description" defaultValue="" disabled={isWorking}
          {...register("description", { required: "This field is required" })} />
      </FormRow>

      <FormRow label="Cabin photo"  >
        {/* <Label htmlFor="image">Cabin photo</Label>    type="file" */}
        {/* <FileInput id="image" accept="image/*"  {...register("image" , {required: "This field is required"})} /> */}
        {/* WHENEVER EDIT FORM , FOR THE IMAGE SECTION NO NEED TO AGAIN UPLOAD SO false */}
        <FileInput id="image" accept="image/*"  {...register("image", { required: isEditSession ? false : "This field is required" })} />
      </FormRow>

      <FormRow  >
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}   >
          Cancel
        </Button>
        {/* useMutation hook, are necessary when performing operations that modify data on a server or have side effects */}

        {/*  WHENEVER EDIT FORM DURING isEditSession ONLY 'Edit cabin'*/}
        <Button disabled={isWorking}  > {isEditSession ? 'Edit cabin' : 'Create new cabin'}</Button>


      </FormRow>

    </Form>
  );
}

export default CreateCabinForm;