import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";

const FilePicker = ({ label, onFilePick,title }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      // console.log(result.assets[0].name)
      if (result.canceled === true) {
        alert("file not selected")
        // Pass the selected file URI to the parent component
      }
      else{
        console.log(result.assets[0].uri)
        setSelectedFile(result.assets[0].name);
        onFilePick(result.assets[0].uri);
      }
     
    } catch (error) {
      console.error("Error picking document", error);
    }
  };

  return (
    <View>
   
      <TouchableOpacity
        style={{
          flexDirection:'row',
          alignItems: "center",
          marginTop: 10,
          borderBottomWidth:1,
          borderBottomColor:'#134484',
          width:'100%',
          
          
        }}
        onPress={pickDocument}
      >
        <Text style={{color: "#134484", fontWeight: "500",width:'93%'}}>
          {selectedFile ? selectedFile : title||"Choose File"}
        </Text>
        <View style={{width:'7%',marginTop:5}}>
        <AntDesign name="upload" size={24} color="#134484" />
        </View>

      
      </TouchableOpacity>
    </View>
  );
};

export default FilePicker;




// import React, { useState } from "react";
// import { View, TouchableOpacity } from "react-native";
// import { AntDesign } from "@expo/vector-icons";
// import * as DocumentPicker from "expo-document-picker";
// import { FloatingLabelInput } from "react-native-floating-label-input"; // Import the FloatingLabelInput component

// const FilePicker = ({ label, onFilePick, title }) => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const pickDocument = async () => {
//     try {
//       const result = await DocumentPicker.getDocumentAsync({});
//       if (result.canceled === true) {
//         alert("File not selected");
//       } else {
//         setSelectedFile(result.assets[0].name);
//         onFilePick(result.assets[0].uri);
//       }
//     } catch (error) {
//       console.error("Error picking document", error);
//     }
//   };

//   return (
//     <View>
//       <TouchableOpacity
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           marginTop: 10,
//           borderBottomWidth: 1,
//           borderBottomColor: '#134484',
//           width: '100%',
//         }}
//         onPress={pickDocument}
//       >
//         <FloatingLabelInput
//           label={selectedFile ? selectedFile : title || 'Choose File'}
//           value={selectedFile}
//           containerStyles={{ width: '93%' }}
//           inputStyles={{ color: '#134484', fontWeight: '500' }}
//           editable={false}
//         />
//         <View style={{ width: '7%', marginTop: 5 }}>
//           <AntDesign name="upload" size={24} color="#134484" />
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default FilePicker;
