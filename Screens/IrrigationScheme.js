import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from "../DrawerScreens/AddFacility/style";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { Entypo, AntDesign } from '@expo/vector-icons';
import DropDownSearch from "../CustomComponents/DropDownSearch";
import LocalData from "../Constants"
import YesOrNO from "../DrawerScreens/AddFacility/Questions/YesOrNO";
import { IrrigationSchemeData } from "./IrrgationSchemeData";
import FilePicker from "./FilePicker";

const IrrigationScheme = () => {
    const { data } = IrrigationSchemeData;
    const [info, setInfo] = React.useState(data);
    const [drpIndex, setDrpIndex] = React.useState(null);


    const handleSubmit = () => {
        console.log("Form submitted:", info);
    };

    const handleFilePick = (fileUri) => {
        handleChangeText("Borehole_Facility_Information", "Attach_Permit_Files", fileUri);
      };
    const renderSubItem = ({ item, index }) => {

        const handleChangeText = (text) => {
            const updataedData = [...info];
            updataedData[index]['value'] = text;
            setInfo(updataedData)
        };

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
                        label={item.label}
                        hint={item.label}
                        containerStyles={[styles.input]}
                        value={info[index]['value']}
                        inputStyles={{ color: '#2b0847', fontWeight: '500' }}
                        labelStyles={{ fontWeight: 'bold', textTransform: 'capitalize' }}
                        readOnly={DropDown ? true : false}
                        keyboardType={item?.label?.toLowerCase().includes('number') ? 'numeric' : 'default'}
                        rightComponent={(DropDown || DateFormate) &&
                            <TouchableOpacity
                                onPress={() => setDrpIndex(index)}
                            >
                                <AntDesign name="down-square-o" size={24} color="#134484" />
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
                        value={info[item]}
                        setValue={(v) => handleChangeText(v)}
                    />
                }

            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={info}
                keyExtractor={(_, i) =>`key${i}`}
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

export default IrrigationScheme;












