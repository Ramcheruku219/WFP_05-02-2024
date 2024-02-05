import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { FloatingLabelInput } from 'react-native-floating-label-input';

const { width } = Dimensions.get('screen');

const GPS = () => {
    const [showForm, setShowForm] = useState({
        UTM: false,
        Lat_Long: false,
        DMS: false,
    });

    const data = {
        GPS_Information: {
            UTM: { Zonal_Number: '', Zonal_Letter: '', Easting: '', Northings: '' },
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
            UTM: checkboxName === 'UTM' ? !prevState.UTM : false,
            Lat_Long: checkboxName === 'Lat_Long' ? !prevState.Lat_Long : false,
            DMS: checkboxName === 'DMS' ? !prevState.DMS : false,
        }));
    };

    const handleInputChange = (category, field, value) => {
        setInfo((prevInfo) => ({
            ...prevInfo,
            GPS_Information: {
                ...prevInfo.GPS_Information,
                [category]: {
                    ...prevInfo.GPS_Information[category],
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
                value={info.GPS_Information[category][key]}
                onChangeText={(value) => handleInputChange(category, key, value)}
                containerStyles={[styles.input]}
                inputStyles={{ color: '#2b0847', fontWeight: '500' }}
            />
        ));
    };



    return (
        <View style={styles.container}>
            {Object.keys(data.GPS_Information).map((key, i) => {
                const normal = ![0, 1, 2].includes(i);
                return (
                    !normal ?
                        <View key={i}>
                            <BouncyCheckbox
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
                                        {renderInputs(key, data.GPS_Information[key])}
                                    </View>
                                )}
                        </View>
                        :
                        <FloatingLabelInput
                            key={key}
                            label={key.replace(/_/g, ' ')}
                            hint={key.replace(/_/g, ' ')}
                            value={info.GPS_Information[key]}
                            onChangeText={(value) => setInfo((prevInfo) => ({
                                ...prevInfo,
                                GPS_Information: {
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

export default GPS;
