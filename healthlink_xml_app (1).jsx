import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function HealthLinkXMLGenerator() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    county: "",
    postcode: "",
    phone1: "",
    phone2: ""
  });

  const [xmlOutput, setXmlOutput] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateXML = () => {
    const timestamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
    const xml = `<?xml version="1.0"?>
<RRI_I12>
  <MSH>
    <MSH.1>|</MSH.1>
    <MSH.2>^~\\&</MSH.2>
    <MSH.3><HD.1>HL7SyntGen.31</HD.1></MSH.3>
    <MSH.4><HD.1>CORK UNIVERSITY HOSPITAL</HD.1><HD.2>913</HD.2><HD.3>HIPE</HD.3></MSH.4>
    <MSH.5><HD.1>HealthLink</HD.1></MSH.5>
    <MSH.6><HD.1>HSE</HD.1></MSH.6>
    <MSH.7><TS.1>${timestamp}</TS.1></MSH.7>
    <MSH.9><MSG.1>RRI</MSG.1><MSG.2>I12</MSG.2><MSG.3>RRI_I12</MSG.3></MSH.9>
    <MSH.10>${timestamp}031</MSH.10>
    <MSH.11><PT.1>P</PT.1></MSH.11>
    <MSH.12><VID.1>2.4</VID.1></MSH.12>
  </MSH>
  <PID>
    <PID.3><CX.1>P569744</CX.1><CX.4><HD.1>Mercy University Hospital</HD.1></CX.4><CX.5>MRN</CX.5></PID.3>
    <PID.5><XPN.1><FN.1>${form.lastName.toUpperCase()}</FN.1></XPN.1><XPN.2>${form.firstName}</XPN.2></PID.5>
    <PID.7><TS.1>${form.dob.replace(/-/g, "")}</TS.1></PID.7>
    <PID.8>${form.gender}</PID.8>
    <PID.11>
      <XAD.1><SAD.1>${form.address}</SAD.1></XAD.1>
      <XAD.2>${form.city}</XAD.2>
      <XAD.3>${form.county}</XAD.3>
      <XAD.4>${form.county.toUpperCase()}</XAD.4>
      <XAD.5>${form.postcode}</XAD.5>
    </PID.11>
    <PID.13>
      <XTN.1>${form.phone1}</XTN.1><XTN.2>PRN</XTN.2><XTN.3>PH</XTN.3>
    </PID.13>
    <PID.13>
      <XTN.1>${form.phone2}</XTN.1><XTN.2>PRN</XTN.2><XTN.3>CP</XTN.3>
    </PID.13>
  </PID>
  <RF1><RF1.1>A</RF1.1></RF1>
</RRI_I12>`;
    setXmlOutput(xml);

    // Trigger download
    const blob = new Blob([xml], { type: 'application/xml' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'healthlink.xml';
    link.click();
  };

  return (
    <div className="p-4 grid gap-4 max-w-3xl mx-auto">
      <Card>
        <CardContent className="grid gap-2 py-4">
          <Input name="firstName" placeholder="First Name" onChange={handleChange} />
          <Input name="lastName" placeholder="Last Name" onChange={handleChange} />
          <Input name="dob" type="date" placeholder="Date of Birth" onChange={handleChange} />
          <Input name="gender" placeholder="Gender (M/F)" onChange={handleChange} />
          <Input name="address" placeholder="Address Line" onChange={handleChange} />
          <Input name="city" placeholder="City" onChange={handleChange} />
          <Input name="county" placeholder="County" onChange={handleChange} />
          <Input name="postcode" placeholder="Postcode" onChange={handleChange} />
          <Input name="phone1" placeholder="Phone (Landline)" onChange={handleChange} />
          <Input name="phone2" placeholder="Phone (Mobile)" onChange={handleChange} />
          <Button onClick={generateXML}>Generate & Download XML</Button>
        </CardContent>
      </Card>

      {xmlOutput && (
        <Card>
          <CardContent className="whitespace-pre-wrap font-mono text-sm p-4">
            {xmlOutput}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
