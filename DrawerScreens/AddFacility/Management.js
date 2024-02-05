import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from "./style";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { Entypo, AntDesign } from '@expo/vector-icons';
import DropDownSearch from "../../CustomComponents/DropDownSearch";
import LocalData from "../../Constants"
import YesOrNO from "./Questions/YesOrNO";

const Management = (props) => {
  const { info, setInfo } = props;
  const [drpIndex, setDrpIndex] = React.useState(null);


  const handleSubmit = () => {
    // Implement your logic for form submission here
    console.log("Form submitted:", info);
    // You can perform additional actions here
  };
  const renderSubItem = ({ item, index }) => {
    const validSubstrings = [
      "Type",
      "Type Of Communal Management",
      "Management_Functionality",
      "Year_Of_Establishment",
      "Key_Position",
      "Sanitation_Type"
    ];
    const DropDown = validSubstrings.some(substring => item.includes(substring));
    const handleChangeText = (text) => {
      setInfo((prevInfo) => ({
        ...prevInfo,
        [item]: text,
      }));
    };

return (
      <>
        <FloatingLabelInput
          label={`${item.replace(/_/g, " ")}`}
          hint={`${item.replace(/_/g, " ")}`}
          containerStyles={[styles.input]}
          value={info[item]}
          inputStyles={{ color: '#2b0847', fontWeight: '500' }}
          labelStyles={{ fontWeight: 'bold', textTransform: 'capitalize' }}
          readOnly={DropDown ? true : false}
          keyboardType={item.toLowerCase().includes('number') ? 'numeric' : 'default'}
          rightComponent={DropDown &&
            <TouchableOpacity
              onPress={() => setDrpIndex(index)}
            >
              <AntDesign name="down-square-o" size={24} color="#134484" />
            </TouchableOpacity>
          }
          onChangeText={handleChangeText}
        />
        {
          DropDown && drpIndex == index &&
          <DropDownSearch
            isVisible={drpIndex}
            setIsVisible={setDrpIndex}
            dummyData={LocalData[item]}
            value={info[item]}
            setValue={(v) => handleChangeText(v)}
          />
        }
        
      </>
    );
  };

  return (
    <View style={{ flex: 1 }}>
    <FlatList
      data={Object.keys(info)}
      keyExtractor={(_, i) => `key${i}`}
      showsVerticalScrollIndicator={false}
      renderItem={renderSubItem}
    />
   <TouchableOpacity
        style={{
          backgroundColor: "#134484",
          padding: 15,
          margin: 10,
          borderRadius: 8,
          alignItems: "center",
          width:'50%',
          marginLeft:"25%"
        }}
        onPress={handleSubmit}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Submit</Text>
      </TouchableOpacity>
      </View>
  )
};

export default Management;
