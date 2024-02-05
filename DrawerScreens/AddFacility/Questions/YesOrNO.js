import React from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from "./styles";

const YesOrNO = (props) => {
    const { title, setStatus } = props;
    const [check, setCheck] = React.useState(null);

    React.useEffect(() => {
        check !== null && setStatus(check)
    }, [check])

    return (
        <View style={styles.container}>
            <View style={{ width: '65%' }}>
                <Text>{title}</Text>
            </View>
            <View style={{ width: '25%', flexDirection: 'row', justifyContent: 'space-between',alignItems:'center'}}>
                <TouchableOpacity style={styles.checkCntr}
                    onPress={() => setCheck(true)}
                >
                    <AntDesign name={check ? 'checkcircle' : 'checkcircleo'} color={check ? 'green' : '#ccc'} size={20} />
                    <Text style={[check ? { fontWeight: 'bold' } : {}]}> Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.checkCntr}
                    onPress={() => setCheck(false)}
                >
                    <AntDesign name={check == false ? 'checkcircle' : 'checkcircleo'} color={check == false ? 'green' : '#ccc'} size={20} />
                    <Text style={[check == false ? { fontWeight: 'bold' } : {}]}> No</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default YesOrNO;