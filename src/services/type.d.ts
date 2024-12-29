interface IRegion {
  id: number,
  name: string,
  city_object: {
      city_id: number,
      city_name: string
  },
  state_object: {
      state_id: 8,
      state_name: string
  }
}

export interface IUserInfo {
  lat: number,
  lng: number,
  region: IRegion | 1,
  gender: 'male' | 'female',
  address: string,
  last_name: string,
  first_name: string,
  coordinate_mobile: string ,
  coordinate_phone_number: string
}

export type IAddress = IUserInfo & {
  id: number;
  address_id: string;
};
