import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from "../DrawerScreens/AddFacility/style";
import { FloatingLabelInput } from "react-native-floating-label-input";
import DropDownSearch from "../CustomComponents/DropDownSearch";
import LocalData from "../Constants";
import { Entypo, AntDesign } from "@expo/vector-icons";
import FilePicker from "./FilePicker";
const RuralIndustry = () => {
  const [drpIndex, setDrpIndex] = React.useState(null);
  const data = [
    {
      Rural_Industry_Facility_Information: {
        Type_Of_Industry: "",                            //dropdown
        Water_Source: "",                               //dropdown
      },
      Water_Source_and_Abstraction_Information: {
        Permit_Number: "",
        Attach_Permit_Documents: "",                   //choose file
        Volume_Of_Water_Source_Permitted: "",
        Volume_Of_Water_Source_Used: "",
        Volume_Of_Drainage_Water_Peermitted: "",
        Volume_Of_Drainage_Water: "",
        Other_Users: "",                            //dropdown
        Volume_For_Other_Use: "",
        Specify_Others: "",
      },
    },
  ];
  const [info, setInfo] = React.useState(data);

  const handleChangeText = (text, lable, item) => {
    const newInfo = [...info];
    newInfo[0][lable][item] = text;
    setInfo(newInfo);
  };

  const handleFilePick = (fileUri) => {
    console.log(fileUri,'ram')
    handleChangeText("Water_Source_and_Abstraction_Information", "Attach_Permit_Documents", fileUri);
  };

  const handleSubmit = () => {
    // Implement your logic for form submission here
    console.log("Form submitted:", info);
    // You can perform additional actions here
  };


  const renderSubItem = (item, index, category) => {
    const validSubstrings = ["Type_Of_Industry", "Water_Source", "Other_Users"];
    const DropDown = validSubstrings.some((substring) => item == substring);
    return (
      <>
         {item === "Attach_Permit_Documents" ? (
          <FilePicker label=" Attach Permit Documents" onFilePick={handleFilePick} title={"Attach Permit Documents"} />
        ) : (
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
          onChangeText={(v) => handleChangeText(v, category, item)}
        />
        )}
        {DropDown && drpIndex == index && (
          <DropDownSearch
            isVisible={drpIndex}
            setIsVisible={setDrpIndex}
            dummyData={LocalData[item]}
            value={info[0][category][item]}
            setValue={(v) => handleChangeText(v, category, item)}
          />
        )}
      </>
    );
  };

  const renderRuralIndustry = ({ item, index }) => {
    const lable = Object.keys(item);
    return (
      <FlatList
        data={lable}
        keyExtractor={(_, i) => `key${i}`}
        showsVerticalScrollIndicator={false}
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
                showsVerticalScrollIndicator={false}
                keyExtractor={(_, i) => `KEY ${i}`}
                renderItem={({ item, index }) =>
                  renderSubItem(item, index, label)
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
      renderItem={renderRuralIndustry}
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

export default RuralIndustry;
