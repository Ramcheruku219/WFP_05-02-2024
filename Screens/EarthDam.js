import React from "react";
import { View, Text, FlatList,TouchableOpacity } from "react-native";
import styles from "../DrawerScreens/AddFacility/style";
import { FloatingLabelInput } from "react-native-floating-label-input";
import DropDownSearch from "../CustomComponents/DropDownSearch";
import LocalData from "../Constants"
import { Entypo, AntDesign } from '@expo/vector-icons';

const EarthDam = () => {
  const [drpIndex, setDrpIndex] = React.useState(null);

  const data = [

    {
        Earth_Dam_Facility_Information: {
        Volume_Of_Facility: "",
        Abstraction_Method: "",              //dropdown
        Water_Use: "",                       //dropdown
        Coverage_Area:"",                    //(mt2)
        Number_Of_HouseHolds:"",
        Amount_Of_Water_Used:"",              //(mt3)
        Amount_Of_Waste_Water:"",              //(mt3)
        Total_Amount_Of_Water_Required:"",     //(mt3)
 },
    
    },
  ];
  const [info, setInfo] = React.useState(data);
 
  const handleChangeText = (category, item, text) => {
    const updateData = [...info];
    updateData[0][category][item] = text;
    setInfo(updateData);
  };
  const handleSubmit = () => {
    // Implement your logic for form submission here
    console.log("Form submitted:", info);
    // You can perform additional actions here
  };



  const renderSubItem = (item, index, category) => {
    const validSubstrings = [
      "Abstraction_Method",
      "Water_Use"
    ];
    const DropDown = validSubstrings.some((substring) =>
      item==substring
    );
      return (
        <>
        <FloatingLabelInput
          label={`${item.replace(/_/g, " ")}`}
          hint={`${item.replace(/_/g, " ")}`}
          containerStyles={[styles.input]}
          value={info[0][category][item]}
          inputStyles={{ color: "#2b0847", fontWeight: "500" }}
          labelStyles={{
            fontWeight: "bold",
            overflow: "hidden",
            width: "100%",
            textTransform: "capitalize",
          }}
          readOnly={DropDown ? true : false}
          keyboardType={
            item.toLowerCase().includes("number") ? "numeric" : "default"
          }
          rightComponent={
            DropDown && (
              <TouchableOpacity onPress={() => setDrpIndex(index)}>
                <AntDesign name="down-square-o" size={24} color="#134484" />
              </TouchableOpacity>
            )
          }
          onChangeText={(v) => handleChangeText(category, item, v)}
        />
       {
          DropDown && drpIndex == index && (
          <DropDownSearch
            isVisible={drpIndex}
            setIsVisible={setDrpIndex}
            dummyData={LocalData[item]}
            value={info[0][category][item]}
            setValue={(v) => handleChangeText(category, item, v)}
          />
        )}
      </>
       
      );
    };

    const renderEarthDam = ({ item, index }) => {
      const lable = Object.keys(item);
      const category = lable[index];
      return (
        <FlatList
          data={lable}
          keyExtractor={(_, i) => `key${i}`}
          renderItem={({ item, index }) => {
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
                  renderItem={({ item, index }) =>
                  renderSubItem(item, index, category)
                }
                />
              </View>
            );
          }}
        />
      );
    };
    return (
      <View style={{ flex: 1 }}>
      <FlatList
        data={info}
        keyExtractor={(_, i) => `Key${i}`}
        renderItem={renderEarthDam}
      /> 
      {/* <TouchableOpacity
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
      </TouchableOpacity> */}
      </View>
    );
  };

  
export default EarthDam;
