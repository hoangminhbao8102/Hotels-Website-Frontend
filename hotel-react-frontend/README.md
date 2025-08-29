# Hotel Website — React + Vite

A complete React frontend integrating with your ASP.NET Hotel API (Swagger endpoints shown in the screenshots).

## Features
- Browse & search hotels
- View hotel details, rooms, and reviews
- Book rooms and manage (cancel) your bookings
- Submit reviews (rating + comment)
- Manage hotels/rooms (Admin), services, employees
- Authentication (login/register) with bearer token stored in `localStorage`
- Minimal, dark, responsive UI

## Project Structure
```
hotel-react-frontend/
  src/
    api/                # axios wrappers for your endpoints
    components/         # Navbar, Footer, cards, etc.
    context/            # AuthContext (login/logout + token)
    pages/              # Home, Hotels, HotelDetail, Admin, etc.
    utils/constants.js  # Base URLs
    App.jsx, main.jsx, styles.css
  index.html
  package.json
  vite.config.js
```

## Configure API base URL
Create `.env` in project root:
```
VITE_API_BASE_URL=https://localhost:7039
VITE_API_FALLBACK_URL=http://localhost:5114
```
> The axios client also attempts a fallback to `VITE_API_FALLBACK_URL` on network errors.

## Run
```bash
npm install
npm run dev
```
The app will open at http://localhost:5173

## Mapping notes
- This starter assumes the API returns either a plain object `{ token, user }` on login or a wrapper `{ data: { token, user }, message }`. Adjust `Login.jsx` if your shape differs.
- Booking payload expected by `/api/Booking` is assumed to be:
  ```json
  { "userId": 1, "roomId": 2, "checkInDate": "2025-08-23", "checkOutDate": "2025-08-24", "guests": 2 }
  ```
  Change fields to match your `CreateBookingDto`.
- `Room.status` values are toggled between `Available/Unavailable`. Update `Admin.jsx` if your enum differs (e.g., `Trong/DaDat`).

## CORS
Ensure your ASP.NET API enables CORS for http://localhost:5173.

Minimal example in `Program.cs`:
```csharp
builder.Services.AddCors(opt => {
  opt.AddPolicy("frontend", p => p.WithOrigins("http://localhost:5173")
    .AllowAnyHeader().AllowAnyMethod());
});
var app = builder.Build();
app.UseCors("frontend");
```

## What to customize
- **Data fields** in forms (Hotel, Room, Booking, Employee, Service) to match your DTOs.
- **Auth**: If your API exposes user roles, show/hide Admin menu by role.
- **Styling**: Replace `styles.css` with Tailwind/Ant Design/etc. if you prefer.
```

