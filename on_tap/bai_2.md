# Ngày 2 — Tổng nâng cao và biến đổi toán học

## Mục tiêu
- Nhận diện các dạng tổng phức tạp hơn
- Biết biến đổi biểu thức
- Hiểu khi nào dùng công thức, khi nào dùng vòng lặp

---

## Thời lượng (~4 giờ)

| Phần | Thời gian |
|------|----------|
| Lý thuyết | 60 phút |
| Code lại | 45 phút |
| Luyện bài | 90 phút |
| Review | 30–45 phút |

---

## 1. Tổng lũy thừa

$$
S = 1 + 2^2 + 3^3 + ... + n^n
$$

```python
n = int(input())
s = 0
for i in range(1, n + 1):
    s += i ** i
print(s)
```

---

## 2. Tổng cấp số nhân

$$
S = 1 + p + p^2 + ... + p^n
$$

$$
S = \frac{p^{n+1} - 1}{p - 1}
$$

```python
n, p = map(int, input().split())
if p == 1:
    print(n + 1)
else:
    print((p**(n+1) - 1) // (p - 1))
```

---

## 3. Tổng phân số

$$
S = \frac{1}{2} + \frac{1}{3} + ... + \frac{1}{n}
$$

```python
n = int(input())
s = 0.0
for i in range(2, n + 1):
    s += 1 / i
print(s)
```

---

## 4. Biến đổi tổng

$$
S = 1·2 + 2·3 + ... + n(n+1)
$$

$$
S = \frac{n(n+1)(n+2)}{3}
$$

---

## 5. Tách tổng

$$
S = 1^2 + ... + n^2 + 1 + ... + n
$$

$$
S = \frac{n(n+1)(2n+1)}{6} + \frac{n(n+1)}{2}
$$

---

## Ghi nhớ

- Không phải bài nào cũng có công thức
- Khi không có công thức → dùng loop
- Ưu tiên biến đổi về dạng đã biết

---

## Bài luyện

1. $$
   Tính\ S = 1 + 2^2 + 3^3 + \dots + n^n
   $$

2. $$
   Tính\ S = 1 + p + p^2 + \dots + p^n
   $$

3. $$
   Tính\ S = \frac{1}{2} + \frac{1}{3} + \dots + \frac{1}{n}
   $$

4. $$
   Tính\ S = 1^2 + 2^2 + \dots + n^2 + (1 + 2 + \dots + n)
   $$

5. $$
   Tính\ S = 1\cdot2 + 2\cdot3 + \dots + n(n+1)
   $$

---

## Checklist

- Phân biệt công thức và loop
- Biết tách tổng
- Code đúng kiểu dữ liệu

---

## Kết quả

- Làm được bài tổng nâng cao
- Tránh sai hướng khi làm bài
