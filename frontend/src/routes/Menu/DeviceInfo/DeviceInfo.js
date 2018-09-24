import React from "react";

const DeviceInfo = props => {
  return (
    <div>
        <h3>Device Information</h3>
        <ul>
            <li>Hostname: transit-realtime</li>
            <li>IP Address: 192.168.1.1</li>
            <li>Connected Wifi: Yes (The Hero Of Canton)</li>
            <li>Free Disk Space: 25GB</li>
        </ul>
    </div>
  );
};

export default DeviceInfo;
