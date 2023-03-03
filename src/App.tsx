import { Component, createResource, Show, Suspense } from 'solid-js';
import { getLocation, IpLocation } from './api/ip';
import IpMap from './IpMap';
import InfoBox from './InfoBox';
import IpInput from './IpInput';
import styles from './App.module.css';

const App: Component = () => {
  const [ipInfo] = createResource<IpLocation>(getLocation);

  return (
    <div class={styles.App}>
      <h1>IP Address Tracker</h1>

      <IpInput />

      <Show when={ipInfo()} fallback={<p>Loading...</p>} keyed>
        {(ipInfo) => {
          return (
            <>
              <InfoBox location={ipInfo} />
              <IpMap 
                lat={ipInfo.latitude}
                lng={ipInfo.longitude}
                location={ipInfo} />
            </>
          );
        }}
      </Show>

      <div class="attribution ">
        Challenge by{' '}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by <a href="#">Alex Warrington</a>.
      </div>
    </div>
  );
};

export default App;
