import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSettings } from './useSettings';
import Spinner from "../../ui/Spinner";
import { useUpdateSetting } from './useUpdateSetting';

function UpdateSettingsForm() {

  const { isLoading, settings:
    {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice
    } = {}

    //cannot read properties of undefined::[because data still not exit] we set these properties initially in an empty array or empty obj = {}
  } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();

  function handleUpdate(e, field) {
    const value = e.target.value;
    console.log("Updating:", field, value);//Updating: breakfastPrice 16
    // convert to number if the field expects numeric;
    
    if (!value) return;

    updateSetting({ [field]: Number(value) });// ✅ convert to number

  }




  if (isLoading) return <Spinner />




  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' defaultValue={maxBookingLength}   onBlur={(e) => handleUpdate(e, "maxBookingLength")} />
      </FormRow>

      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' defaultValue={maxGuestsPerBooking}   onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")} />
      </FormRow>

      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' defaultValue={breakfastPrice}   onBlur={(e) => handleUpdate(e, "breakfastPrice")}/>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
