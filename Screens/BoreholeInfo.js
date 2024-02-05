import React from "react";
import { View, Text, FlatList,TouchableOpacity } from "react-native";
import styles from "../DrawerScreens/AddFacility/style";
import { FloatingLabelInput } from "react-native-floating-label-input";
import DropDownSearch from "../CustomComponents/DropDownSearch";
import LocalData from "../Constants";
import { Entypo, AntDesign } from "@expo/vector-icons";
import FilePicker from "./FilePicker";

const BoreholeInfo = () => {

  const [drpIndex, setDrpIndex] = React.useState(null);
  const data = [
    {
        Borehole_Facility_Information: {
        Permit_Number: "",                             //(mt3)
        Attach_Permit_Files: "",                      //choosefile
        Borehole_Number: "",   
        Volume_Of_Water_Abstraction_Permitted:"",
        Volume_Of_Water_Abstraction:"",
        Coverage_Area:"",                          //(mt2)
        Number_Of_Households:"",
        Water_Use:"",                           //dropdown
      },
    },
  ];
  const [info, setInfo] = React.useState(data);
  const handleChangeText = (category, item, text) => {
    const updateData = [...info];
    updateData[0][category][item] = text;
    setInfo(updateData);
  };
  

  const handleFilePick = (fileUri) => {
    handleChangeText("Borehole_Facility_Information", "Attach_Permit_Files", fileUri);
  };

  const handleSubmit = () => {
    // Implement your logic for form submission here
    console.log("Form submitted:", info);
    // You can perform additional actions here
  };
  const renderSubItem = (item, index, category) => {
    const validSubstrings = [
     
     "Water_Use"

    ];
    const DropDown = validSubstrings.some((substring) =>
      item.includes(substring)
    );
      return (
        <>
         {item === "Attach_Permit_Files" ? (
          <FilePicker label="Attach Permit Files" onFilePick={handleFilePick} title={"Attach Permit Files"} />
        ) : (
        <FloatingLabelInput
          label={`${item.replace(/_/g, " ")}`}
          hint={`${item.replace(/_/g, " ")}`}
          containerStyles={[styles.input]}
          value={info[0][category][item]}
          inputStyles={{ color: "#2b0847", fontWeight: "500"}}
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
          onChangeText={(v)=> handleChangeText(category, item, v)}
        />
        )}
        {DropDown && drpIndex == index && (
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
      
    const renderBoreholeInfo = ({ item, index }) => {
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
        renderItem={renderBoreholeInfo}
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


export default BoreholeInfo;
