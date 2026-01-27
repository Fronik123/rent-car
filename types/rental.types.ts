import { ICar } from "./car.types";

export interface IRentalCar {
  id: string;
  car_id: string;
  user_id: string;
  start_date: string;
  end_date: string;
  total_price: number;
  status: string;
}

export interface IRentalWithCar extends IRentalCar {
  cars: ICar | null;
}