# 📘 NGÀY 1 – CẤU TRÚC TUẦN TỰ (NỀN TẢNG)

## 🎯 Mục tiêu

Sau ngày 1, bạn phải:

* Biết đọc/ghi dữ liệu chuẩn
* Dùng được `math` trong Python
* Hiểu và áp dụng **công thức toán học vào code**
* Code không lỗi cú pháp

---

# 🧠 1. CẤU TRÚC TUẦN TỰ LÀ GÌ?

Là chương trình chạy **từng dòng từ trên xuống dưới**, không có:

* rẽ nhánh (`if`)
* lặp (`for`, `while`)

👉 Đây là dạng **dễ nhất nhưng cực quan trọng** vì:

* 70% lỗi thi đến từ phần này (sai input/output, sai công thức)

---

# ⚙️ 2. INPUT / OUTPUT CHUẨN

## 📥 Input

```python
x = int(input())
y = float(input())
```

## 📤 Output

```python
print(x)
print("{:.2f}".format(y))  # format 2 chữ số thập phân
```

---

# 📐 3. THƯ VIỆN MATH

## Import:

```python
from math import sqrt, pow
```

## Các hàm dùng nhiều:

* `sqrt(x)` → căn bậc 2
* `pow(a, b)` → a^b

---

# 📏 4. DẠNG 1 – HÌNH HỌC (CỰC QUAN TRỌNG)

## 🟢 Công thức khoảng cách:

```math
d = √((x2 - x1)^2 + (y2 - y1)^2)
```

## 🧪 Code:

```python
from math import sqrt

x1 = float(input())
y1 = float(input())
x2 = float(input())
y2 = float(input())

d = sqrt((x2 - x1)**2 + (y2 - y1)**2)
print("{:.2f}".format(d))
```

---

# 🔺 5. DẠNG 2 – TAM GIÁC (HERON)

## Công thức:

```math
p = (a + b + c) / 2
S = √(p(p-a)(p-b)(p-c))
```

## Code:

```python
from math import sqrt

a = int(input())
b = int(input())
c = int(input())

p = (a + b + c) / 2
s = sqrt(p * (p - a) * (p - b) * (p - c))

print("{:.3f}".format(s))
```

---

# 🔢 6. DẠNG 3 – TỔNG DÃY (KHÔNG DÙNG LOOP)

## Tổng 1 → N:

```math
S = n(n+1)/2
```

## Code:

```python
n = int(input())
s = n * (n + 1) // 2
print(s)
```

---

## Tổng bình phương:

```math
S = n(n+1)(2n+1)/6
```

---

## Tổng số lẻ:

```math
S = n^2
```

👉 🔥 Quy tắc:

* Nếu có công thức → KHÔNG dùng vòng lặp

---

# ⚠️ 7. LỖI HAY GẶP

## ❌ Sai kiểu dữ liệu

```python
# Sai
p = (a + b + c) / 2  # nếu a,b,c int → vẫn OK, nhưng cần chú ý float

# Nên:
p = (a + b + c) / 2.0
```

---

## ❌ Sai format output

```python
print(s)  # sai nếu đề yêu cầu 2 chữ số

# đúng:
print("{:.2f}".format(s))
```

---

## ❌ Nhầm công thức

→ Đây là lỗi nguy hiểm nhất → luôn test lại bằng ví dụ nhỏ

---

# 🧪 8. BÀI TẬP TỰ LUYỆN

## 🟢 Mức cơ bản

### Bài 1

Nhập 2 số a, b. In ra:

* tổng
* hiệu
* tích
* thương (2 chữ số thập phân)

---

### Bài 2

Nhập bán kính R.
Tính:

* Chu vi hình tròn
* Diện tích hình tròn

---

### Bài 3

Nhập 2 điểm A, B.
Tính khoảng cách AB (2 chữ số)

---

## 🟡 Mức trung bình

### Bài 4

Nhập a, b, c.
Tính chu vi và diện tích tam giác (Heron)

---

### Bài 5

Nhập N.
Tính:

* Tổng 1 → N
* Tổng bình phương 1 → N

---

### Bài 6

Nhập N.
Tính tổng:

```math
S = 1^3 + 2^3 + ... + N^3
```

---

## 🔴 Mức nâng cao

### Bài 7

Nhập N.
Tính:

```math
S = 1^5 + 2^5 + ... + N^5
```

---

### Bài 8

Nhập N.
Tính:

```math
S = 1×2 + 2×3 + ... + N(N+1)
```

---

### Bài 9

Nhập N.
Tính:

```math
S = 1/(1×2) + 1/(2×3) + ... + 1/(N(N+1))
```

---

# 🎯 CHECKLIST NGÀY 1

Bạn đạt nếu:

* ✔ Code không lỗi
* ✔ Hiểu công thức (không cần nhìn)
* ✔ Làm 1 bài ≤ 10 phút
* ✔ Không dùng loop khi không cần

---

