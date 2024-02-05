import React, { useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { FloatingLabelInput } from "react-native-floating-label-input";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DatePicker= ({ selectedDate, onDateChange }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    onDateChange(date);
    hideDatePicker();
  };

  return (
    <>
      <TouchableOpacity onPress={showDatePicker}>
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#134484', width: '100%' }}>
          <FloatingLabelInput
            label="Date"
            value={selectedDate.toDateString()}
            containerStyles={{ width: '93%' }}
            inputStyles={{ color: '#2b0847', fontWeight: '500' }}
            editable={false}
          />
        </View>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};

export default DatePicker;







