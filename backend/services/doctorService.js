import axios from "axios";

/**
 * Geolocation & Hospital Recommendation Fallback Hierarchy:
 * 1. Browser Geolocation API (primary, coordinates lat/lon with user permission)
 * 2. Manual address entry, geocoded via Nominatim (if user denies or enters location)
 * 3. IP-based geolocation (rough approximation, no permission needed)
 * 4. Hardcoded default city (final fallback: Kolkata)
 */
const getDoctors = async (specialization, locationData = {}) => {
    const { lat, lon, address, ip } = locationData;
    let searchQuery = "";
    let resolvedMethod = "default";

    try {
        // TIER 1: Browser Geolocation API (Coordinates provided)
        if (lat && lon && !isNaN(lat) && !isNaN(lon)) {
            try {
                // Reverse-geocode coordinates to find city/district
                const revRes = await axios.get("https://nominatim.openstreetmap.org/reverse", {
                    params: {
                        lat,
                        lon,
                        format: "json"
                    },
                    headers: {
                        "User-Agent": "medora-healthcare-app/1.0"
                    },
                    timeout: 4000
                });

                const city = 
                    revRes.data?.address?.city || 
                    revRes.data?.address?.town || 
                    revRes.data?.address?.suburb || 
                    revRes.data?.address?.state || 
                    "";

                if (city) {
                    searchQuery = `hospital ${city}`;
                    resolvedMethod = "browser_geolocation";
                }
            } catch (revErr) {
                console.log("Tier 1 Reverse-Geocoding Warning:", revErr.message);
            }
        }

        // TIER 2: Manual Address Entry (if coordinates unavailable or reverse-geo failed)
        if (!searchQuery && address && typeof address === "string" && address.trim().length > 0) {
            searchQuery = `hospital ${address.trim()}`;
            resolvedMethod = "manual_address";
        }

        // TIER 3: IP-Based Geolocation (approximate fallback without user permission)
        if (!searchQuery && ip && ip !== "127.0.0.1" && ip !== "::1" && !ip.startsWith("192.168.") && !ip.startsWith("10.")) {
            try {
                const cleanIp = ip.split(",")[0].trim();
                const ipRes = await axios.get(`http://ip-api.com/json/${cleanIp}`, {
                    timeout: 3000
                });
                if (ipRes.data?.status === "success" && ipRes.data?.city) {
                    searchQuery = `hospital ${ipRes.data.city}`;
                    resolvedMethod = "ip_geolocation";
                }
            } catch (ipErr) {
                console.log("Tier 3 IP Geolocation Warning:", ipErr.message);
            }
        }

        // TIER 4: Hardcoded Default City (final fallback)
        if (!searchQuery) {
            searchQuery = "hospital Kolkata";
            resolvedMethod = "hardcoded_default";
        }

        console.log(`[DoctorService] Locating facilities via [${resolvedMethod}]: "${searchQuery}"`);

        // Query OpenStreetMap Nominatim with resolved query
        const response = await axios.get("https://nominatim.openstreetmap.org/search", {
            params: {
                q: searchQuery,
                format: "json",
                limit: 6
            },
            headers: {
                "User-Agent": "medora-healthcare-app/1.0"
            },
            timeout: 5000
        });

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
            Dermatologist: [
                "Dr. Ananya Roy",
                "Dr. Sameer Joshi"
            ],
            Orthopedic: [
                "Dr. Rajesh Kulkarni"
            ],
            "General Physician": [
                "Dr. Rahul Gupta",
                "Dr. Neha Singh"
            ]
        };

        const doctorNames =
            fallbackDoctorNames[specialization] || [
                "Dr. Healthcare Specialist"
            ];

        // Combine hospitals with doctor specialists
        const doctors = (response.data || []).map((place, index) => ({
            name: doctorNames[index % doctorNames.length],
            specialty: specialization,
            hospital: place.display_name.split(",")[0],
            address: place.display_name,
            lat: place.lat,
            lon: place.lon,
            resolvedVia: resolvedMethod
        }));

        return doctors;

    } catch (error) {
        console.log("NOMINATIM SEARCH ERROR:", error.response?.data || error.message);
        return [];
    }
};

export default getDoctors;