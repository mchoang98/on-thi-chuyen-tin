# Ngày 11 — Mảng một chiều: nhập, duyệt, lọc

## Mục tiêu
- Nhập và lưu danh sách
- Duyệt mảng bằng chỉ số
- Lọc phần tử theo điều kiện

---

## Thời lượng (~4 giờ)

| Phần | Thời gian |
|------|----------|
| Lý thuyết | 60 phút |
| Code lại | 45 phút |
| Luyện bài | 90 phút |
| Review | 30–45 phút |

---

## 1. Nhập mảng

```python
n = int(input())
a = []
for _ in range(n):
    a.append(int(input()))
print(a)
```

---

## 2. Duyệt mảng

```python
for x in a:
    print(x)
```

---

## 3. Lọc phần tử

```python
for x in a:
    if x % 2 == 0:
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

1. Liệt kê các phần tử chia hết cho $3$ nhưng không chia hết cho $2$.

2. Đếm số phần tử âm trong mảng.

3. $$
   Tính tổng các phần tử ở vị trí lẻ.
   $$

4. Liệt kê các phần tử là số chính phương.

5. Tìm phần tử đầu tiên lớn hơn $k$.

---

## Checklist

- Hiểu được dạng bài chính của ngày học.
- Code lại được ví dụ mà không nhìn tài liệu.
- Làm được ít nhất 4/5 bài luyện.
- Ghi lại lỗi sai thường gặp.

---

## Kết quả

- Hoàn thành ngày 11 trong lộ trình 21 ngày.
- Có thêm một nhóm kỹ năng phục vụ thi lập trình cơ bản.
