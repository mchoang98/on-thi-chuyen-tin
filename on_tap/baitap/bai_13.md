# Ngày 13 — Mảng một chiều: dãy con và kiểm tra tính chất

## Mục tiêu
- Kiểm tra dãy không giảm
- Tính tổng liên tiếp
- Đảo và nhân đôi dãy

---

## Thời lượng (~4 giờ)

| Phần | Thời gian |
|------|----------|
| Lý thuyết | 60 phút |
| Code lại | 45 phút |
| Luyện bài | 90 phút |
| Review | 30–45 phút |

---

## 1. Kiểm tra dãy không giảm

```python
n = int(input())
a = [int(input()) for _ in range(n)]

ok = True
for i in range(n - 1):
    if a[i] > a[i + 1]:
        ok = False
        break

print("YES" if ok else "NO")
```

---

## 2. Tổng 3 phần tử liên tiếp lớn nhất

```python
rmax = a[0] + a[1] + a[2]
for i in range(1, n - 2):
    cur = a[i] + a[i+1] + a[i+2]
    rmax = max(rmax, cur)
print(rmax)
```

---

## Ghi nhớ

- Đọc kỹ input và output trước khi code.
- Ưu tiên cách làm đơn giản, đúng trước.
- Tự tạo test nhỏ để kiểm tra lỗi.
- Chú ý trường hợp biên.

---

## Bài luyện

1. Tìm tổng lớn nhất của $2$ phần tử liên tiếp.

2. Tìm tổng nhỏ nhất của $4$ phần tử liên tiếp.

3. Kiểm tra dãy có tăng nghiêm ngặt hay không.

4. Đảo ngược mảng nhưng chỉ in ra, không dùng hàm `reverse`.

5. Tạo mảng mới gồm các phần tử dương của mảng ban đầu.

---

## Checklist

- Hiểu được dạng bài chính của ngày học.
- Code lại được ví dụ mà không nhìn tài liệu.
- Làm được ít nhất 4/5 bài luyện.
- Ghi lại lỗi sai thường gặp.

---

## Kết quả

- Hoàn thành ngày 13 trong lộ trình 21 ngày.
- Có thêm một nhóm kỹ năng phục vụ thi lập trình cơ bản.
