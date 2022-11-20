/* eslint-disable no-unused-vars */
export interface DoctorInterface {
    id : string
    address : AddressInterface
    description: string
    name: string
    opening_hours : OpeningHoursInterface[]
}

export interface OpeningHoursInterface {
    day: DayEnum
    end: string
    isClose: boolean
    start: string
}
export interface AddressInterface {
    district: string
    line_1: string
    line_2: string
}

export enum DayEnum {
    MON ='MON',
    TUE = 'TUE',
    WED = 'WED',
    THU = 'THU',
    FRI = 'FRI',
    SAT = 'SAT',
    SUN = 'SUN',
}

export interface DoctorListingCardInterface{
    doctor: DoctorInterface,
    isListing :boolean
  }

