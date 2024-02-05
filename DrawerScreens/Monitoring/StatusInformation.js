import React from "react";
import { View, Text, FlatList, TouchableOpacity,ScrollView} from "react-native";
import styles from "../../DrawerScreens/AddFacility/style";
import { FloatingLabelInput } from "react-native-floating-label-input";
import DropDownSearch from "../../CustomComponents/DropDownSearch";
import LocalData from "../../Constants";
import { Entypo, AntDesign } from "@expo/vector-icons";
import FilePicker from "../../Screens/FilePicker";
import StatusTable from "./StatusTable/StatusTable";


const StatusInformation= (props) => {
  const [drpIndex, setDrpIndex] = React.useState(null);

  const data = [
    {
      Operation_Status_And_Maintance_Information : {
      Reason_For_low_Operation_Capacity: "",                     //(mt3)
    },
      Other_Informations: {
      Facility_Water_Quality_Reference_Id: "",                  //(mt3)
    Embarkment_Condition:"",                                    //dropdown
    Specify_Other_Embarkment_Condition:"",   
    Attach_Document:"",                                       //choosefile
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
    handleChangeText("Other_Informations","Attach_Document", fileUri);
  };

  const handleSubmit = () => {
    // Implement your logic for form submission here
    console.log("Form submitted:", info);
    // You can perform additional actions here
  };

  const renderSubItem = (item, index, category) => {
    const validSubstrings = [
      "Reason_For_low_Operation_Capacity",
       "Embarkment_Condition",       
];
    const DropDown = validSubstrings.some((substring) =>
      item===substring
    );
    return (

      <>

       {item === "Attach_Document" ? (
        <FilePicker label="Attach Document" onFilePick={handleFilePick} title={"Attach Documen"} />
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
          onChangeText={(v) => handleChangeText(category, item, v)}
          
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

  const renderStatusINformation = ({ item, index }) => {
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
                  {index + 1}. {item?.replace(/_/g, " ")}
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
        renderItem={renderStatusINformation }  
/>
<StatusTable/>

   {/* <Unit/> */}

 <TouchableOpacity
        style={{
          backgroundColor: "#134484",
          padding: 15,
          margin: 10,
          borderRadius: 8,
          alignItems: "center",
          width:'50%',
          marginLeft:"25%",
          marginTop:'45%'
        }}
        onPress={handleSubmit}
      >
        <Text style={{ 
          color:"white", 
          fontWeight:"bold" }}>Submit</Text>
      </TouchableOpacity> 
       
    </View>
  );
};




export default StatusInformation;

