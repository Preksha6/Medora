import axios from "axios";

const getDoctors = async (
    specialization
) => {

    try {

        // Generic hospital search works MUCH better

        const response =
        await axios.get(

            "https://nominatim.openstreetmap.org/search",

            {
                params: {

                    q: "hospital Kolkata",

                    format: "json",

                    limit: 6
                },

                headers: {

                    "User-Agent":
                    "hospital-ai-app"
                }
            }
        );

        console.log(
            "NOMINATIM RESULTS:"
        );

        console.log(
            response.data
        );

        const fallbackDoctorNames = {

            Cardiologist: [
                "Dr. Raj Mehta",
                "Dr. Priya Sharma"
            ],

            Neurologist: [
                "Dr. Amit Verma",
                "Dr. Arjun Rao"
            ],

            Pulmonologist: [
                "Dr. Sneha Kapoor"
            ],

            Gastroenterologist: [
                "Dr. Vikram Sinha"
            ],

            "ENT Specialist": [
                "Dr. Rohit Malhotra"
            ],

            "General Physician": [
                "Dr. Rahul Gupta",
                "Dr. Neha Singh"
            ]
        };

        const doctorNames =
        fallbackDoctorNames[
            specialization
        ] || [
            "Dr. Healthcare Expert"
        ];

        // combine real hospitals + doctor names

        const doctors =
        response.data.map(
            (place, index) => ({

                name:

                doctorNames[
                    index %
                    doctorNames.length
                ],

                specialty:
                specialization,

                hospital:

                place.display_name
                .split(",")[0],

                address:
                place.display_name,

                lat:
                place.lat,

                lon:
                place.lon
            })
        );

        return doctors;

    } catch (error) {

        console.log(
            "NOMINATIM ERROR:"
        );

        console.log(
            error.response?.data ||
            error.message
        );

        return [];
    }
};

export default getDoctors;