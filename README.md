# RentCar

Mobile app for luxury car rentals. Built with **Expo** (React Native) and **Supabase** as the backend.

## Stack

- **Expo** ~54, **React Native**, **TypeScript**
- **Supabase** — auth, database (PostgreSQL)
- **React Query** (TanStack) — data fetching and cache
- **Expo Router** — file-based routing
- **expo-secure-store** — session storage

## Main screens

| Screen | Description |
|--------|-------------|
| **Sign In** | Email/password login (Supabase Auth) |
| **Home** | Car list from DB: cards with price, rating, fuel consumption. Pull-to-refresh |
| **Car Details** | Engine, fuel, seats, speed, price per day, “Book Now” button |
| **Profile** | Avatar, name, email; Payment, Documents, Support; logout with confirmation |
| **Profile Edit** | Update `profiles` table |
| **Calendar** | Placeholder (basic template) |
| **Settings** | Notifications, Language, Privacy Policy, Terms |

## Project structure

```
app/              — screens (expo-router)
  (auth)/         — sign-in
  (tabs)/         — index, profile, calendar, setting
  car/[id].tsx    — car details
  profile-edt/    — profile edit
components/       — CardCar, HomeHeader, car-details-info, UI components
hooks/            — useAuth, useCars, useProfile, useColorScheme
services/         — car.service, profile.service (Supabase)
lib/              — supabase, auth, storage (SecureStore)
types/            — car, profile, auth
constants/        — theme, images, mockCar
```

## Data (Supabase)

- **cars** — id, name, consume_fuel, price_per_day, rating, image, tank_capacity, max_speed, fuel_type, engine_type, wheel_drive, car_seats
- **profiles** — extends `auth.users` (first_name, etc.)

## Run

1. Install: `npm install`
2. Set `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` (`.env` or `app.config.js`)
3. Start: `npx expo start`


