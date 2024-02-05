import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from "./style";
import { FloatingLabelInput } from "react-native-floating-label-input";
import DatePicker from "react-native-datepicker";
import { Entypo, AntDesign } from '@expo/vector-icons';
import DropDownSearch from "../../CustomComponents/DropDownSearch";
import BouncyCheckbox from "react-native-bouncy-checkbox";


const Source = (props) => {
  
  const { info, setInfo } = props;
  const [drpIndex, setDrpIndex] = React.useState(null);

  const handleChange = (text, lable, item) =>{
    const newInfo = [...info];
    newInfo[0][lable][item] = text;
    setInfo(newInfo);
  }


  const renderSubItem = (item, index, lable) => {
    const validSubstrings = ["year", "type"];
    const validSubQuestions = ["is"];
    const DropDown = validSubstrings.some(substring => item.toLowerCase().includes(substring));
    const Question = validSubQuestions.some(substring => item.toLowerCase().startsWith(substring));
    if (Question) {
      return <>
        <BouncyCheckbox
          size={20}
          fillColor="#134484"
          style={{ padding: 10 }}
          text={item.replace(/_/g, " ")}
          isChecked={(info[0][lable][item] == "" || info[0][lable][item] == 'No') ? false : true}
          innerIconStyle={{ borderWidth: 2, borderRadius: 2 }}
          textStyle={{ textDecorationLine: "none", color: "#134484" }}
          onPress={() => {
            if (info[0][lable][item] == '' || info[0][lable][item] == 'No') {
              handleChange('Yes', lable, item)
            }
            else {
              handleChange('No', lable, item)
            }
          }}
          disableBuiltInState
          iconStyle={{ borderRadius: 0 }}
        />
      </>
    }
    else {
      return (
        <>
          <FloatingLabelInput
            label={item.includes('Remarks') ? `${item.replace(/_.*/, "")}` : `${item.replace(/_/g, " ")}`}
            hint={`${item.replace(/_/g, " ")}`}
            containerStyles={[styles.input]}
            value={info[0][lable][item]}
            inputStyles={{ color: '#2b0847', fontWeight: '500' }}
            labelStyles={{ fontWeight: 'bold', textTransform: 'capitalize' }}
            keyboardType={item.toLowerCase().includes('number') ? 'numeric' : 'default'}
            readOnly={DropDown ? true : false}
            rightComponent={DropDown &&
              <TouchableOpacity
                onPress={() => setDrpIndex(index)}
              >
                <AntDesign name="down-square-o" size={24} color="#134484" />
              </TouchableOpacity>
            }
            onChangeText={(text) => handleChange(text, lable, item)}
          />

          {DropDown && drpIndex == index &&
            <DropDownSearch
              isVisible={drpIndex}
              setIsVisible={setDrpIndex}
              dummyData={LocalData[item]}
              value={info[0][lable][item]}
              setValue={(v) => handleChange(v, lable, item)}
            />
          }
        </>
      );
    }
  };
  const renderFacility = ({ item, index }) => {
    const lable = Object.keys(item);
    return (
      <FlatList
        data={lable}
        keyExtractor={(_, i) => `key${i}`}
        renderItem={({ item, index }) => {
          const label = item;
          return (
            <View style={{ margin: 5, padding: 5 }}>
              <View
                style={{
                  margin: 5,
                  padding: 5,
                  backgroundColor: "skyblue",
                  borderRadius: 5,
                  paddingHorizontal: 10,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>
                  {index + 1}. {item.replace(/_/g, " ")}
                </Text>
              </View>
              <FlatList
                data={Object.keys(info[0][item])}
                keyExtractor={(_, i) => `KEY ${i}`}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => renderSubItem(item, index, label)}
              />
            </View>
          );
        }}
      />
    );
  };

  return (
    <FlatList
      data={info}
      keyExtractor={(_, i) => `Key${i}`}
      showsVerticalScrollIndicator={false}
      renderItem={renderFacility}
    />
  );
};

export default Source;


