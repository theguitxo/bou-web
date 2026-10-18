// import { Position } from '@capacitor/geolocation';
import { FIREWORKS_COMBINATION } from '../constants/fireworks.contants';
import {
  FireworksPoints,
  FireworksPointsScores,
} from './fireworks.points.model';

export interface FirePoints {
  code: string;
  order: number;
  type: FIREWORKS_COMBINATION;
}

export interface GameFirePoints extends FirePoints {
  id: string;
  isCurrent: boolean;
  first: boolean;
  translateKey?: string;
  completed?: boolean;
  headerImage?: string;
  avatarImage?: string;
  backgroundImage?: string;
  fireworksPoints?: FireworksPoints;
  playFireworksPoints?: FireworksPoints;
  scores?: FireworksPointsScores;
  firePointTypeColor?: string;
  firePointTypeText?: string;
  played?: boolean;
  enabled?: boolean;
}
