import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-reanimated-table';
import styles from "./style";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const UiTableLargeColumns = (props) => {
    const { data, handleDelete } = props;
    const navigation = useNavigation();
    const [status, setStatus] = React.useState(null);

    const element = (data, index) => (
        <TouchableOpacity
            style={styles.dataText}
            onPress={() => setStatus(index)}
        >
            <MaterialIcons name="more-horiz" size={20} color="darkblue" />
        </TouchableOpacity>
    );

    const renderText = (head, value, index) => {
        return <View style={styles.renderCntr} key={index}>
            <View style={{ width: '45%' }}>
                <Text style={{ fontWeight: '500', fontStyle: 'italic' }}>{head}</Text>
            </View>
            <View style={{ width: '45%' }}>
                <Text>: {value}</Text>
            </View>
        </View>
    }

    const ModalData = () => {
        return (
            <Modal
                isVisible={status !== null ? true : false}
                animationIn="zoomIn"
                animationOut="bounceOutRight"
                useNativeDriver
                backdropColor="rgba(1,1,1,0.5)"
            >
                <View style={{ padding: 10, backgroundColor: '#fff', borderRadius: 10 }}>
                    <TouchableOpacity
                        onPress={() => setStatus(null)}
                        style={{ alignItems: 'flex-end' }}
                    >
                        <AntDesign
                            name='closesquare'
                            size={24}
                            color="darkred"
                        />
                    </TouchableOpacity>
                    {Object.keys(data[status]).map((item, index) => renderText(item.replace(/_/g, ' '), data[status][item], index))}
                    <TouchableOpacity
                        style={styles.BtnCntr}
                        onPress={() => {
                            setStatus(null)
                            navigation.navigate('Maintenance', { facName: data })
                        }}
                    >
                        <Text style={styles.BtnTxt}>Fill </Text>
                        <Entypo name="popup" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }


    return (
        <View style={styles.container}>
            <Table>
                <Row data={Object.keys(data[0])?.slice(0, 2).concat('More').map((v) => v.replace(/_/g, ' '))} style={styles.head} textStyle={styles.text} />
                {data?.map((rowData, rowIndex) => (
                    <TableWrapper key={rowIndex} style={styles.row}>
                        {Object.keys(rowData).slice(0, 3).map((cellData, cellIndex) => {
                            return (
                                <Cell
                                    key={cellIndex}
                                    data={cellIndex === 2 ? element(data[rowIndex][cellData], rowIndex) : data[rowIndex][cellData]}
                                    textStyle={[styles.dataText]}
                                />
                            )
                        })}
                    </TableWrapper>
                ))}
            </Table>
            {status !== null && ModalData()}
        </View>
    );
}

export default UiTableLargeColumns;