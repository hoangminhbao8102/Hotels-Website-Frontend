# 🏨 Hotels Website Frontend

Frontend của dự án **Website Quản lý Khách sạn**, xây dựng bằng **React.js (Vite)** và kết nối với **ASP.NET Core Web API**.

## 🚀 Công nghệ sử dụng
- **React 18 + Vite** (SPA, fast HMR)
- **React Router v6** (điều hướng)
- **Axios** (gọi API)
- **Day.js** (xử lý ngày tháng)
- **Context API** (quản lý state Auth)
- **CSS thuần** (dark mode, responsive)

## 📂 Cấu trúc thư mục
```
Hotels-Website-Frontend/
│── public/              # Tài nguyên tĩnh
│── src/
│   ├── api/             # Axios service cho từng module (User, Hotel, Room, Booking, ...)
│   ├── components/      # Navbar, Footer, Card, Loader, RatingStars,...
│   ├── context/         # AuthContext (login, logout, token)
│   ├── pages/           # Các trang: Home, Hotels, HotelDetail, Login, Register, MyBookings, Admin,...
│   ├── utils/           # constants.js (base URL)
│   ├── App.jsx          # Điều hướng chính
│   ├── main.jsx         # Entry point
│   └── styles.css       # CSS global
│── .env                 # Config URL API
│── package.json
│── vite.config.js
│── README.md
```

## 🔗 API Backend
Kết nối tới **HotelApi (ASP.NET Core Web API)**, với các endpoint chính:

- **User**: `/api/User/register`, `/api/User/login`, `/api/User`
- **Hotel**: `/api/Hotel`, `/api/Hotel/{id}`
- **Room**: `/api/Room/hotel/{hotelId}`, `/api/Room/{id}/status`
- **Booking**: `/api/Booking`, `/api/Booking/user/{userId}`, `/api/Booking/{id}/cancel`
- **Review**: `/api/Review/hotel/{hotelId}`, `/api/Review`
- **Service**: `/api/Service`
- **Employee**: `/api/Employee/hotel/{hotelId}`

## ✨ Tính năng
### 👤 Người dùng
- Đăng ký, đăng nhập (token lưu ở `localStorage`)
- Xem danh sách khách sạn
- Tìm kiếm khách sạn theo tên/địa chỉ
- Xem chi tiết khách sạn + danh sách phòng
- Đặt phòng (booking) + Quản lý bookings (xem, hủy)
- Viết review, đánh giá khách sạn

### 👨‍💼 Quản trị (Admin)
- Thêm/Xóa khách sạn
- Thêm/Xóa phòng, đổi trạng thái phòng
- Quản lý dịch vụ (thêm/xóa)
- Quản lý nhân viên (thêm/xóa theo khách sạn)

## ⚙️ Cấu hình & Chạy
### 1. Clone repo
```bash
git clone https://github.com/hoangminhbao8102/Hotels-Website-Frontend.git
cd Hotels-Website-Frontend
```

### 2. Cài đặt
```bash
npm install
```

### 3. Tạo file `.env`
```env
VITE_API_BASE_URL=https://localhost:7186
VITE_API_FALLBACK_URL=http://localhost:5142
```

### 4. Chạy dev server
```bash
npm run dev
```
Ứng dụng chạy tại: [http://localhost:5173](http://localhost:5173)

## 🔒 CORS
Cần bật CORS trong ASP.NET API:

```csharp
builder.Services.AddCors(opt => {
  opt.AddPolicy("frontend", p => p.WithOrigins("http://localhost:5173")
    .AllowAnyHeader().AllowAnyMethod());
});
app.UseCors("frontend");
```

## 📜 License
MIT License © 2025 [hoangminhbao8102](https://github.com/hoangminhbao8102)
