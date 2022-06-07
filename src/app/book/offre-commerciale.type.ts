export interface OffreCommerciale {
  offers: Offre[];
}

export interface Offre {
  type: string;
  sliceValue?: number;
  value: number;
}
