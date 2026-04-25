# Ngày 12 — Mảng một chiều: max, min, đếm

## Mục tiêu
- Tìm giá trị lớn nhất, nhỏ nhất
- Đếm số lần xuất hiện
- Xử lý trường hợp không tồn tại

---

## Thời lượng (~4 giờ)

| Phần | Thời gian |
|------|----------|
| Lý thuyết | 60 phút |
| Code lại | 45 phút |
| Luyện bài | 90 phút |
| Review | 30–45 phút |

---

## 1. Tìm min

```python
n = int(input())
a = [int(input()) for _ in range(n)]

rmin = a[0]
for x in a:
    if x < rmin:
        rmin = x
print(rmin)
```

---

## 2. Đếm phần tử lớn nhất

```python
rmax = max(a)
cnt = 0
for x in a:
    if x == rmax:
        cnt += 1
print(cnt)
```

---

## Ghi nhớ

- Đọc kỹ input và output trước khi code.
- Ưu tiên cách làm đơn giản, đúng trước.
- Tự tạo test nhỏ để kiểm tra lỗi.
- Chú ý trường hợp biên.

---

## Bài luyện

1. Tìm giá trị lớn nhất là số chẵn trong mảng.

2. Đếm số lượng phần tử nhỏ nhất.

3. Tìm vị trí cuối cùng của giá trị $k$.

4. $$
   Tính chênh lệch giữa max và min.
   $$

5. Đếm số phần tử lớn hơn trung bình cộng của mảng.

---

## Checklist

- Hiểu được dạng bài chính của ngày học.
- Code lại được ví dụ mà không nhìn tài liệu.
- Làm được ít nhất 4/5 bài luyện.
- Ghi lại lỗi sai thường gặp.

---

## Kết quả

- Hoàn thành ngày 12 trong lộ trình 21 ngày.
- Có thêm một nhóm kỹ năng phục vụ thi lập trình cơ bản.
