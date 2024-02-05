import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./style";
import { MotiView } from "moti";
import Facility from "./Facility";
import Source from "./Source";
import Management from "./Management";
import ValleyTank from "../../Screens/ValleyTank";
import RuralIndustry from "../../Screens/RuralIndustry";
import IrrigationScheme from "../../Screens/IrrigationScheme";
import Gfs from "../../Screens/Gfs";
import FishPond from "../../Screens/FishPond";
import EarthDam from "../../Screens/EarthDam";
import BulkWater from "../../Screens/BulkWater";
import BoreholeInfo from "../../Screens/BoreholeInfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NewManagement from "./NewManagement";
 
const AddFacility = ({ route }) => {
  const { type } = route.params;
  const [formStatus, setFormStatus] = useState(null);
  const [status, setStatus] = useState(0);
  const [locDet, setLocDet] = useState([]);

  const dataFacility = [
    {
      Facility_Information: {
        facility_Id: "",
        facility_Name: "",
        facility_Type: "",
        operational_status: "",
        Facility_Code: "",
      },
      Location_Information: {
        zone: "",
        basin: "",
        DropDown: {
          districtname: "",
          countyname: "",
          subcountyname: "",
          parishname: "",
        },
        consituency: "",
        village: "",
      },
      GPS_Information: {
        UTM: { Zonal_Number: "", Zonal_Letter: "", Easting: "", Northings: "" },
        Lat_Long: { Latitude: "", Longitude: "" },
        DMS: { Deg: "", Min: "", Sec: "", Select: "" },
        Altitude: "",
        Distance_From_Main_Road: "",
        Distance_From_Nearest_Trading_Center: "",
      },
    },
  ];

  const [Locations, setLocations] = React.useState({
    DropDown: {
      districtname: "",
      countyname: "",
      subcountyname: "",
      parishname: "",
    },
  });

  const [FacilityInfo, setFacilityInfo] = React.useState(dataFacility);
  const dataSource = [
    {
      Source_Information: {
        Source_No: "",
        Source_Name: "",
        Finalcial_Year: "",
        year_Of_Construction: "",
      },
      Ownership_and_Funding_Information: {
        Type_Of_Ownership: "",
        Ownership_Institute_Name: "",
        Ownership_Contact_Name: "",
        Ownership_Address: "",
        Ownership_Email: "",
        Ownership_Contact_Number: "",
        Source_Of_Funding_Type: "",
        Funder_Institute_Name: "",
        Funder_Contact_Name: "",
        Funder_Address: "",
        Funder_Email: "",
        Funder_Contact_Number: "",
        Type_Of_Land_Ownership: "",
        Land_Ownership_Instutute_Name: "",
        Land_Ownership_Contact_Name: "",
        Land_Ownership_Address: "",
        Land_Ownership_Email: "",
        Land_Ownership_Contact_Number: "",
        Type_Of_Construction_Equipment: "",
        Construction_Equipment_Give_By: "",
        Total_Investment_Cost: "",
        Catchment_Area: "",
        Is_Catchment_area_vegetated: "",
        Remarks_vegtated: "",
        Is_Catchment_area_Protected: "",
        Remarks_Protected: "",
        Is_Catchment_area_degraded: "",
        Remarks_degraded: "",
      },
    },
  ];
  const [SourceInfo, setSourceInfo] = React.useState(dataSource);
  const [ManagementInfo, setManagementInfo] = React.useState({
    Type_Of_Management: "",
    Other_Specify: "",
    Type_Of_Communal_Management: "", //dropdown
    Year_Of_Establishment: "",
    No_Of_Establishment: "",
    Date_Of_Training: "",
    Management_Functionality: "", //dropdown
    Number_Of_Members: "",
    Number_Of_Active_Members: "",
    Number_Of_Women: "",
    Number_Of_Women_In_Key_Postion: "",
    Key_Position: "", //Dropdown
    Specify_Reasons: "", //NO CLICK
    Sanitation_Type: "", //Dropdown
    Other_Specify: "",
    Management_Institute_Name: "",
    Management_Contact_Name: "",
    Management_Contact_Email: "",
    Management_Contact_Number: "",
    Management_Address: "",
  });

  function getDynamicComponent() {
    switch (FacilityInfo[0].Facility_Information.facility_Type) {
      case "Valley Tank":
        return <ValleyTank />;
      case "Rural Industry":
        return <RuralIndustry />;
      case "Irrigation Scheme":
        return <IrrigationScheme />;
      case "GFS":
        return <Gfs />;
      case "Fish Pond":
        return <FishPond />;
      case "Earth Dam":
        return <EarthDam />;
      case "Bulk Water":
        return <BulkWater />;
      case "Borehole Information":
        return <BoreholeInfo />;
      default:
        return null;
    }
  }

  useEffect(() => {
    getLocDet();
  }, []);

  const getLocDet = async () => {
    const data = await AsyncStorage.getItem("LocationDetails");
    setLocDet(JSON.parse(data));
  };

  const LabelData = [
    { index: 0, label: "Facility and Location Information" },
    { index: 1, label: "Source, Ownership and Funder Information" },
    { index: 2, label: "Management Information" },
    { index: 3, label: FacilityInfo[0].Facility_Information.facility_Type },
  ];

  const renderFormData = {
    0: (
      <Facility
        Location={locDet}
        info={FacilityInfo}
        setInfo={setFacilityInfo}
        myLoc={Locations}
        setMyLoc={setLocations}
      />
    ),
    1: <Source info={SourceInfo} setInfo={setSourceInfo} />,
    // 2: <Management info={ManagementInfo} setInfo={setManagementInfo} />,
    2: <NewManagement />,
    3: getDynamicComponent(),
  };

  const renderItem = ({ item, index }) => {
    return (
      item.label !== "" && (
        <MotiView
          style={[
            styles.HeadingLabCont,
            status === index ? styles.ActiveHead : styles.InActiveHead,
          ]}
          from={{ opacity: 0, translateX: 40 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ delay: index * 50 }}
        >
          <TouchableOpacity
            onPress={() => {
              setStatus(index);
              setFormStatus(!formStatus);
            }}
          >
            <Text style={styles.HeadTxt}>{item.label}</Text>
          </TouchableOpacity>
        </MotiView>
      )
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          padding: 10,
          flexDirection: formStatus ? "column" : "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {!formStatus && (
          <Text style={{ fontWeight: "bold", fontStyle: "italic" }}>
            ➪ {LabelData[status].label}
          </Text>
        )}
        <View
          style={[
            styles.FormTotCntr,
            formStatus ? { position: "absolute", right: 0 } : {},
          ]}
        >
          <TouchableOpacity
            style={styles.FormCntr}
            onPress={() => {
              setFormStatus(!formStatus);
            }}
          >
            <FontAwesome
              name={formStatus ? "close" : "wpforms"}
              size={20}
              color="#000"
            />
          </TouchableOpacity>
          {formStatus && (
            <FlatList
              data={LabelData}
              keyExtractor={(_) => _.index.toString()}
              renderItem={renderItem}
            />
          )}
        </View>
      </View>
      {!formStatus && renderFormData[status]}
    </View>
  );
};

export default AddFacility;
