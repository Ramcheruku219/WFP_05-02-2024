import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import DropDownSearch from "../../CustomComponents/DropDownSearch";
import LocalData from "../../Constants";
import { Entypo, AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get('screen');

const ManagementGps= () => {
    const [showForm, setShowForm] = useState({
        Any_Training_held: false,
        Lat_Long: false,
        DMS: false,
    });

    const data = {
      Management_Information: {
            Any_Training_held: { Zonal_Number: '', Zonal_Letter: '', Easting: '', Northings: '' },
            Lat_Long: { Latitude: '', Longitude: '' },
            DMS: { Deg: '', Min: '', Sec: '', Select: '' },
            Altitude: '',
            Distance_From_Main_Road: '',
            Distance_From_Nearest_Trading_Center: ''
        },
    };

    const [info, setInfo] = React.useState(data)

    const handleCheckBoxChange = (checkboxName) => {
        setShowForm((prevState) => ({
            Any_Training_held: checkboxName === 'Any_Training_held' ? !prevState.Any_Training_held : false,
            Lat_Long: checkboxName === 'Lat_Long' ? !prevState.Lat_Long : false,
            DMS: checkboxName === 'DMS' ? !prevState.DMS : false,
        }));
    };

    const handleInputChange = (category, field, value) => {
        setInfo((prevInfo) => ({
            ...prevInfo,
            Management_Information: {
                ...prevInfo. Management_Information,
                [category]: {
                    ...prevInfo. Management_Information[category],
                    [field]: value,
                },
            },
        }));
    };

    const renderInputs = (category, inputs) => {
        return Object.keys(inputs).map((key) => (
            <FloatingLabelInput
                key={key}
                label={key.replace(/_/g, ' ')}
                hint={key.replace(/_/g, ' ')}
                value={info. Management_Information[category][key]}
                onChangeText={(value) => handleInputChange(category, key, value)}
                containerStyles={[styles.input]}
                inputStyles={{ color: '#2b0847', fontWeight: '500' }}
            />
        ));
    };



    return (
        <View style={styles.container}>
            {Object.keys(data.Management_Information).map((key, i) => {
                const normal = ![0, 1, 2].includes(i);
                return (
                    !normal ?
                        <>
                            <BouncyCheckbox
                                key={key}
                                size={20}
                                fillColor="#134484"
                                style={{ padding: 10 }}
                                onPress={() => handleCheckBoxChange(key)}
                                isChecked={showForm[key]}
                                text={key}
                                innerIconStyle={{ borderWidth: 2, borderRadius: 0 }}
                                textStyle={{
                                    textDecorationLine: 'none',
                                    color: '#134484',
                                }}
                                iconStyle={{ borderRadius: 0 }}
                                disableBuiltInState
                            />
                            {
                                showForm[key] && (
                                    <View style={styles.inputContainer}>
                                        {renderInputs(key, data. Management_Information[key])}
                                    </View>
                                )}
                        </>
                        :
                        <FloatingLabelInput
                            key={key}
                            label={key.replace(/_/g, ' ')}
                            hint={key.replace(/_/g, ' ')}
                            value={info.Management_Information[key]}
                            onChangeText={(value) => setInfo((prevInfo) => ({
                                ...prevInfo,
                                Management_Information: {
                                    [key]: value
                                },
                            }))
                            }
                            containerStyles={[styles.input]}
                            inputStyles={{ color: '#2b0847', fontWeight: '500' }}
                        />
                )
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    inputContainer: {
        marginTop: 10,
        borderWidth: 2,
        padding: 10,
        borderColor: '#134484',
        borderRadius: 10
    },
    input: {
        borderBottomWidth: 1,
        paddingVertical: width * 0.1 / 5,
        borderBottomColor: '#134484',
        marginBottom: width * 0.1 / 5,
    },
});

export default ManagementGps;
