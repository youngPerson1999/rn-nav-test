import {create} from 'zustand';
import {Location} from './type';

type AppState = {
  startLocation: Location | null;
  endLocation: Location | null;
  location: Location | null;
  setLocation: (location: Location | null) => void;
  setStartLocation: (location: Location | null) => void;
  setEndLocation: (location: Location | null) => void;
  clearLocations: () => void;
};

export const useStore = create<AppState>(set => ({
  startLocation: null,
  endLocation: null,
  location: null,
  setLocation: location => set({location}),
  setStartLocation: location => set({startLocation: location}),
  setEndLocation: location => set({endLocation: location}),
  clearLocations: () =>
    set({startLocation: null, endLocation: null, location: null}),
}));
