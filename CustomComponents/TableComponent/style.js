import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: { backgroundColor: 'transparent' },
    head: { backgroundColor: '#7eadeb', padding: 10 },
    text: {
        color: '#fff', fontWeight: '500',
        alignSelf: 'center'
    },
    dataText: { fontWeight: '400', padding: 5, alignSelf: 'center' },
    row: { flexDirection: 'row', backgroundColor: '#7febe3', borderBottomColor: '#ccc', borderBottomWidth: 1 },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' },
    renderCntr: {
        flexDirection: 'row', justifyContent: 'space-between', margin: 4,
        paddingVertical: 3,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.3,
    },
    BtnCntr: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#67a9de',
        padding: 5,
        marginVertical: 10,
        alignItems: 'center',
        borderRadius: 10
    },
    BtnTxt: {
        fontWeight: 'bold',
        color: '#fff'
    }
});

export default styles;