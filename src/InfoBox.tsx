import { Component } from 'solid-js';
import { IpLocation } from './api/ip';
import styles from './InfoBox.module.css';

interface InfoBoxProps {
  location: IpLocation;
}

interface IpDisplay {
  readonly ip: string;
  readonly location: string;
  readonly timezone: string;
  readonly isp: string;
}

function parseLocation(ipLocation: IpLocation): IpDisplay {
  const postalCode =
    ipLocation.postalCode === '' ? '' : ` ${ipLocation.postalCode}`;

  const location = `${ipLocation.city}, ${ipLocation.region}${postalCode}`;

  return {
    location,
    ip: ipLocation.ip,
    isp: ipLocation.isp,
    timezone: `UTC ${ipLocation.timezone}`,
  };
}

const InfoBox: Component<InfoBoxProps> = (props) => {
  const vm = parseLocation(props.location);

  return (
    <div class="container mx-auto border-2 rounded-md flex flex-row justify-around">
      <div class={styles.block}>{vm.ip}</div>
      <div class={styles.block}>{vm.location}</div>
      <div class={styles.block}>{vm.timezone}</div>
      <div class={styles.block}>{vm.isp}</div>
    </div>
  );
};

export default InfoBox;
