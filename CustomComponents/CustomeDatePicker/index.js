import DateTimePicker from 'react-native-ui-datepicker';
import React from 'react';
import styles from './style';
import { TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { Button } from 'react-native-elements';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

const CustomDatePicker = (props) => {
    const { isVisible, setIsVisible, value, setValue } = props;
    const [date, setDate] = React.useState(value)

    return (
        <Modal
            isVisible={isVisible !== '' ? true : false}
            animationIn='fadeInUp'
            animationOut='fadeUpDown'
        >
            <View style={styles.container}>
                <TouchableOpacity
                    style={{ alignItems: 'flex-end', margin: 16 }}
                    onPress={() => setIsVisible(null)}
                >
                    <AntDesign
                        name='closesquare'
                        size={24}
                        color="darkred"
                    />
                </TouchableOpacity>
                <DateTimePicker
                    mode="single"
                    value={value}
                    onValueChange={(date) => setDate(date)}
                    calendarTextStyle={{ fontStyle: 'italic', fontWeight: 'bold' }}
                />
                <TouchableOpacity
                    onPress={() => {
                        setValue(date)
                        setIsVisible(null)
                    }
                    }
                    style={{ margin: 10, padding: 8, backgroundColor: 'darkblue', alignItems: 'center', borderRadius: 10 }}
                >
                    <FontAwesome5 name="calendar-check" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

export default CustomDatePicker;