import React from "react";

import "./DeviceInfo.css";

const DeviceInfo = props => {

  const ipAddresses = props.systemInfo.ipAddresses || []
  const wifiNames = props.systemInfo.wifiNames || []

  const getIpAddressList = ipAddresses.map((item, index) => <li key={index}>{item}</li>);
  const getWifiNames = wifiNames.map((item, index) => <li key={index}>{item}</li>)

  return (
    <div>
        <h3 className="device_info_header">Device Information</h3>
        <table className="device_info_table">
           <tbody>
              <tr>
                  <td>IP Addresses:</td>
                  <td>
                      <ul>
                        {getIpAddressList}
                      </ul>
                  </td>
              </tr>
              <tr>
                  <td>Connected Wifi:</td>
                  <td>
                    <ul>
                      {getWifiNames}
                    </ul>
                  </td>
              </tr>
              <tr>
                  <td>Free Disk Space:</td>
                  <td>{props.systemInfo.freeDiskSpaceInMb} MB</td>
              </tr>
            </tbody>
        </table>
    </div>
  );
};

export default DeviceInfo;
