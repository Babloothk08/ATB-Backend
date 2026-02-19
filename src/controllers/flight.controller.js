import axios from "axios";

const BASIC_USERNAME = process.env.TRAVELBIND_USERNAME;
const BASIC_PASSWORD = process.env.TRAVELBIND_PASSWORD;
const API_URL =
  process.env.TRAVELBIND_API_URL ||
  "http://api.travelbind.com/api/v9flightservice";



const basicAuthToken = Buffer.from(
  `${BASIC_USERNAME}:${BASIC_PASSWORD}`
).toString("base64");

export const searchFlights = async (req, res) => {
  try {
    const search = req.body;

    const payload = {
      Search: {
        SessionID: search.SessionID,
        Origin: search.from,
        Destination: search.to,
        DepartDate: search.departDate,
        ReturnDate: search.returnDate,
        Adult: search.adults,
        Child: search.children,
        Infant: search.infants,
        CabinClass: search.CabinClass,
        JourneyType: search.JourneyType,
        IsFlexible: search.IsFlexible,
        Airlines: search.Airlines,
        Currency: search.Currency,
        IsLowest: search.IsLowest,
        Company: search.Company,
      },
    };
    console.log(payload)

    const response = await axios.post(API_URL, payload, {
      timeout: 15000,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${basicAuthToken}`,
      },
    });

    return res.status(200).json(response.data);
  } catch (err) {
    console.error("API Error:", err.response?.data || err.message);
    return res.status(500).json({
      error: "Travel API failed",
      message: err.message,
    });
  }
};
