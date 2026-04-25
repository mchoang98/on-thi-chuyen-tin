# Ngày 5 — Bài toán hình học cơ bản

## Mục tiêu
- Biết dùng công thức khoảng cách
- Biết tính chu vi, diện tích tam giác
- Biết làm tròn kết quả đúng yêu cầu

---

## Thời lượng (~4 giờ)

| Phần | Thời gian |
|------|----------|
| Lý thuyết | 60 phút |
| Code lại | 45 phút |
| Luyện bài | 90 phút |
| Review | 30–45 phút |

---

## 1. Khoảng cách hai điểm

Với $A(x_1,y_1)$ và $B(x_2,y_2)$:

$$
AB = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}
$$

```python
from math import sqrt

x1, y1 = map(float, input().split())
x2, y2 = map(float, input().split())

d = sqrt((x2 - x1)**2 + (y2 - y1)**2)
print(f"{d:.2f}")
```

---

## 2. Diện tích tam giác theo Heron

Với ba cạnh $a,b,c$:

$$
p = \frac{a+b+c}{2}
$$

$$
S = \sqrt{p(p-a)(p-b)(p-c)}
$$

```python
from math import sqrt

a, b, c = map(float, input().split())
p = (a + b + c) / 2
s = sqrt(p * (p - a) * (p - b) * (p - c))
print(f"{s:.3f}")
```

---

## Ghi nhớ

- Đọc kỹ input và output trước khi code.
- Ưu tiên cách làm đơn giản, đúng trước.
- Tự tạo test nhỏ để kiểm tra lỗi.
- Chú ý trường hợp biên.

---

## Bài luyện

1. Cho hai điểm $A,B$. Tính bình phương độ dài $AB$ để tránh dùng căn.

2. Cho ba điểm $A,B,C$. Tính chu vi tam giác nếu ba điểm không thẳng hàng.

3. Cho hình chữ nhật có hai cạnh $a,b$. Tính đường chéo.

4. Cho tâm $O$ và điểm $M$. Kiểm tra $M$ nằm trong, trên hay ngoài đường tròn bán kính $r$.

5. Cho ba cạnh $a,b,c$. Nếu là tam giác, tính diện tích; nếu không, in `NONE`.

---

## Checklist

- Hiểu được dạng bài chính của ngày học.
- Code lại được ví dụ mà không nhìn tài liệu.
- Làm được ít nhất 4/5 bài luyện.
- Ghi lại lỗi sai thường gặp.

---

## Kết quả

- Hoàn thành ngày 5 trong lộ trình 21 ngày.
- Có thêm một nhóm kỹ năng phục vụ thi lập trình cơ bản.
