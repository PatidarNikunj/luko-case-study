/**
 * AppInterfaces.tsx is the base class for exporting the interfaces used in the application
 */

export interface ScreenProps {
  navigation?: any;
  route?: any;
}

export type ValuableType = {
  id?: number;
  name: string;
  purchasePrice: number;
  type: string;
  description?: string;
  photo: string;
};
