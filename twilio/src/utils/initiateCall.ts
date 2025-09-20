import twilio from 'twilio';


const accountSid = process.env.TWILIO_ACC_SID!; 
const authToken = process.env.TWILIO_AUTH_TOKEN!;    

// Initialize the Twilio client
const client =  twilio(accountSid, authToken);

// Function to make a call using Twilio
export const makeCall = async (to: string): Promise<any> => {
  try {
    // Initiate the call using Twilio API
    const call = await client.calls.create({
      to: to,                    
      from: process.env.TWILIO_NUMBER!,                
      url: 'https://bf3b0780f847.ngrok-free.app/api/voice',  
    });

    return call; 
  } catch (error) {
    console.error('Error initiating call:', error);
    throw error; // Rethrow error to handle it in the caller
  }
};
