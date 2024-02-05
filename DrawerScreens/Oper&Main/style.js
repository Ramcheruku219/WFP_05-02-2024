import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    HeadTxt: {
        fontWeight: 'bold',
        padding: 4,
        margin: 10,
        color: '#12214a',
        borderBottomWidth: 1,
        borderColor: '#ccc'
    },
    input: {
        borderBottomWidth: 1,
        paddingVertical: width * 0.1 / 5,
        borderBottomColor: '#134484',
        marginBottom: width * 0.1 / 5

    },
    err: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: 'red',
        textAlign: 'center'
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#8ce0e3',
        padding: 5
    },
    headerCell: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    deleteButton: {
        alignSelf: 'center',
        marginLeft: 10,
        padding: 5,
        backgroundColor: 'red',
        borderRadius: 5
    },
    deleteButtonText: {
        color: 'white',
    },
    headtxt: {
        fontWeight: 'bold',
        fontStyle: 'italic', color: '#16306e'
    },
    HeadCntr: {
        padding: 10,
        borderWidth: 0.5,
        borderColor: '#253c7d',
        borderRadius: 10,
        marginVertical: 10
    },
    typeCntr: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    typeSubcntr: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    value: {
        fontWeight: '500',
        color: '#2d7047'
    }
})


export default styles;