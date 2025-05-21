import {Location} from '@/types/type';
import Constants from 'expo-constants';
import {decodePolyline} from './decodePolyline';

export const fetchRoute = async (
  origin: Location,
  destination: Location,
): Promise<Location[] | null> => {
  try {
    const apiKey = Constants.expoConfig?.extra?.apiKey;
    if (!apiKey) throw new Error('API 키가 존재하지 않습니다.');

    const url = `https://routes.googleapis.com/directions/v2:computeRoutes`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'routes.polyline.encodedPolyline',
      },
      body: JSON.stringify({
        origin: {
          location: {
            latLng: {
              latitude: origin.latitude,
              longitude: origin.longitude,
            },
          },
        },
        destination: {
          location: {
            latLng: {
              latitude: destination.latitude,
              longitude: destination.longitude,
            },
          },
        },
        travelMode: 'DRIVE',
      }),
    });

    const result = await response.json();
    const polyline = result?.routes?.[0]?.polyline?.encodedPolyline;

    if (!polyline) return null;

    return decodePolyline(polyline);
  } catch (error) {
    console.error('경로 요청 오류:', error);
    return null;
  }
};
