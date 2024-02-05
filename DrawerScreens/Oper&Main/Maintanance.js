import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from "./style";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { Entypo, AntDesign } from '@expo/vector-icons';
import DropDownSearch from "../../CustomComponents/DropDownSearch";
import LocalData from "../../Constants";
import { Button } from "react-native-elements";
import UiTableLargeColumns from "../../CustomComponents/TableComponent";
import { ScrollView } from "react-native-gesture-handler";
import FilePicker from "../../Screens/FilePicker";

const Maintaince = ({ route }) => {
    const { facName } = route.params;
    const [data, setDate] = React.useState({
        Operation_status_and_maintaince_information: {
            Reason_for_low_operation_capacity: ''
        },
        Villages_served: [],
        Other_Informations: {
            Facility_water_quality_reference_id: '',
            Embarkment_condition: '',
            specify_other_embarkment_conditions_if_any: '',
            File: ''
        }
    });

    const handleChangeText = (section, field, value) => {
        const updateData = { ...data };
        updateData[section][field] = value;
        setDate(updateData);
    };

    const handleFilePick = (fileUri) => {
        handleChangeText("Other_Informations", "File", fileUri);
    };

    const [Villages, setVillages] = React.useState({
        Name_Of_Village_Served: '',
        Coverage_Area_sqkm: '',
        Number_Of_Households: ''
    });

    const [drpIndex, setDrpIndex] = React.useState(null);

    const renderItem = (...arr) => {
        const [item, index, field] = arr;

        const validSubstrings = ["Reason", "Embarkment"];
        const DropDown = validSubstrings.some((substring) => item.startsWith(substring));

        return (
            <View key={index} style={{ marginVertical: 5 }}>
                {item === "File" ? (
                    <FilePicker label="File" onFilePick={handleFilePick} title={"File"} />
                ) : (
                    <FloatingLabelInput
                        label={`${item.replace(/_/g, " ")}`}
                        hint={`${item.replace(/_/g, " ")}`}
                        value={data[field][item]}
                        onChangeText={(value) => handleChangeText(field, item, value)}
                        containerStyles={[styles.input]}
                        inputStyles={{ color: '#2b0847', fontWeight: '500' }}
                        labelStyles={{ fontWeight: 'bold', textTransform: 'capitalize' }}
                        readOnly={DropDown ? true : false}
                        rightComponent={
                            DropDown && (
                                <TouchableOpacity onPress={() => setDrpIndex(index)}>
                                    <AntDesign name="down-square-o" size={24} color="#134484" />
                                </TouchableOpacity>
                            )
                        }
                    />
                )}
                {DropDown &&
                    drpIndex == index && (
                        <DropDownSearch
                            isVisible={drpIndex}
                            setIsVisible={setDrpIndex}
                            dummyData={LocalData[item]}
                            value={data[field][item]}
                            setValue={(value) => handleChangeText(field, item, value)}
                        />
                    )}
            </View>
        );
    };

    const disabled = Object.values(Villages).some((v) => v == '');

    const handleAdd = () => {
        const updateData = { ...data };
        updateData.Villages_served.push(Villages);
        setDate(updateData);
        setVillages({
            Name_Of_Village_Served: '',
            Coverage_Area_sqkm: '',
            Number_Of_Households: ''
        });
    };

    const handleDelete = (index) => {
        const updateData = { ...data };
        updateData.Villages_served.splice(index, 1);
        setDate(updateData);
    };

    const DataAdd = () => {
        return (
            <View>
                {Object.keys(Villages).map((item, index) => {
                    const handleChangeText = (value) => {
                        const updateData = { ...Villages };
                        updateData[item] = value;
                        setVillages(updateData);
                    };
                    return (
                        <View key={index}>
                            <FloatingLabelInput
                                label={`${item.replace(/_/g, " ")}`}
                                hint={`${item.replace(/_/g, " ")}`}
                                value={Villages[item]}
                                onChangeText={handleChangeText}
                                containerStyles={[styles.input]}
                                inputStyles={{ color: '#2b0847', fontWeight: '500' }}
                                labelStyles={{ fontWeight: 'bold', textTransform: 'capitalize' }}
                            />
                        </View>
                    );
                })}
                <Button
                    title="Add"
                    buttonStyle={{ marginVertical: 20, borderRadius: 10 }}
                    icon={() => <AntDesign name="plus" size={24} color={disabled ? '#ccc' : '#fff'} />}
                    disabled={disabled}
                    onPress={handleAdd}
                />
                {renderTable()}
            </View>
        );
    };

    const renderHeading = (...arr) => {
        const [item, index] = arr;
        const check = index == 1;
        return (
            <View key={index} style={styles.HeadCntr}>
                <Text style={[styles.headtxt, { marginVertical: 10 }]}>{index + 1}.{item.replace(/_/g, ' ')}</Text>
                {!check &&
                    Object.keys(data[item]).map((v, i) => renderItem(v, i, item))
                }
                {check &&
                    DataAdd()
                }
            </View>
        );
    };

    const renderTable = () => {
        return (
            <View>
                <View style={styles.tableHeader}>
                    {Object.keys(Villages).map((hed, i) => <Text style={[styles.headerCell, { textAlign: 'center', fontSize: 12 }]} key={i}>{hed.replace(/_/g, ' ')}</Text>)}
                    <Text style={[styles.headerCell, { textAlign: 'center' }]}>Delete</Text>
                </View>
                {data.Villages_served.length > 0 ? data.Villages_served?.map((row, index) => {
                    return (
                        <View style={styles.tableRow} key={index}>
                            {Object.keys(row).map((hed, i) => <Text style={[styles.headerCell, { textAlign: 'center', fontWeight: '500' }]} key={i}>{row[hed]}</Text>)}
                            <TouchableOpacity style={styles.deleteButton}
                                onPress={() => handleDelete(index)}
                            >
                                <AntDesign name="delete" size={20} color="#fff" />
                            </TouchableOpacity>

                        </View>
                    );
                })
                    :
                    <Text style={{
                        textAlign: 'center', margin: 10,
                        fontStyle: 'italic'
                    }}>No Data Saved !</Text>
                }
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.HeadTxt}>Operation Status and Maintenance Information</Text>
            <View style={styles.typeCntr}>
                <View style={styles.typeSubcntr}>
                    <Text style={styles.headtxt}>Facility Name: </Text>
                    <Text style={styles.value}>{facName[0].facility_Name}</Text>
                </View>
                <View style={styles.typeSubcntr}>
                    <Text style={styles.headtxt}>Facility Type: </Text>
                    <Text style={styles.value}>{facName[0].facility_Type}</Text>
                </View>
            </View>
            <ScrollView
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}
            >
                {Object.keys(data).map((item, index) => renderHeading(item, index))}
            </ScrollView>
        </View>
    );
};

export default Maintaince;
