import {DoctorInterface} from './doctor.interface';

export interface BookingInterface {
    id?: string
    name: string
    start: number
    doctorId: DoctorInterface['id']
    date: string
    status: StatusEnum
}

export enum StatusEnum {
    cancel = 'cancel',
    confirmed = 'confirmed'
}
