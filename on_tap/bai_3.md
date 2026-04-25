# Ngày 3 — Kiểm tra số: chẵn lẻ, chia hết, chính phương

## Mục tiêu
- Nắm cách dùng toán tử `%`, `//`
- Biết kiểm tra số chẵn, số lẻ, chia hết
- Biết kiểm tra số chính phương bằng căn bậc hai

---

## Thời lượng (~4 giờ)

| Phần | Thời gian |
|------|----------|
| Lý thuyết | 60 phút |
| Code lại | 45 phút |
| Luyện bài | 90 phút |
| Review | 30–45 phút |

---

## 1. Kiểm tra chẵn lẻ

Một số nguyên $n$ là số chẵn khi:

$$
n \bmod 2 = 0
$$

```python
n = int(input())
if n % 2 == 0:
    print("EVEN")
else:
    print("ODD")
```

---

## 2. Kiểm tra chia hết

Một số $n$ chia hết cho $k$ khi:

$$
n \bmod k = 0
$$

```python
n, k = map(int, input().split())
print(n % k == 0)
```

---

## 3. Kiểm tra số chính phương

Số chính phương là số có căn bậc hai là số nguyên.

$$
n = a^2
$$

```python
from math import sqrt

n = int(input())
x = int(sqrt(n))
print(x * x == n)
```

---

## Ghi nhớ

- Đọc kỹ input và output trước khi code.
- Ưu tiên cách làm đơn giản, đúng trước.
- Tự tạo test nhỏ để kiểm tra lỗi.
- Chú ý trường hợp biên.

---

## Bài luyện

1. Kiểm tra số nguyên $n$ có chia hết cho $4$ nhưng không chia hết cho $6$ hay không.

2. Đếm số chính phương nhỏ hơn hoặc bằng $n$.

3. Tìm số chính phương nhỏ nhất lớn hơn hoặc bằng $n$.

4. Kiểm tra số $n$ có chữ số tận cùng là số chẵn hay không.

5. Tìm số lớn nhất trong ba số $a,b,c$ nhưng chỉ xét các số chia hết cho $3$.

---

## Checklist

- Hiểu được dạng bài chính của ngày học.
- Code lại được ví dụ mà không nhìn tài liệu.
- Làm được ít nhất 4/5 bài luyện.
- Ghi lại lỗi sai thường gặp.

---

## Kết quả

- Hoàn thành ngày 3 trong lộ trình 21 ngày.
- Có thêm một nhóm kỹ năng phục vụ thi lập trình cơ bản.
