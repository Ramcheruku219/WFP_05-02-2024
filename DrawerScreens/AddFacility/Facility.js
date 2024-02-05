import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from "./style";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { Entypo, AntDesign } from '@expo/vector-icons';
import DropDownSearch from "../../CustomComponents/DropDownSearch";
import LocalData from "../../Constants"
import GPS from "./GPS";
import LocationDetailsForAll from "../LocationForAll";

const Facility = (props) => {
  const { Location, info, setInfo, myLoc, setMyLoc } = props;
  const [drpIndex, setDrpIndex] = React.useState(null);

  const handleChange = (text, lable, item) => {
    const newInfo = [...info];
    newInfo[0][lable][item] = text;
    setInfo(newInfo);
  }

  const renderSubItem = (item, index, lable) => {
    const validSubstrings = [
      "Type",
       "zone",
        "basin",
         "status"
        ];
    const DropDown = validSubstrings.some(substring => item.includes(substring));
    if (item == 'DropDown') {
      return <LocationDetailsForAll v={'DropDown'} Location={myLoc} setLocation={setMyLoc} locDet={Location} key={index} />
    }
    else {
      return (
        <>
          <FloatingLabelInput
            label={`${item.replace(/_/g, " ")}`}
            hint={`${item.replace(/_/g, " ")}`}
            containerStyles={[styles.input]}
            value={info[0][lable][item]}
            inputStyles={{ color: '#2b0847', fontWeight: '500' }}
            labelStyles={{ fontWeight: 'bold', textTransform: 'capitalize' }}
            keyboardType={item.toLowerCase().includes('number') ? 'numeric' : 'default'}
            readOnly={DropDown ? true : false}
            rightComponent={DropDown &&
              <TouchableOpacity
                onPress={() => setDrpIndex(index)}
              >
                <AntDesign name="down-square-o" size={24} color="#134484"/>
              </TouchableOpacity>
            }
            onChangeText={(text) => handleChange(text, lable, item)}
          />

          {DropDown && drpIndex == index &&
            <DropDownSearch
              isVisible={drpIndex}
              setIsVisible={setDrpIndex}
              dummyData={LocalData[item]}
              value={info[0][lable][item]}
              setValue={(v) => handleChange(v, lable, item)}
            />
          }
        </>
      );
    }
  };
  const renderFacility = ({ item, index }) => {
    const lable = Object.keys(item);
    return (
      <FlatList
        data={lable}
        keyExtractor={(_, i) => `key${i}`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const label = item;
          return (
            <View style={{ margin: 5, padding: 5 }}>
              <View
                style={{
                  margin: 5,
                  padding: 5,
                  backgroundColor: "skyblue",
                  borderRadius: 5,
                  paddingHorizontal: 10,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>
                  {index + 1}. {item.replace(/_/g, " ")}
                </Text>
              </View>
              {!item.includes("GPS") ?
                <FlatList
                  data={Object.keys(info[0][item])}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(_, i) => `KEY ${i}`}
                  renderItem={({ item, index }) => renderSubItem(item, index, label)}
                />
                :
                <GPS />
              }
            </View >
          );
        }}
      />
    );
  };
  return (
    <FlatList
      data={info}
      showsVerticalScrollIndicator={false}
      keyExtractor={(_, i) => `Key${i}`}
      renderItem={renderFacility}
    />
  );
};

export default Facility;
