import { Device ,Call} from "@twilio/voice-sdk";
import { useEffect, useState } from "react";
import axios from "axios";
const MakeCall = () => {
     const [device, setDevice] = useState<Device | null>(null);
     useEffect(() => {
    const init = async () => {
      const res = await axios.post("http://localhost:3003/api/generatetoken");
      const token = res.data.token;
        console.log("token-->>>",token)
      const twilioDevice = new Device(token, {
        codecPreferences:  [Call.Codec.Opus, Call.Codec.PCMU],
        allowIncomingWhileBusy: true,
        // debug: true,
      });

      twilioDevice.on("registered", () => console.log("📱 Device ready"));
      twilioDevice.on("error", (err) => console.error("Device Error", err));
      twilioDevice.on("incoming", (conn) => {
        console.log("📞 Incoming call", conn.parameters.From);
        conn.accept(); // auto-accept for demo
      });

      setDevice(twilioDevice);
    };

    init();
  }, []);
  const makeCall = () => {
    console.log("makeinh call")
    if (device) {
      const conn = device.connect({ params: { To: "+918889332916" } });
      console.log("📤 Outgoing call initiated", conn);
    }
  };
  return (
    <div>
      <h2>Twilio Voice Call Demo</h2>
      <button onClick={makeCall}>📞 Call</button>
    </div>
  )
}

export default MakeCall