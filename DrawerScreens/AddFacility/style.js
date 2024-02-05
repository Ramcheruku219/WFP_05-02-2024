import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:20
  },
  FormTotCntr: {
  },
  FormCntr: {
    alignSelf: 'flex-end',
    margin: 5,
    backgroundColor: 'lightgreen',
    padding: 10,
    borderRadius: 5
  },
  HeadingLabCont: {
    margin: 5,
    padding: 5,
    width: width * .4,
    alignSelf: 'flex-end'
  },
  HeadTxt: {
    fontWeight: 'bold',
    color: 'darkblue',
    fontStyle: 'italic'
  },
  ActiveHead: {
    backgroundColor: '#89e9b8'
  },
  InActiveHead: {
    backgroundColor: '#eaedec'
  },
  input: {
    borderBottomWidth: 1,
    paddingVertical: width * 0.1 / 5,
    borderBottomColor: '#134484',
    marginBottom: width * 0.1 / 5

  },
  
});

export default styles;