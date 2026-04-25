# 📘 Ngày 1 — Công thức tổng (Core nhất)

## 🎯 Mục tiêu
- Nhận diện nhanh các dạng tổng trong đề
- Thuộc công thức, không dùng loop
- Code trong 5–7 phút

---

## ⏱️ Thời lượng học (~4 giờ)

| Phần | Thời gian |
|------|----------|
| Lý thuyết | 60 phút |
| Code lại | 45 phút |
| Luyện bài | 90 phút |
| Review | 30–45 phút |

---

## 📚 1. Tổng số tự nhiên

$$
S = 1 + 2 + ... + n = \frac{n(n+1)}{2}
$$

```python
n = int(input())
print(n * (n + 1) // 2)
```

---

## 📚 2. Tổng bình phương

$$
S = 1^2 + 2^2 + ... + n^2 = \frac{n(n+1)(2n+1)}{6}
$$

```python
n = int(input())
print(n * (n + 1) * (2*n + 1) // 6)
```

---

## 📚 3. Tổng số lẻ

$$
S = 1 + 3 + 5 + ... + (2n-1) = n^2
$$

```python
n = int(input())
print(n * n)
```

---

## 📚 4. Tổng nhân dồn

$$
S = 1·2 + 2·3 + ... + n(n+1) = \frac{n(n+1)(n+2)}{3}
$$

```python
n = int(input())
print(n * (n + 1) * (n + 2) // 3)
```

---

## 📚 5. Tổng nghịch đảo đặc biệt

$$
S = \frac{1}{1·2} + \frac{1}{2·3} + ... + \frac{1}{n(n+1)} = \frac{n}{n+1}
$$

```python
n = int(input())
print(n / (n + 1))
```

---

## ⚠️ Ghi nhớ quan trọng

- ❌ Không dùng vòng lặp
- ✅ Dùng công thức O(1)
- Cẩn thận chia nguyên `//`

---

## 💻 Bài luyện

1. S = 1 + 2 + ... + n  
2. S = 1² + 2² + ... + n²  
3. S = 1 + 3 + 5 + ...  
4. S = 1·2 + 2·3 + ...  
5. S = 1/(1·2) + 1/(2·3) + ...

---

## 🔍 Checklist

- [ ] Thuộc 5 công thức
- [ ] Code không nhìn tài liệu
- [ ] Mỗi bài ≤ 10 phút
- [ ] Không dùng loop

---

## 🚀 Kết quả

- Nắm ~30–40% đề thi
- Làm nhanh bài cơ bản
