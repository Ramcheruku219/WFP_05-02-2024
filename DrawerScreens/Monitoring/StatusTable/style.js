import { StyleSheet } from "react-native";

const styles=StyleSheet.create({
    Container: {
      flex:1,
       padding:10,
       backgroundColor:"#fefeff"
    },
DevTab:{
      borderColor:'gray',
      borderWidth:1,
      padding:10,
      margin:10
    },
    tabHead:{
        margin:8,
        padding:3,
        fontWeight:'500',
        borderBottomColor:'#ccc',
        borderBottomWidth:0.5,
        color:'blue',
        
    },
   
  
   tableHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    paddingLeft:10,
    
  },
 
  InspectionTable:
  {
    margin:10,
    padding:10,
    borderColor:'grey',
    borderWidth:1,
    borderRadius:8
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inputCell: {
    flex: 1,
    borderWidth: 1,
    margin:5,
    borderColor: 'grey',
    padding: 5,
    borderRadius:8,
    
  },
  deleteButton: {
    alignSelf: 'center',
    marginLeft: 10,
    padding: 5,
    backgroundColor: 'red',
    borderRadius:5
  },
  deleteButtonText: {
    color: 'white',
  },
  addButton: {
    color:'white'
  },
  addButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  err:
  {
    color:'red',
    margin:10,
    fontWeight:'500'
  }
  })

  export default styles;