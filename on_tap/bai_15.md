# Ngày 15 — Mảng hai chiều: nhập và duyệt

## Mục tiêu
- Nhập ma trận
- Duyệt theo hàng và cột
- Tính tổng có điều kiện

---

## Thời lượng (~4 giờ)

| Phần | Thời gian |
|------|----------|
| Lý thuyết | 60 phút |
| Code lại | 45 phút |
| Luyện bài | 90 phút |
| Review | 30–45 phút |

---

## 1. Nhập ma trận

```python
m, n = map(int, input().split())
a = []

for i in range(m):
    row = list(map(int, input().split()))
    a.append(row)
```

---

## 2. Duyệt ma trận

```python
for i in range(m):
    for j in range(n):
        print(a[i][j])
```

---

## Ghi nhớ

- Đọc kỹ input và output trước khi code.
- Ưu tiên cách làm đơn giản, đúng trước.
- Tự tạo test nhỏ để kiểm tra lỗi.
- Chú ý trường hợp biên.

---

## Bài luyện

1. $$
   Tính tổng các phần tử âm trong ma trận.
   $$

2. Đếm số phần tử chia hết cho $k$.

3. Tìm giá trị lớn nhất trong ma trận.

4. Liệt kê vị trí các phần tử bằng $0$.

5. $$
   Tính tổng các phần tử ở hàng thứ $r$.
   $$

---

## Checklist

- Hiểu được dạng bài chính của ngày học.
- Code lại được ví dụ mà không nhìn tài liệu.
- Làm được ít nhất 4/5 bài luyện.
- Ghi lại lỗi sai thường gặp.

---

## Kết quả

- Hoàn thành ngày 15 trong lộ trình 21 ngày.
- Có thêm một nhóm kỹ năng phục vụ thi lập trình cơ bản.
