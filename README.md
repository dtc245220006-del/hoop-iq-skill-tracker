# Hoop IQ — Basketball + Gym Tracker

Web app tiếng Việt, chạy hoàn toàn trong trình duyệt và lưu dữ liệu bằng `localStorage`.

## Mở ngay

Mở `dist/index.html` bằng trình duyệt, hoặc chạy một máy chủ tĩnh từ thư mục dự án:

```powershell
python -m http.server 4173 --directory dist
```

Sau đó vào `http://127.0.0.1:4173`.

## Có gì trong app

- Buổi bóng rổ: checklist makes/attempts, FG%, Basketball IQ, coach notes, move library.
- Gym: Buổi A (Chân + Core) và Buổi B (Lưng + Vai + Tay), warm-up, từng set, rep/giây và tạ.
- Activity streak: một ngày có gym hoặc bóng rổ tính một ngày; không cộng đúp.
- Chiều cao, cân nặng và lịch sử cân nặng.
- Nhật ký ngày nghỉ với lý do.
- Chế độ knee-aware để giảm tải khi đầu gối nhói.

Mục tiêu makes/reps luôn linh hoạt: chất lượng rep, kỹ thuật và recovery quan trọng hơn chạy theo số lượng.
