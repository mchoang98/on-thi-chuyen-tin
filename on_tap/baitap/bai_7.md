# Ngày 7 — Vòng lặp while và cắt số

## Mục tiêu
- Biết dùng while khi chưa biết số lần lặp
- Biết tách chữ số
- Biết xử lý số bằng phép chia dư

---

## Thời lượng (~4 giờ)

| Phần | Thời gian |
|------|----------|
| Lý thuyết | 60 phút |
| Code lại | 45 phút |
| Luyện bài | 90 phút |
| Review | 30–45 phút |

---

## 1. Cấu trúc while

```python
i = 1
while i <= 5:
    print(i)
    i += 1
```

---

## 2. Tổng chữ số

```python
n = int(input())
s = 0
while n > 0:
    s += n % 10
    n //= 10
print(s)
```

---

## 3. Đếm chữ số

```python
n = int(input())
cnt = 0
if n == 0:
    cnt = 1
else:
    while n > 0:
        cnt += 1
        n //= 10
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

1. $$
   Tính tổng các chữ số chẵn của số nguyên dương $n$.
   $$

2. Đếm số chữ số lẻ trong $n$.

3. Tìm chữ số lớn nhất của $n$.

4. Đảo ngược số nguyên dương $n$.

5. Kiểm tra tổng chữ số của $n$ có chia hết cho $3$ hay không.

---

## Checklist

- Hiểu được dạng bài chính của ngày học.
- Code lại được ví dụ mà không nhìn tài liệu.
- Làm được ít nhất 4/5 bài luyện.
- Ghi lại lỗi sai thường gặp.

---

## Kết quả

- Hoàn thành ngày 7 trong lộ trình 21 ngày.
- Có thêm một nhóm kỹ năng phục vụ thi lập trình cơ bản.
