# Ngày 10 — Vét cạn cơ bản

## Mục tiêu
- Hiểu tư duy thử mọi khả năng
- Biết giới hạn vòng lặp
- Biết dùng biến cờ để phát hiện không có kết quả

---

## Thời lượng (~4 giờ)

| Phần | Thời gian |
|------|----------|
| Lý thuyết | 60 phút |
| Code lại | 45 phút |
| Luyện bài | 90 phút |
| Review | 30–45 phút |

---

## 1. Tư duy vét cạn

Vét cạn là thử tất cả khả năng có thể, sau đó chọn kết quả thỏa điều kiện.

```python
n = int(input())
found = False

for x in range(0, n + 1):
    if x * x == n:
        print(x)
        found = True
        break

if not found:
    print("NONE")
```

---

## 2. Hai vòng lặp

```python
n, a, b = map(int, input().split())
for x in range(n // a + 1):
    for y in range(n // b + 1):
        if a*x + b*y == n:
            print(x, y)
```

---

## Ghi nhớ

- Đọc kỹ input và output trước khi code.
- Ưu tiên cách làm đơn giản, đúng trước.
- Tự tạo test nhỏ để kiểm tra lỗi.
- Chú ý trường hợp biên.

---

## Bài luyện

1. Cho $n,a,b$. Liệt kê các cặp $(x,y)$ sao cho $ax + by = n$.

2. Cho $n$. Tìm hai số dương $a,b$ sao cho $a+b=n$ và $a\cdot b$ lớn nhất.

3. Cho $n$. Liệt kê các bộ $(a,b,c)$ sao cho $a+b+c=n$.

4. Cho số tiền $n$, đổi bằng các mệnh giá $100,200,500$ sao cho số tờ ít nhất.

5. Tìm số nhỏ nhất có hai chữ số mà chia hết cho $a$ và $b$.

---

## Checklist

- Hiểu được dạng bài chính của ngày học.
- Code lại được ví dụ mà không nhìn tài liệu.
- Làm được ít nhất 4/5 bài luyện.
- Ghi lại lỗi sai thường gặp.

---

## Kết quả

- Hoàn thành ngày 10 trong lộ trình 21 ngày.
- Có thêm một nhóm kỹ năng phục vụ thi lập trình cơ bản.
