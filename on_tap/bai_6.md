# Ngày 6 — Vòng lặp for

## Mục tiêu
- Duyệt được đoạn số
- Tính tổng và đếm bằng vòng lặp
- Biết dùng biến cộng dồn

---

## Thời lượng (~4 giờ)

| Phần | Thời gian |
|------|----------|
| Lý thuyết | 60 phút |
| Code lại | 45 phút |
| Luyện bài | 90 phút |
| Review | 30–45 phút |

---

## 1. Duyệt từ 1 đến n

```python
n = int(input())
for i in range(1, n + 1):
    print(i)
```

---

## 2. Tính tổng bằng vòng lặp

```python
n = int(input())
s = 0
for i in range(1, n + 1):
    s += i
print(s)
```

---

## 3. Đếm số thỏa điều kiện

```python
n = int(input())
cnt = 0
for i in range(1, n + 1):
    if i % 2 == 0:
        cnt += 1
print(cnt)
```

---

## Ghi nhớ

- Đọc kỹ input và output trước khi code.
- Ưu tiên cách làm đơn giản, đúng trước.
- Tự tạo test nhỏ để kiểm tra lỗi.
- Chú ý trường hợp biên.

---

## Bài luyện

1. $$Tính\ S = 2 + 4 + 6 + \dots + 2n$$

2. $$Tính\ S = 1^3 + 2^3 + \dots + n^3$$

3. Đếm các số $i$ trong đoạn $[1,n]$ sao cho $i$ chia hết cho $3$ nhưng không chia hết cho $9$.

4. Liệt kê các số $i$ trong đoạn $[a,b]$ có chữ số tận cùng bằng $5$.

5. $$Tính\ S = 1\cdot3 + 2\cdot4 + 3\cdot5 + \dots + n(n+2)$$

---

## Checklist

- Hiểu được dạng bài chính của ngày học.
- Code lại được ví dụ mà không nhìn tài liệu.
- Làm được ít nhất 4/5 bài luyện.
- Ghi lại lỗi sai thường gặp.

---

## Kết quả

- Hoàn thành ngày 6 trong lộ trình 21 ngày.
- Có thêm một nhóm kỹ năng phục vụ thi lập trình cơ bản.
