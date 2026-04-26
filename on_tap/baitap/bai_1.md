# Ngày 1 — Công thức tổng

## Mục tiêu
- Nhận diện nhanh các dạng tổng
- Thuộc công thức, không dùng vòng lặp
- Code nhanh và chính xác

---

## Thời lượng (~4 giờ)

| Phần | Thời gian |
|------|----------|
| Lý thuyết | 60 phút |
| Code lại | 45 phút |
| Luyện bài | 90 phút |
| Review | 30–45 phút |

---

## 1. Tổng số tự nhiên

$$
S = 1 + 2 + ... + n = \frac{n(n+1)}{2}
$$

```python
n = int(input())
print(n * (n + 1) // 2)
````

---

## 2. Tổng bình phương

$$
S = 1^2 + 2^2 + ... + n^2 = \frac{n(n+1)(2n+1)}{6}
$$

```python
n = int(input())
print(n * (n + 1) * (2*n + 1) // 6)
```

---

## 3. Tổng số lẻ

$$
S = 1 + 3 + 5 + ... + (2n-1) = n^2
$$

```python
n = int(input())
print(n * n)
```

---

## 4. Tổng nhân dồn

$$
S = 1·2 + 2·3 + ... + n(n+1) = \frac{n(n+1)(n+2)}{3}
$$

```python
n = int(input())
print(n * (n + 1) * (n + 2) // 3)
```

---

## 5. Tổng nghịch đảo

$$
S = \frac{1}{1·2} + \frac{1}{2·3} + ... + \frac{1}{n(n+1)} = \frac{n}{n+1}
$$

```python
n = int(input())
print(n / (n + 1))
```

---

## Ghi nhớ

* Không dùng vòng lặp nếu có công thức
* Ưu tiên O(1)
* Chú ý phép chia:

  * `//` với số nguyên
  * `/` với số thực

---

## Bài luyện
1. $$
   Tính\ S = 2 + 4 + 6 + \dots + 2n
   $$

2. $$
   Tính\ S = 1^2 + 3^2 + 5^2 + \dots + (2n-1)^2
   $$

3. $$
   Tính\ S = 2 + 5 + 8 + \dots + (3n-1)
   $$

4. $$
   Tính\ S = 1\cdot3 + 2\cdot4 + \dots + n(n+2)
   $$

5. $$
   Tính\ S = \frac{1}{2\cdot3} + \frac{1}{3\cdot4} + \dots + \frac{1}{(n+1)(n+2)}
   $$
---

## Checklist

* Thuộc 5 công thức
* Code không cần nhìn tài liệu
* Mỗi bài ≤ 10 phút
* Không dùng vòng lặp

---

## Kết quả

* Nắm được phần cơ bản của đề thi
* Làm nhanh các bài dễ
* Giảm thời gian xử lý
