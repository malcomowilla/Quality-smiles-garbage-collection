import {createRoot} from 'react-dom/client';
import {APIProvider, Map} from '@vis.gl/react-google-maps';

// src/index.js or src/App.js


const Driver = () => {

  // const google_maps_api_key = 'AIzaSyD-lq4baVca4h7kHZsdGRanTyLMVlibXhs'

  return (
    
<APIProvider apiKey={'AIzaSyD-lq4baVca4h7kHZsdGRanTyLMVlibXhs'}>
<Map
  style={{width: '100vw', height: '100vh'}}
  center={{lat: 40.7, lng: -74}}
  zoom={3}
  gestureHandling={'greedy'}
  disableDefaultUI={true}
/>
</APIProvider>
      
  )
}

export default Driver