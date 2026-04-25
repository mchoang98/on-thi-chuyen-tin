# Ngày 8 — Ước số và ước chung lớn nhất

## Mục tiêu
- Liệt kê ước số
- Đếm và tính tổng ước
- Hiểu thuật toán Euclid

---

## Thời lượng (~4 giờ)

| Phần | Thời gian |
|------|----------|
| Lý thuyết | 60 phút |
| Code lại | 45 phút |
| Luyện bài | 90 phút |
| Review | 30–45 phút |

---

## 1. Liệt kê ước số

Duyệt đến căn bậc hai để tối ưu.

```python
from math import sqrt

n = int(input())
for i in range(1, int(sqrt(n)) + 1):
    if n % i == 0:
        print(i)
        if i != n // i:
            print(n // i)
```

---

## 2. Ước chung lớn nhất

```python
def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a

a, b = map(int, input().split())
print(gcd(a, b))
```

---

## Ghi nhớ

- Đọc kỹ input và output trước khi code.
- Ưu tiên cách làm đơn giản, đúng trước.
- Tự tạo test nhỏ để kiểm tra lỗi.
- Chú ý trường hợp biên.

---

## Bài luyện

1. Đếm số lượng ước lẻ của $n$.

2. $$
   Tính tổng các ước chẵn của $n$.
   $$

3. Tìm ước lớn nhất nhỏ hơn $n$.

4. Cho $a,b$. Tính bội chung nhỏ nhất.

5. Tìm số trong đoạn $[a,b]$ có nhiều ước nhất.

---

## Checklist

- Hiểu được dạng bài chính của ngày học.
- Code lại được ví dụ mà không nhìn tài liệu.
- Làm được ít nhất 4/5 bài luyện.
- Ghi lại lỗi sai thường gặp.

---

## Kết quả

- Hoàn thành ngày 8 trong lộ trình 21 ngày.
- Có thêm một nhóm kỹ năng phục vụ thi lập trình cơ bản.
