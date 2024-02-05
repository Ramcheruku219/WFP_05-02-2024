import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from "./style";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { Entypo, AntDesign } from '@expo/vector-icons';
import DropDownSearch from "../../CustomComponents/DropDownSearch";
import LocalData from "../../Constants"
import { ManagmentData } from "./ManagementData";
import CustomDatePicker from "../../CustomComponents/CustomeDatePicker";
import YesOrNO from "./Questions/YesOrNO"
import FilePicker from "../../Screens/FilePicker";



const NewManagement = () => {
    const { data } = ManagmentData;
    const [info, setInfo] = React.useState(data);
    const [drpIndex, setDrpIndex] = React.useState(null);

    const handleSubmit = () => {
        console.log("Form submitted:", info);
    };

    const renderSubItem = ({ item, index }) => {

        const handleChangeText = (text) => {
            const updataedData = [...info];
            updataedData[index]['value'] = text;
            setInfo(updataedData)
        };

        // const handleYesOrNoChange = (status) => {
           
        //     if (status === "No") {
        //      updatedData[index]['value'] = ''; 
        //         setInfo(updatedData);
        //     }
        //     handleChangeText(status);
        // };

        const DropDown = item.type == 'dropdown';
        const questions = item.type == 'question';
        const DateFormate = item.type == 'date';
        const hideContent = item.hide;
        let hideData = false;
        if (hideContent !== undefined) {
            const indexOfContent = info.findIndex(v => v.label == hideContent);
            hideData = info[indexOfContent]['value'] !== '' && info[indexOfContent]['value'] !== false ? false : true;
        }
        return (
            <View>
                {questions &&
                    <YesOrNO
                        title={item.label}
                        setStatus={(status) => handleChangeText(status)}
                    />
                }
                {!questions && hideData == false &&
                    <FloatingLabelInput
                        label={`${item.label}`}
                        hint={`${item.label}`}
                        containerStyles={[styles.input]}
                        value={info[index]['value'].toString()}
                        inputStyles={{ color: '#2b0847', fontWeight: '500' }}
                        labelStyles={{ fontWeight: 'bold', textTransform: 'capitalize' }}
                        readOnly={DropDown ? true : false}
                        keyboardType={item?.label?.toLowerCase().includes('number') ? 'numeric' : 'default'}
                        rightComponent={(DropDown || DateFormate) &&
                            <TouchableOpacity
                                onPress={() => setDrpIndex(index)}
                            >
                                <AntDesign name={DateFormate ? "calendar" : "down-square-o"} size={24} color="#134484" />
                            </TouchableOpacity>
                        }
                        onChangeText={handleChangeText}
                    />
                }
                {
                    DropDown && drpIndex === index &&
                    <DropDownSearch
                        isVisible={drpIndex}
                        setIsVisible={setDrpIndex}
                        dummyData={LocalData[item.label.replace(/ /g, '_')]}
                        value={info[index]['value']}
                        setValue={(v) => handleChangeText(v)}
                    />
                }

                {
                    DateFormate && drpIndex === index &&
                    <CustomDatePicker
                        isVisible={drpIndex}
                        setIsVisible={setDrpIndex}
                        value={info[index]['value']}
                        setValue={(value) => handleChangeText(value)}
                    />
                }

            </View>
        );
    };

return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={info}
                keyExtractor={(_, i) => `key${i}`}
                showsVerticalScrollIndicator={false}
                renderItem={renderSubItem}
            />
            {/* <TouchableOpacity
                style={{
                    backgroundColor: "#134484",
                    padding: 15,
                    margin: 10,
                    borderRadius: 8,
                    alignItems: "center",
                    width: '50%',
                    marginLeft: "25%"
                }}
                onPress={handleSubmit}
            >
                <Text style={{ color: "white", fontWeight: "bold" }}>Submit</Text>
            </TouchableOpacity> */}
        </View>
    )
};

export default NewManagement;