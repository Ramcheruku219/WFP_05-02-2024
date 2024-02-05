import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Card, Title, IconButton } from 'react-native-paper';
import { MotiView } from 'moti';
import { useNavigation } from '@react-navigation/native'; 
import { Data } from './samData';

const MaintanceTable = (props) => {
  const navigation = useNavigation(); // Get the navigation object

  const RowSet = (label, data) => (
    <View style={{ flexDirection: 'row', marginBottom: 7 }}>
      <Text style={{ fontWeight: 'bold', color: '#134484', width: 220 }}>{label}</Text>
      <Text style={{ flex: 1 }}>{data}</Text>
    </View>
  );

  const handleIconPress = (item) => {
    // Navigate to another page when the icon is pressed
    navigation.navigate('Maintance Information', { fileId: item.File });
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={Data}
        numColumns={2}
        keyExtractor={(_, index) => `Key${index}`}
        renderItem={({ item, index }) => (
          <MotiView
            style={{ width: '100%', marginBottom: 20 }}
            from={{ opacity: 0, translateY: 300 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing' }}
          >
            <Card>
              <Card.Content>
                <Title>{item.Parish}</Title>
                {RowSet('S.No', item.SNo)}
                {RowSet('Facility Name', item.FacilityName)}
                {RowSet('Facility Type', item.FacilityType)}
                {RowSet('Facility Id', item.FacilityId)}
                {RowSet('Village', item.Village)}
                {RowSet('Create By', item.CreateBy)}
                {RowSet('Create On', item.CreateOn)}
                {RowSet('Fill', item.Fill)}
                <IconButton
                  icon="information"
                  color="#134484"
                  onPress={() => handleIconPress(item)}
                  style={{ alignSelf: 'flex-end', marginTop: -35, marginRight: 65 }}
                />
              </Card.Content>
            </Card>
          </MotiView>
        )}
      />
    </View>
  );
};

export default MaintanceTable;
