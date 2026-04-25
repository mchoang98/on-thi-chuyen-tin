# NGÀY 2 – CÔNG THỨC NÂNG CAO & NHẬN DẠNG DẠNG TOÁN

## 🎯 Mục tiêu

Sau ngày 2, bạn phải:

* Nhìn đề → nhận ra **có công thức hay không**
* Thuộc các công thức quan trọng
* Biết **biến đổi biểu thức → code nhanh O(1)**
* Tránh dùng loop khi không cần

---

# 🧠 1. TƯ DUY QUAN TRỌNG NHẤT

👉 Mọi bài hôm nay đều có đặc điểm:

> ❗ Nếu bạn dùng `for` → bạn đang làm sai hướng

---

## 🔥 Quy tắc:

* Thấy tổng → nghĩ công thức
* Thấy tích → nghĩ biến đổi
* Thấy phân số → nghĩ rút gọn

---

# 📐 2. DẠNG 1 – TỔNG LUỸ THỪA

## 🟢 Tổng lập phương:

1^3 + 2^3 + \cdots + n^3 = \left(\frac{n(n+1)}{2}\right)^2

👉 Ý nghĩa:

* Tổng lập phương = bình phương tổng

---

## Code:

```python
n = int(input())
s = n * (n + 1) // 2
print(s * s)
```

---

## 🟡 Tổng luỹ thừa 5:

1^5 + 2^5 + \cdots + n^5 = \frac{n^2 (n+1)^2 (2n^2 + 2n -1)}{12}

---

## Code:

```python
n = int(input())
s = n*n*(n+1)*(n+1)*(2*n*n+2*n-1)//12
print(s)
```

---

# 🔢 3. DẠNG 2 – TỔNG NHÂN LIÊN TIẾP

## 🟢 Dạng:

1\cdot2 + 2\cdot3 + \cdots + n(n+1) = \frac{n(n+1)(n+2)}{3}

---

## Code:

```python
n = int(input())
print(n*(n+1)*(n+2)//3)
```

---

# 🔍 4. DẠNG 3 – TỔNG PHÂN SỐ (RẤT QUAN TRỌNG)

## 🟢 Dạng 1:

\frac{1}{1\cdot2} + \frac{1}{2\cdot3} + \cdots + \frac{1}{n(n+1)} = \frac{n}{n+1}

👉 Đây là dạng **rút gọn telescoping**

---

## Code:

```python
n = int(input())
print(n / (n + 1))
```

---

## 🟡 Dạng 2:

\frac{1}{1\cdot2\cdot3} + \frac{1}{2\cdot3\cdot4} + \cdots = \frac{n(n+3)}{4(n+1)(n+2)}

---

## Code:

```python
n = int(input())
s = n*(n+3)/(4*(n+1)*(n+2))
print(s)
```

---

# 📊 5. DẠNG 4 – DÃY CÓ THAM SỐ p

## 🟢 Tổng cấp số nhân:

1 + p + p^2 + \cdots + p^n = \frac{p^{n+1}-1}{p-1}

---

## Code:

```python
n = int(input())
p = int(input())
s = (p**(n+1) - 1) // (p - 1)
print(s)
```

---

## 🔴 Dạng nâng cao:

1 + 2p + 3p^2 + \cdots + (n+1)p^n = \frac{(n+1)p^{n+1}}{p-1} - \frac{p^{n+1}-1}{(p-1)^2}

---

# ⚠️ 6. LỖI CHẾT NGƯỜI

## ❌ 1. Dùng loop thay vì công thức

```python
# Sai
s = 0
for i in range(1, n+1):
    s += i*i*i
```

👉 Với n = 10^6 → TLE

---

## ❌ 2. Tràn số (Python ít bị nhưng vẫn cần chú ý)

→ Dùng `//` thay vì `/` khi cần số nguyên

---

## ❌ 3. Sai thứ tự input

```python
# Sai (dễ gặp)
p = int(input())
n = int(input())
```

---

## ❌ 4. Sai kiểu float

```python
print(n/(n+1))  # có thể cần format
```

---

# 🧪 7. BÀI TẬP TỰ LUYỆN

## 🟢 Mức cơ bản

### Bài 1

Tính:

```math
S = 1^3 + 2^3 + ... + N^3
```

---

### Bài 2

Tính:

```math
S = 1×2 + 2×3 + ... + N(N+1)
```

---

## 🟡 Mức trung bình

### Bài 3

Tính:

```math
S = 1/(1×2) + 1/(2×3) + ... + 1/(N(N+1))
```

---

### Bài 4

Tính:

```math
S = 1/(1×2×3) + ... + 1/(N(N+1)(N+2))
```

---

### Bài 5

Tính:

```math
S = 1 + p + p^2 + ... + p^N
```

---

## 🔴 Mức nâng cao

### Bài 6

Tính:

```math
S = 1 + 2p + 3p^2 + ... + (N+1)p^N
```

---

### Bài 7

Tính:

```math
S = 3/(1×2)^2 + 5/(2×3)^2 + ... + (2N+1)/(N(N+1))^2
```

---

# 🎯 CHECKLIST NGÀY 2

Bạn đạt nếu:

* ✔ Nhìn đề → biết có công thức hay không
* ✔ Không dùng loop sai chỗ
* ✔ Thuộc ít nhất 5 công thức
* ✔ Code < 5 phút / bài

---

# 🚀 Gợi ý ngày 3

* Dãy đặc biệt nâng cao
* Nhận dạng biến đổi (level khó hơn)

Nếu muốn:
👉 Tôi có thể cho bạn **10 bài test ẩn cực khó** để check level thật
