// Fictional equipment and requirements, authored solely for this demonstration.
export const passages = [
  ['AST-01','Aster gateway · Heartbeat','The fictional Aster gateway sends a heartbeat every 30 seconds. After three missed heartbeats, the demo dashboard displays an offline indicator.'],
  ['AST-02','Aster gateway · Export','The fictional Aster gateway exports diagnostic reports in JSON format. Reports contain a timestamp, gateway identifier, and status summary.'],
  ['AST-03','Aster gateway · Buffer','The fictional Aster gateway stores up to 500 queued events in its offline buffer. When the buffer is full, the oldest event is discarded.'],
  ['AST-04','Aster gateway · Firmware','The fictional Aster gateway firmware version is displayed on the About page. This manual does not provide firmware installation instructions.'],
  ['BEA-01','Beacon portal · Reports','The fictional Beacon portal creates a summary report every Monday at 08:00 UTC. Reports cover the previous seven days.'],
  ['BEA-02','Beacon portal · Audit retention','The fictional Beacon portal retains audit logs for 90 days. Audit logs record report creation and user sign-in events.'],
  ['BEA-03','Beacon portal · File limits','The fictional Beacon portal accepts CSV files up to 10 MB. Each CSV file must include timestamp and value columns.'],
  ['BEA-04','Beacon portal · Viewer','The fictional Beacon portal Viewer role can read published reports. The Viewer role cannot edit report templates.'],
  ['CED-01','Cedar sensor simulator · Battery','The fictional Cedar sensor simulator displays a low battery warning below 20 percent charge. This is simulated data, not a real device specification.'],
  ['CED-02','Cedar sensor simulator · Sampling','The fictional Cedar sensor simulator uses a default sampling interval of 60 seconds. Its demonstration readings use degrees Celsius.'],
  ['DOC-01','Documentation · Review','The fictional documentation library is reviewed every quarter. Each approved document lists a revision number and a review date.'],
  ['DOC-02','Documentation · Missing answer','When a required answer is absent from the fictional documentation library, record the unanswered question and ask the document owner to review it. Do not infer a missing specification.']
].map(([id,title,text]) => ({id,title,text}));
