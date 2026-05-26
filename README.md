# Rubber Boots - TVS - Tư vấn Size

Ứng dụng web tư vấn size ủng cao su (Rubber Boots) cho đội ngũ bán hàng TVS.

**Live URL:** [https://rubber-boots-tvs-hmlicjde.devinapps.com](https://rubber-boots-tvs-hmlicjde.devinapps.com)

## Tính năng

### Bước 1: Chọn mã hàng
- 6 mã sản phẩm: RAINIS AH, RAINIS AM, RAINIS KH (KID), FOLDIS, ANCHOR, FLEXOSLIP
- Hình ảnh sản phẩm thực tế
- Toggle chọn/bỏ chọn (click lần nữa để bỏ chọn)
- Hiển thị loại boot và range size EUR

### Bước 2: Hướng dẫn đo
- 5 hình ảnh hướng dẫn đo chi tiết:
  - Chiều dài bàn chân
  - Vòng khớp ngón chân
  - Bề ngang khớp ngón chân
  - Vòng mu bàn chân
  - Vòng bắp chân
- Click phóng to hình để xem chi tiết

### Bước 3: Nhập số đo & Gợi ý size
- Nhập 5 số đo (mm): chiều dài, vòng khớp, bề ngang, vòng mu, vòng bắp chân
- Tùy chọn nhu cầu độ rộng: Vừa chân / Mang vớ dày / Thích rộng rãi
- Tùy chọn tháo lót đế
- Kết quả tư vấn chi tiết:
  - Câu tư vấn đầy đủ cho khách
  - Kiểm tra độ khớp từng thông số
  - Top 8 gợi ý size tối ưu (tất cả sản phẩm, xếp theo điểm)
  - Lưu ý tư vấn

### Bảng tra cứu
- Thông số đầy đủ theo mã và size
- Bao gồm cột Cao ủng (mm)
- Highlight size được đề xuất

## Thuật toán đề xuất size

Sử dụng weighted scoring engine (reproduce công thức Excel TVS):
- **Non-fit:** `score = 100 - worst_shortage * 8`
- **Fit:** `score = min(100, 116.45 - k * n_above_minimum)`
  - k calibrated theo từng loại sản phẩm (RAINIS/FOLDIS: k=13, ANCHOR: k=10.9, FLEXOSLIP: k=4.95)

## Cấu trúc dự án

```
rubber-boots-tvs/
├── index.html          # Trang chính
├── styles.css          # CSS styling
├── data.js             # Dữ liệu sản phẩm, size chart, hướng dẫn đo
├── app.js              # Logic ứng dụng, scoring engine, rendering
├── README.md           # Tài liệu dự án
└── images/
    ├── products/       # Hình ảnh sản phẩm
    │   ├── FLEXOSLIP.jpg
    │   ├── FOLDIS.jpg
    │   ├── RAINIS_AH.jpg
    │   ├── RAINIS_AM.jpg
    │   ├── RAINIS_KH_KID.jpg
    │   └── ANCHOR.jpg
    └── guides/         # Hình ảnh hướng dẫn đo
        ├── foot_length.jpg
        ├── ball_girth.jpg
        ├── ball_width.jpg
        ├── instep_girth.jpg
        └── calf_girth.jpg
```

## Triển khai

Trang web tĩnh (static site), không cần server backend. Chỉ cần host các file HTML/CSS/JS và thư mục images.

### Deploy lên Devin Apps
```bash
# Đã deploy tại: https://rubber-boots-tvs-hmlicjde.devinapps.com
```

### Chạy local
Mở file `index.html` trực tiếp trong trình duyệt hoặc sử dụng bất kỳ static file server nào:
```bash
# Ví dụ với Python
python3 -m http.server 8000
# Truy cập: http://localhost:8000
```

## Công nghệ

- HTML5, CSS3, Vanilla JavaScript (ES5)
- Responsive design (mobile-friendly)
- Không sử dụng framework hay thư viện bên ngoài
