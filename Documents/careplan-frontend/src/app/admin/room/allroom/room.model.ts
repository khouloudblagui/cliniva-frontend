import { formatDate } from '@angular/common';
export class Room {
  id: number;
  img: string;
  patientName: string;
  roomNumber: string;
  roomType: string;
  gender: string;
  admitDate: string;
  dischargeDate: string;
  constructor(room: Room) {
    {
      this.id = room.id || this.getRandomID();
      this.img = room.img || 'assets/images/user/user1.jpg';
      this.patientName = room.patientName || '';
      this.roomNumber = room.roomNumber || '';
      this.roomType = room.roomType || '';
      this.gender = room.gender || '';
      this.admitDate = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.dischargeDate = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
