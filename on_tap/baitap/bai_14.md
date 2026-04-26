# Ngày 14 — Dãy Fibonacci

## Mục tiêu
- Tạo dãy Fibonacci
- Tìm phần tử thứ n
- Kết hợp Fibonacci với nguyên tố/chính phương

---

## Thời lượng (~4 giờ)

| Phần | Thời gian |
|------|----------|
| Lý thuyết | 60 phút |
| Code lại | 45 phút |
| Luyện bài | 90 phút |
| Review | 30–45 phút |

---

## 1. Tính Fibonacci

Với:

$$
F_1 = 1,\quad F_2 = 1
$$

$$
F_n = F_{n-1} + F_{n-2}
$$

```python
n = int(input())
f = [1, 1]

for i in range(2, n):
    f.append(f[i-1] + f[i-2])

print(f[n-1])
```

---

## 2. Fibonacci nhỏ hơn n

```python
n = int(input())
a, b = 1, 1
while a <= n:
    print(a)
    a, b = b, a + b
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
   Tính tổng các số Fibonacci nhỏ hơn hoặc bằng $n$.
   $$

2. Đếm các số Fibonacci là số chẵn nhỏ hơn $n$.

3. Kiểm tra một số $x$ có thuộc dãy Fibonacci hay không.

4. Tìm số Fibonacci nhỏ nhất lớn hơn $n$.

5. Liệt kê các số vừa là Fibonacci vừa là số nguyên tố nhỏ hơn $n$.

---

## Checklist

- Hiểu được dạng bài chính của ngày học.
- Code lại được ví dụ mà không nhìn tài liệu.
- Làm được ít nhất 4/5 bài luyện.
- Ghi lại lỗi sai thường gặp.

---

## Kết quả

- Hoàn thành ngày 14 trong lộ trình 21 ngày.
- Có thêm một nhóm kỹ năng phục vụ thi lập trình cơ bản.
