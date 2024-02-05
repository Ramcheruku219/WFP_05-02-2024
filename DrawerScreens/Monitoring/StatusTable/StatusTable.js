
import React, { useState } from 'react';
import { View, Text, TouchableOpacity ,TextInput,ScrollView} from 'react-native';
import styles from './style';
import { AntDesign } from '@expo/vector-icons';


const  PointTable= () => {
  const [rows, setRows] = useState([{ NameOfVillageServed: '', CoverareArea: '',NumberOfHouseholds:''}]);
  const [errorMes,setErrMes]=useState('');


  const addRow = () => {
    errorMes?setErrMes(''):null;
    setRows([...rows, {NameOfVillageServed: '',CoverareArea: '',NumberOfHouseholds:''}]);
  };

  const deleteRow = (index) => {
    if (index === 0) {
      // Show error message when trying to delete the first row
      setErrMes('Sorry, the first row cannot be deleted !');
      return;
    }
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const handleNameOfVillageServedChange = (text, index) => {
    const updatedRows = [...rows];
    updatedRows[index].NameOfVillageServed = text;
    setRows(updatedRows);
  };
const handleCoverareAreaChange = (text, index) => {
    const updatedRows = [...rows];
    updatedRows[index].CoverareArea = text;
    setRows(updatedRows);
  };
  const handleNumberOfHouseholdsChange = (text, index) => {
    const updatedRows = [...rows];
    updatedRows[index].NumberOfHouseholds = text;
    setRows(updatedRows);
  };

 return (
    <ScrollView style={styles.InspectionTable}>

      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Name Of Village Served</Text>
        <Text style={styles.headerCell}>Coverare Area</Text>
        <Text style={styles.headerCell}>Number Of Households</Text>
 
        <TouchableOpacity onPress={addRow}>
        <AntDesign name="pluscircle" size={24} color="green" style={{margin:5}}/>
      </TouchableOpacity>

      </View>
      {errorMes&&
       <Text style={styles.err}>{errorMes}</Text>
      }
      {rows.map((row, index) => (
        <View style={styles.tableRow} key={index}>
          <TextInput
            style={styles.inputCell}
            value={row.NameOfVillageServed}
            onChangeText={(text) => handleNameOfVillageServedChange(text, index)}
          />
          <TextInput
            style={styles.inputCell}
            value={row.CoverareArea}
            onChangeText={(text) => handleCoverareAreaChange(text, index)}
          />
           <TextInput
            style={styles.inputCell}
            value={row.NumberOfHouseholds}
            onChangeText={(text) => handleNumberOfHouseholdsChange(text, index)}
          />

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteRow(index)}
            >
                <AntDesign name="delete" size={24} style={styles.deleteButtonText} />
            </TouchableOpacity>
        
        </View>
      ))}
      
    </ScrollView>
  );
};

export default PointTable;






