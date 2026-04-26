# Ngày 4 — Rẽ nhánh: if, elif, else

## Mục tiêu
- Viết được điều kiện nhiều nhánh
- Biết xử lý trường hợp đặc biệt
- Tránh sai thứ tự xét điều kiện

---

## Thời lượng (~4 giờ)

| Phần | Thời gian |
|------|----------|
| Lý thuyết | 60 phút |
| Code lại | 45 phút |
| Luyện bài | 90 phút |
| Review | 30–45 phút |

---

## 1. Cấu trúc if

Dùng `if` khi bài toán cần kiểm tra điều kiện.

```python
n = int(input())
if n > 0:
    print("POSITIVE")
elif n < 0:
    print("NEGATIVE")
else:
    print("ZERO")
```

---

## 2. Điều kiện kết hợp

Có thể kết hợp điều kiện bằng `and`, `or`, `not`.

```python
n = int(input())
if n % 2 == 0 and n % 5 != 0:
    print("YES")
else:
    print("NO")
```

---

## 3. Thứ tự xét điều kiện

Điều kiện đặc biệt nên xét trước để tránh sai logic.

```python
a, b = map(int, input().split())
if b == 0:
    print("INVALID")
else:
    print(a / b)
```

---

## Ghi nhớ

- Đọc kỹ input và output trước khi code.
- Ưu tiên cách làm đơn giản, đúng trước.
- Tự tạo test nhỏ để kiểm tra lỗi.
- Chú ý trường hợp biên.

---

## Bài luyện

1. Cho $n$. In `YES` nếu $n$ chia hết cho $2$ hoặc $5$, ngược lại in `NO`.

2. Cho ba số $a,b,c$. Tìm số nhỏ nhất là số dương.

3. Cho điểm $x$. Xác định $x$ nằm âm, dương hay bằng $0$.

4. Cho năm sinh, kiểm tra năm đó có phải năm nhuận hay không.

5. Cho $a,b,c$. Kiểm tra có thể tạo thành tam giác hay không.

---

## Checklist

- Hiểu được dạng bài chính của ngày học.
- Code lại được ví dụ mà không nhìn tài liệu.
- Làm được ít nhất 4/5 bài luyện.
- Ghi lại lỗi sai thường gặp.

---

## Kết quả

- Hoàn thành ngày 4 trong lộ trình 21 ngày.
- Có thêm một nhóm kỹ năng phục vụ thi lập trình cơ bản.
