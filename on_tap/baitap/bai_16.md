# Ngày 16 — Mảng hai chiều: hàng, cột, vị trí

## Mục tiêu
- Tính tổng từng hàng, từng cột
- Tìm max/min theo hàng/cột
- Dùng chỉ số hàng cột chính xác

---

## Thời lượng (~4 giờ)

| Phần | Thời gian |
|------|----------|
| Lý thuyết | 60 phút |
| Code lại | 45 phút |
| Luyện bài | 90 phút |
| Review | 30–45 phút |

---

## 1. Tổng từng hàng

```python
for i in range(m):
    s = 0
    for j in range(n):
        s += a[i][j]
    print(s)
```

---

## 2. Tổng từng cột

```python
for j in range(n):
    s = 0
    for i in range(m):
        s += a[i][j]
    print(s)
```

---

## Ghi nhớ

- Đọc kỹ input và output trước khi code.
- Ưu tiên cách làm đơn giản, đúng trước.
- Tự tạo test nhỏ để kiểm tra lỗi.
- Chú ý trường hợp biên.

---

## Bài luyện

1. Tìm giá trị nhỏ nhất của mỗi hàng.

2. Tìm giá trị lớn nhất của mỗi cột.

3. $$
   Tính tổng các phần tử trên cột $k$.
   $$

4. Đếm số chính phương trên từng hàng.

5. Tìm hàng có tổng lớn nhất.

---

## Checklist

- Hiểu được dạng bài chính của ngày học.
- Code lại được ví dụ mà không nhìn tài liệu.
- Làm được ít nhất 4/5 bài luyện.
- Ghi lại lỗi sai thường gặp.

---

## Kết quả

- Hoàn thành ngày 16 trong lộ trình 21 ngày.
- Có thêm một nhóm kỹ năng phục vụ thi lập trình cơ bản.
