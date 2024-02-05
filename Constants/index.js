const length = 5;
const year = new Date().getFullYear() - length;
export default LocalData = {

    facility_Type: [
        "Valley Tank",
        "Earth Dam",
        "Fish Pond",
        "Irrigation Scheme",
        "Rural Industry",
        "Bulk Water",
        "Borehole Information",
        "GFS",
       
    ],
    operational_status: [
        "Fully Functional",
        "Partial Functional",
        "Non Functional",
        "Abandoned"
    ],
    zone: [
        "Albert",
        "Kyoga",
        "Upper Nile",
        "Victoria"
    ],
    basin: [
        "Kidepo",
        "Aswa",
        "Lake Kyoga",
        "Albert Nile",
        "Victoria Nile",
        "Lake Albert",
        "Lake Edward",
        "Lake Victoria",

    ],
    Finalcial_Year: [...Array(length).keys()].map(v => `${year + v}/${year + v + 1}`),
    year_Of_Construction: [...Array(length).keys()].map(v => `${year + v}`),
    Year_Of_Establishment: [...Array(length).keys()].map(v => `${year + v}`),

    Type_Of_Communal_Management: [
        "WUC (Water User Committee)",
        "WA (Water Association)",
        "FFS (Farmer Field School)",
        "CS (Cooperative Society)"
    ],
    Type_Of_Ownership: [
        "Private",
        "Communal",
        "GOU",
    ],
    Source_Of_Funding_Type: [
        "Private",
        "NGO",
        "GOU Center Govt.",
        "GOU Local Govt.",
        "Others"
    ],
    Type_Of_Land_Ownership: [
        "Donated",
        "Purchased",
        "GOU Land",
        "Private Land",
        "Others"

    ],
    Type_Of_Construction_Equipment: [
        "Donated",
        "Purchased",
        "GOU Land",
        "Private Land",
        "Others"

    ],
    Type_Of_Management: [
        "Private/Indivisual",
        "Private Operrator",
        "Communal Management",
        "Others"
    ],
    Select_Management_Functionality: [
        "Is colleting fees",
        "Undertakes regular servicing/Minor repair",
        "Holding regular Meetings",
        "Environment/Sanitation Around Source is ok"

    ],
    Key_Position: [
        "ChairPerson",
        "Secretary",
        "Vice-Chairperson",
        "Treasurer",
        "Others"
    ],
    Sanitation_Type: [
        "Eco-San",
        "VIP Latrine",
        "Pour Flash Toilet",
        "Flash Toilet"
    ],
    Abstraction_Method: [
        "Treadle Pump",
        "Motorised",
        "Solar Powered",
        "Wind Mill",
        "Lake",
        "Other"
    ],
    Type_Of_Industry: [
        "Cafee Production",
        "Fish Processing",
        "Horticulture",
        "Tannery",
        "Others"
    ],

    Other_Uses: [
        "Domestic Use",
        "Others"
    ],
    Size_Of_Irrigation: [
        "Small/mini/micro(below 100 ha) ",
        "Meddium(100-3000 ha)",
        "Large(above 3000 ha)",

    ],
    Type_Of_System: [
        "Sprinkler",
        "Canals",
        "Drip Irrigation",
        "Manual"
    ],
    Type_Of_Crop_Irrigation: [
        "Type Of Crop Irrigation 1",
        "Type Of Crop Irrigation 2",
        "Type Of Crop Irrigation 3"
    ],
    Water_Source: [
        "Valley Tank",
        "Earth Dam",
        "Bulk Water Scheme",
        "Swamp",
        "River",
        "Lake"
    ],
    Type_Of_Measurment_Devices: [
        "Devices1",
        "Devices 2",
        "Devices 3"
    ],
    Other_Users: [
        "Domestic Use",
        "Others"
    ],
    Water_Use: [
        "LiveStock",
        "Rural Industry",
        "Fish Production",
        "Irrigation",
        "Domestic Use",
        "Others"

    ],
    Amount_Of_Water_Used: [
        "LiveStock",
        "Rural Industry",
        "Fish Production",
        "Irrigation",
        "Domestic Use",
        "Others"

    ],

    //operation maintaince
    // Facility_Type:[
    //     "LiveStock",
    //     "Rural Industry",
    //     "Fish Production",
    //     "Irrigation",
    //     "Domestic Use",
    //     "Others"

    // ]
    Reason_For_low_Operation_Capacity: [
        "LiveStock",
        "Rural Industry",
        "Fish Production",
        "Irrigation",
        "Domestic Use",
        "Others"

    ],
    Embarkment_Condition: [
        "LiveStock",
        "Rural Industry",
        "Fish Production",
        "Irrigation",
        "Domestic Use",
        "Others"

    ],
    Type_Of_Crop_Irrigated: [
        "Rice",
        "Sugarcane",
        "Maize",
        "Vegetables",
        "Others"
    ],
    Reason_for_low_operation_capacity: [
        "Silted",
        "Mechanical Problem",
        "Flood",
        "Bridge",
        "Water quality",
        "Others"
    ],
    Embarkment_condition: [
        "ok",
        "Breached",
        "Others"
    ]

}