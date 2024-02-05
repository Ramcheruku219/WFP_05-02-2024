import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from "./style";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { Entypo, AntDesign } from '@expo/vector-icons';
import DropDownSearch from "../../CustomComponents/DropDownSearch";
import LocalData from "../../Constants"
import { Button } from "react-native-elements";
import UiTableLargeColumns from "../../CustomComponents/TableComponent";
import { data } from "./OpearatinSampleData";

const OperAndMain = () => {

    const { opeationalData } = data;
    const [search, setSearch] = React.useState({
        facility_Name: '',
        facility_Type: ''
    });
    const [drpIndex, setDrpIndex] = React.useState(null);
    const [status, setStatus] = React.useState(null);
    const [error, setError] = React.useState('');

    const renderItem = (...arr) => {
        const [item, index] = arr;
        const validSubstrings = [
            "Type",
        ];
        const DropDown = validSubstrings.some(substring => item.includes(substring));
        const handleChangeText = (value) => {
            const updateData = { ...search };
            updateData[item] = value;
            setSearch(updateData)
        }
        return (
            <View key={index}>
                <FloatingLabelInput
                    label={`${item.replace(/_/g, " ")}`}
                    hint={`${item.replace(/_/g, " ")}`}
                    containerStyles={[styles.input]}
                    value={search[item]}
                    onChangeText={handleChangeText}
                    inputStyles={{ color: '#2b0847', fontWeight: '500' }}
                    labelStyles={{ fontWeight: 'bold', textTransform: 'capitalize' }}
                    readOnly={DropDown ? true : false}
                    rightComponent={DropDown &&
                        <TouchableOpacity
                            onPress={() => setDrpIndex(index)}
                        >
                            <AntDesign name="down-square-o" size={24} color="#134484"/>
                        </TouchableOpacity>
                    }
                />
                {
                    DropDown && drpIndex == index &&
                    <DropDownSearch
                        isVisible={drpIndex}
                        setIsVisible={setDrpIndex}
                        dummyData={LocalData[item]}
                        value={search[item]}
                        setValue={handleChangeText}
                    />
                }
            </View>
        )
    }

    const disabled = Object.values(search).some(v => v == '');

    const handleSearch = () => {
        const filterData = opeationalData.filter(v => v.facility_Name == search.facility_Name && v.facility_Type == search.facility_Type)
        if (filterData.length > 0)   {      ////
            setError('');
            setStatus(filterData)
        }
        else {
            setError('No Data Found !')
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.HeadTxt}>Facility Information</Text>
            {Object.keys(search).map((item, index) => renderItem(item, index))}
            <Button
                title="search Facility Details"
                buttonStyle={{ marginVertical: 20, borderRadius: 10 }}
                icon={() => <AntDesign name="search1" size={24} color="#fff" />}
                disabled={disabled}
                onPress={handleSearch}
            />
            {error &&
                <Text style={styles.err}>{error}</Text>
            }
            {!error && status !== null &&
                <UiTableLargeColumns
                    data={status}
                />
            }
        </View>
    )
}

export default OperAndMain;


