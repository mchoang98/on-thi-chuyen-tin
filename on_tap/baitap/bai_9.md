# Ngày 9 — Số nguyên tố

## Mục tiêu
- Viết hàm kiểm tra nguyên tố
- Liệt kê nguyên tố trong đoạn
- Kết hợp nguyên tố với điều kiện khác

---

## Thời lượng (~4 giờ)

| Phần | Thời gian |
|------|----------|
| Lý thuyết | 60 phút |
| Code lại | 45 phút |
| Luyện bài | 90 phút |
| Review | 30–45 phút |

---

## 1. Kiểm tra nguyên tố

```python
def is_prime(n):
    if n <= 1:
        return False
    i = 2
    while i * i <= n:
        if n % i == 0:
            return False
        i += 1
    return True

n = int(input())
print(is_prime(n))
```

---

## 2. Liệt kê nguyên tố

```python
a, b = map(int, input().split())
for x in range(a, b + 1):
    if is_prime(x):
        print(x)
```

---

## Ghi nhớ

- Đọc kỹ input và output trước khi code.
- Ưu tiên cách làm đơn giản, đúng trước.
- Tự tạo test nhỏ để kiểm tra lỗi.
- Chú ý trường hợp biên.

---

## Bài luyện

1. Tìm số nguyên tố nhỏ nhất lớn hơn $n$.

2. Đếm số nguyên tố trong đoạn $[a,b]$.

3. $$
   Tính tổng các số nguyên tố nhỏ hơn hoặc bằng $n$.
   $$

4. Tìm chữ số nguyên tố lớn nhất trong số $n$.

5. Kiểm tra $n$ có phải là số vừa nguyên tố vừa có tổng chữ số là số nguyên tố hay không.

---

## Checklist

- Hiểu được dạng bài chính của ngày học.
- Code lại được ví dụ mà không nhìn tài liệu.
- Làm được ít nhất 4/5 bài luyện.
- Ghi lại lỗi sai thường gặp.

---

## Kết quả

- Hoàn thành ngày 9 trong lộ trình 21 ngày.
- Có thêm một nhóm kỹ năng phục vụ thi lập trình cơ bản.
